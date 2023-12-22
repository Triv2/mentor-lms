import { Divider } from "@nextui-org/react";
import {  Appointment, Course, Mentor, Profile } from "@prisma/client";
import Image from "next/image";
import { Card } from "../ui/card";
import AppointmentCardList from "../appointment/appointment-card-list";
import StudentAppointmentList from "../appointment/student-appointment-list";
import StudentCourseList from "./student-course-list";

interface StudentProfileCardProps {
  appointments:Appointment[];
  profile:Profile;
  mentors:Mentor[];
  courses:Course[];
}

const StudentProfileCard = ({
  appointments,
  mentors,
  profile,
  courses,
}:StudentProfileCardProps) => {
  return (
    <div className="flex items-center flex-col dark:bg-zinc-800 rounded-t-md shadow-md">
      <Card className=" items-center flex justify-center p-4 gap-2 w-full">
       <div >
        {profile.name &&(<Image className="rounded-full shadow-md" src={profile?.imageUrl} width={100} height={100} alt={profile?.name}/>)}
       </div>
      <div className="flex flex-col gap-2 px-3 py-1">
        <p className="font-bold text-xl">{profile.name}</p>
        
        <p> {profile.about}</p>
      </div>
      </Card>
      <div className="flex  w-full h-auto gap-4">
            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Courses</h1>
              {mentors.map((mentor) => (
              <StudentCourseList key={mentor.id} courses={courses} mentor={mentor} profile={profile}  />
              ))}
            </Card>
      </div>
      
      
      <div className="flex  w-full h-auto gap-4">
            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Appointments</h1>
              {mentors.map((mentor) => (
              <StudentAppointmentList key={mentor.id} appointments={appointments} mentor={mentor} profile={profile}  />
              ))}
            </Card>
      </div>
    </div>
  );
}
export default StudentProfileCard;