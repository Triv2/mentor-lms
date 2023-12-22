
'use client'
import { Button } from "../../ui/button";
import { Course, Mentor, Profile, Review, Skill, Subject } from '@prisma/client';
import Image from 'next/image';
import {useState, useEffect} from'react'
import MentorSummaryModal from '../../modals/summary/mentor-summary-modal';

interface MentorListItemProps {
  mentor:Mentor;
  profile:Profile;
  courses:Course[];
  subjects:Subject[];
  skills:Skill[];
  reviews:Review[];
  posters:Profile[];
}

const MentorListItem:React.FC<MentorListItemProps> = (
  {
    mentor,
    profile,
    courses,
    subjects,
    skills,
    reviews,
    posters,
  }
) => {

const [isMounted, setIsMounted] = useState(false);
const [open,setOpen] = useState(false);
const [loading, setLoading] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
let mentorCourses:Course[]=[];
let mentorSubjects:Subject[]=[];
let mentorSkills:Skill[]=[];
let mentorReviews:Review[]=[];
subjects.forEach((subject) => {
  if (subject.mentorId === mentor.id) {
    mentorSubjects.push(subject);
  }
});

skills.forEach((skill) => {
  if (skill.mentorId === mentor.id) {
    mentorSkills.push(skill);
  }
});
courses.forEach((course) => {
  if (course.mentorId === mentor.id){
    mentorCourses.push(course);
  }
});
reviews.forEach((review) => {
  if (review.mentorId === mentor.id) {
    mentorReviews.push(review);
  }
});
let posterIds:string[] = [];
mentorReviews.forEach((review) => {
  posterIds.push(review.profileId);
});

let mentorPosters: Profile[] = [];
posters.forEach((poster) => {
  if (posterIds.includes(poster.id)) {
    mentorPosters.push(poster);
  }
});

  return (
    <div className="w-full">
      <Button onClick={()=>setOpen(true)} variant={"secondary"} className="w-full px-5 flex items-center gap-2 justify-start">
        <div className="flex w-full gap-2 items-center ">
          <Image alt="logo" src={mentor.imageUrl as string} height={30} width={30} className="rounded-full object-cover" />
          <span>{mentor.userName}</span>
        </div>
      </Button>
      {mentorCourses &&(
 <MentorSummaryModal
      reviews={mentorReviews}
      subjects={mentorSubjects}
      skills={mentorSkills}
      isOpen={open}
      onClose={()=>setOpen(false)}
      loading={loading}
      mentor={mentor}
      profile={profile}
      courses={mentorCourses}
      posters={mentorPosters}
      /> )}

    </div>



  );
}
export default MentorListItem;