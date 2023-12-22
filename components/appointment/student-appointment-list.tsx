'use client'
import { Appointment, Mentor, Profile } from "@prisma/client";
import AppointmentCard from "./appointment-card";
import StudentAppointmentCard from "./student-appointment-card";

interface StudentAppointmentListProps {
  appointments: Appointment[];
  mentor: Mentor;
  profile: Profile;

}

const StudentAppointmentList = ({
  appointments,
  mentor,
  profile,
 
}: StudentAppointmentListProps) => {
  return (
<div>
    {appointments && appointments.length > 0 && (appointments.map((appointment) => (
      <div key={appointment.id} className="flex flex-col gap-2">
        <StudentAppointmentCard appointment={appointment} mentor={mentor} profile={profile} />
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
export default StudentAppointmentList;