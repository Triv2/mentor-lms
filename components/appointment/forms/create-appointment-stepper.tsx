'use client'
import { Appointment, Mentor, Profile } from '@prisma/client';
import {useState, useEffect} from'react'
import { StartDateForm } from './stepA/start-date';
import { StartTimeForm } from './stepB/start-time';
import { EndTimeForm } from './stepC/end-time';
import { ConsultForm } from './stepD/consult';

interface CreateAppointmentStepperProps {
  mentor: Mentor;
  profile: Profile;
  appointments:Appointment[];
  appointment?:Appointment;
}

const CreateAppointmentStepper:React.FC<CreateAppointmentStepperProps> = ({
  mentor,
  profile,
  appointments,
  appointment,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [step,setStep] = useState(0);

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div>
      {step === 0 && (
        <div>
          <StartDateForm mentor={mentor} profile={profile} />
          </div>
      )}
      {step === 1 && appointment && (
        <div>
          <StartTimeForm mentor={mentor} profile={profile} appointment={appointment}/>
          </div>
      )}
      {step === 2 && appointment && (
        <div>
          <EndTimeForm mentor={mentor} profile={profile} appointment={appointment}/>
          </div>
      )}
      {step === 3 && appointment &&(
        <div>
          <ConsultForm mentor={mentor} profile={profile} appointment={appointment}/>
          </div>
      )}
      {step === 4 && appointment &&(
        <div>
          Finalize
          <div>
            {new Date(appointment.startDate).toDateString()}
          </div>
          <div>
            {appointment.startTime}
          </div>
          <div>
            {appointment.endTime}
          </div>
          <div>
            {appointment.title}
          </div>
          <div>
            {appointment.description}
          </div>
          </div>
      )}

    </div>
  );
}
export default CreateAppointmentStepper;