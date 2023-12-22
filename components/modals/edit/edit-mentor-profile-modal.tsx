'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Mentor, Profile } from '@prisma/client';

import { Trash } from 'lucide-react';
import EditMentorProfileForm from '../../mentor/forms/edit-mentor-profile';
import { AlertModal } from '../alert-modal';
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';

interface EditMentorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  mentor: Mentor;
}

export const EditMentorProfileModal: React.FC<EditMentorProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  mentor,
}) => {

  const { signOut } = useClerk();
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/mentors/${mentor.id}`)
      toast.success("Profile Deleted!");
      signOut();
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.push("/")
    }
  }

  return(
    <Modal
    title="Edit your Profile?"
    description="Change any of your profile settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      

      <EditMentorProfileForm profile={profile} mentor={mentor} onClose={onClose}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
        <AlertModal
      isOpen={isDeleting}
      loading={loading}
      onConfirm={onDelete}
      onClose={() => {setIsDeleting(false)}}
      />
    <Button className="bg-red-500" onClick={()=>setIsDeleting(true)} >
     <Trash className="h-3 w-3"/> Delete Profile
    </Button>
      </div>

    </Modal>
  )
}

export default EditMentorProfileModal;