import { Course, Mentor, Profile, Review, Skill, Subject } from "@prisma/client";
import MentorsCardListItem from "./mentors-card-list-item";

interface MentorsCardListProps {
  mentors: Mentor[];
  courses: Course[];
  subjects: Subject[];
  skills: Skill[];
  profile: Profile;
  reviews: Review[];
  posters: Profile[];
}

const MentorsCardList = ({ mentors, courses, profile, subjects, skills, reviews,posters }: MentorsCardListProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <h2 className="font-bold text-lg">List of all Mentors</h2>
      {profile &&
        mentors.map((mentor) => (
          <MentorsCardListItem
            key={mentor.id}
            mentor={mentor}
            courses={courses}
            profile={profile}
            subjects={subjects}
            skills={skills}
            reviews={reviews}
            posters={posters}
          />
        ))}
    </div>
  );
};
export default MentorsCardList;
