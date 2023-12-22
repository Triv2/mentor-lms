'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Skill } from '@prisma/client';

import { Trash } from 'lucide-react';

import { AlertModal } from '../alert-modal';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import EditCourseForm from '../../course/forms/edit-course';
import EditSkillForm from '../../skill/forms/edit-skill';

interface EditSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  skill: Skill;
}

export const EditSkillModal: React.FC<EditSkillModalProps> = ({
  isOpen,
  onClose,
  mentor,
  skill,
}) => {

  const router = useRouter()
  
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/skills/${skill.id}`,)
      toast.success("Skill Deleted!");
      
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.push("/dashboard")
    }
  }

  return(
    <Modal
    title="Edit your Skill?"
    description="Change any of your skill settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      {/* Insert Edit Class Form */}
      
    <EditSkillForm skill={skill} onClose={onClose}/>
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
     <Trash className="h-3 w-3"/> Delete Skill
    </Button>
      </div>

    </Modal>
  )
}

export default EditSkillModal;