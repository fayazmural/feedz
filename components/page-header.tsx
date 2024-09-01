import React from "react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import HeaderMenu from "./header-menu";
import Link from "next/link";

const PageHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 lg:px-20 relative mx-auto border-b ">
        <div className="flex h-14 items-center justify-between">
          <Link href="/">
            <h1 className="text-4xl font-bold text-slate-800 tracking-wide">
              Feedz
            </h1>
          </Link>
          <div>
            <SignedOut>
              <SignInButton>
                <Button className="bg-black">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button className="bg-black ml-2">Sign Up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <HeaderMenu />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
