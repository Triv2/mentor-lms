import CourseEditButton from "@/components/course/buttons/course-edit-button";
import AddCourseFeatureButton from "@/components/feature/buttons/add-course-feature-button";
import EditFeatureButton from "@/components/feature/buttons/edit-feature-button";
import MentorListItem from "@/components/mentor/list/mentor-list-item";
import CreateReviewButton from "@/components/review/create-review-button";
import ReviewRatingBadge from "@/components/review/review-rating-badge";
import ReviewSummary from "@/components/review/review-summary";
import AddCourseSectionButton from "@/components/section/buttons/add-course-section-button";
import EditSectionButton from "@/components/section/buttons/edit-section-button";
import StudentList from "@/components/student/list/student-list";

import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Review } from "@prisma/client";

import Image from "next/image";
import AddArticleButton from "@/components/article/buttons/add-article-button";
import EditArticleButton from "@/components/article/buttons/edit-article-button";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import CourseAddButton from "@/components/course/buttons/course-add-button";

const MentorCourseManagementPage = async ({ params }: { params: { mentorId: string; courseId: string } }) => {
  const profile = await currentProfile();
  const mentor = await db.mentor.findUnique({
    where: {
      id: params.mentorId,
    },
  });
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!mentor || !course) {
    return {
      notFound: true,
    };
  }
  const students =
    (await db.profile.findMany({
      where: {
        id: {
          in: course.studentIds,
        },
      },
    })) || null;
  const skills =
    (await db.skill.findMany({
      where: {
        mentorId: mentor.id,
      },
    })) || null;
  const subjects =
    (await db.subject.findMany({
      where: {
        mentorId: mentor.id,
      },
    })) || null;
  const courses = await db.course.findMany({
    where: {
      mentorId: mentor.id,
    },
  });

  const purchases = await db.purchase.findMany({
    where: {
      mentorId: params.mentorId,
      courseId: params.courseId,
    },
  }) || null;
  const reviews = await db.review.findMany({
    where: {
      mentorId: params.mentorId,
    },
  }) || null;
  const features= await db.feature.findMany({
    where: {
      id: {
        in: course.featureIds,
      }
    },
  }) || null;
  const sections= await db.section.findMany({
    where: {
      id: {
        in: course.sectionIds,
      }
    },
  }) || null;

  let articleIds: string[]=[];
  sections.forEach(section => {
    section.articleIds.forEach(articleId=>{
      articleIds.push(articleId)
    })
  })

  const articles= await db.article.findMany({
    where: {
      id: {
        in: articleIds,
      }
    },
  }) || null;


  let mentorReviews: Review[] = [];
  let courseReviews: Review[] = [];
  let posterIds: string[] = [];
  let rating: number = 0;

  reviews.forEach((review) => {
    if (!review.subjectId) {
      mentorReviews.push(review);
    }
    if (review.profileId) {
      posterIds.push(review.profileId);
    }
    if (review.courseId === params.courseId) {
      rating += review.rating;
      courseReviews.push(review);
    }
  });

  const profiles =
    (await db.profile.findMany({
      where: {
        id: {
          in: posterIds,
        },
      },
    })) || null;
  let averageRating = (rating / courseReviews.length).toFixed(2);
  let created = new Date(course.createdAt).toDateString();
  let updated = new Date(course.updatedAt).toDateString();
  let cost = course.cost?.toFixed(2);
  return (
    <main className="p-4">
      <Card className="flex flex-col md:flex-row w-full  justify-between gap-4 p-4">

        <div className=" w-full md:w-[30%] flex md:flex-col gap-2  p-4">
          <div className="flex flex-col items-center  md:flex-col w-full gap-4">
            {course.name && (
              <Image className="rounded-lg w-full aspect-square max-h-[250px] max-w-[250px]" src={course?.imageUrl} width={250} height={250} alt={course?.name} />
            )}

            <div className="flex flex-col gap-2 w-full p-2">
              <p className="font-semibold text-2xl">{course.name}</p>

              <div className="flex items-center justify-between gap-2">
                <p className="text-lg font-medium">${cost}</p>

                <ReviewRatingBadge averageRating={averageRating} />
              </div>

              <div className="flex flex-col gap-2 py-1">
                <p className="text-sm">( {course.studentIds.length} ) Students</p>
                <p className="text-blue-500 text-sm">( {course.reviewIds.length} ) Reviews</p>
              </div>
              <div>
            {/* add check to see if they have purchased course already, reroute them to student view course instead */}
            {profile &&(<CourseAddButton mentor={mentor} profile={profile} course={course}/>)}
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
          </div>
          <div>
          
          </div>
          
        
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-lg">{course.name}</p>
            {profile && mentor.id === profile.mentorId && (
              <div className="flex flex-col gap-2">
                <Link href={`/dashboard/students/${course.id}`} className=" rounded-md bg-green-600 p-1">
                Student View</Link>
                <CourseEditButton mentor={mentor} course={course} />
              </div>
            )}
          </div>

          <p>{course.description}</p>

          <div className="flex w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <p className="font-medium text-lg">Course Features</p>
                {profile && profile.mentorId && <AddCourseFeatureButton mentor={mentor} course={course} />}
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
            <p className="w-full text-lg font-semibold">Curriculum</p>
            <div>
            {profile && mentor && mentor.id === profile.mentorId && (  <AddCourseSectionButton mentor={mentor} course={course} />)}
            </div>
            </div>
            
            {sections && sections.map((section) => (
                
                <Accordion type="single" collapsible key={section.id}>
                  <AccordionItem value={section.name}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full">
                    <p>{section.name}</p>
                    {profile && mentor && mentor.id === profile.mentorId && (
                    <div className="flex items-center gap-1">
                     <p className="text-muted-foreground">{section.estimatedTime } min</p>
                      <EditSectionButton mentor={mentor} section={section} />
                    </div>
                  )}
                    </div>
                    </AccordionTrigger>
                    <AccordionContent>
                    <p className="text-muted-foreground">{section.description}</p>
                 <div className="flex flex-col justify-between w-full"> 
                  
                  <div className="flex w-full items-center justify-end">
                  {profile && mentor && mentor.id === profile.mentorId && (  <AddArticleButton mentor={mentor} section={section} />)}
                  </div>

                  <div>
                    {section.articleIds.map((articleId) => (
                      <div className="pl-5 flex flex-col py-2 " key={articleId}>
                        
                        <div className="flex justify-between w-full">
                          <p className="text-lg font-medium">{articles?.find((article) => article.id === articleId)?.name}</p>
                          
                          <div className="flex items-center gap-1">
                           <p className="text-muted-foreground"> {articles?.find((article) => article.id === articleId)?.estimatedTime} min</p>
                           {profile && mentor && articles && mentor.id === profile.mentorId && (     
                             <EditArticleButton mentor={mentor} article={articles?.find((article) => article.id === articleId)} />
                           )}
                          </div>
                          
                        </div>

                        <p className="text-muted-foreground">{articles?.find((article) => article.id === articleId)?.description}</p>
                      </div>
                    ))}
                  </div>
                 </div>
                  
                  </AccordionContent>
                 
                  </AccordionItem>
                  </Accordion>
                  
              ))}
          </div>
          
        </div>
        
        
          <div className="flex w-full">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium">Reviews</p>
                <div>{profile && <CreateReviewButton mentor={mentor} profile={profile} course={course} />}</div>
              </div>
              {profile &&
                courseReviews.map((review) => (
                  <ReviewSummary
                    key={review.id}
                    mentor={mentor}
                    profile={profile}
                    review={review}
                    course={course}
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
export default MentorCourseManagementPage;
