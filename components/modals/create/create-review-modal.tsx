'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Review, Subject } from '@prisma/client';


import { useState } from 'react';
import CreateCourseForm from '../../course/forms/create-course';
import CreateSkillForm from '../../skill/forms/create-skill';
import CreateCourseReviewForm from '@/components/review/forms/create-course-review';
import CreateSubjectReviewForm from '@/components/review/forms/create-subject-review';
import CreateMentorReviewForm from '@/components/review/forms/create-mentor-review';

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  profile: Profile;
  course?: Course;
  subject?: Subject;
}

export const CreateReviewModal: React.FC<CreateReviewModalProps> = ({
  isOpen,
  onClose,
  mentor,
  course,
  subject,
  profile,
}) => {

  
  const [loading, setLoading] = useState(false);
  

 

  return(
    <Modal
    title="Create a new review?"
    description="You can edit the review later."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    {course && !subject &&(
    <CreateCourseReviewForm profile={profile} mentor={mentor} onClose={onClose} course={course}/>
    )}
    {subject && !course &&(
    <CreateSubjectReviewForm profile={profile} mentor={mentor} onClose={onClose} subject={subject}/>
    )}
    {!subject && !course &&(
      <CreateMentorReviewForm profile={profile} mentor={mentor} onClose={onClose}/>
    )}






      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       
    
      </div>

    </Modal>
  )
}

export default CreateReviewModal;