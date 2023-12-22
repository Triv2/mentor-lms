import { Course, Mentor, Profile, Review, Skill, Subject } from "@prisma/client";
import ReviewListItem from "./review-list-item";
import { ScrollArea } from "../ui/scroll-area";


interface ReviewListProps {
  mentor:Mentor;
  profile:Profile;
  course?:Course;
  subject?:Subject;
  reviews:Review[];
  posters:Profile[];
  onClose: () => void;
}

const ReviewList = ({
  mentor,
  profile,
  subject,
  course,
  reviews,
  posters,
  onClose,
}:ReviewListProps) => {

  
  return (
<div>
  <ScrollArea className="h-[100px]">
    {subject && !course && reviews.map((review) => (
      <ReviewListItem key={mentor.id} mentor={mentor} profile={profile} review={review} subject={subject} posters={posters} onClose={onClose}/>
    ))}
    {!subject && course && reviews.map((review) => (
      <ReviewListItem key={mentor.id} mentor={mentor} profile={profile} review={review} course={course} posters={posters} onClose={onClose}/>
    ))}
    {!subject && !course && reviews.map((review) => (
      <ReviewListItem key={mentor.id} mentor={mentor} profile={profile} review={review} posters={posters} onClose={onClose}/>
    ))}
    </ScrollArea>
</div>
  );
}
export default ReviewList;