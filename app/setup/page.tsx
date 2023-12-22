

import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { Button, Divider } from "@nextui-org/react";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";


interface SetupPageProps {}

const SetupPage = async () => {

  const user = await currentUser();

  if(!user?.id) {
    redirectToSignIn();
  }
  

  const profile = await db.profile.findFirst({
    where: {
      clerkId: user?.id,
    },
  });

  if(profile) {
    return redirect("/dashboard");
  } else {
    await db.profile.create({
      data: {
        clerkId: user?.id,
        role: Role.STUDENT,
        name: `${user?.username}`,
        imageUrl: `${user?.imageUrl}`,
        email: `${user?.emailAddresses[0].emailAddress}`,
      },
    });
    return redirect("/dashboard");
  }

 
  
}
export default SetupPage;