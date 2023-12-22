import AppointmentCard from "@/components/appointment/appointment-card";
import DeleteAppointmentButton from "@/components/appointment/buttons/delete-appointment-button";
import { CreateAppointmentForm } from "@/components/appointment/forms/create-appointment";
import CreateAppointmentStepper from "@/components/appointment/forms/create-appointment-stepper";
import { StartDateForm } from "@/components/appointment/forms/stepA/start-date";
import { StartTimeForm } from "@/components/appointment/forms/stepB/start-time";
import { EndTimeForm } from "@/components/appointment/forms/stepC/end-time";
import { ConsultForm } from "@/components/appointment/forms/stepD/consult";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MentorIdAppointmentPageProps {}

const MentorIdAppointmentPage = async ({
  params,
}: {
  params: { mentorId: string };
}) => {
  const profile = await currentProfile();
  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });
  const appointments = await db.appointment.findMany({
    where: {
      mentorId: params.mentorId,
    },
  });
  const appointment =
    (await db.appointment.findFirst({
      where: {
        mentorId: params.mentorId,
      },
    })) || null;
    const appointmentProfiles = await db.profile.findMany({
      where: {
        id: appointment?.profileId,
      },
    });

    if(profile && mentor && profile.mentorId===mentor.id)
    {
      redirect(`/dashboard/mentors/${mentor.id}/appointments/manage`);
    }
  return (
    <div>
      {profile && !profile.mentorId  &&(
      <div className="flex items-center justify-center p-5 min-h-screen">
        {profile && mentor && !appointment && (
          <div>
            <StartDateForm mentor={mentor} profile={profile} />
          </div>
        )}
        {profile &&
          mentor &&
          appointment &&
          appointment?.startDate &&
          !appointment?.startTime && (
            <div>
              <StartTimeForm
                mentor={mentor}
                profile={profile}
                appointment={appointment}
              />
            </div>
          )}
        {profile &&
          mentor &&
          appointment &&
          appointment?.startDate &&
          appointment?.startTime &&
          !appointment?.endTime && (
            <div>
              <EndTimeForm
                mentor={mentor}
                profile={profile}
                appointment={appointment}
              />
            </div>
          )}
        {profile &&
          mentor &&
          appointment &&
          appointment?.startDate &&
          appointment?.startTime &&
          appointment?.endTime &&
          !appointment.title && (
            <div>
              <ConsultForm
                mentor={mentor}
                profile={profile}
                appointment={appointment}
              />
            </div>
          )}
        {profile &&
          mentor &&
          appointmentProfiles &&
          appointment &&
          appointment?.startDate &&
          appointment?.startTime &&
          appointment?.endTime &&
          appointment.title && (
            <AppointmentCard appointment={appointment} mentor={mentor} profile={profile} appointmentProfiles={appointmentProfiles}/>
          )}
      </div>)}
    </div>
  );
};
export default MentorIdAppointmentPage;
