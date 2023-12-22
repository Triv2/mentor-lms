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

interface AppointmentCardProps {
  appointment:Appointment;
  mentor:Mentor;
  profile:Profile;
  appointmentProfiles:Profile[];
}

const AppointmentCard = ({
  appointment,
  mentor,
  profile,
  appointmentProfiles,
}:AppointmentCardProps) => {
  
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
  setIsMounted(true);
  }, []);
  
  if (!isMounted) {
  return null;
  }

  const appointmentProfile = appointmentProfiles.find((profile) => profile.id === appointment.profileId);
  
  return (
    <div>
      <Card className="flex md:flex-row flex-col items-center ">
        <CardHeader className="w-full">
          <CardTitle className="flex flex-col gap-1 p-2 px-5 border-r-1">
           <h2> One on One Appointment</h2>
           <p className="text-muted-foreground text-lg">{mentor.userName} and {appointmentProfile?.name}</p>
           <CardDescription className="flex flex-col gap-1 p-2">
           <p>{new Date(appointment.startDate).toDateString()}</p>
           <p>{appointment.startTime} to {appointment.endTime}</p>
           </CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 px-5 p-2 border-r-1 w-full">
        
        <div className="text-xl font-semibold">{appointment.title}</div>
        <div>{appointment.description}</div>
        </CardContent>
        
        <CardFooter>
        <DeleteAppointmentButton appointment={appointment} />
        </CardFooter>
      </Card>
    </div>
  );
};
export default AppointmentCard;
