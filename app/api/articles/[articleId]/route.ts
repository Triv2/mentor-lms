import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(
  req: Request,
  { params }: { params: { articleId: string } }
) {
  try {
    const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
    const body = await req.json();
   
    const { name,  description, estimatedTime  } = body;
    
    
    if (!name  || !description ||!estimatedTime ) {
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
    const article = await db.article.findFirst({ 
      where: {
        id: params.articleId,
      }
    });
    
    if (!article) {
      return new NextResponse("Article doesn't exist",{ status: 400 });
    }

    const section = await db.section.findFirst({ 
      where: {
        id: article.sectionId,
      }
    });
    
    if (!section) {
      return new NextResponse("Section doesn't exist",{ status: 400 });

    }
    if(section.estimatedTime && article.estimatedTime){
    let newTotalTime= (section.estimatedTime-article.estimatedTime)+estimatedTime;

      const updatedArticle = await db.article.update({
        where: {
          id:params.articleId,
        },
        data: {
          name,
          description,
          
          estimatedTime,
          mentorId: checkMentor.id,
          
          },
      });
      await db.section.update({
        where: {
          id: article.sectionId,
        },
        data: {
          
          estimatedTime: newTotalTime,
          },
      });
      
      
      return NextResponse.json(updatedArticle);}


  } catch (error) {
    console.log('[ARTICLEID_PATCH]', error);
    return new NextResponse("Internal Error", {status:500});
  }
}


export async function DELETE(
  req: Request,
   {params} :{params:{articleId:string}},
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


      const article = await db.article.findUnique({
        where: {
          id: params.articleId,
        }
      });
      if(!article) {
        return new NextResponse("Article not found",{ status: 400 });
      }
      
      const section = await db.section.findUnique({
        where: {
          id: article?.sectionId,
        }
      });
      if(!section) {
        return new NextResponse("Section not found",{ status: 400 });
      }
      
      const updatedArticleIds= section.articleIds.filter((id)=>{params.articleId===id});
      if(section.estimatedTime && article.estimatedTime){
        let newTotalTime= (section.estimatedTime-article.estimatedTime);
      await db.section.update({
        where: {
          id:section.id,
        },
        data: {
          articleIds:updatedArticleIds,
          estimatedTime: newTotalTime,
        }
      })

      const deleteArticle = await db.article.delete({
        where: {
          id:params.articleId,
        },
      });
    
      
      return NextResponse.json(deleteArticle);}
  
    }
    catch (error) {
      console.log('[ARTICLE_DELETE]', error);
      return new NextResponse("Internal Error", {status:500});
    }
  }