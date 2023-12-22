'use client'
import toast from 'react-hot-toast';
import axios from 'axios';

import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Review } from '@prisma/client';

import { Trash } from 'lucide-react';

import { AlertModal } from '../alert-modal';
import { useParams, useRouter } from 'next/navigation';

import { useState } from 'react';
import EditCourseForm from '../../course/forms/edit-course';
import EditReviewForm from '@/components/review/forms/edit-review';

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
 
 
}

export const EditReviewModal: React.FC<EditReviewModalProps> = ({
  isOpen,
  onClose,
  review,

}) => {

  const router = useRouter()
  
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
    
      
      await axios.delete(`/api/reviews/${review.id}` );
      toast.success("Review Deleted!");
      setIsDeleting(false)
      
     
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      onClose();
      setLoading(false);
      router.refresh();
      router.push("/dashboard")
    }
  }

  return(
    <Modal
    title="Edit your Review?"
    description="Change your review or rating."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      
    <EditReviewForm  review={review} onClose={onClose}/>
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
     <Trash className="h-3 w-3"/> Delete Review
    </Button>
      </div>

    </Modal>
  )
}

export default EditReviewModal;