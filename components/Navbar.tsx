"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from '@/app/assets/logo.png';
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const { data: session } = useSession();

  return (    <header className="sticky top-0 z-50 px-5 py-3 dark:bg-black bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <div className="flex items-center justify-center font-semibold gap-2">
            <Image src={logo} alt="logo" width={50} height={50} className="object-contain" />
            <h1 className="text-2xl font-serif text-zinc-900 dark:text-white font-bold tracking-tight">StartHub</h1>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          
          {session && session?.user ? (
            <>
              <Link 
                href="/startup/create"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="max-sm:hidden text-zinc-800 dark:text-white font-medium">Create</span>
                <BadgePlus className="size-5 sm:hidden text-zinc-800 dark:text-white" />
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="max-sm:hidden text-zinc-800 dark:text-white font-medium">Logout</span>
                <LogOut className="size-5 sm:hidden text-red-500" />
              </button>
              
              <Link href={`/user/${session?.user?.email}`} className="transition-transform hover:scale-105">
                <Avatar className="size-10 border-2 border-zinc-200 dark:border-zinc-700">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white">
                    {session?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              type="button"
              className="px-5 py-2 rounded-lg bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Login with GitHub
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;