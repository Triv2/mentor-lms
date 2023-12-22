'use client'
import { AlertModal } from '@/components/modals/alert-modal';
import { Appointment } from '@prisma/client';
import {useState, useEffect} from'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


interface DeleteAppointmentButtonProps {
  appointment: Appointment;
}

const DeleteAppointmentButton:React.FC<DeleteAppointmentButtonProps> = ({
  appointment,
}) => {

const router = useRouter()
const [isMounted, setIsMounted] = useState(false);
const [isDeleting, setIsDeleting] = useState(false);
const [loading, setLoading] = useState(false);

const onDelete = async () => {
  try {
    setLoading(true);
    
  
    
    await axios.delete(`/api/appointments/${appointment.id}`);
    toast.success("Appointment Deleted!");
    
    
   
  } catch (error) {
    toast.error("Something went wrong.");
  } finally {
    router.refresh();
    setLoading(false);
    router.push("/dashboard")
  }
}


useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
       <AlertModal
      isOpen={isDeleting}
      loading={loading}
      onConfirm={onDelete}
      onClose={() => {setIsDeleting(false)}}
      />
      <Button onClick={onDelete}>
            Cancel 
          </Button>
    </div>
  );
}
export default DeleteAppointmentButton;