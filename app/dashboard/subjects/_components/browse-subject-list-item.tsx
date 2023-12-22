"use client";
import { Mentor, Profile, Subject } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface BrowseSubjectListItemProps {
  subject: Subject;
  mentor: Mentor;
  profile: Profile;
}

const BrowseSubjectListItem: React.FC<BrowseSubjectListItemProps> = ({ subject, mentor, profile }) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="w-full h-fit flex flex-col p-4 gap-4">
      <p className="scroll-m-20 text-2xl font-semibold tracking-tight">{subject.name}</p>

      <p className="italic">Description: {subject.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-2">
            <Button className="flex items-center gap-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:text-purple-500">
              {mentor.userName}
            </Button>
            <Button className="flex items-center gap-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:text-purple-500">
              $ {subject.cost}
            </Button>
          </div>
        </div>

        <Button
          className="bg-emerald-500/10 flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-500"
          onClick={() => router.push(`/dashboard/mentors/${mentor.id}/subjects/${subject.id}`)}
        >
          <ExternalLink className="h-4 w-4" />
          View Guide
        </Button>
      </div>
    </Card>
  );
};
export default BrowseSubjectListItem;
