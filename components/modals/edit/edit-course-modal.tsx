'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile } from '@prisma/client';

import { Trash } from 'lucide-react';

import { AlertModal } from '../alert-modal';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import EditCourseForm from '../../course/forms/edit-course';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  course: Course;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  isOpen,
  onClose,
  mentor,
  course,
}) => {

  const router = useRouter()
  const params = useParams()
  
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/courses/${course.id}`);
      toast.success("Course Deleted!");
      
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      setLoading(false);
      router.push("/dashboard")
    }
  }

  return(
    <Modal
    title="Edit your Course?"
    description="Change any of your course settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      
    
      
    <EditCourseForm course={course} onClose={onClose}/>
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        <AlertModal
      isOpen={isDeleting}
      loading={loading}
      onConfirm={onDelete}
      onClose={() => {setIsDeleting(false)}}
      />
    <Button className="bg-red-500" onClick={()=>setIsDeleting(true)} >
     <Trash className="h-3 w-3"/> Delete Course
    </Button>
      </div>

    </Modal>
  )
}

export default EditCourseModal;