import { env } from "@/app/env";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { StreamChat } from "stream-chat";

export async function GET() {
  try {
    const user = await currentUser();

    console.log("Calling get-token for user: ", user?.id);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 });
    }

    const streamClient = StreamChat.getInstance(
      env.NEXT_PUBLIC_STREAM_KEY,
      env.STREAM_SECRET
    );
                                                                                        // DONT ADD TO PROTECTED ROUTE
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;
    const token = streamClient.createToken(user.id, expirationTime, issuedAt);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
