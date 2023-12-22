import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { skillId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { name,
           description,
            imageUrl, 
            experience, 
             } = body;
  
    
    
    if (!name ||!imageUrl || !description ) {
      return new NextResponse("Inputs required",{ status: 400 });
    }
    
    const checkProfile = await db.profile.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })
    
    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist",{ status: 400 });
    }
    
    const checkMentor = await db.mentor.findFirst({ 
      where: {
        clerkId: user.id,
      }
    })

    if (!checkMentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

      const updatedSkill = await db.skill.update({
        where: {
          id:params.skillId,
        },
        data: {
          name,
          description,
          imageUrl,
          experience,
        },
      });
      
        
      
      
      return NextResponse.json(updatedSkill);


  } catch (error) {
    console.log('[SKILLID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { skillId: string } }
  ) {
    try{
      const user = await currentUser();
    if (!user) {
      return null }
      const profile = await db.profile.findFirst({
        where: {
          clerkId:user.id,
        },
      })
      if (!profile) {
        return new NextResponse("Profile not found",{ status: 400 });
      }
      const mentor = await db.mentor.findFirst({
        where: {
          clerkId:user.id,
        },
      })
      if (!mentor) {
        return new NextResponse("Mentor not found",{ status: 400 });
      }
      const updatedSkillIds= mentor.skillIds.filter((id)=>{params.skillId===id});

      await db.mentor.update({
        where: {
          id:mentor?.id,
        },
        data: {
          courseIds:updatedSkillIds,
        }
      })

      const deleteSkill = await db.skill.delete({
        where: {
          id:params.skillId,
        },
      });
    
      
      return NextResponse.json(deleteSkill);
  
    }
    catch (error) {
      console.log('[SKILL_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }