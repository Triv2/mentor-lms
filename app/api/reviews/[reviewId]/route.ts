import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { reviewId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { rating,
           review,
            mentorId, 
            profileId, 
             } = body;
  
    
    
    if (!rating || !mentorId ||!profileId) {
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
        id: mentorId,
      }
    })

    if (!checkMentor) {
      return new NextResponse("Mentor doesn't exist",{ status: 400 });
    }

      const updatedReview = await db.review.update({
        where: {
          id:params.reviewId,
        },
        data: {
          rating,
          review,
        },
      });
      
        
      
      
      return NextResponse.json(updatedReview);


  } catch (error) {
    console.log('[REVIEWID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: { reviewId: string } }
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
     

      const review = await db.review.findUnique({
        where: {
          id:params.reviewId,
        },
      })

      if(!review) {
        return new NextResponse("Review not found",{ status: 400 });
      }
      const mentor = await db.mentor.findUnique({
        where: {
          id:review.mentorId,
        },
      })
      if (!mentor) {
        return new NextResponse("Mentor not found",{ status: 400 });
      }


      if(review.subjectId !== "" && review.subjectId!== null){
        const updatedReviewIds= mentor.subjectReviewIds.filter((id)=>{params.reviewId===id});
        await db.mentor.update({
          where: {
            id:mentor?.id,
          },
          data: {
            subjectReviewIds:updatedReviewIds,
          }
        })
        await db.subject.update({
          where: {
            id:review.subjectId,
          },
          data: {
            reviewIds:updatedReviewIds,
          }
        })
      

      const deleteReview = await db.review.delete({
        where: {
          id:params.reviewId,
        },
      });
    
      
      return NextResponse.json(deleteReview); 
    }
      else if(review.courseId !== "" && review.courseId!== null){
        const updatedReviewIds= mentor.courseReviewIds.filter((id)=>{params.reviewId===id});
        await db.mentor.update({
          where: {
            id:mentor?.id,
          },
          data: {
            courseReviewIds:updatedReviewIds,
          }
        })
        await db.course.update({
          where: {
            id:review.courseId,
          },
          data: {
            reviewIds:updatedReviewIds,
          }
        })
      

      const deleteReview = await db.review.delete({
        where: {
          id:params.reviewId,
        },
      });
    
      
      return NextResponse.json(deleteReview); 
    }
      else if(!review.courseId && !review.subjectId){
        const updatedReviewIds= mentor.mentorReviewIds.filter((id)=>{params.reviewId===id});
         await db.mentor.update({
          where: {
            id:mentor?.id,
          },
          data: {
            mentorReviewIds:updatedReviewIds,
          }
        })
      

      const deleteReview = await db.review.delete({
        where: {
          id:params.reviewId,
        },
      });
    
      
      return NextResponse.json(deleteReview); }
      }  catch (error) {
      console.log('[REVIEW_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }