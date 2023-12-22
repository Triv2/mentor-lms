import { Course, Mentor, Profile } from "@prisma/client";
import CourseCardListItem from "../card/course-card-list-item";

interface CourseCardListProps {
  mentor: Mentor;
  courses: Course[];
  profile: Profile;
}

const CourseCardList = ({ mentor, courses, profile }: CourseCardListProps) => {
  const mentorCourses = mentor.courseIds;
  const newCourses = courses.filter((course) => mentorCourses.includes(course.id));
  return (
    <div className="flex flex-col gap-4">
      {newCourses &&
        newCourses.map((course) => <CourseCardListItem key={course.id} course={course} mentor={mentor} profile={profile} />)}
    </div>
  );
};
export default CourseCardList;
