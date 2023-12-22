'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Feature, Mentor, Section } from '@prisma/client';

import toast from 'react-hot-toast';
import axios from 'axios';

import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import AddCourseFeatureForm from '@/components/feature/forms/add-course-feature';
import EditFeatureForm from '@/components/feature/forms/edit-feature';
import { AlertModal } from '../alert-modal';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EditSectionForm from '@/components/section/forms/edit-section';

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  section:Section;
}

export const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  mentor,
  section,
}) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/sections/${section.id}`);
      toast.success("Section Deleted!");
      
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      onClose();
      setLoading(false);
      
    }
  }

 

  return(
    <Modal
    title="Edit your section?"
    description="Change or delete it as you wish."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    
    {mentor &&(<EditSectionForm  section={section} onClose={onClose} />)}
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
     <Trash className="h-3 w-3"/> Delete 
    </Button>
    
      </div>

    </Modal>
  )
}

export default EditSectionModal;