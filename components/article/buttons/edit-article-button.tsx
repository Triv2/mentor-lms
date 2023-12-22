"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Article, Course, Feature, Mentor, Section } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit, PlusCircle } from "lucide-react";
import AddCourseFeatureModal from "@/components/modals/create/add-course-feature-modal";
import EditFeatureModal from "@/components/modals/edit/edit-feature-modal";
import EditSectionModal from "@/components/modals/edit/edit-section-modal";
import EditArticleModal from "@/components/modals/edit/edit-article-modal";

interface EditArticleButtonProps {
  mentor: Mentor;
  article?: Article;
}

const EditArticleButton: React.FC<EditArticleButtonProps> = ({ mentor, article }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-orange-500/10 flex items-center gap-2 text-orange-500 hover:bg-orange-500/20 hover:text-orange-500"
        onClick={() => setEdit(true)}
      >
        <Edit className="h-4 w-4" />
      </Button>

   {article &&( <EditArticleModal
        isOpen={edit}
        onClose={() => {
          setEdit(false);
        }}
        mentor={mentor}
        article={article}
      />)}
    </div>
  );
};
export default EditArticleButton;
