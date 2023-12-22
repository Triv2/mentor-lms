

import Navbar from "@/components/navigation/navbar";
import NavButton from "@/components/navigation/navbutton";
import { currentUser } from "@clerk/nextjs";

import { MousePointerClick } from "lucide-react";
import Image from "next/image";

interface LandingPageProps {}

const LandingPage = async () => {
  const user= await currentUser() || null;
  return (
    <div className="h-screen w-full">

 

<div className="min-h-screen h-auto flex items-center justify-center w-full">
 

<div className="flex flex-col items-center justify-center h-auto ">


<div className="flex flex-col items-center justify-center py-1 gap-1 w-full">
  <h1 className="font-bold text-3xl md:text-8xl font-sans bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl ">Mentor-Up</h1>
  <h1 className="font-bold text-2xl md:text-7xl font-sans bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl">Learn to Code</h1>
  <h1 className="font-bold text-xl md:text-5xl font-sans bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent  drop-shadow-2xl">Improve your Life</h1>
  <h1 className="font-bold text-lg md:text-2xl font-sans bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent  drop-shadow-2xl">Grow</h1>
</div>

<div className="flex items-center justify-center">
  <Image
    src="/landing-logo.png"
    width={250}
    height={250}
    alt="heroImage"
  />
  {user ? (<NavButton
  href="/dashboard"
  text="Get Mentored"
  className="rounded-md flex items-center justify-center shadow-smpx-3 py-2 gap-2 bg-zinc-200 dark:shadow-white hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-blue-300 font-semibold group group-hover:text-emerald-300 dark:hover:bg-zinc-400 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
  icon={<MousePointerClick className="h-5 w-5 text-blue-500 group-hover:text-blue-300"/>}
/>):(<NavButton
  href="/sign-up"
  text="Get Mentored"
  className="rounded-md flex items-center justify-center shadow-sm px-3 py-2 gap-2 bg-zinc-200  dark:shadow-white hover:scale-110 dark:hover-bg-zinc-500 dark:hover:text-blue-300 font-semibold group group-hover:text-emerald-300 dark:hover:bg-zinc-400 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
  icon={<MousePointerClick className="h-5 w-5 text-blue-500 group-hover:text-blue-300"/>}
/>)}

</div>



<div className="flex items-center flex-col gap-1 font-bold text-md ">
<h2>Learn Typescript and Next.js 14 with modern technologies.</h2>
<h3>Newbies welcome, even if you have never coded before.</h3>
<h4>Grow over time with a schedule of tasks and events to keep you engaged.</h4>
<h5>and much... much... more.</h5>
</div>

</div>

</div>




</div>
  );
}
export default LandingPage;