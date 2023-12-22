"use client";

import { Tooltip } from "@nextui-org/react";
import { Mentor, Profile, Subject } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import SubjectSummaryModal from "../../modals/summary/subject-summary-modal";
import { Button } from "../../ui/button";

interface SubjectListItemProps {
  subject: Subject;
  mentors: Mentor[];
  profile: Profile;
}

const SubjectListItem = ({ subject, mentors, profile }: SubjectListItemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const mentor = mentors.find((mentor) => mentor.id === subject.mentorId);

  return (
    <div className="w-full">
      <Button variant={"secondary"} onClick={() => setOpen(true)} className="w-full flex items-center gap-2 justify-start">
        <div>
          {subject.imageUrl && subject.name && (
            <Image className="rounded-full object-contain" src={subject?.imageUrl} width={30} height={30} alt={subject?.name} />
          )}
        </div>

        <h1>{subject.name}</h1>
      </Button>

      {mentor && (
        <SubjectSummaryModal
          isOpen={open}
          onClose={() => setOpen(false)}
          subject={subject}
          profile={profile}
          mentor={mentor}
          loading={loading}
        />
      )}
    </div>
  );
};

export default SubjectListItem;
