import { Course, Mentor, Profile } from "@prisma/client";
import CourseListItem from "./course-list-item";
import CourseListNav from "./course-list-nav";

interface CourseListProps {
  courses:Course[];
  mentors:Mentor[];
  profile:Profile;
}

const CourseList = ({
  courses,
  mentors,
  profile,
}:CourseListProps) => {
  return (
<div className="flex flex-col items-center justify-center gap-1">
  {courses && courses.map((course) => (
    <CourseListNav key={course.id} course={course} mentor={mentors[0]} profile={profile} />
  ))}
</div>
  );
}
export default CourseList;