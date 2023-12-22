import MentorActionList from "@/components/mentor/mentor-action-list";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider, Tooltip } from "@nextui-org/react";
import {
  CalendarCheck,
  CheckCircle,
  Clock3,
  Contact,
  Laptop,
  LocateFixedIcon,
  Star,
  User,
  UserCheck,
  Users,
  Users2,
} from "lucide-react";

import ReviewList from "@/components/review/review-list";
import ReviewListButton from "@/components/review/review-list-button";

import Image from "next/image";
import Link from "next/link";
import ReviewRatingBadge from "@/components/review/review-rating-badge";
import SkillCardList from "@/components/skill/skill-card-list";
import AddSkillButton from "@/components/skill/buttons/add-skill-button";
import CreateReviewButton from "@/components/review/create-review-button";
import ReviewSummary from "@/components/review/review-summary";
import BrowseCourseList from "../../courses/_components/browse-course-list";
import EditMentorStepAButton from "@/components/mentor/buttons/edit-mentor-stepA-button";
import EditMentorStepBButton from "@/components/mentor/buttons/edit-mentor-stepB-button";
import EditMentorStepCButton from "@/components/mentor/buttons/edit-mentor-stepC-button";
import DeleteMentorButton from "@/components/mentor/buttons/delete-mentor-button";

interface MentorIdPageProps {
  params: { mentorId: string };
}

const MentorIdPage = async ({ params }: MentorIdPageProps) => {
  const profile = await currentProfile();
  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });
  const courses = await db.course.findMany({
    where: {
      mentorId: params.mentorId,
    },
  });

  const skills = await db.skill.findMany({
    where: {
      mentorId: params.mentorId,
    },
  });
  const reviews = await db.review.findMany({
    where: {
      id: {
        in: mentor?.mentorReviewIds,
      },
    },
  });

  let profileIds: string[] = [];
  let rating: number = 0;

  reviews.forEach((review) => {
    rating += review.rating;
    profileIds.push(review.profileId);
  });
  let averageRating = (rating / reviews.length).toFixed(2);

  const posters = await db.profile.findMany({
    where: {
      id: {
        in: profileIds,
      },
    },
  });

  if (!mentor) {
    return null;
  }
  return (
    <main className="flex gap-4 w-full p-4 mt-8">
      <div className="flex flex-col items-center">
        
        <div className="flex md:flex-row flex-col gap-2">
        <Card className="flex items-center relative justify-between gap-4 p-4 w-full">
          <div>
          <div className="flex justify-end">
              {profile  && profile.mentorId===mentor.id &&  (<DeleteMentorButton  mentor={mentor} /> )}
              </div>
          <div className="flex flex-col gap-4 relative justify-between h-auto items-center w-full">
            {mentor.userName && mentor.imageUrl && (
              <Image
                className="rounded-full w-1/2 h-full object-cover"
                src={mentor?.imageUrl}
                width={800}
                height={800}
                alt={mentor?.userName}
              />
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
              {profile && (
                <MentorActionList mentor={mentor} profile={profile} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-between w-full h-auto">
            <div className="flex flex-col ">
              <div className="flex justify-between">
              <span className="font-medium text-lg">
                {mentor.firstName} {mentor.lastName}
              </span>
              <div>
            {profile && profile.mentorId===mentor.id &&  (<EditMentorStepAButton profile={profile} mentor={mentor} /> )}
              </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  @{mentor.userName}
                </p>
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
              <div className="flex justify-between">
              <p className="font-medium text-lg">{mentor.title} </p>
              <div>
              {profile && profile.mentorId===mentor.id &&  (<EditMentorStepBButton profile={profile} mentor={mentor} /> )}
              </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Badge
                  variant={"secondary"}
                  className="flex items-center gap-1"
                >
                  <LocateFixedIcon className="h-4 w-4" />
                  <span>{mentor.location}</span>
                </Badge>

                <Badge
                  variant={"secondary"}
                  className="flex items-center gap-1"
                >
                  <UserCheck className=" h-4 w-4" />
                  <span>{mentor.followingStudentIds.length}</span>
                </Badge>

                <Badge
                  variant={"secondary"}
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>{mentor.subscribedStudentIds.length}</span>
                </Badge>

                <Badge
                  variant={"secondary"}
                  className="flex items-center gap-1"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>${mentor.subscriptionCost}</span>
                </Badge>

                <Badge
                  variant={"secondary"}
                  className="flex items-center gap-1"
                >
                  <Clock3 className="h-4 w-4" />
                  <span>${mentor.rateCost}</span>
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between">
              <p className="font-medium text-lg">Hours </p>
                <div>
                {profile && profile.mentorId===mentor.id &&  (<EditMentorStepCButton profile={profile} mentor={mentor} /> )}
                </div>
                </div>
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
              <p className="font-medium text-lg">About </p>
              <p className="text-muted-foreground">{mentor.about}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 p-4 w-full">
          <h2 className="font-bold text-2xl">Courses</h2>
       {profile&&(  <BrowseCourseList courses={courses} mentor={mentor} profile={profile}/>   )}
       </div>
       </div>
        </Card>

        <div>
        <div className="flex flex-col p-4 gap-4">
          <div className="flex justify-between">
            <h2 className="font-medium text-lg">Skills</h2>
            {mentor.id === profile?.mentorId && (
              <AddSkillButton mentor={mentor} />
            )}
          </div>
          <div className="flex flex-col gap-4">
            {profile && mentor && (
              <SkillCardList
                mentor={mentor}
                skills={skills}
                profile={profile}
              />
            )}
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex flex-col gap-4 p-4 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Reviews</p>
              <div>
                {profile && (
                  <CreateReviewButton mentor={mentor} profile={profile} />
                )}
              </div>
            </div>
            {profile &&
              reviews.map((review) => (
                <ReviewSummary
                  key={review.id}
                  mentor={mentor}
                  profile={profile}
                  review={review}
                  posters={posters}
                />
              ))}
          </div>
        </div>
        </div>
         </div>   
         
      </div>
    </main>
  );
};
export default MentorIdPage;
