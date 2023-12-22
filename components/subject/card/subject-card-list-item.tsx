"use client";

import { Mentor, Profile, Subject } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import SubjectEditButton from "../buttons/subject-edit-button";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Folder } from "lucide-react";

interface SubjectCardListItemProps {
  subject: Subject;
  mentor: Mentor;
  profile: Profile;
}

const SubjectCardListItem: React.FC<SubjectCardListItemProps> = ({ subject, mentor, profile }) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="flex justify-between relative w-full h-full items-center p-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Name: {subject.name}</p>
        <p>Mentor: {mentor.userName}</p>
        <p>Cost {subject.cost}</p>
        <p>Description: {subject.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {mentor.id === profile.mentorId && (
          <Button
            className="bg-emerald-500/10 text-emerald-500 flex items-center gap-2 hover:bg-emerald-500/20 hover:text-emerald-500"
            onClick={() => router.push(`/dashboard/mentors/${mentor.id}/subjects/${subject.id}`)}
          >
            <Folder className="w-4 h-4" />
            Manage Subject
          </Button>
        )}
        {mentor.id === profile.mentorId && <SubjectEditButton mentor={mentor} subject={subject} />}
      </div>
    </Card>
  );
};
export default SubjectCardListItem;
