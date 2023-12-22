import { Course, Mentor, Profile } from "@prisma/client";
import BrowseCourseListItem from "./browse-course-list-item";

interface BrowseCourseListProps {
  mentor: Mentor;
  courses: Course[];
  profile: Profile;
}

const BrowseCourseList = ({ mentor, courses, profile }: BrowseCourseListProps) => {
  const mentorCourses = mentor.courseIds;
  const newCourses = courses.filter((course) => mentorCourses.includes(course.id));
  
  return (
    <div className="flex flex-col gap-4">
      {newCourses &&
        newCourses.map((course) => <BrowseCourseListItem key={course.id} course={course} mentor={mentor} profile={profile} />)}
    </div>
  );
};
export default BrowseCourseList;
