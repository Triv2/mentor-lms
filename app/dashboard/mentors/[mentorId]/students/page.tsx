import StudentList from "@/components/student/list/student-list";
import { Card } from "@/components/ui/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const StudentManagementPage = async ({ params }: { params: { mentorId: string } }) => {
  const profile = await currentProfile();

  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });

  if (!mentor) {
    return { notFound: true };
  }

  const subscribedStudents = await db.profile.findMany({
    where: {
      id: {
        in: mentor.subscribedStudentIds,
      },
    },
  });

  const followingStudents = await db.profile.findMany({
    where: {
      id: {
        in: mentor.followingStudentIds,
      },
    },
  });
  const purchasedStudents = await db.profile.findMany({
    where: {
      id: {
        in: mentor.purchasedCourseStudentIds,
      },
    },
  });

  return (
    <div className="flex md:flex-row flex-col items-center justify-center w-full gap-4 p-4">
      <Card className="flex flex-col p-4 gap-2 w-full">
        <h1 className="font-medium text-lg">Following Students</h1>
        <StudentList mentor={mentor} students={followingStudents} />
      </Card>

      <Card className="flex flex-col p-4 gap-2 w-full">
        <h1 className="font-medium text-lg">Subscribed Students</h1>
        <StudentList mentor={mentor} students={subscribedStudents} />
      </Card>

      <Card className="flex flex-col p-4 gap-2 w-full">
        <h1 className="font-medium text-lg">Students that have purchased a course</h1>
        <StudentList mentor={mentor} students={purchasedStudents} />
      </Card>
    </div>
  );
};
export default StudentManagementPage;
