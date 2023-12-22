"use client";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';

import { Course, Mentor, Profile } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import { useRouter } from "next/navigation";

interface CourseAddButtonProps {
  mentor: Mentor;
  profile:Profile;
  course: Course;
}

const CourseAddButton: React.FC<CourseAddButtonProps> = ({ mentor, course,profile }) => {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false);
  const [add,setAdd] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const addCourse= async () => {
    try {
      setLoading(true);
      
    
      
      await axios.patch(`/api/courses/${course.id}/purchase`);
      toast.success("Course Purchase!");
      
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      setAdd(false);
      setLoading(false);
      
    }
  }
  
  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-fuchsia-500/10 flex items-center gap-2 text-fuchsia-500 hover:bg-fuchsia-500/20 hover:text-fuchsia-500"
        onClick={() => setAdd(true)}
      >
        <Edit className="h-4 w-4" />
        <span>Purchase Course</span>
      </Button>
      <AlertModal
      isOpen={add}
      loading={loading}
      onConfirm={addCourse}
      onClose={() => {setAdd(false)}}
      />
    </div>
  );
};
export default CourseAddButton;
