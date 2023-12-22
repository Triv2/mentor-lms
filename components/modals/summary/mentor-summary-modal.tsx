'use client'


import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Review, Skill, Subject } from '@prisma/client';
// import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';

import MentorProfileCard from '../../mentor/card/mentor-profile-card';
import { useRouter } from 'next/navigation';

interface MentorSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  loading: boolean;
  courses: Course[];
  mentor: Mentor;
  skills: Skill[];
  subjects: Subject[];
  reviews: Review[];
  posters: Profile[];
}

export const MentorSummaryModal: React.FC<MentorSummaryModalProps> = ({
  isOpen,
  onClose,
  profile,
  loading,
  courses,
  mentor,
  subjects,
  skills,
  reviews,
  posters,
}) => {

 
  return(
    <Modal
    title="Summary of Mentor Profile"
    description="To subscribe to the mentor, click the button below."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
      <MentorProfileCard courses={courses} mentor={mentor} profile={profile} subjects={subjects} skills={skills} reviews={reviews} posters={posters} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default MentorSummaryModal;