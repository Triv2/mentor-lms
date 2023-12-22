"use client";

import { Tooltip } from "@nextui-org/react";
import { Course, Mentor, Profile } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import CourseSummaryModal from "../../modals/summary/course-summary-modal";
import { Button } from "../../ui/button";

interface CourseListItemProps {
  course: Course;
  mentors: Mentor[];
  profile: Profile;
}

const CourseListItem = ({ course, mentors, profile }: CourseListItemProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const mentor = mentors.find((mentor) => mentor.id === course.mentorId);

  return (
    <div className="w-full">
      <Button variant={"secondary"} onClick={() => setOpen(true)} className="w-full flex items-center gap-2 justify-start">
        <div>
          {course.imageUrl && course.name && (
            <Image className="rounded-full object-cover" src={course?.imageUrl} width={30} height={30} alt={course?.name} />
          )}
        </div>
        <h1>{course.name}</h1>
      </Button>

      {mentor && (
        <CourseSummaryModal
          isOpen={open}
          onClose={() => setOpen(false)}
          course={course}
          profile={profile}
          mentor={mentor}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CourseListItem;
