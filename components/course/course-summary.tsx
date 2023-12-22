import {  Course, Mentor, Profile } from "@prisma/client";
import Image from "next/image";

interface CourseSummaryProps {
 course: Course;
 mentor:Mentor;
}

const CourseSummary = ({
 course,
 mentor,
}:CourseSummaryProps) => {
  return (
    <div className="flex items-center flex-col justify-center rounded-t-md shadow-md">
       <div >
        {course.name &&(<Image className="rounded-full shadow-md" src={course?.imageUrl} width={100} height={100} alt={course?.name}/>)}
       </div>
      <div className="flex flex-col gap-2 px-3 py-1">
        <p>Name: {course.name}</p>
        <p>Mentor: {mentor.userName}</p>
        <p>Cost {course.cost}</p>
        <p>Description: {course.description}</p>
      </div>
    </div>
  );
}
export default CourseSummary;