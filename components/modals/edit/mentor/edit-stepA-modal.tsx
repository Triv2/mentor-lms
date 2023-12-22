'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Skill } from '@prisma/client';

import { Trash } from 'lucide-react';


import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';

import EditMentorNamesForm from '@/components/mentor/forms/stepA/edit-mentor-names';
import { AlertModal } from '../../alert-modal';

interface EditStepAModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  profile: Profile;
  
}

export const EditStepAModal: React.FC<EditStepAModalProps> = ({
  isOpen,
  onClose,
  mentor,
  profile,
}) => {

  
  
  const [loading, setLoading] = useState(false);
 

  

  return(
    <Modal
    title="Edit your Names?"
    description="Change any of your profile name settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      {/* Insert Edit Class Form */}
      
    <EditMentorNamesForm profile={profile} mentor={mentor} onClose={onClose}/>
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
      
    
      </div>

    </Modal>
  )
}

export default EditStepAModal;