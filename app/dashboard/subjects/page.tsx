import { db } from "@/lib/db";

import { currentProfile } from "@/lib/current-profile";

import BrowseSubjectList from "./_components/browse-subject-list";

const AllSubjectsPage = async () => {
  const subjects = await db.subject.findMany({});
  const mentors = await db.mentor.findMany({});
  const profile = await currentProfile();

  return (
    <div className="flex flex-col p-4 gap-4">
      <h2 className="font-medium text-lg">List of all Guides</h2>
      <div className="flex flex-col gap-4">
        {mentors &&
          subjects &&
          profile &&
          mentors.map((mentor) => <BrowseSubjectList key={mentor.id} mentor={mentor} subjects={subjects} profile={profile} />)}
      </div>
    </div>
  );
};
export default AllSubjectsPage;
