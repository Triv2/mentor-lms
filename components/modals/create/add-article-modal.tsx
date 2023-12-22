'use client'
;

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Section } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import AddCourseSectionForm from '@/components/section/forms/add-course-section';
import AddArticleForm from '@/components/article/forms/add-article';


interface AddArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  section:Section;
}

export const AddArticleModal: React.FC<AddArticleModalProps> = ({
  isOpen,
  onClose,
  mentor,
  section,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Add a new article?"
    description="You can edit or delete any section after it is made."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    
    {mentor &&(<AddArticleForm  section={section} onClose={onClose} />)}
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default AddArticleModal;