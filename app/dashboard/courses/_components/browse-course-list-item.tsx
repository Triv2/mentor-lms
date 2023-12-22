"use client";
import { Course, Mentor, Profile } from "@prisma/client";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Text } from "lucide-react";

interface BrowseCourseListItemProps {
  course: Course;
  mentor: Mentor;
  profile: Profile;
}

const BrowseCourseListItem: React.FC<BrowseCourseListItemProps> = ({ course, mentor, profile }) => {
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
      <span className="scroll-m-20 text-2xl font-semibold tracking-tight">{course.name}</span>

      <p className="italic">{course.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:text-purple-500">
            {mentor.userName}
          </Button>
          <Button className="flex items-center gap-2 bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:text-purple-500">
            $ {course.cost}
          </Button>
        </div>

        <Button
          className=" flex items-center gap-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:text-sky-500"
          onClick={() => router.push(`/dashboard/mentors/${mentor.id}/courses/${course.id}`)}
        >
          <ArrowRight className="h-4 w-4" />
          {/* <span>View Course</span> */}
        </Button>
      </div>
    </Card>
  );
};
export default BrowseCourseListItem;
