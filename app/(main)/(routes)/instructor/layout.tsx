import { isMentor } from "@/lib/mentor";
import { redirect } from "next/navigation";
import { auth } from '@clerk/nextjs/server';


const MentorLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!isMentor(userId)) {
    return redirect("/");
  }

  return <>{children}</>;
}
 
export default MentorLayout;