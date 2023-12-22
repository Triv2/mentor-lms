import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  { params }: { params: { subjectId: string } }
) {
  try {
  const user = await currentUser();
if (!user) {
  return redirectToSignIn();
}
  const body = await req.json();
 
  const {  review, rating,  mentorId, profileId } = body;

  
  
  if (!rating ||!profileId ||!mentorId ) {
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

  const mentor = await db.mentor.findFirst({ 
    where: {
      id: mentorId,
    }
  })
  
  if (!mentor) {
    return new NextResponse("Mentor doesn't exist",{ status: 400 });
  }

  const subject = await db.subject.findFirst({ 
    where: {
      id: params.subjectId,
    }
  })
  if(!subject) {
    return new NextResponse("Subject doesn't exist",{ status: 400 });
  }

  const newReview= await db.review.create({
    data: {
      rating,
      review,
      mentorId,
      profileId: checkProfile.id,
      subjectId: params.subjectId,
      
      },
    
  })
  await db.subject.update({
      where: {
        id: params.subjectId,
      },
      data: {
        reviewIds:{
          push: newReview.id,
        }
        },
    });
    await db.mentor.update({
      where: {
        id: mentorId,
      },
      data: {
        subjectReviewIds:{
          push: newReview.id,
        }
        },
    });
    await db.profile.update({
      where: {
        id: profileId,
      },
      data: {
        reviewIds:{
          push: newReview.id,
        }
        },
    });
  
    return NextResponse.json(newReview);


} catch (error) {
  console.log('[SUBJECT_REVIEW_POST]', error);
  return new NextResponse("Internal Error", {status:500});
}
}
