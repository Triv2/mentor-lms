import CourseSidebar from "@/components/sidebar/course-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider } from "@nextui-org/react";



const StudentsSubjectIdPage = async ({ params }: { params: { subjectId: string } }) => {
  const profile =await currentProfile();
  
  const subject = await db.subject.findUnique({
    where:{
      id:params.subjectId,
    }
  })
  
   
  return (
<div className="min-h-screen h-auto flex flex-col items-center">
  <div className="text-3xl p-2">{subject?.name}</div>
  <Divider/>
  <div className="flex w-full">
    <div className="p-5 w-[50%] border-r-1 h-full">
  {/* {profile && mentor && subject && (
<CourseSidebar profile={profile} mentor={mentor} course={course} sections={sections} articles={articles}/>)} */}
    </div>
<div className="w-full px-2">Main Content</div>
    </div>


</div>
  );
}
export default StudentsSubjectIdPage;