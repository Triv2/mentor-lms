"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Course, Mentor } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";

interface CourseEditButtonProps {
  mentor: Mentor;
  course: Course;
}

const CourseEditButton: React.FC<CourseEditButtonProps> = ({ mentor, course }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [editCourse, setEditCourse] = useState(false);

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
        onClick={() => setEditCourse(true)}
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </Button>

      <EditCourseModal
        isOpen={editCourse}
        onClose={() => {
          setEditCourse(false);
        }}
        mentor={mentor}
        course={course}
      />
    </div>
  );
};
export default CourseEditButton;
