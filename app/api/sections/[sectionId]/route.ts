import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return redirectToSignIn();
    }
    const body = await req.json();

    const { name, description, imageUrl, videoUrl } = body;

    if (!name || !description) {
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

    const updatedSection = await db.section.update({
      where: {
        id: params.sectionId,
      },
      data: {
        name,
        description,
        imageUrl,
        videoUrl,
      },
    });

    return NextResponse.json(updatedSection);
  } catch (error) {
    console.log("[SECTIONID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sectionId: string } }
) {
  try {
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

    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
    });
    if (!section) {
      return new NextResponse("Section doesn't exist", { status: 400 });
    }
    if (section.courseId) {
      const course = await db.course.findUnique({
        where: {
          id: section.courseId,
        },
      });
      if (!course) {
        return new NextResponse("Course doesn't exist", { status: 400 });
      }
      const updatedSectionIds= course.sectionIds.filter((id)=>{params.sectionId===id});
       await db.course.update({
        where: {
          id: section.courseId,
        },
        data: {
          sectionIds: updatedSectionIds,
        },
      });
    } else if (section.subjectId) {
      const subject = await db.subject.findUnique({
        where: {
          id: section.subjectId,
        },
      });
      if (!subject) {
        return new NextResponse("Subject doesn't exist", { status: 400 });
      }
      const updatedSectionIds= subject.sectionIds.filter((id)=>{params.sectionId===id});
       await db.subject.update({
        where: {
          id: section.subjectId,
        },
        data: {
          sectionIds: updatedSectionIds,
        },
      });
    }


    await db.article.deleteMany({
      where: {
        sectionId: params.sectionId,
      },
    });
    await db.feature.deleteMany({
      where: {
        sectionId: params.sectionId,
      },
    });
    const deleteSection = await db.section.delete({
      where: {
        id: params.sectionId,
      },
    });

    return NextResponse.json(deleteSection);
  } catch (error) {
    console.log("[SECTION_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
