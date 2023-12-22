
import {  auth,  redirectToSignIn } from "@clerk/nextjs";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { setupMentorProfile } from "@/lib/setup-mentor-profile";
import { db } from "@/lib/db";

interface InviteCodePageProps {
  params:{
    inviteCode: string;
  }
}

const InviteCodePage = async ({
  params
}:InviteCodePageProps) => {

 
  const {userId} = auth();
  if (!userId) { 
    redirectToSignIn();
  }
  
  const profile = await currentProfile() || null;
  const mentorCodes = await db.mentorInviteCode.findFirst({
    where: {
      inviteCode: params.inviteCode
    }
  })
  
  if(!mentorCodes){ return null}

  if(profile){
    return redirect('/dashboard');
  } else {
    await setupMentorProfile();
    return redirect('/dashboard');
  }

 


}
export default InviteCodePage;