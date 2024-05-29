import { ChannelList, ChannelPreviewMessenger, ChannelPreviewUIComponentProps } from "stream-chat-react";
import Menubar from "@/components/chat/menubar";
import { UserResource } from "@clerk/types";
import { useCallback, useEffect, useState } from "react";
import UsersMenu from "./usersMenu";

interface ChatSidebarProps {
  user: UserResource;
  show: boolean;
  onClose: () => void;
  isFullScreen: boolean; // New prop to handle full screen mode
}

export default function ChatSidebar({ user, show, onClose, isFullScreen }: ChatSidebarProps) {

  const [usersMenuOpen, setUsersMenuOpen] = useState(false);

  useEffect(() => {
    if (!show) setUsersMenuOpen(false);
  }, [show]);

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose]
  );

  return (
    <div
      className={`relative flex-col ${show ? "flex" : "hidden"} ${isFullScreen ? "fixed inset-0 bg-white z-50" : "w-full md:max-w-[360px]"}`}
    >
      {usersMenuOpen &&
        <UsersMenu loggedInUsers={user} onClose={() => setUsersMenuOpen(false)}
        onChannelSelected={() => {
          setUsersMenuOpen(false);
          onClose();
        }}
         />
      }
      <Menubar onUserMenuClick={() => setUsersMenuOpen(true)} />
      <ChannelList
        filters={{
          type: "messaging", // only display channels of type "messaging"
          members: { $in: [user.id] }, // only display channels where the current user is a member
        }}
        sort={{ last_message_at: -1 }} // sort by last message
        options={{ state: true, presence: true, limit: 10 }} // see active , screen chat limit,
        showChannelSearch
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
}