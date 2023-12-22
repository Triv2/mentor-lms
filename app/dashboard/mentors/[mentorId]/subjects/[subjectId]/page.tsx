import AddSubjectFeatureButton from "@/components/feature/buttons/add-subject-feature-button";
import EditFeatureButton from "@/components/feature/buttons/edit-feature-button";
import MentorListItem from "@/components/mentor/list/mentor-list-item";
import CreateReviewButton from "@/components/review/create-review-button";
import ReviewRatingBadge from "@/components/review/review-rating-badge";
import ReviewSummary from "@/components/review/review-summary";
import StudentList from "@/components/student/list/student-list";
import SubjectEditButton from "@/components/subject/buttons/subject-edit-button";
import { Card } from "@/components/ui/card";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Divider } from "@nextui-org/react";
import { Review } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const MentorSubjectManagementPage = async ({ params }: { params: { mentorId: string; subjectId: string } }) => {
  const profile = await currentProfile();
  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });
  const subject = await db.subject.findUnique({
    where: {
      id: params.subjectId,
    },
  });
  if (!mentor || !subject) {
    return {
      notFound: true,
    };
  }
  const students = await db.profile.findMany({
    where: {
      id: {
        in: subject.studentIds,
      },
    },
  });
  const skills = await db.skill.findMany({
    where: {
      mentorId: mentor.id,
    },
  });
  const subjects = await db.subject.findMany({
    where: {
      mentorId: mentor.id,
    },
  });
  const courses = await db.course.findMany({
    where: {
      mentorId: mentor.id,
    },
  });
  const features= await db.feature.findMany({
    where: {
      id: {
        in: subject.featureIds,
      }
    },
  }) || null;

  const purchases = await db.purchase.findMany({
    where: {
      mentorId: params.mentorId,
      subjectId: params.subjectId,
    },
  });

  const reviews = await db.review.findMany({
    where: {
      mentorId: params.mentorId,
    },
  });
  const subjectReviews = await db.review.findMany({
    where: {
      subjectId: params.subjectId,
    },
  });

  let mentorReviews: Review[] = [];
 
  let posterIds: string[] = [];
  let rating: number = 0;

  reviews.forEach((review) => {
    if (!review.subjectId) {
      mentorReviews.push(review);
    }
    if (review.profileId) {
      posterIds.push(review.profileId);
    }
    rating += review.rating;
  });

  const profiles = await db.profile.findMany({
    where: {
      id: {
        in: posterIds,
      },
    },
  });
  let averageRating = (rating / subjectReviews.length).toFixed(2);
  let created = new Date(subject.createdAt).toDateString();
  let updated = new Date(subject.updatedAt).toDateString();
  let cost = subject.cost?.toFixed(2);

  return (
    <main className="p-4">
    <Card className="flex w-full justify-between gap-4 p-4">

      <div className="w-full flex flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          {subject.name && (
            <Image className="rounded-lg w-full" src={subject?.imageUrl} width={250} height={250} alt={subject?.name} />
          )}

          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold text-2xl">{subject.name}</p>

            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-medium">${cost}</p>

              <ReviewRatingBadge averageRating={averageRating} />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm">( {subject.studentIds.length} ) Students</p>
              <p className="text-blue-500 text-sm">( {subject.reviewIds.length} ) Reviews</p>
            </div>
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-2">
          <div className="text-xs">
            <p>Last Updated : {updated}</p>
            <p>Created at : {created}</p>
          </div>
          Mentor
          {profile && (
            <MentorListItem
              mentor={mentor}
              skills={skills}
              subjects={subjects}
              courses={courses}
              profile={profile}
              reviews={mentorReviews}
              posters={profiles}
            />
          )}
        </div>
        {profile?.mentorId === mentor.id && (
          <div className="flex flex-col w-full gap-1">
            Enrolled Students
            <StudentList mentor={mentor} students={students} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-lg">{subject.name}</p>
          {profile && mentor.id === profile.mentorId && (
            <div className="flex flex-col gap-2">
              <Link href={`/dashboard/students/subjects/${subject.id}`} className=" rounded-md bg-green-600 p-1">
              Student View</Link>
              <SubjectEditButton mentor={mentor} subject={subject} />
            </div>
          )}
        </div>

        <p>{subject.description}</p>

        <div className="flex w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <p className="font-medium text-lg">What is Covered</p>
              {profile && profile.mentorId && <AddSubjectFeatureButton mentor={mentor} subject={subject} />}
            </div>

            {features &&
              features.map((feature) => (
                <div key={feature.id}>
                  <div className="flex justify-between w-full">
                    <p className="text-lg font-medium">{feature.title}</p>
                    {profile && mentor && mentor.id === profile.mentorId && (
                      <EditFeatureButton mentor={mentor} feature={feature} />
                    )}
                  </div>
                  <p>{feature.description}</p>
                </div>

            ))}

       
        </div>
        
        
      </div>
      <div className="flex w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex items-center justify-between ">
          <p className="w-full text-lg font-semibold">Instructions</p>
          <div>
          {/* {profile && mentor && mentor.id === profile.mentorId && (  <AddCourseSectionButton mentor={mentor} course={course} />)} */}
          </div>
          </div>
          
         
                
            
        </div>
        
      </div>
      
      
        <div className="flex w-full">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Reviews</p>
              <div>{profile && <CreateReviewButton mentor={mentor} profile={profile} subject={subject} />}</div>
            </div>
            {profile &&
              subjectReviews.map((review) => (
                <ReviewSummary
                  key={review.id}
                  mentor={mentor}
                  profile={profile}
                  review={review}
                  subject={subject}
                  posters={profiles}
                />
              ))}
          </div>
        </div>
      </div>
    </Card>
  </main>
  );
};
export default MentorSubjectManagementPage;
