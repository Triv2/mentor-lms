"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";
import { Course, Mentor, Profile, Review, Subject } from "@prisma/client";
// import DeleteButton from '../ui/delete-button';
import { Trash } from "lucide-react";
import ReviewSummary from "@/components/review/review-summary";
import ReviewList from "@/components/review/review-list";

interface ReviewListSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  loading: boolean;
  mentor: Mentor;
  profile: Profile;
  posters: Profile[];
  course?: Course;
  subject?: Subject;
}

export const ReviewListSummaryModal: React.FC<ReviewListSummaryModalProps> = ({
  isOpen,
  onClose,
  loading,
  mentor,
  reviews,
  profile,
  course,
  posters,
  subject,
}) => {
  return (
    <Modal
      title="List of Reviews"
      description="Edit the review or delete it."
      isOpen={isOpen}
      onClose={onClose}
    >
      
      {course && !subject &&(
    <ReviewList mentor={mentor} profile={profile} reviews={reviews} course={course} posters={posters} onClose={onClose}/>
    )}
    {subject && !course &&(
    <ReviewList mentor={mentor} profile={profile} reviews={reviews} subject={subject} posters={posters} onClose={onClose}/>
    )}
    {!course && !subject &&(
      <ReviewList mentor={mentor} profile={profile} reviews={reviews} posters={posters} onClose={onClose} />
   )}

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewListSummaryModal;
