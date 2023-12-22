'use client'
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Review, Skill, Subject } from '@prisma/client';
import Image from 'next/image';
import {useState, useEffect} from'react'
import MentorSummaryModal from '../modals/summary/mentor-summary-modal';
import ReviewSummaryModal from '../modals/summary/review-summary-modal';

interface ReviewListItemProps {
  mentor:Mentor;
  profile:Profile;
  course?:Course;
  subject?:Subject;
  posters:Profile[];
  review:Review;
  onClose: () => void;
}

const ReviewListItem:React.FC<ReviewListItemProps> = (
  {
    mentor,
    profile,
    subject,
    course,
    review,
    posters,
    onClose,
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
let originalPoster:Profile=profile;


 posters.forEach((poster) => {
  if (poster.id === review.profileId) {
    originalPoster = poster;
  }
 })
 const handleClose = () => {
  setOpen(false);
  // onClose();
}

  return (
    <div>
      <Button onClick={()=>setOpen(true)} size="sm" 
        className="flex items-center justify-around rounded-none py-2 px-4 gap-1 w-full hover:scale-105 hover:dark:bg-zinc-500 hover:dark:text-blue-400 dark:bg-zinc-700">
        
        {review.rating}
        
        
        <div>
        {originalPoster.imageUrl && originalPoster.name && (
        <Image 
        className="rounded-full"
        src={originalPoster?.imageUrl} 
        width={35} 
        height={35} 
        alt={originalPoster?.name} />)}
        </div>
        <div>
          <p>{originalPoster.name}</p>
         </div>
       
      </Button>
      {course && !subject &&(
    <ReviewSummaryModal
      isOpen={open}
      onClose={handleClose}
      mentor={mentor}
      review={review}
      loading={loading}
      course={course}
      profile={profile}
      poster={originalPoster}
    />)}
    {subject && !course &&(
    <ReviewSummaryModal
    isOpen={open}
    onClose={handleClose}
    mentor={mentor}
    review={review}
    loading={loading}
    subject={subject}
    profile={profile}
    poster={originalPoster}
  />)}
    {!course && !subject &&(
    <ReviewSummaryModal
    isOpen={open}
    onClose={handleClose}
    mentor={mentor}
    review={review}
    loading={loading}
    profile={profile}
    poster={originalPoster}
  />)}
      </div>
  );
}
export default ReviewListItem;