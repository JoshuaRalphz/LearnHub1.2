import { useUser } from "@clerk/nextjs";
import { useState,useEffect } from "react";
import { StreamChat } from "stream-chat";
import { env } from "@/app/env";

export default function useInitializeChatClient() {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const client = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);

    client.connectUser(
        {
          id: user.id,
          name: user.fullName || user.id,
          image: user.imageUrl,
        },
        async () => {
          const response = await fetch("/api/get-token");
          if (!response.ok) {
            throw new Error("Failed to fetch token");
          }
          const body = await response.json();
          return body.token;
        }
      )
      .catch((error) => console.error("Error connecting user", error))
      .then(() => setChatClient(client));
    
    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Error disconnecting user", error))
        .then(() => console.log("Connection Closed"));
    };
    
  }, [user?.id, user?.fullName, user?.imageUrl]);
  
  return chatClient;
}