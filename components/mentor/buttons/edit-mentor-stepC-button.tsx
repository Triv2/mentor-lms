"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Course, Mentor, Profile } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";
import EditStepAModal from "@/components/modals/edit/mentor/edit-stepA-modal";
import EditStepCModal from "@/components/modals/edit/mentor/edit-stepC-modal";

interface EditMentorStepCButtonProps {
  mentor: Mentor;
  profile: Profile;
}

const EditMentorStepCButton: React.FC<EditMentorStepCButtonProps> = ({ mentor, profile }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-fuchsia-500/10 flex items-center gap-2 text-fuchsia-500 hover:bg-fuchsia-500/20 hover:text-fuchsia-500"
        onClick={() => setEdit(true)}
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </Button>

      <EditStepCModal
        isOpen={edit}
        onClose={() => {
          setEdit(false);
        }}
        mentor={mentor}
        profile={profile}
      />
    </div>
  );
};
export default EditMentorStepCButton;
