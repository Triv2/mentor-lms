"use client";
import { useState, useEffect } from "react";

import { Mentor, Profile } from "@prisma/client";

import { AlertModal } from "../modals/alert-modal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "../ui/button";

import CreateReviewButton from "../review/create-review-button";
import { UserPlus, UserPlus2 } from "lucide-react";

interface MentorActionListProps {
  mentor: Mentor;
  profile: Profile;
}

const MentorActionList: React.FC<MentorActionListProps> = ({ mentor, profile }) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [follow, setFollow] = useState(false);
  const [unFollowing, setUnFollowing] = useState(false);
  const [unSubscribed, setUnSubscribed] = useState(false);
  const [review, setReview] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const following = profile.followingMentorIds.includes(mentor.id) || null;
  const subscribed = profile.subscribedMentorIds.includes(mentor.id) || null;
  const onSubscribe = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/mentors/${mentor.id}/subscribe`, { subscribe: true });
      setSubscribe(false);
      toast.success("Subscription Updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  const onFollow = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/mentors/${mentor.id}/follow`, { follow: true });
      setFollow(false);
      toast.success("Follow Updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  const unSubscribe = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/mentors/${mentor.id}/subscribe`, { subscribe: false });
      setUnSubscribed(false);
      toast.success("Subscription Updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  const unFollow = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/mentors/${mentor.id}/follow`, { follow: false });
      setUnFollowing(false);
      toast.success("Follow Updated!");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <AlertModal
        isOpen={subscribe}
        loading={loading}
        onConfirm={onSubscribe}
        onClose={() => {
          setSubscribe(false);
        }}
      />
      {/* <AlertModal
        isOpen={follow}
        loading={loading}
        onConfirm={onFollow}
        onClose={() => {
          setFollow(false);
        }}
      /> */}
      <AlertModal
        isOpen={unSubscribed}
        loading={loading}
        onConfirm={unSubscribe}
        onClose={() => {
          setUnSubscribed(false);
        }}
      />
      {/* <AlertModal
        isOpen={unFollowing}
        loading={loading}
        onConfirm={unFollow}
        onClose={() => {
          setUnFollowing(false);
        }}
      /> */}

      <div className="flex gap-2 w-full">
        {subscribed ? (
          <Button
            onClick={() => setUnSubscribed(true)}
            className="w-full flex items-center gap-2 bg-cyan-600/10 hover:bg-cyan-600/20 hover:text-cyan-600 text-cyan-600"
          >
            <UserPlus className="w-4 h-4" />
            <span>Un - Subscribe</span>
          </Button>
        ) : (
          <Button
            onClick={() => setSubscribe(true)}
            className="w-full flex items-center gap-2 bg-cyan-600/10 hover:bg-cyan-600/20 hover:text-cyan-600 text-cyan-600"
          >
            <UserPlus className="w-4 h-4" />
            <span>Subscribe</span>
          </Button>
        )}
        {/* {following ? (
          <Button
            onClick={() => setUnFollowing(true)}
            className="w-full flex items-center gap-2 bg-sky-600/10 hover:bg-sky-600/20 hover:text-sky-600 text-sky-600"
          >
            <UserPlus2 className="w-4 h-4" />
            <span>Un - Follow</span>
          </Button>
        ) : (
          <Button
            onClick={() => setFollow(true)}
            className="w-full flex items-center gap-2 bg-sky-600/10 hover:bg-sky-600/20 hover:text-sky-600 text-sky-600"
          >
            <UserPlus2 className="w-4 h-4" />
            <span>Follow</span>
          </Button>
        )} */}
      </div>
      <CreateReviewButton mentor={mentor} profile={profile} />
    </div>
  );
};
export default MentorActionList;
