import { Mentor, Profile, Subject } from "@prisma/client";
import SubjectListItem from "./subject-list-item";


interface SubjectListProps {
  subjects:Subject[];
  mentors:Mentor[];
  profile:Profile;
}

const SubjectList = ({
  subjects,
  mentors,
  profile,
}:SubjectListProps) => {
  return (
<div className="flex flex-col items-center justify-center gap-1">
  {subjects && subjects.map((subject) => (
    <SubjectListItem key={subject.id} subject={subject} mentors={mentors} profile={profile} />
  ))}
</div>
  );
}
export default SubjectList;