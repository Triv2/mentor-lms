'use client'


import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Mentor, Profile } from '@prisma/client';
// import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';

import MentorProfileCard from '../../mentor/card/mentor-profile-card';
import StudentProfileCard from '../../student/student-profile-card';

interface StudentSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  loading: boolean;
 
  profile: Profile;
}

export const StudentSummaryModal: React.FC<StudentSummaryModalProps> = ({
  isOpen,
  onClose,
 
  loading,
  
  profile,
}) => {


  return(
    <Modal
    title="Summary of Student Profile"
    description="Click to go to their full profile."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <StudentProfileCard profile={profile} />

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default StudentSummaryModal;