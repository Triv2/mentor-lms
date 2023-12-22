import { Course, Mentor, Profile, Skill } from "@prisma/client";
import SkillCardListItem from "./skill-card-list-item";

interface SkillCardListProps {
  mentor: Mentor;
  skills: Skill[];
  profile: Profile;
}

const SkillCardList = ({ mentor, skills, profile }: SkillCardListProps) => {
  const mentorSkills = mentor.skillIds;
  const newSkills = skills.filter((skill) => mentorSkills.includes(skill.id));
  return (
    <div className="flex flex-col gap-4">
      {newSkills &&
        newSkills.map((skill) => <SkillCardListItem key={skill.id} skill={skill} mentor={mentor} profile={profile} />)}
    </div>
  );
};
export default SkillCardList;
