import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import {v4 as uuidv4} from "uuid";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  { params }: { params: { mentorId: string } }
) {
  try {
  const user = await currentUser();
if (!user) {
  return redirectToSignIn();
}
  const body = await req.json();
 
  const {  review, rating,  profileId } = body;

  
  
  if (!rating ||!profileId ) {
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
      id: params.mentorId,
    }
  })
  
  if (!mentor) {
    return new NextResponse("Mentor doesn't exist",{ status: 400 });
  }

 
  const newReview= await db.review.create({
    data: {
      rating,
      review,
      mentorId:params.mentorId,
      profileId: checkProfile.id,
      },
    
  })
  
    await db.mentor.update({
      where: {
        id: params.mentorId,
      },
      data: {
        mentorReviewIds:{
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
  console.log('[MENTOR_REVIEW_POST]', error);
  return new NextResponse("Internal Error", {status:500});
}
}
