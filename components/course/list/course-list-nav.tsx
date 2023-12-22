"use client";

import { Tooltip } from "@nextui-org/react";
import { Course, Mentor, Profile } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import CourseSummaryModal from "../../modals/summary/course-summary-modal";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface CourseListNavProps {
  course: Course;
  mentor: Mentor;
  profile: Profile;
}

const CourseListNav= ({ course, mentor, profile }: CourseListNavProps) => {
  const router=useRouter();
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
    <div className="w-full">
    {mentor.id=== profile.mentorId && (<Button variant={"secondary"} onClick={() => router.push(`/dashboard/mentors/${mentor.id}/courses/${course.id}`)} className="w-full flex items-center gap-2 justify-start">
        <div>
          {course.imageUrl && course.name && (
            <Image className="rounded-full object-cover" src={course?.imageUrl} width={30} height={30} alt={course?.name} />
          )}
        </div>
        <h1>{course.name}</h1>
      </Button>)
}
{mentor.id!== profile.mentorId && (<Button variant={"secondary"} onClick={() => router.push(`/dashboard/students/${course.id}`)} className="w-full flex items-center gap-2 justify-start">
        <div>
          {course.imageUrl && course.name && (
            <Image className="rounded-full object-cover" src={course?.imageUrl} width={30} height={30} alt={course?.name} />
          )}
        </div>
        <h1>{course.name}</h1>
      </Button>)
}
    </div>
  );
};

export default CourseListNav;
