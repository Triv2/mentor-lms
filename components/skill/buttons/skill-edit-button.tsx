"use client";
import { useState, useEffect } from "react";
import { Mentor, Skill } from "@prisma/client";
import EditSkillModal from "../../modals/edit/edit-skill-modal";
import { Button } from "../../ui/button";
import { Edit } from "lucide-react";

interface SkillEditButtonProps {
  mentor: Mentor;
  skill: Skill;
}

const SkillEditButton: React.FC<SkillEditButtonProps> = ({ mentor, skill }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <Button
        className="bg-fuchsia-500/10 flex items-center gap-2 text-fuchsia-500 hover:bg-fuchsia-500/20 hover:text-fuchsia-500"
        onClick={() => setEdit(true)}
      >
        <Edit className="w-4 h-4" />
        <span>Edit</span>
      </Button>

      <EditSkillModal
        isOpen={edit}
        onClose={() => {
          setEdit(false);
        }}
        mentor={mentor}
        skill={skill}
      />
    </div>
  );
};
export default SkillEditButton;
