'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import AddCourseFeatureForm from '@/components/feature/forms/add-course-feature';

interface AddCourseFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  course: Course;
}

export const AddCourseFeatureModal: React.FC<AddCourseFeatureModalProps> = ({
  isOpen,
  onClose,
  mentor,
  course,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Add a new feature?"
    description="You can edit or delete any feature after it is made."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    
    {mentor &&(<AddCourseFeatureForm  course={course} onClose={onClose} />)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default AddCourseFeatureModal;