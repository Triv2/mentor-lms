import { Mentor, Profile } from "@prisma/client";

import StudentListItem from "./student-list-item";
import { ScrollArea } from "../../ui/scroll-area";

interface StudentListProps {
  mentor:Mentor;
  students: Profile[];
}

const StudentList = ({
  mentor,
  students,
}:StudentListProps) => {
  return (
<div>
  <ScrollArea className="h-[300px]">
    {students.map((student) => (
      <StudentListItem key={mentor.id} mentor={mentor} student={student} />
    ))}
    </ScrollArea>
</div>
  );
}
export default StudentList;