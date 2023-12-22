import { Course, Mentor, Profile } from "@prisma/client";
import StudentCourseListItem from "./student-course-list-item";


interface StudentCourseListProps {
  mentor: Mentor;
  courses: Course[];
  profile: Profile;
}

const StudentCourseList = ({ mentor, courses, profile }: StudentCourseListProps) => {
  const studentCourses = profile.courseIds;
  const newCourses = courses.filter((course) => studentCourses.includes(course.id));
  
  return (
    <div className="flex flex-col gap-4">
      {newCourses &&
        newCourses.map((course) => <StudentCourseListItem key={course.id} course={course} mentor={mentor} profile={profile} />)}
    </div>
  );
};
export default StudentCourseList;
