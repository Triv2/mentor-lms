"use client";
import { useState, useEffect } from "react";
import { Course, Mentor, Profile, Review, Subject } from "@prisma/client";

import ReviewListSummaryModal from "../modals/summary/review-list-summary-modal";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

interface ReviewListButtonProps {

  mentor:Mentor;
  profile:Profile;
  posters:Profile[];
  subject?:Subject;
  course?:Course;
  reviews:Review[];
  onClose?: () => void;
}

const ReviewListButton:React.FC<ReviewListButtonProps> = (
  {
    mentor,
    profile,
    subject,
    course,
    reviews,
    posters,
    onClose,
  }
) => {


const [isMounted, setIsMounted] = useState(false);
const [open,setOpen] = useState(false);
const [loading,setLoading] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);


if (!isMounted) {
return null;
}
const handleClose = () => {
  setOpen(false);
  if(onClose)onClose();
}

  return (
    <div className="flex flex-col gap-1">

      <Button
        size={"sm"}
        className="w-full flex items-center ustify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 hover:text-blue-600 text-blue-600"
        onClick={() => setOpen(true)}
      >
        <Star className="w-4 h-4" />
        ({reviews.length})
      </Button>

      {course && !subject && (
        <ReviewListSummaryModal
          loading={loading}
          isOpen={open}
          onClose={() => setOpen(false)}
          mentor={mentor}
          profile={profile}
          reviews={reviews}
          course={course}
          posters={posters}
        />
      )}
      {subject && !course && (
        <ReviewListSummaryModal
          loading={loading}
          isOpen={open}
          onClose={() => setOpen(false)}
          mentor={mentor}
          profile={profile}
          reviews={reviews}
          subject={subject}
          posters={posters}
        />
      )}
      {!course && !subject && (
        <ReviewListSummaryModal
          loading={loading}
          isOpen={open}
          onClose={() => setOpen(false)}
          mentor={mentor}
          profile={profile}
          reviews={reviews}
          posters={posters}
        />
      )}
    </div>
  );
};
export default ReviewListButton;
