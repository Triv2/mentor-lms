'use client'

import toast from 'react-hot-toast';
import axios from 'axios';
import { Modal } from '@/components/ui/modal';
import { Button } from '@nextui-org/react';
import { Course, Mentor, Profile, Subject } from '@prisma/client';

import { Trash } from 'lucide-react';

import { AlertModal } from '../alert-modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubjectSummary from '@/components/subject/subject-summary';


interface SubjectSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  subject: Subject;
  mentor:Mentor;
  profile: Profile;
}

export const SubjectSummaryModal= ({
  isOpen,
  onClose,
  loading,
  subject,
  mentor,
  profile,
}:SubjectSummaryModalProps) => {
  const router = useRouter();
  const[purchase,setPurchase] = useState(false);

  const onPurchase = async () => {
    try{
      
      await axios.patch(`/api/subjects/${subject.id}/purchase`,{mentorId: mentor.id, subjectId: subject.id})
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
    
    await axios.patch(`/api/subjects/${subject.id}/purchase`,{mentorId: mentor.id, subjectId: subject.id})
    toast.success("Purchased!");
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setPurchase(false);

}
}
  let studentHasSubject = profile.subjectIds.find((id) => id === subject.id) || null;
  
  const manageSubject= () => {
    onClose();
    router.push(`/dashboard/mentors/${mentor.id}/subjects/${subject.id}`);
  }



  return(
    <Modal
    title="Summary of Subject"
    description="Click to go to their full subject curriculum."
    isOpen={isOpen}
    onClose={onClose}
    >
      
      

      
      <SubjectSummary mentor={mentor} subject={subject}/>

      <div className="pt-6 space-x-2 flex items-center justify-between w-full">
        
        <Button disabled={loading}  onClick ={onClose}>
          Cancel
        </Button>
       {!profile.mentorId && studentHasSubject!==subject.id &&
       (<Button onClick={()=>setPurchase(true)}  className="flex items-center justify-between py-2">
          Purchase
        </Button>
        )}
        {!profile.mentorId && studentHasSubject===subject.id &&
        (<Button onClick={onPurchase}  className="flex items-center justify-between py-2">
          Refund
        </Button>
        )}
        {mentor.id===profile.mentorId &&(
          <Button onClick={manageSubject}  className="flex items-center justify-between py-2">
            Manage Subject
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

export default SubjectSummaryModal;