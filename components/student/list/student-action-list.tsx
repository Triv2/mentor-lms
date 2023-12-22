'use client'
import { Button } from '@nextui-org/react';
import {useState, useEffect} from'react'
import { useClerk } from "@clerk/clerk-react";
import { Profile } from '@prisma/client';
import axios from 'axios';
import { User } from 'lucide-react';
import EditStudentProfileModal from '../../modals/edit/edit-student-profile-modal';
import { AlertModal } from '../../modals/alert-modal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface StudentActionListProps {
  profile: Profile;
}

const StudentActionList:React.FC<StudentActionListProps> = ({
  profile,
}) => {
  const { signOut } = useClerk();
  const router = useRouter()
const [isMounted, setIsMounted] = useState(false);
const [studentProfile, setStudentProfile] = useState(false);
const [loading, setLoading] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
const onDelete = async () => {
  try {
    setLoading(true);
    
  
    
    await axios.delete(`/api/profiles/${profile.id}`)
    toast.success("Profile Deleted!");
    signOut();
    
   
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    setLoading(false);
    router.push("/")
  }
}

  return (
    <div className="flex items-center justify-center gap-2 p-5 dark:bg-zinc-800 rounded-b-md">
      <Button onClick={()=>setStudentProfile(true)} className="">
       <User/> Edit Profile
      </Button>
      <AlertModal
      isOpen={isDeleting}
      loading={loading}
      onConfirm={onDelete}
      onClose={() => {setIsDeleting(false)}}
      />
    <Button className="bg-red-500" onClick={()=>setIsDeleting(true)} >
      Delete Profile
    </Button>
  
      <EditStudentProfileModal
        isOpen={studentProfile}
        onClose={()=>setStudentProfile(false)}
        profile={profile}
        loading={loading}
      />
    </div>
  );
}
export default StudentActionList;