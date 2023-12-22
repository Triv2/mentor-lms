"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Course, Mentor, Section } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit, PlusCircle } from "lucide-react";
import AddCourseSectionModal from '@/components/modals/create/add-course-section-modal'
import AddArticleModal from "@/components/modals/create/add-article-modal";


interface AddArticleButtonProps {
  mentor: Mentor;
  section: Section;
}

const AddArticleButton: React.FC<AddArticleButtonProps> = ({ mentor, section }) => {
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
        className="bg-yellow-500/10 flex items-center gap-2 text-yellow-500 hover:bg-yellow-500/20 hover:text-yellow-500"
        onClick={() => setAdd(true)}
      >
        <PlusCircle className="h-4 w-4" />
        
      </Button>

      <AddArticleModal
        isOpen={add}
        onClose={() => {
          setAdd(false);
        }}
        mentor={mentor}
        section={section}
      />
    </div>
  );
};
export default AddArticleButton;
