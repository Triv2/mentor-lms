'use client'

import {useState, useEffect} from'react'
import { Input } from "@nextui-org/react";
import { MentorInviteCode } from '@prisma/client';




interface InviteCodeProps {
  mentorCode:MentorInviteCode;
}

const InviteCode:React.FC<InviteCodeProps> = ({
 mentorCode,
}) => {

const [isMounted, setIsMounted] = useState(false);
const [copiedCode,setCopiedCode] = useState(false);
const [copiedUrl,setCopiedUrl] = useState(false);
const [isLoading,setIsLoading] = useState(false);

const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : "";

const inviteUrl = `${origin}/dashboard/mentors/invite/${mentorCode.inviteCode}`;



useEffect(() => {
setIsMounted(true);
}, []);

const onCopyUrl = () => {
  
  navigator.clipboard.writeText(inviteUrl);
  setCopiedUrl(true);

  setTimeout(() => {
    setCopiedUrl(false);
  }, 1000);
};

useEffect(() => {
setIsMounted(true);
}, []);

if (!isMounted) {
return null;
}
  return (
    <div className="text-xs w-full ">

     <Input className=" border-0 focus-visible:ring-0 text-xs/10 text-black dark:text-white focus-visible:ring-offset-0"
              value={inviteUrl} disabled={isLoading} size="sm" onClick={onCopyUrl}
            />

    
    </div>
  );
}
export default InviteCode;