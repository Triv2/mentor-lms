"use client";
import { useState, useEffect } from "react";
import { Course, Mentor, Profile, Subject } from "@prisma/client";
import CreateReviewModal from "../modals/create/create-review-modal";
import { Button } from "../ui/button";
import { Star } from "lucide-react";

interface CreateReviewButtonProps {
  mentor: Mentor;
  profile: Profile;
  subject?: Subject;
  course?: Course;
}

const CreateReviewButton: React.FC<CreateReviewButtonProps> = ({ mentor, profile, subject, course }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [create, setCreate] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col w-full">
      <Button
        onClick={() => setCreate(true)}
        className="w-full flex items-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 hover:text-blue-600 text-blue-600"
      >
        <Star className="w-4 h-4" />
        <span>Review</span>
      </Button>
      {course && !subject &&(
        <CreateReviewModal
          isOpen={create}
          onClose={() => {
            setCreate(false);
          }}
          mentor={mentor}
          course={course}
          profile={profile}
        />
      )}
      {subject && !course &&(
        <CreateReviewModal
          isOpen={create}
          onClose={() => {
            setCreate(false);
          }}
          mentor={mentor}
          subject={subject}
          profile={profile}
        />
      )}
      {!course && !subject && (
        <CreateReviewModal
          isOpen={create}
          onClose={() => {
            setCreate(false);
          }}
          mentor={mentor}
          course={course}
          profile={profile}
        />
      )}
    </div>
  );
};
export default CreateReviewButton;
