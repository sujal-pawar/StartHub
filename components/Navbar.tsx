"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from '@/app/assets/logo.png';
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-5 py-2 sm:py-3 dark:bg-black/80 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="transition-transform hover:scale-105">
          <div className="flex items-center justify-center font-semibold gap-1 sm:gap-2">
            <Image src={logo} alt="logo" width={40} height={40} className="object-contain sm:w-[50px] sm:h-[50px]" />
            <h1 className="text-xl sm:text-2xl font-serif text-zinc-900 dark:text-white font-bold tracking-tight">StartHub</h1>
          </div>
        </Link>
        
        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="md:hidden text-zinc-800 dark:text-white">
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />
          
          {session && session?.user ? (
            <>
              <Link 
                href="/startup/create"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="text-zinc-800 dark:text-white font-medium">Create</span>
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="text-zinc-800 dark:text-white font-medium">Logout</span>
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 md:hidden flex flex-col gap-3  dark:border-zinc-800">
            
            
            {session && session?.user ? (
              <>
                <div className="flex-between items-center gap-2 mb-2 py-3">
                  <div className="flex gap-2 justify-center items-center">
                  <Avatar className="size-8 border border-zinc-200 dark:border-zinc-700">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-zinc-800 dark:text-white">{session?.user?.name}</span>
                  </div>
                  <Link 
                  href="/startup/create"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <BadgePlus className="size-5 text-zinc-800 dark:text-white" />
                  <span className="text-zinc-800 dark:text-white font-medium">Create</span>
                </Link>
                <ThemeToggle />
                </div>                          
                <div className="pb-5 w-full">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center w-full justify-center border border-1 gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <LogOut className="size-5 text-red-500" />
                  <span className="text-zinc-800 dark:text-white font-medium">Logout</span>
                </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => signIn("github")}
                type="button"
                className="w-full px-5 py-2 rounded-lg bg-zinc-800 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                Login with GitHub
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;