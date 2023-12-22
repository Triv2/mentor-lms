import { Course, Mentor, Profile, Review, Subject } from "@prisma/client";
import EditReviewButton from "./edit-review-button";
import { Card } from "../ui/card";

interface ReviewSummaryProps {
  mentor: Mentor;
  profile: Profile;
  review: Review;
  course?: Course;
  subject?: Subject;
  posters?: Profile[];
  poster?: Profile;
  onClose?: () => void;
}

const ReviewSummary = ({ mentor, profile, review, course, subject, posters, poster, onClose }: ReviewSummaryProps) => {
  let originalPoster: Profile = poster || profile;

  posters?.forEach((poster) => {
    if (poster.id === review.profileId) {
      originalPoster = poster;
    }
  });

  return (
    <Card className="flex flex-col gap-4 p-4 shadow-none">
      <h1 className="text-lg font-medium">Review Summary Card</h1>
      <div className="flex flex-col gap-2">
        <p>Poster: {originalPoster.name}</p>
        <p>Mentor: {mentor.userName}</p>
        {course && <p>Course: {course.name}</p>}
        {subject && <p>Subject: {subject.name}</p>}
        <p>Rating: {review.rating}</p>
        <p>Review: {review.review}</p>
        <div className="flex">
          {onClose && <EditReviewButton mentor={mentor} profile={profile} review={review} onClose={onClose} />}
          {!onClose && <EditReviewButton mentor={mentor} profile={profile} review={review} />}
        </div>
      </div>
    </Card>
  );
};
export default ReviewSummary;
