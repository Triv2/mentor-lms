"use client";
import { useState, useEffect } from "react";
import { Mentor, Profile, Review } from "@prisma/client";

import EditReviewModal from "../modals/edit/edit-review-modal";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

interface EditReviewButtonProps {
  mentor: Mentor;
  profile: Profile;
  onClose?: () => void;
  review: Review;
}

const EditReviewButton: React.FC<EditReviewButtonProps> = ({ profile, review, onClose }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className="flex flex-col gap-2">
      {profile.id === review.profileId && (
        <Button
          className="flex items-center gap-2 bg-purple-600/10 text-purple-600 hover:bg-purple-600/10"
          onClick={() => setOpen(true)}
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      )}

      {onClose && <EditReviewModal isOpen={open} onClose={handleClose} review={review} />}
      {!onClose && <EditReviewModal isOpen={open} onClose={() => setOpen(false)} review={review} />}
    </div>
  );
};
export default EditReviewButton;
