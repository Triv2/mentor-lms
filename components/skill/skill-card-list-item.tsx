"use client";

import { Mentor, Profile, Skill } from "@prisma/client";
import { useState, useEffect } from "react";
import SkillEditButton from "./buttons/skill-edit-button";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { CaseUpper, Cpu, FlaskConical } from "lucide-react";
import AddSkillButton from "./buttons/add-skill-button";

interface SkillCardListItemProps {
  skill: Skill;
  mentor: Mentor;
  profile: Profile;
}

const SkillCardListItem: React.FC<SkillCardListItemProps> = ({ skill, mentor, profile }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Card className="flex justify-between relative w-full h-full items-center p-4 overflow-hidden">
      <div className="flex flex-col gap-2">
        <Button
          className="bg-emerald-500/10 flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-500"
          size={"sm"}
        >
          <Cpu className="h-4 w-4" />
          Skill : {skill.name}
        </Button>
        <Button className="bg-sky-500/10 flex items-center gap-2 text-sky-500 hover:bg-sky-500/20 hover:text-sky-500" size={"sm"}>
          <FlaskConical className="h-4 w-4" />
          Experience : {skill.experience}
        </Button>
        <Button
          className="bg-blue-500/10 flex items-center gap-2 text-blue-500 hover:bg-blue-500/20 hover:text-blue-500"
          size={"sm"}
        >
          <CaseUpper className="h-4 w-4" />
          Description : {skill.description}
        </Button>
      </div>
      
      {mentor.id === profile.mentorId && <SkillEditButton mentor={mentor} skill={skill} />}
    </Card>
  );
};
export default SkillCardListItem;
