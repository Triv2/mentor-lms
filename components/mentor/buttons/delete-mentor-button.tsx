'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';

import { Mentor, Profile } from '@prisma/client';

import { Trash } from 'lucide-react';
import EditMentorProfileForm from '../../mentor/forms/edit-mentor-profile';

import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';

interface DeleteMentorButtonProps {

  mentor: Mentor;
}

export const DeleteMentorButton: React.FC<DeleteMentorButtonProps> = ({
  
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
      toast.success("Mentor Deleted!");
      signOut();
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      router.refresh();
      setLoading(false);
      router.push("/")
    }
  }

  return(
    
      

      <div >
        
       
        <AlertModal
      isOpen={isDeleting}
      loading={loading}
      onConfirm={onDelete}
      onClose={() => {setIsDeleting(false)}}
      />
    <Button size="sm" className=" bg-red-500" onClick={()=>setIsDeleting(true)} >
     <Trash className="h-3 w-3"/> 
    </Button>
      </div>

   
  )
}

export default DeleteMentorButton;