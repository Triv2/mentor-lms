import CourseList from "@/components/course/list/course-list";
import MentorList from "@/components/mentor/list/mentor-list";
import MentorsCardListItem from "@/components/mentor/card/mentors-card-list-item";
import StudentList from "@/components/student/list/student-list";
import StudentProfileCard from "@/components/student/student-profile-card";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";

import { CalendarCheck2, Coins, Users } from "lucide-react";
import AppointmentCardList from "@/components/appointment/appointment-card-list";

const DashboardPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirectToSignIn();
  }
  const profile = await currentProfile();
  const mentors = await db.mentor.findMany({});
  const courses = await db.course.findMany({});
  const subjects = await db.subject.findMany({});
  const skills = await db.skill.findMany({});
  const reviews = await db.review.findMany({});
  const appointments = await db.appointment.findMany({
    where: {
      id:{
        in: profile?.appointmentIds,
        }
      }
    },
  );
  let profileAppointments:string[]=[];
  appointments.forEach((appointment)=>{
    profileAppointments.push(appointment.mentorId);
  })
  const appointmentMentors = await db.mentor.findMany({
    where: {
      id:{
        in: profileAppointments,
        }
      }
    },
);
  const mentor = await db.mentor.findFirst({
    where: { clerkId: userId },
  });
  const mentorAppointments=await db.appointment.findMany({
    where: {
      mentorId:mentor?.id,
    },
  });

  const subscribedMentors = await db.mentor.findMany({
    where: {
      id: {
        in: profile?.subscribedMentorIds,
      },
    },
  });
  const purchasedCourses = await db.course.findMany({
    where: {
      id: {
        in: profile?.courseIds,
      },
    },
  });

  const subscribedStudents = await db.profile.findMany({
    where: {
      id: {
        in: mentor?.subscribedStudentIds,
      },
    },
  });

  
  const purchasedStudents = await db.profile.findMany({
    where: {
      id: {
        in: mentor?.purchasedCourseStudentIds,
      },
    },
  });
  let posterIds:string[]=[];
  let appointmentProfileIds:string[]=[];
  reviews.forEach((review)=>{
    posterIds.push(review.profileId)
  })
  mentorAppointments.forEach((appointment)=>{
    appointmentProfileIds.push(appointment.profileId)
  })

  const posters=await db.profile.findMany({
    where:{
      id:{
        in:posterIds
      }
    }
  });
  const appointmentProfiles=await db.profile.findMany({
    where:{
      id:{
        in:appointmentProfileIds,
        }
      }
    }
  );
 
  return (
    <div className="min-h-screen h-auto">
      {/* {mentorInvite && (<InviteCode mentorCode={mentorInvite}/>)} */}

      {profile && profile.role === "STUDENT" && (
        <div className="flex flex-col md:flex-row min-h-screen">
          <div className="w-full ">
          <StudentProfileCard profile={profile} appointments={appointments} mentors={appointmentMentors} courses={courses} />
          </div>
          
            {/* <div className="flex items-center flex-col gap-2 py-5 px-2 ">
              Mentors you are following:
              <Divider />
              <div>
                <MentorList
                  mentors={followingMentors}
                  profile={profile}
                  courses={courses}
                  skills={skills}
                  subjects={subjects}
                  reviews={reviews}
                  posters={posters}
                />
              </div>
            </div> */}
            
             <div className="flex w-full md:w-[30%] h-auto gap-4 ">
            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Mentors-Subscribed</h1>
              <MentorList
                  mentors={subscribedMentors}
                  profile={profile}
                  courses={courses}
                  skills={skills}
                  subjects={subjects}
                  reviews={reviews}
                  posters={posters}
                />
            </Card>
            
            </div>
            
           
           
          
        </div>
      )}

      {mentor && profile && (
        <div className="flex flex-col gap-4 p-4 h-full">
          <div className="w-full h-fit flex md:flex-row flex-col-reverse items-center gap-4">
            {/* <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                  <CardTitle className="font-semibold">Followers</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Total mentor followers</CardDescription>
                </div>
                <div className="p-2 w-fit rounded-lg bg-sky-600/10">
                  <Users className="text-sky-600 h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mentor.followingStudentIds.length}</div>
              </CardContent>
            </Card> */}
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                  <CardTitle className="font-semibold">Subscribers</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Total mentor subscribers</CardDescription>
                </div>
                <div className="p-2 w-fit rounded-lg bg-pink-600/10">
                  <CalendarCheck2 className="text-pink-600 h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mentor.subscribedStudentIds.length}</div>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex flex-col gap-1">
                  <CardTitle className="font-semibold">Monthly Income</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Total income earned</CardDescription>
                </div>
                <div className="p-2 w-fit rounded-lg bg-red-600/10">
                  <Coins className="text-red-600 h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mentor.totalEarned}</div>
              </CardContent>
            </Card>
          </div>

          <MentorsCardListItem
            mentor={mentor}
            courses={courses}
            profile={profile}
            subjects={subjects}
            skills={skills}
            reviews={reviews}
            posters={posters}
          />
          
          <div className="flex flex-col md:flex-row w-full h-auto gap-4">
            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Appointments</h1>
              <AppointmentCardList appointments={mentorAppointments} mentor={mentor} profile={profile} appointmentProfiles={appointmentProfiles} />
            </Card>
            <div>
            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Subscribed Students</h1>
              <StudentList mentor={mentor} students={subscribedStudents} />
            </Card>

            <Card className="flex flex-col p-4 gap-2 w-full">
              <h1 className="font-medium text-lg">Course Students</h1>
              <StudentList mentor={mentor} students={purchasedStudents} />
            </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
