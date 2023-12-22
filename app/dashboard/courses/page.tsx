import { db } from "@/lib/db";
import BrowseCourseList from "./_components/browse-course-list";
import { currentProfile } from "@/lib/current-profile";

const AllCoursesPage = async () => {
  const courses = await db.course.findMany({});
  const mentors = await db.mentor.findMany({});
  const profile = await currentProfile();
 

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="font-medium text-lg">List of all Courses</h2>
      <div className="flex flex-col gap-4">
        {mentors &&
          courses &&
          profile &&
          mentors.map((mentor) => <BrowseCourseList key={mentor.id} mentor={mentor} courses={courses} profile={profile} />)}
      </div>
    </div>
  );
};
export default AllCoursesPage;
