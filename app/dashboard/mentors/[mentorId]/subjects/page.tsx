import SubjectCardList from "@/components/subject/card/subject-card-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MentorSubjectsPage = async ({ params }: { params: { mentorId: string } }) => {
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
  const subjects = await db.subject.findMany({
    where: {
      id: {
        in: mentor.subjectIds,
      },
    },
  });
  const profile = await currentProfile();

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="font-medium text-lg">List of all Guides</h2>
      <div className="flex flex-col gap-4">
        {profile && <SubjectCardList mentor={mentor} subjects={subjects} profile={profile} />}
      </div>
    </div>
  );
};
export default MentorSubjectsPage;
