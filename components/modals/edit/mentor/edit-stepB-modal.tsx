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
import EditMentorDetailsForm from '@/components/mentor/forms/stepB/edit-mentor-details';

interface EditStepBModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: Mentor;
  profile: Profile;
  
}

export const EditStepBModal: React.FC<EditStepBModalProps> = ({
  isOpen,
  onClose,
  mentor,
  profile,
}) => {

  
  
  const [loading, setLoading] = useState(false);
 

  

  return(
    <Modal
    title="Edit your Details?"
    description="Change any of your details settings."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      {/* Insert Edit Class Form */}
      
    <EditMentorDetailsForm profile={profile} mentor={mentor} onClose={onClose}/>
      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
      
    
      </div>

    </Modal>
  )
}

export default EditStepBModal;