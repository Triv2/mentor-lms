import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { featureId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }
    const body = await req.json();

    const { title, description } = body;

    if (!title || !description) {
      return new NextResponse("Inputs required", { status: 400 });
    }

    const checkProfile = await db.profile.findFirst({
      where: {
        clerkId: user.id,
      },
    });

    if (!checkProfile) {
      return new NextResponse("Profile doesn't exist", { status: 400 });
    }

    const checkMentor = await db.mentor.findFirst({
      where: {
        clerkId: user.id,
      },
    });

    if (!checkMentor) {
      return new NextResponse("Mentor doesn't exist", { status: 400 });
    }

    const feature = await db.feature.findUnique({
      where: {
        id: params.featureId,
      },
    });
    if (!feature) {
      return new NextResponse("Feature doesn't exist", { status: 400 });
    }

    const updatedFeature = await db.feature.update({
      where: {
        id: params.featureId,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(updatedFeature);
  } catch (error) {
    console.log("[FEATUREID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { featureId: string } }
  ) {
    try{
    const user = await currentUser();
    if (!user) {
      return null;
    }
    const profile = await db.profile.findFirst({
      where: {
        clerkId: user.id,
      },
    });
    if (!profile) {
      return new NextResponse("Profile not found", { status: 400 });
    }
    const mentor = await db.mentor.findFirst({
      where: {
        clerkId: user.id,
      },
    });
    if (!mentor) {
      return new NextResponse("Mentor not found", { status: 400 });
    }

    
    const feature = await db.feature.findUnique({
      where: {
        id: params.featureId,
      },
    });
    if (!feature) {
      return new NextResponse("Section doesn't exist", { status: 400 });
    }
    if(feature.courseId){
      const course = await db.course.findUnique({
        where: {
          id: feature.courseId,
        },
      });
      if (!course) {
        return new NextResponse("Course doesn't exist", { status: 400 });
      }
    const updatedFeatureIds = course.featureIds.filter((id) => {
      params.featureId === id;
    });

     await db.course.update({
      where: {
        id: mentor?.id,
      },
      data: {
        featureIds: updatedFeatureIds,
      },
    });
  } else if (feature.subjectId){
    const subject = await db.subject.findUnique({
      where: {
        id: feature.subjectId,
      },
    });
    if (!subject) {
      return new NextResponse("Course doesn't exist", { status: 400 });
    }
  const updatedFeatureIds = subject.featureIds.filter((id) => {
    params.featureId === id;
  });

   await db.subject.update({
    where: {
      id: mentor?.id,
    },
    data: {
      featureIds: updatedFeatureIds,
    },
  });

  }
    const deleteFeature = await db.feature.delete({
      where: {
        id: params.featureId,
      },
    });

    return NextResponse.json(deleteFeature);
  } catch (error) {
    console.log("[FEATURE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
