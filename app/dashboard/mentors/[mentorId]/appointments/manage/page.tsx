import AppointmentCard from "@/components/appointment/appointment-card";
import DeleteAppointmentButton from "@/components/appointment/buttons/delete-appointment-button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MentorAppointmentsManagePageProps {}

const MentorAppointmentsManagePage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const mentor = await db.mentor.findFirst({
    where: {
      clerkId: user.id,
    },
  }) || null;

  if (!mentor) {
    redirect("/");
  }
  const appointments = await db.appointment.findMany({
    where:{
      mentorId: mentor.id,
    }
  })
  let appointmentProfileIds:string[] = [];
  appointments.forEach(appointment => {
    appointmentProfileIds.push(appointment.profileId);
  })
  const appointmentProfiles = await db.profile.findMany({
    where: {
      id: {
        in: appointmentProfileIds,
      }
    },
  });
  return (
<div className="p-4">
<h1 className="font-medium text-2xl">Appointments</h1>
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
export default MentorAppointmentsManagePage;