"use client";
import { useState, useEffect } from "react";
import EditCourseModal from "../../modals/edit/edit-course-modal";
import { Course, Mentor, Profile, Subject } from "@prisma/client";
import { Button } from "../../ui/button";
import { Edit, PlusCircle } from "lucide-react";
import AddCourseFeatureModal from "@/components/modals/create/add-course-feature-modal";
import AddSubjectFeatureModal from "@/components/modals/create/add-subject-feature-modal";
import { useRouter } from "next/navigation";

interface CreateAppointmentButtonProps {
  mentor: Mentor;
  profile: Profile;
}

const CreateAppointmentButton: React.FC<CreateAppointmentButtonProps> = ({ mentor, profile }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-1">
      <Button
        className="bg-blue-500/10 flex items-center gap-2 text-blue-500 hover:bg-blue-500/20 hover:text-blue-500"
        onClick={() => router.push(`/dashboard/${mentor.id}/schedule`)}
      >
        <PlusCircle className="h-4 w-4" />
        Schedule Appointment
      </Button>

    </div>
  );
};
export default CreateAppointmentButton;
