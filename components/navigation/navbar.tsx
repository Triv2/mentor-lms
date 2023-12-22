import { currentProfile } from "@/lib/current-profile";
import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

const Navbar = async () => {
  const user = (await currentUser()) || null;
  const name = `${user?.username}`;
  const profile = (await currentProfile()) || null;

  return (
    <nav className="fixed w-full h-[3.5rem] flex items-center px-6 justify-between z-50 bg-background border-b-1">
      <Link className="flex items-center justify-center gap-1" href="/dashboard">
        <Image src="/logo-cwam.webp" width={75} height={75} alt="logo" />
      </Link>

      {/* {profile && (
        <Badge className="cursor-pointer" variant={"secondary"}>
          Role : {profile.role}
        </Badge>
      )} */}

      {!user ? (
        <div className="flex items-center justify-center gap-2 pr-5">
          <Link
            className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs md:text-sm lg:text-lg font-semibold hover:scale-110 hover:bg-white dark:bg-zinc-500 dark:hover:text-blue-300/80 dark:hover:bg-zinc-400 text-blue-600 hover:text-blue400 dark:text-blue-400 bg-zinc-100/80"
            href="/sign-in"
          >
            Login
          </Link>
          <Link
            className="rounded-md px-2 py-1 flex items-center justify-center shadow-md text-xs md:text-sm lg:text-lg  font-semibold hover:scale-110 hover:bg-white dark:bg-zinc-500 dark:hover:text-purple-300/80 dark:hover:bg-zinc-400 text-purple-600 hover:text-purple-400 dark:text-purple-400 bg-zinc-100/80"
            href="/sign-up"
          >
            Join
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center w-full gap-2">
            <div className="flex items-center gap-1">
              <h1 className="text-sm text-muted-foreground font-light">welcome</h1>
              <h1 className="font-medium">{name}</h1>
            </div>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonPopoverCard: "pointer-events-auto",
                  userButtonAvatarBox: "h-8 w-8",
                },
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
