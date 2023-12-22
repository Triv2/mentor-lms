"use client";
import { useState, useEffect } from "react";
import { Mentor, Subject } from "@prisma/client";

import EditSubjectModal from "../../modals/edit/edit-subject-modal";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";

interface SubjectEditButtonProps {
  mentor: Mentor;
  subject: Subject;
}

const SubjectEditButton: React.FC<SubjectEditButtonProps> = ({ mentor, subject }) => {
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
        className="bg-teal-500/10 text-teal-500 flex items-center gap-2 hover:bg-teal-500/20 hover:text-teal-500"
        onClick={() => setEdit(true)}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>

      <EditSubjectModal
        isOpen={edit}
        onClose={() => {
          setEdit(false);
        }}
        mentor={mentor}
        subject={subject}
      />
    </div>
  );
};
export default SubjectEditButton;
