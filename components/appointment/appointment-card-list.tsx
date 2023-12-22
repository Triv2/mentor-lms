'use client'
import { Appointment, Mentor, Profile } from "@prisma/client";
import AppointmentCard from "./appointment-card";

interface AppointmentCardListProps {
  appointments: Appointment[];
  mentor: Mentor;
  profile: Profile;
  appointmentProfiles: Profile[];
}

const AppointmentCardList = ({
  appointments,
  mentor,
  profile,
  appointmentProfiles,
}: AppointmentCardListProps) => {
  return (
<div>
    {appointments && appointments.length > 0 && (appointments.map((appointment) => (
      <div key={appointment.id} className="flex flex-col gap-2">
        <AppointmentCard appointment={appointment} mentor={mentor} profile={profile} appointmentProfiles={appointmentProfiles}/>
      </div>
    )))}
    {appointments.length<1 && (
      <div className="flex flex-col gap-2">
        <h1 className="font-medium">No Appointments</h1>
      </div>
    )}
</div>
  );
}
export default AppointmentCardList;