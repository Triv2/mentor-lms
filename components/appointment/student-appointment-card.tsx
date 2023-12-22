'use client'
  import {useState, useEffect} from'react'
import { Appointment, Mentor, Profile } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeleteAppointmentButton from "./buttons/delete-appointment-button";

interface StudentAppointmentCardProps {
  appointment:Appointment;
  mentor:Mentor;
  profile:Profile;
 
}

const StudentAppointmentCard = ({
  appointment,
  mentor,
  profile,
 
}:StudentAppointmentCardProps) => {
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
  setIsMounted(true);
  }, []);
  
  if (!isMounted) {
  return null;
  }


  
  return (
    <div>
      <Card className="flex flex-col md:flex-row items-center ">
        <CardHeader className="w-full">
          <CardTitle className="flex flex-col gap-1 p-2 px-5 border-1">
           <h2> One on One Appointment</h2>
           <p className="text-muted-foreground text-lg">{mentor.userName} and {profile?.name}</p>
           <CardDescription className="flex flex-col gap-1 p-2">
           <p>{new Date(appointment.startDate).toDateString()}</p>
           <p>{appointment.startTime} to {appointment.endTime}</p>
           </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 px-5 p-2  w-full">
        
        <div className="text-xl font-semibold">{appointment.title}</div>
        <div className="p-1">{appointment.description}</div>
        </CardContent>
        <CardFooter>
        <DeleteAppointmentButton appointment={appointment} />
        </CardFooter>
      </Card>
    </div>
  );
};
export default StudentAppointmentCard;
