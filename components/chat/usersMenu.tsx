import { useDebounce } from "@/hooks/use-debounce";
import { UserResource } from "@clerk/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Channel, UserResponse } from "stream-chat";
import { Avatar, LoadingChannels as LoadingUsers, useChatContext } from "stream-chat-react";
import LoadingButton from "./LoadingButton";
import { Button } from "@chakra-ui/button";

interface UsersMenuProps {
  loggedInUsers: UserResource;
  onClose: () => void;
  onChannelSelected: () => void;
}

export default function UsersMenu({ loggedInUsers, onClose, onChannelSelected }: UsersMenuProps) {
  const { client, setActiveChannel } = useChatContext();
  const [users, setUsers] = useState<(UserResponse & { image?: string })[]>();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const searchInputDebounced = useDebounce(searchInput);
  const [moreUsersLoading, setMoreUsersLoading] = useState(false);
  const [endOfPaginationReached, setEndOfPaginationReached] = useState<boolean>();
  const pageSize = 10;

  useEffect(() => {
    async function loadInitialUsers() {
      setUsers(undefined);
      setEndOfPaginationReached(undefined);

      try {
        const response = await client.queryUsers(
          {
            id: { $ne: loggedInUsers.id },
            ...(searchInputDebounced
              ? {
                $or: [
                  { name: { $autocomplete: searchInputDebounced } },
                  { id: { $autocomplete: searchInputDebounced } },
                ],
              }
              : {}),
          },
          { id: 1 },
          { limit: pageSize + 1 }
        );
        setUsers(response.users.slice(0, pageSize));
        setEndOfPaginationReached(response.users.length <= pageSize);
      } catch (error) {
        console.error(error);
        alert("Error loading users");
      }
    }
    loadInitialUsers();
  }, [client, loggedInUsers.id, searchInputDebounced]);

  async function loadMoreUsers() {
    setMoreUsersLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const lastUserId =
        users && users.length > 0 ? users[users.length - 1].id : undefined;
      if (lastUserId !== undefined) {
        const response = await client.queryUsers(
          {
            $and: [
              { id: { $ne: loggedInUsers.id } },
              { id: { $gt: lastUserId } },
              searchInputDebounced
                ? {
                  $or: [
                    { name: { $autocomplete: searchInputDebounced } },
                    { id: { $autocomplete: searchInputDebounced } },
                  ],
                }
                : {},
            ],
          },
          { id: 1 },
          { limit: pageSize + 1 }
        );
        setUsers([...(users || []), ...response.users.slice(0, pageSize)]);
        setEndOfPaginationReached(response.users.length <= pageSize);
      }
    } catch (error) {
      console.error(error);
      alert("Error loading users");
    } finally {
      setMoreUsersLoading(false);
    }
  }

  function handleChannelSelected(channel: Channel) {
    setActiveChannel(channel);
    onChannelSelected();
  }

  async function startChatWithUser(userId: string) {
    try {
      const channel = client.channel("messaging", {
        members: [userId, loggedInUsers.id],
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error starting chat");
    }
  }

  async function startGroupChat(members: string[], name?: string) {
    try {
      const channel = client.channel("messaging", {
        members,
        name,
      });
      await channel.create();
      handleChannelSelected(channel);
    } catch (error) {
      console.error(error);
      alert("Error starting chat");
    }
  }

  return (
    <div className=" overflow-y-auto str-chat border-e[#DBDDE1] absolute z-10 h-full w-full border-e bg-white">
      <div className="flex flex-col p-3">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <ArrowLeft onClick={onClose} className="cursor-pointer" />
          Users
        </div>
        <input
          type="search"
          placeholder="Search"
          className="rounded-full border border-gray-300 px-4 py-2"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {selectedUsers.length > 0 && (
        <StartGroupChatHeader
          onConfirm={(name) =>
            startGroupChat([loggedInUsers.id, ...selectedUsers], name)
          }
          onClearSelection={() => setSelectedUsers([])}
        />
      )}
      <div>
        {users?.map((user) => (
          <UserResult
            user={user}
            onUserClicked={startChatWithUser}
            key={user.id}
            onChangeSelected={(selected) =>
              setSelectedUsers(
                selected
                  ? [...selectedUsers, user.id]
                  : selectedUsers.filter((id) => id !== user.id)
              )
            }
          />
        ))}
        <div className="px-3">
          {!users && !searchInputDebounced && <LoadingUsers />}
          {!users && !searchInputDebounced && "Searching..."}
          {users?.length === 0 && searchInputDebounced && "No users found"}
        </div>
        {endOfPaginationReached === false && (
          <div className="flex justify-center mt-4 mb-4">
            <LoadingButton
              onClick={loadMoreUsers}
              loading={moreUsersLoading}
              className="w-1/2 rounded-full"
            >
              More users
            </LoadingButton>
          </div>
        )}
      </div>
    </div>
  );
}

interface UserResultProps {
  user: UserResponse & { image?: string };
  onUserClicked: (userId: string) => void;
  selected?: boolean;
  onChangeSelected: (selected: boolean) => void;
}

function UserResult({ user, onUserClicked, selected, onChangeSelected }: UserResultProps) {
  return (
    <button
      className="mb-3 flex w-full items-center gap-2 p-2 hover:bg-[#e9eaed]"
      onClick={() => onUserClicked(user.id)}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChangeSelected(e.target.checked)}
        onClick={(e) => e.stopPropagation()}
        className="mx-1 scale-125"
      />
      <span>
        <Avatar image={user.image} name={user.name || user.id} size={40} />
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
        {user.name || user.id}
      </span>
      {user.online && <span className="text-xs text-green-500">Online</span>}
    </button>
  );
}

interface StartGroupChatHeaderProps {
  onConfirm: (name?: string) => void;
  onClearSelection: () => void;
}

function StartGroupChatHeader({ onConfirm, onClearSelection }: StartGroupChatHeaderProps) {
  const [groupChatNameInput, setGroupChatNameInput] = useState("");

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-3 bg-white shadow-sm rounded-xl">
      <input
        placeholder="Group name"
        className="round border border-gray-300 p-2"
        value={groupChatNameInput}
        onChange={(e) => setGroupChatNameInput(e.target.value)}
      />
      <div className="flex justify-center gap-2 text-white">
        <Button onClick={() => onConfirm(groupChatNameInput)} className=" bg-blue-500 active:bg-blue-600 py-2 px-4 rounded-full ">
           Create group chat
        </Button>
        <Button onClick={onClearSelection} className="bg-gray-400 active:bg-gray-500 py-2 px-4 rounded-full">
          Clear selection
        </Button>
      </div>
    </div>
  );
}