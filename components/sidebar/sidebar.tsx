"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { Course, Mentor, Profile, Skill, Subject, Review } from "@prisma/client";

import { BookCheckIcon, BookUser, Contact, FileCog, FilePlus, Home, List, ListEnd, ListStart, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import EditMentorProfileModal from "../modals/edit/edit-mentor-profile-modal";
import EditStudentProfileModal from "../modals/edit/edit-student-profile-modal";
import StudentSummaryModal from "../modals/summary/student-summary-modal";
import MentorSummaryModal from "../modals/summary/mentor-summary-modal";
import { ScrollArea } from "../ui/scroll-area";
import MentorList from "../mentor/list/mentor-list";
import { CreateCourseModal } from "../modals/create/create-course-modal";
import CourseList from "../course/list/course-list";
import CreateSubjectModal from "../modals/create/create-subject-modal";
import CreateSkillModal from "../modals/create/create-skill-modal";
import SubjectList from "../subject/list/subject-list";
import { Button } from "../ui/button";
import { ModeToggle } from "../navigation/mode-toggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface SidebarProps {
  profile: Profile;
  mentors: Mentor[];
  posters: Profile[];
  reviews: Review[];
  courses?: Course[];
  subjects?: Subject[];
  skills?: Skill[];
}

const Sidebar: React.FC<SidebarProps> = ({ profile, mentors, reviews, courses, subjects, skills, posters }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [createCourse, setCreateCourse] = useState(false);
  const [createSubject, setCreateSubject] = useState(false);
  const [createSkill, setCreateSkill] = useState(false);
  const [loading, setLoading] = useState(false);

  const mentor = mentors.find((mentor) => mentor.id === profile.mentorId) || null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  let mentorCourses: Course[] = [];
  let mentorSubjects: Subject[] = [];
  let mentorSkills: Skill[] = [];
  let mentorReviews: Review[] = [];

  let studentCourses: Course[] = [];
  let studentSubjects: Subject[] = [];

  let followedMentors: Mentor[] = [];
  let subscribedMentors: Mentor[] = [];

  if (mentor) {
    courses?.forEach((course) => {
      if (course.mentorId === mentor.id) {
        mentorCourses.push(course);
      }
    });
    subjects?.forEach((subject) => {
      if (subject.mentorId === mentor.id) {
        mentorSubjects.push(subject);
      }
    });
    skills?.forEach((skill) => {
      if (skill.mentorId === mentor.id) {
        mentorSkills.push(skill);
      }
    });
    reviews?.forEach((review) => {
      if (review.mentorId === mentor.id) {
        mentorReviews.push(review);
      }
    });
  } else {
    profile.courseIds.forEach((courseId) => {
      courses?.forEach((course) => {
        if (course.id === courseId) {
          studentCourses.push(course);
        }
      });
    });
    profile.subjectIds.forEach((subjectId) => {
      subjects?.forEach((subject) => {
        if (subject.id === subjectId) {
          studentSubjects.push(subject);
        }
      });
    });

    profile.followingMentorIds.forEach((mentorId) => {
      mentors?.forEach((mentor) => {
        if (mentor.id === mentorId) {
          followedMentors.push(mentor);
        }
      });
    });
    profile.subscribedMentorIds.forEach((mentorId) => {
      mentors?.forEach((mentor) => {
        if (mentor.id === mentorId) {
          subscribedMentors.push(mentor);
        }
      });
    });
  }

  return (
    <div className="flex items-center flex-col bg-background border-r-1 h-full">
      <Tabs key="size" variant="underlined" className="w-full flex flex-col">
        <Tab key="student" title="Student" className="w-full px-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-medium">Actions</h1>
            <Button
              variant={"secondary"}
              className="w-full flex gap-2 items-center text-sm justify-start"
              onClick={() => router.push(`/dashboard`)}
            >
              <Home className="h-4 w-4" /> Home
            </Button>

            <Button
              variant={"secondary"}
              className="w-full flex gap-2 items-center text-sm justify-start"
              onClick={() => router.push(`/dashboard/courses`)}
            >
              <ListStart className="h-4 w-4" />
              Courses
            </Button>

            {/* <Button
              variant={"secondary"}
              className="w-full flex gap-2 items-center text-sm justify-start"
              onClick={() => router.push(`/dashboard/subjects`)}
            >
              <ListEnd className="h-4 w-4" />
              View Guides
            </Button> */}

            <Button
              variant={"secondary"}
              className="w-full flex gap-2 items-center text-sm justify-start"
              onClick={() => router.push(`/dashboard/mentors`)}
            >
              <List className="h-4 w-4" />
              Mentors
            </Button>
            

          

            {profile.mentorId && mentor && (
              <EditMentorProfileModal mentor={mentor} isOpen={edit} onClose={() => setEdit(false)} profile={profile} />
            )}
            {profile.mentorId && mentor && mentorCourses && mentorSkills && mentorSubjects && (
              <MentorSummaryModal
                reviews={reviews}
                mentor={mentor}
                isOpen={view}
                onClose={() => setView(false)}
                profile={profile}
                courses={mentorCourses}
                skills={mentorSkills}
                subjects={mentorSubjects}
                loading={loading}
                posters={posters}
              />
            )}

            {!profile.mentorId && !mentor && (
              <div>
                <EditStudentProfileModal isOpen={edit} onClose={() => setEdit(false)} profile={profile} loading={loading} />
                <StudentSummaryModal isOpen={view} onClose={() => setView(false)} profile={profile} loading={loading} />
              </div>
            )}
          </div>
          <div>
            <div className="pt-2 pb-2">
              <p className="font-bold text-md shadow-xl py-1 px-1">Your Courses</p>

              <ScrollArea className="w-auto  h-[110px]">
                {studentCourses && <CourseList courses={studentCourses} mentors={mentors} profile={profile} />}
                {mentorCourses && <CourseList courses={mentorCourses} mentors={mentors} profile={profile} />}
              </ScrollArea>
            </div>
            {/* <div className="pt-2 pb-2">
              <p className="font-bold text-md shadow-xl py-1 px-1">Your Guides</p>

              <ScrollArea className="w-auto  h-[110px]">
                {studentSubjects && <SubjectList subjects={studentSubjects} mentors={mentors} profile={profile} />}
                {mentorSubjects && <SubjectList subjects={mentorSubjects} mentors={mentors} profile={profile} />}
              </ScrollArea>
            </div> */}
          </div>
        </Tab>

       {profile.mentorId===mentor?.id &&( <Tab key="mentor" title="Mentor" className="w-full px-2">
          <div className="flex flex-col gap-2 w-full">
            

            {mentor && (
               <div className="flex flex-col gap-2 w-full">
               <h1 className="font-medium">Actions</h1>
             

             
                    <div className="flex w-full flex-col gap-2">
                      <div className="w-full overflow-hidden">
                        <Button
                          variant={"secondary"}
                          className="w-full flex gap-2 items-center text-sm justify-start"
                          onClick={() => setCreateCourse(true)}
                        >
                          <FilePlus className="h-4 w-4" /> Create Course
                        </Button>
                      </div>

                  

                      <div className="w-full overflow-hidden">
                        <Button
                          variant={"secondary"}
                          className="w-full flex gap-2 items-center text-sm justify-start"
                          onClick={() => router.push(`/dashboard/mentors/${mentor.id}/students`)}
                        >
                          <BookUser className="h-4 w-4" /> Manage Students
                        </Button>
                      </div>
                      <div className="w-full overflow-hidden">
                        <Button
                          variant={"secondary"}
                          className="w-full flex gap-2 items-center text-sm justify-start"
                          onClick={() => router.push(`/dashboard/mentors/${mentor.id}/appointments/manage`)}
                        >
                          <BookCheckIcon className="h-4 w-4" /> Manage Appointments
                        </Button>
                      </div>

                    </div>
               </div>
            )}
          </div>

          {mentor && <CreateCourseModal isOpen={createCourse} onClose={() => setCreateCourse(false)} mentor={mentor} />}
          {mentor && <CreateSubjectModal isOpen={createSubject} onClose={() => setCreateSubject(false)} mentor={mentor} />}
          {mentor && <CreateSkillModal isOpen={createSkill} onClose={() => setCreateSkill(false)} mentor={mentor} />}

          <div className="pt-2 pb-2">
            {mentor ? (
              <div className="flex flex-col gap-2">
                <h1 className="font-medium">Mentors</h1>

                <ScrollArea className="w-auto  h-[110px]">
                  {mentor && courses && skills && subjects && profile.mentorId === mentor.id && (
                    <MentorList
                      mentors={mentors}
                      profile={profile}
                      courses={courses}
                      skills={skills}
                      subjects={subjects}
                      reviews={reviews}
                      posters={posters}
                    />
                  )}
                </ScrollArea>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h1 className="font-medium">Mentors - Following</h1>
                <ScrollArea className="w-auto  h-[110px]">
                  {!mentor && courses && followedMentors && skills && subjects && followedMentors.length > 0 && (
                    <MentorList
                      mentors={followedMentors}
                      profile={profile}
                      courses={courses}
                      skills={skills}
                      subjects={subjects}
                      reviews={reviews}
                      posters={posters}
                    />
                  )}
                </ScrollArea>
              </div>
            )}
          </div>
         
        </Tab>)}
      </Tabs>
      <ModeToggle />
    </div>
  );
};

export default Sidebar;
