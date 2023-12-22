import { Course, Mentor, Profile, Review, Skill, Subject } from "@prisma/client";
import MentorListItem from "./mentor-list-item";

interface MentorListProps {
  mentors:Mentor[];
  profile:Profile;
  courses:Course[];
  subjects:Subject[];
  skills:Skill[];
  reviews:Review[];
  posters:Profile[];
}

const MentorList = ({
  mentors,
  profile,
  courses,
  skills,
  subjects,
  reviews,
  posters,
}:MentorListProps) => {
  
  return (

<div className="flex flex-col gap-2">

    {mentors.map((mentor) => (
      <MentorListItem key={mentor.id} mentor={mentor} profile={profile} courses={courses} skills={skills} subjects={subjects} reviews={reviews} posters={posters}/>
    ))}
</div>
  );
}
export default MentorList;