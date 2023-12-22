'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import AddCourseSectionForm from '@/components/section/forms/add-course-section';


interface AddCourseSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  course: Course;
}

export const AddCourseSectionModal: React.FC<AddCourseSectionModalProps> = ({
  isOpen,
  onClose,
  mentor,
  course,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Add a new section?"
    description="You can edit or delete any section after it is made."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    
    {mentor &&(<AddCourseSectionForm  course={course} onClose={onClose} />)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default AddCourseSectionModal;