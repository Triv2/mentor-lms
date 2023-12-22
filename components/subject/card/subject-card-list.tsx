import { Mentor, Profile, Subject } from "@prisma/client";
import SubjectCardListItem from "./subject-card-list-item";

interface SubjectCardListProps {
  mentor: Mentor;
  subjects: Subject[];
  profile: Profile;
}

const SubjectCardList = ({ mentor, subjects, profile }: SubjectCardListProps) => {
  const mentorSubjects = mentor.subjectIds;
  const newSubjects = subjects.filter((course) => mentorSubjects.includes(course.id));
  return (
    <div className="flex flex-col gap-4">
      {newSubjects &&
        newSubjects.map((subject) => (
          <SubjectCardListItem key={subject.id} subject={subject} mentor={mentor} profile={profile} />
        ))}
    </div>
  );
};
export default SubjectCardList;
