import MentorsCardList from "@/components/mentor/card/mentors-card-list";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const MentorsPage = async () => {
  const mentors = await db.mentor.findMany({});
  const profile = await currentProfile();
  const courses = await db.course.findMany({});
  const subjects = await db.subject.findMany({});
  const skills = await db.skill.findMany({});
  const reviews = await db.review.findMany({});

  let posterIds:string[]=[];
  reviews.forEach((review)=>{
    posterIds.push(review.profileId)
  })

  const posters=await db.profile.findMany({
    where:{
      id:{
        in:posterIds
      }
    }
  });
  return (

    <div className="h-full w-full">
      {profile && <MentorsCardList mentors={mentors} courses={courses} profile={profile} subjects={subjects} skills={skills} reviews={reviews} posters={posters}/>}
    </div>

  );
};
export default MentorsPage;
