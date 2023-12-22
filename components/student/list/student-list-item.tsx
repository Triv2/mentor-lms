"use client";
import { Mentor, Profile } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import StudentSummaryModal from "../../modals/summary/student-summary-modal";
import { Button } from "../../ui/button";

interface StudentListItemProps {
  mentor: Mentor;
  student: Profile;
}

const StudentListItem: React.FC<StudentListItemProps> = ({ student, mentor }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Button variant={"secondary"} onClick={() => setOpen(true)} className="w-full flex items-center gap-2 justify-start">
        <div>
          {student.imageUrl && student.name && (
            <Image className="rounded-full object-cover" src={student?.imageUrl} width={30} height={30} alt={student?.name} />
          )}
        </div>
        <h1>{student.name}</h1>
      </Button>
      <StudentSummaryModal isOpen={open} onClose={() => setOpen(false)} loading={loading} profile={student} />
    </div>
  );
};
export default StudentListItem;
