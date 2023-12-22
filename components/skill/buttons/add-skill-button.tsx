"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Course, Mentor, Subject } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit, PlusCircle } from "lucide-react";
import AddCourseFeatureModal from "@/components/modals/create/add-course-feature-modal";
import AddSubjectFeatureModal from "@/components/modals/create/add-subject-feature-modal";
import CreateSkillModal from "@/components/modals/create/create-skill-modal";

interface AddSkillButtonProps {
  mentor: Mentor;
  
}

const AddSkillButton: React.FC<AddSkillButtonProps> = ({ mentor }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-fuchsia-500/10 flex items-center gap-2 text-fuchsia-500 hover:bg-fuchsia-500/20 hover:text-fuchsia-500"
        onClick={() => setAdd(true)}
      >
        <PlusCircle className="h-4 w-4" />
        
      </Button>

      <CreateSkillModal isOpen={add} onClose={() => setAdd(false)} mentor={mentor} />
    </div>
  );
};
export default AddSkillButton;
