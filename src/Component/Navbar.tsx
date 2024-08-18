"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import useFirebaseAuth from './useFirebaseAuth';
import Link from 'next/link';

export default function Navbar() {
  // Invoke Firebase authentication
  useFirebaseAuth();

  return (
    <nav className="bg-zinc-900 w-full p-4 flex flex-col md:flex-row justify-between items-center">
      {/* Left side: Brand and Logo */}
      <div className="text-white flex items-center mb-4 md:mb-0">
        <Link href='/'>
        <p className="text-xl font-semibold">AI FLASHCARDS</p>
        </Link>
        <svg
          className="ml-2"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="white"
        >
          <path d="m608-368 46-166-142-98-46 166 142 98ZM160-207l-33-16q-31-13-42-44.5t3-62.5l72-156v279Zm160 87q-33 0-56.5-24T240-201v-239l107 294q3 7 5 13.5t7 12.5h-39Zm206-5q-31 11-62-3t-42-45L245-662q-11-31 3-61.5t45-41.5l301-110q31-11 61.5 3t41.5 45l178 489q11 31-3 61.5T827-235L526-125Zm-28-75 302-110-179-490-301 110 178 490Zm62-300Z"/>
        </svg>
      </div>
      {/* Right side: Button and Authentication */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0">
        <Link href="#pricing">
        <Button variant="outline" className="mr-0 md:mr-4">
          Get now
        </Button>
        </Link>
        <Link href="/Collection">
        <Button variant="outline" className="mr-4">Collection</Button>
        </Link>
        <SignedOut>
          <Button variant="outline" className="mr-0 md:mr-4">
            <SignInButton />
          </Button>
        </SignedOut>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
