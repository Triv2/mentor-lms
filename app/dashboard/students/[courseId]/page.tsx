import CourseSidebar from "@/components/sidebar/course-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider,  } from "@nextui-org/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const StudentsCourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const profile =await currentProfile();
  const course = await db.course.findUnique({
    where:{
      id:params.courseId,
    }
  })
  const mentor = await db.mentor.findUnique({
    where:{
      id:course?.mentorId,
    }
  });
  const sections = await db.section.findMany({
    where:{
      courseId:params.courseId,
    }
  })
  const articles = await db.article.findMany({
    where:{
      sectionId:{
        in:sections.map((section) => section.id)
      }
    }
  })
   
  return (
<div className="min-h-screen h-auto flex flex-col items-center">
  <div className="text-3xl p-2">{course?.name}</div>
  <Divider/>
  <div className="flex w-full">
    <div className="p-5 w-[50%] border-r-1 min-h-[20rem]">
  {profile && mentor && course && (
<CourseSidebar profile={profile} mentor={mentor} course={course} sections={sections} articles={articles}/>)}
    </div>
<div className="w-full px-2">Main Content</div>
    </div>
    <div className="flex w-full flex-col">
    <Tabs defaultValue="account" className="w-full">
    <TabsList className="w-full flex justify-evenly">
      <TabsTrigger value="updates">Updates</TabsTrigger>
      <TabsTrigger value="summary">Summary</TabsTrigger>
      <TabsTrigger value="tools">Tools</TabsTrigger>
      <TabsTrigger value="reviews">Reviews</TabsTrigger>
    </TabsList>
    <TabsContent value="updates">Make changes to your account here.</TabsContent>
    <TabsContent value="summary">Change your password here.</TabsContent>
    <TabsContent value="tools">Make changes to your account here.</TabsContent>
    <TabsContent value="reviews">Change your password here.</TabsContent>
  </Tabs>
    </div>  


</div>
  );
}
export default StudentsCourseIdPage;