import { Course, Mentor, Profile, Subject } from "@prisma/client";
import BrowseSubjectListItem from "./browse-subject-list-item";

interface BrowseSubjectListProps {
  mentor: Mentor;
  subjects: Subject[];
  profile: Profile;
}

const BrowseSubjectList = ({ mentor, subjects, profile }: BrowseSubjectListProps) => {
  const mentorSubjects = mentor.subjectIds;
  const newSubjects = subjects.filter((subject) => mentorSubjects.includes(subject.id));
  return (
    <div className="flex flex-col gap-4">
      {newSubjects &&
        newSubjects.map((subject) => (
          <BrowseSubjectListItem key={subject.id} subject={subject} mentor={mentor} profile={profile} />
        ))}
    </div>
  );
};
export default BrowseSubjectList;
