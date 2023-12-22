"use client";
import { Course, Mentor, Profile } from "@prisma/client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CourseEditButton from "../buttons/course-edit-button";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Folder, Text } from "lucide-react";

interface CourseCardListItemProps {
  course: Course;
  mentor: Mentor;
  profile: Profile;
}

const CourseCardListItem: React.FC<CourseCardListItemProps> = ({ course, mentor, profile }) => {
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
        <p className="scroll-m-20 text-2xl font-semibold tracking-tight">Name: {course.name}</p>
        <p>Mentor: {mentor.userName}</p>
        <p>Cost : ${course.cost}</p>
        <p className="italic">Description: {course.description}</p>
      </div>

      <div className="flex flex-col gap-2">
        {mentor.id == profile.mentorId && (
          <Button
            className="bg-purple-500/10 text-purple-500 flex items-center gap-2 hover:bg-purple-500/20 hover:text-purple-500"
            onClick={() => router.push(`/dashboard/mentors/${mentor.id}/courses/${course.id}`)}
          >
            <Folder className="h-4 w-4" />
            <span>Manage Course</span>
          </Button>
        )}
        {mentor.id !== profile.mentorId && (
          <Button
          className=" flex items-center gap-2 bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:text-sky-500"
          onClick={() => router.push(`/dashboard/mentors/${mentor.id}/courses/${course.id}`)}
        >
          <Text className="h-4 w-4" />
          <span>View Course</span>
        </Button>
        )}
        {mentor.id === profile.mentorId && <CourseEditButton mentor={mentor} course={course} />}
      </div>
    </Card>
  );
};
export default CourseCardListItem;
