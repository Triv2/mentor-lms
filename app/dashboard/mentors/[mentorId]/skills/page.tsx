import SkillCardList from "@/components/skill/skill-card-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";

const MentorSkillsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirectToSignIn();
  }
  const profile = await currentProfile();
  const mentor = await db.mentor.findFirst({
    where: {
      clerkId: userId,
    },
  });
  const skills = await db.skill.findMany({
    where: {
      mentorId: mentor?.id,
    },
  });

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="font-medium text-lg">List of all Skills</h2>
      <div className="flex flex-col gap-4">
        {profile && mentor && <SkillCardList mentor={mentor} skills={skills} profile={profile} />}
      </div>
    </div>
  );
};
export default MentorSkillsPage;
