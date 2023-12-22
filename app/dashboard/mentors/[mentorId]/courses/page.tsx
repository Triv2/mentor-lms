import CourseCardList from "@/components/course/card/course-card-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MentorCoursesPage = async ({ params }: { params: { mentorId: string } }) => {
  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });

  if (!mentor) {
    return {
      notFound: true,
    };
  }
  const courses = await db.course.findMany({
    where: {
      id: {
        in: mentor.courseIds,
      },
    },
  });
  const profile = await currentProfile();

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="font-medium text-lg"> Courses</h2>
      <div className="flex flex-col gap-4">
        {profile && <CourseCardList mentor={mentor} courses={courses} profile={profile} />}
      </div>
    </div>
  );
};
export default MentorCoursesPage;
