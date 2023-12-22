import { Button, Divider } from "@nextui-org/react";
import { Course, Mentor, Profile, Review, Skill, Subject } from "@prisma/client";
import { CheckCircle, Clock3, Edit, LocateFixedIcon, LocateIcon, Pin, PinIcon, UserCheck, Users, Users2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MentorActionList from "../mentor-action-list";
import ReviewListButton from "../../review/review-list-button";

interface MentorProfileCardProps {
  mentor: Mentor;
  courses: Course[];
  subjects: Subject[];
  skills: Skill[];
  profile: Profile;
  reviews: Review[];
  posters: Profile[];
  onClose: () => void;
}

const MentorProfileCard = ({ mentor, courses, profile, skills, subjects, reviews, posters,onClose }: MentorProfileCardProps) => {
  let rating: number = 0;
  reviews.forEach((review) => {
    rating += review.rating;
  });
  let averageRating = (rating / reviews.length).toFixed(2);

  return (
    <div className="flex items-center p-3 w-full flex-col-reverse sm:flex-row gap-2 justify-center  rounded-md shadow-md ">
      <div className="flex flex-col items-center justify-between gap-5 dark:bg-zinc-800 p-2 rounded-md shadow-md">
        {mentor.userName && mentor.imageUrl && (
          <Image className="rounded-full shadow-md" src={mentor?.imageUrl} width={100} height={100} alt={mentor?.userName} />
        )}
        <div>Rating: {averageRating}/5</div>

        <ReviewListButton mentor={mentor} profile={profile} posters={posters} reviews={reviews} />
        <div className="flex flex-col gap-2">
          <Link
          onClick={onClose}
            className="px-4 py-2 flex items-center justify-center dark:bg-zinc-700 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
            href={`/dashboard/mentors/${mentor.id}`}
          >
            View Page
          </Link>
          {mentor.email !== "" && mentor.email && (
            <Link
              className="px-4 py-2 flex items-center justify-center dark:bg-zinc-700 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
              href={`/dashboard/mentors/${mentor.id}/appointments`}
              
            >
              Schedule
            </Link>
          )}
          {/* {mentor.freelanceUrl !== "" && mentor.freelanceUrl && (
            <Link
              className="px-4 py-2 flex items-center justify-center dark:bg-zinc-700 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
              href={mentor.freelanceUrl}
            >
              Hire Me
            </Link>
          )} */}
          {profile && <MentorActionList mentor={mentor} profile={profile} />}
        </div>
      </div>

      <div className="flex flex-col gap-5 px-3 py-1">
        <div className="flex flex-col">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 text-2xl font-bold">
              <p>{mentor.firstName}</p>
              <p>{mentor.lastName}</p>
            </div>
          </div>
          <Divider />
          <div className="flex  text-md gap-2 font-bold">
            <p className="text-muted-foreground">@{mentor.userName}</p>
            <div className="flex items-center gap-0.5">
              <CheckCircle className="h-4 w-4 text-emerald-700" /> <p className="text-xs text-emerald-700"> Verified</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-1">
          <p className="font-semibold">{mentor.title} </p>
          <Divider />
          <div className="flex items-center justify-between px-5 gap-2">
            <div className="flex items-center justify-center gap-1">
              <LocateFixedIcon className="h-4 w-4" />
              <p className="text-muted-foreground text-sm">{mentor.location}</p>
            </div>
            <div className="dark:bg-zinc-700 p-1 gap-1 rounded-md px-2 flex items-center shadow-md dark:shadow-white/20">
              <p className="text-xs">{mentor.followingStudentIds.length}</p>
              <Users2 className="h-4 w-4" />
            </div>
            <div className="dark:bg-zinc-700 p-1 gap-1 rounded-md px-2 flex items-center shadow-md dark:shadow-white/20">
              <p className="text-xs">{mentor.subscribedStudentIds.length}</p>
              <Users className="h-4 w-4" />
            </div>
            <div className="dark:bg-zinc-700 p-1 gap-1 rounded-md px-2 flex items-center shadow-md dark:shadow-white/20">
              <p className="text-xs">${mentor.subscriptionCost}</p>
              <UserCheck className="h-4 w-4" />
            </div>
            <div className="dark:bg-zinc-700 p-1 gap-1 rounded-md px-2 flex items-center shadow-md dark:shadow-white/20">
              <p className="text-xs">${mentor.rateCost}</p>
              <Clock3 className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-1">
          <p className="font-semibold">Skills </p>
          <Divider />
          <div className="flex items-center">
            {skills &&
              skills.map((skill) => (
                <div
                  className="px-4 py-2 flex items-center justify-center dark:bg-slate-800 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
                  key={skill.id}
                >
                  {skill.name}
                </div>
              ))}
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-1">
          <p className="font-semibold">Courses </p>
          <Divider />
          <div className="flex items-center">
            {courses &&
              courses.map((course) => (
                <Link
                  className="px-4 py-2 flex items-center justify-center dark:bg-purple-900 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
                  key={course.id}
                  href={`/dashboard/mentors/${mentor.id}/courses/${course.id}`}
                >
                  {course.name}
                </Link>
              ))}
          </div>
        </div>
        {/* <div className="flex flex-col gap-1">
          <p className="font-semibold">Subjects </p>
          <Divider />
          <div className="flex items-center">
            {subjects &&
              subjects.map((subject) => (
                <Link
                  className="px-4 py-2 flex items-center justify-center dark:bg-blue-900 rounded-md hover:scale-105 transtion-all duration-200 shadow-md dark:shadow-white/20"
                  key={subject.id}
                  href={`/dashboard/mentors/${mentor.id}/subjects/${subject.id}`}
                >
                  {subject.name}
                </Link>
              ))}
          </div>
        </div> */}

        <div className="hidden md:flex flex-col gap-1">
          <p className="font-semibold">About </p>
          <Divider />
          <p>{mentor.about}</p>
        </div>
      </div>
    </div>
  );
};
export default MentorProfileCard;
