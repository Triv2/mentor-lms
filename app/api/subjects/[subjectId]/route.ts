import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { subjectId: string } }
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
            cost, 
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

      const updatedSubject = await db.subject.update({
        where: {
          id:params.subjectId,
        },
        data: {
          name,
          description,
          imageUrl,
          cost,
        },
      });
      
        
      
      
      return NextResponse.json(updatedSubject);


  } catch (error) {
    console.log('[SUBJECTID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  { params }: { params: { subjectId: string } }
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
      const updatedSubjectIds= mentor.subjectIds.filter((id)=>{params.subjectId===id});

      const updatedMentor= await db.mentor.update({
        where: {
          id:mentor?.id,
        },
        data: {
          courseIds:updatedSubjectIds,
        }
      })
//remove this later, needed for testing
      const deleteSubject = await db.subject.delete({
        where: {
          id:params.subjectId,
        },
      });
    
      
      return NextResponse.json(deleteSubject);
  
    }
    catch (error) {
      console.log('[SUBJECT_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }