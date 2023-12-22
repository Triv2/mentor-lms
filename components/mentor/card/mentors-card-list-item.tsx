"use client";
import { Course, Mentor, Profile, Skill, Review, Subject } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MentorActionList from "../mentor-action-list";
import {
  CalendarCheck,
  CheckCircle,
  Clock3,
  Contact,
  ExternalLink,
  Laptop,
  LocateFixedIcon,
  Star,
  User,
  UserCheck,
} from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";

import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import ReviewListButton from "../../review/review-list-button";
import ReviewRatingBadge from "../../review/review-rating-badge";

interface MentorsCardListItemProps {
  mentor: Mentor;
  courses: Course[];
  subjects: Subject[];
  profile: Profile;
  skills: Skill[];
  reviews: Review[];
  posters: Profile[];
}

const MentorsCardListItem: React.FC<MentorsCardListItemProps> = ({
  mentor,
  courses,
  profile,
  skills,
  subjects,
  reviews,
  posters,
}) => {
  const [isMounted, setIsMounted] = useState(false);

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

  subjects.forEach((subject) => {
    if (subject.mentorId === mentor.id) {
      mentorSubjects.push(subject);
    }
  });

  skills.forEach((skill) => {
    if (skill.mentorId === mentor.id) {
      mentorSkills.push(skill);
    }
  });

  courses.forEach((course) => {
    if (course.mentorId === mentor.id) {
      mentorCourses.push(course);
    }
  });

  reviews.forEach((review) => {
    if (review.mentorId === mentor.id && !review.courseId &&!review.subjectId) {
      mentorReviews.push(review);
    }
  });

  let posterIds: string[] = [];
  mentorReviews.forEach((review) => {
    posterIds.push(review.profileId);
  });

  let mentorPosters: Profile[] = [];
  posters.forEach((poster) => {
    if (posterIds.includes(poster.id)) {
      mentorPosters.push(poster);
    }
  });

  let rating: number = 0;
  mentorReviews.forEach((review) => {
    rating += review.rating;
  });
  let averageRating = (rating / mentorReviews.length).toFixed(2);

  return (
    <main className="flex md:flex-row flex-col gap-4 w-full justify-between">

      <Card className="flex lg:flex-row flex-col items-center relative justify-between gap-4 p-4 w-full">
        <div className="absolute top-2 left-2 z-30">
          {profile && <ReviewListButton mentor={mentor} profile={profile} reviews={mentorReviews} posters={mentorPosters} />}
        </div>
        <Link className="absolute top-2 right-2 z-30" href={`/dashboard/mentors/${mentor.id}`}>
          <Button size={"sm"} variant={"secondary"}>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>

        <div className="flex flex-col gap-4 relative justify-between h-full items-center w-full">
          {mentor.userName && mentor.imageUrl && (
            <Image className="rounded-full object-cover" src={mentor?.imageUrl} height={200} width={200} alt={mentor?.userName} />
          )}

        
          <ReviewRatingBadge averageRating={averageRating} />

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 w-full justify-between">
              {mentor.email !== "" && mentor.email && (
                <Link className="w-full" href={`/dashboard/mentors/${mentor.id}/appointments`}>
                  <Button className="w-full flex items-center gap-2 bg-emerald-600/10 hover:bg-emerald-600/20 hover:text-emerald-600 text-emerald-600">
                    <Contact className="w-4 h-4" />
                    <span>Schedule</span>
                  </Button>
                </Link>
              )}
              {mentor.courseIds  && (
                <Link className="w-full" href={`/dashboard/mentors/${mentor.id}/courses`}>
                  <Button className="w-full flex items-center gap-2 bg-teal-600/10 hover:bg-teal-600/20 hover:text-teal-600 text-teal-600">
                    <Laptop className="w-4 h-4" />
                    <span>Courses</span>
                  </Button>
                </Link>
              )}
            </div>
            {profile && <MentorActionList mentor={mentor} profile={profile} />}
          </div>
        </div>

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col">
            <span className="font-medium text-lg">
              {mentor.firstName} {mentor.lastName}
            </span>
            <div className="flex items-center gap-2">
              <p className="text-muted-foreground text-sm">@{mentor.userName}</p>
              <Badge
                variant={"secondary"}
                className="flex items-center gap-2 bg-green-600/10 hover:bg-green-600/20 hover:text-green-600 text-green-600"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Verified</span>
              </Badge>
            </div>
          </div>
          <div className="flex flex-col gap-1">
              <p className="font-medium text-lg">Hours </p>

              <div className="flex items-center gap-2">
                {mentor.startHour && mentor.endHour && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {mentor.startHour} - {mentor.endHour} {mentor.timezone}
                    </span>
                  </div>
                )}
              </div>
            </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg">{mentor.title} </p>
            <div className="flex  flex-wrap items-center justify-between gap-2">
              <Badge variant={"secondary"} className="flex items-center gap-1">
                <LocateFixedIcon className="h-4 w-4" />
                <span>{mentor.location}</span>
              </Badge>

              <Badge variant={"secondary"} className="flex items-center gap-1">
                <UserCheck className=" h-4 w-4" />
                <span>{mentor.followingStudentIds.length}</span>
              </Badge>

              <Badge variant={"secondary"} className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{mentor.subscribedStudentIds.length}</span>
              </Badge>

              <Badge variant={"secondary"} className="flex items-center gap-1">
                <CalendarCheck className="h-4 w-4" />
                <span>${mentor.subscriptionCost}</span>
              </Badge>

              <Badge variant={"secondary"} className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                <span>${mentor.rateCost}</span>
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg">Skills </p>

            <div className="grid grid-cols-2 w-full gap-2">
              {mentorSkills &&
                mentorSkills.map((skill) => (
                  <Button variant={"secondary"} size={"sm"} className="items-center justify-start flex gap-2" key={skill.id}>
                    {skill.imageUrl && (
                      <Image className="rounded-full" src={skill.imageUrl} alt={skill.id} width={20} height={20} />
                    )}
                    {skill.name}
                  </Button>
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-medium text-lg">About </p>
            <p className="text-muted-foreground">{mentor.about}</p>
          </div>
        </div>
      </Card>

      <Card className="flex-col hidden md:flex gap-1 w-[30%] p-4">
        <p className="font-semibold">Courses</p>
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2">
            {mentorCourses &&
              mentorCourses.map((course) => (
                <Link key={course.id} href={`/dashboard/mentors/${mentor.id}/courses/${course.id}`}>
                  <Button variant={"secondary"} className="w-full flex items-center gap-2 justify-start">
                    <Image className="rounded-full object-cover" src={course.imageUrl} alt={course.id} width={30} height={30} />
                    <h1>{course.name}</h1>
                  </Button>
                </Link>
              ))}
          </div>
        </ScrollArea>
      </Card>

      {/* <Card className="hidden md:flex flex-col gap-1 w-full p-4">
        <p className="font-semibold">Subjects</p>
        <ScrollArea className="h-[300px]">
          <div className="flex flex-col gap-2">
            {mentorSubjects &&
              mentorSubjects.map((subject) => (
                <Link key={subject.id} href={`/dashboard/mentors/${mentor.id}/subjects/${subject.id}`}>
                  <Button variant={"secondary"} className="w-full flex items-center gap-2 justify-start">
                    <Image className="rounded-full object-cover" src={subject.imageUrl} alt={subject.id} width={30} height={30} />
                    <h1>{subject.name}</h1>
                  </Button>
                </Link>
              ))}
          </div>
        </ScrollArea>
      </Card> */}
    </main>
  );
};
export default MentorsCardListItem;
