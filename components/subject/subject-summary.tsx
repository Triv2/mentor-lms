import {  Course, Mentor, Profile, Subject } from "@prisma/client";
import Image from "next/image";

interface SubjectSummaryProps {
 subject: Subject;
 mentor:Mentor;
}

const SubjectSummary = ({
 subject,
 mentor,
}:SubjectSummaryProps) => {
  return (
    <div className="flex items-center flex-col justify-center rounded-t-md shadow-md">
       <div >
        {subject.name &&(<Image className="rounded-full shadow-md" src={subject?.imageUrl} width={100} height={100} alt={subject?.name}/>)}
       </div>
      <div className="flex flex-col gap-2 px-3 py-1">
        <p>Name: {subject.name}</p>
        <p>Mentor: {mentor.userName}</p>
        <p>Cost {subject.cost}</p>
        <p>Description: {subject.description}</p>
      </div>
    </div>
  );
}
export default SubjectSummary;