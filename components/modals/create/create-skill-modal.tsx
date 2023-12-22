'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Mentor } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import CreateSkillForm from '../../skill/forms/create-skill';

interface CreateSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
}

export const CreateSkillModal: React.FC<CreateSkillModalProps> = ({
  isOpen,
  onClose,
  mentor,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Create a new Skill?"
    description="You can change any of these settings later."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    {mentor &&(<CreateSkillForm mentor={mentor} onClose={onClose}/>)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default CreateSkillModal;