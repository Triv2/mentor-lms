"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@nextui-org/react";
import { Course, Mentor, Profile, Review, Subject } from "@prisma/client";
// import DeleteButton from '../ui/delete-button';
import { Trash } from "lucide-react";
import ReviewSummary from "@/components/review/review-summary";

interface ReviewSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
  loading: boolean;
  mentor: Mentor;
  profile: Profile;
  poster: Profile;
  course?: Course;
  subject?: Subject;
}

export const ReviewSummaryModal: React.FC<ReviewSummaryModalProps> = ({
  isOpen,
  onClose,
  loading,
  mentor,
  review,
  profile,
  course,
  poster,
  subject,
}) => {
  return (
    <Modal
      title="Summary of Review"
      description="Edit the review or delete it."
      isOpen={isOpen}
      onClose={onClose}
    >
      {course && !subject && (
        <ReviewSummary
          mentor={mentor}
          poster={poster}
          profile={profile}
          review={review}
          course={course}
          onClose={onClose}
        />
      )}
      {!course && subject && (
        <ReviewSummary
          mentor={mentor}
          poster={poster}
          profile={profile}
          review={review}
          subject={subject}
          onClose={onClose}
        />
      )}

      {!course && !subject && (
        <ReviewSummary mentor={mentor} profile={profile} review={review} poster={poster} onClose={onClose}  />
      )}

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        <Button disabled={loading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewSummaryModal;
