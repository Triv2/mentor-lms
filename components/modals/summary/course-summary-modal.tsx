'use client'

import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile } from '@prisma/client';

import { Trash } from 'lucide-react';
import CourseSummary from '../../course/course-summary';
import { AlertModal } from '../alert-modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


interface CourseSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  course: Course;
  mentor:Mentor;
  profile: Profile;
}

export const CourseSummaryModal= ({
  isOpen,
  onClose,
  loading,
  course,
  mentor,
  profile,
}:CourseSummaryModalProps) => {
  const router = useRouter();
  const[purchase,setPurchase] = useState(false);

  const onPurchase = async () => {
    try{
      
      await axios.patch(`/api/courses/${course.id}/purchase`,{mentorId: mentor.id, courseId: course.id})
      toast.success("Purchased!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setPurchase(false);
      onClose();
      router.refresh();
  }
}
const unPurchase = async () => {
  try{
    
    await axios.patch(`/api/courses/${course.id}/purchase`,{mentorId: mentor.id, courseId: course.id})
    toast.success("Purchased!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setPurchase(false);

}
}
  let studentHasCourse = profile.courseIds.find((id) => id === course.id) || null;
  
  const manageCourse= () => {
    onClose();
    router.push(`/dashboard/mentors/${mentor.id}/courses/${course.id}`);
  }



  return(
    <Modal
    title="Summary of Course"
    description="Click to go to their full course."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      

      
      <CourseSummary mentor={mentor} course={course}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       {!profile.mentorId && studentHasCourse!==course.id &&
       (<Button onClick={()=>setPurchase(true)}  className="flex items-center justify-between py-2">
          Purchase
        </Button>
        )}
        {!profile.mentorId && studentHasCourse===course.id &&
        (<Button onClick={onPurchase}  className="flex items-center justify-between py-2">
          Refund
        </Button>
        )}
        {mentor.id===profile.mentorId &&(
          <Button onClick={manageCourse}  className="flex items-center justify-between py-2">
            Manage Course
          </Button>
        )}
      </div>
      <AlertModal
      isOpen={purchase}
      loading={loading}
      onConfirm={onPurchase}
      onClose={() => {setPurchase(false)}}
      />
    </Modal>
  )
}

export default CourseSummaryModal;