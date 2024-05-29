"use client"
import ChatChannel from "@/components/chat/chatChannel";
import ChatSidebar from "@/components/chat/chatSidebar";
import useInitializeChatClient from "@/hooks/use-InitializeChatClient";
import useWindowSize from "@/hooks/use-windowSize";
import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Chat, LoadingIndicator } from "stream-chat-react";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= 768;
  useEffect(() => {
    if (windowSize.width >= 768) {
      setChatSidebarOpen(false);
    }
  }, [windowSize.width]);
  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, [])
  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="border-b border-[#DBDDE1] flex justify-center p-3 md:hidden">
          <button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
            {!chatSidebarOpen ? (
              <span className="flex items-center gap-1">
                <Menu /> Menu
              </span>
            ) : (
              <X />
            )}
          </button>
        </div>
        <div className="flex h-full flex-row-reverse">
          <ChatSidebar user={user} show={isLargeScreen || chatSidebarOpen} onClose={handleSidebarOnClose} isFullScreen={!isLargeScreen && chatSidebarOpen} />
          <ChatChannel show={isLargeScreen || !chatSidebarOpen} />
        </div>
      </Chat>
    </div>
  );
}