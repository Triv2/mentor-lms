'use client'


import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Mentor, Profile } from '@prisma/client';
// import DeleteButton from '../ui/delete-button';
import { Trash } from 'lucide-react';
import EditStudentProfileForm from '../../student/forms/edit-student-profile';

interface EditStudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  
  loading: boolean;
  profile: Profile;
  
}

export const EditStudentProfileModal: React.FC<EditStudentProfileModalProps> = ({
  isOpen,
  onClose,
 
  loading,
  profile,
  
}) => {


  return(
    <Modal
    title="Edit your Profile?"
    description="Change any of your profile settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <EditStudentProfileForm profile={profile}  onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        
      </div>

    </Modal>
  )
}

export default EditStudentProfileModal;