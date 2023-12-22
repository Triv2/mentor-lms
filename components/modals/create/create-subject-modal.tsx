'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Mentor } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import CreateSubjectForm from '@/components/subject/forms/create-subject';

interface CreateSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
}

export const CreateSubjectModal: React.FC<CreateSubjectModalProps> = ({
  isOpen,
  onClose,
  mentor,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Create a new Subject?"
    description="You can change any of these settings later."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    {mentor &&(<CreateSubjectForm mentor={mentor} onClose={onClose}/>)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default CreateSubjectModal;