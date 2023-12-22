import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import Sidebar from "@/components/sidebar/sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  
  const profile = await currentProfile();
  const mentors = await db.mentor.findMany({});
  const skills = await db.skill.findMany({});
  const subjects = await db.subject.findMany({});
  const courses = await db.course.findMany({});
  const reviews = await db.review.findMany({});

  let profileIds: string[] = [];

  reviews.forEach((review) => {
    profileIds.push(review.profileId);
  });
  const profiles = await db.profile.findMany({
    where: {
      id: {
        in: profileIds,
      },
    },
  });


  return (

    <div className="pt-[3.5rem] w-full">
      <div className="h-full w-full">
        <div className="flex mt-[3.5rem] md:hidden h-full w-[15%] z-30 flex-col fixed inset-y-0">
        { profile  && ( <MobileSidebar 
          reviews={reviews}
          profile={profile}
          mentors={mentors}
          skills={skills}
          courses={courses}
          posters={profiles}/>)}
        </div>
        <div className="hidden mt-[3.5rem] md:flex h-full w-[15%] z-30 flex-col fixed inset-y-0">
        { profile  && ( 
          <Sidebar
          reviews={reviews}
          profile={profile}
          mentors={mentors}
          skills={skills}
          courses={courses}
          subjects={subjects}
          posters={profiles}
          />)}
        </div>
        <div className="md:pl-[15%] h-full w-full">{children}</div>
      </div>

    </div>
  );
};
export default DashboardLayout;
