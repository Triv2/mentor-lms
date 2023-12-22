'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Subject } from '@prisma/client';

import { Trash } from 'lucide-react';

import { AlertModal } from '../alert-modal';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import EditCourseForm from '../../course/forms/edit-course';
import EditSubjectForm from '@/components/subject/forms/edit-subject';

interface EditSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  subject: Subject;
}

export const EditSubjectModal: React.FC<EditSubjectModalProps> = ({
  isOpen,
  onClose,
  mentor,
  subject,
}) => {

  const router = useRouter()
  
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/subjects/${subject.id}`,)
      toast.success("Subject Deleted!");
      
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.push("/dashboard")
    }
  }

  return(
    <Modal
    title="Edit your Subject?"
    description="Change any of your subject settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      
     
      
    <EditSubjectForm subject={subject} onClose={onClose}/>
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
     <Trash className="h-3 w-3"/> Delete Subject
    </Button>
      </div>

    </Modal>
  )
}

export default EditSubjectModal;