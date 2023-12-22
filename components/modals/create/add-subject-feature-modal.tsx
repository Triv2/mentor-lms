'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Subject } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import AddCourseFeatureForm from '@/components/feature/forms/add-course-feature';
import AddSubjectFeatureForm from '@/components/feature/forms/add-subject-feature';

interface AddSubjectFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  subject: Subject;
}

export const AddSubjectFeatureModal: React.FC<AddSubjectFeatureModalProps> = ({
  isOpen,
  onClose,
  mentor,
  subject,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Add a new feature?"
    description="You can edit or delete any feature after it is made."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    
    {mentor &&(<AddSubjectFeatureForm  subject={subject} onClose={onClose} />)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default AddSubjectFeatureModal;