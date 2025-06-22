"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { BadgePlus, LogOut, Menu, X, PlusCircle, Github, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from '@/app/assets/logo.png';
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 px-3 sm:px-5 py-2 sm:py-3 backdrop-blur-md transition-all duration-300 ${scrolled
      ? "dark:bg-black/95 bg-white/95 shadow-md"
      : "dark:bg-black/80 bg-white/90"
      } border-b dark:border-zinc-800/50 border-zinc-200/70`}>
      <nav className="relative max-w-7xl mx-auto flex justify-between items-center">

        {/* Mobile Menu Toggle */}

        <Image
          src={logo}
          alt="logo"
          width={45}
          height={45}
          className="object-contain"
        />
        {/* Centered Title */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group transition-all"
        >
          <div className="overflow-hidden rounded-full group-hover:scale-110 transition-transform duration-300">
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold tracking-wide text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            StartHub
          </h1>
        </Link>
        <button
          onClick={toggleMenu}
          className="md:hidden text-zinc-800 dark:text-white p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors z-20"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5 ml-auto">
          <ThemeToggle />
          {session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all hover:shadow-sm active:scale-95"
              >
                <PlusCircle className="size-5 text-blue-600 dark:text-blue-400" />
                <span className="text-zinc-800 dark:text-white font-medium">Create</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all hover:shadow-sm active:scale-95"
              >
                <LogOut className="size-5 text-red-500 dark:text-red-400" />
                <span className="text-zinc-800 dark:text-white font-medium">Logout</span>
              </button>
              <Link
                href={`/user/${session.id}`}
                className="relative group p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all"
              >
                <Avatar className="size-10 border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-blue-400 transition-colors">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} className="object-cover" />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white">
                    {session.user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 -right-1 size-6 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center shadow-md transform scale-0 group-hover:scale-100 transition-transform">
                  <User className="size-3.5 text-white" />
                </span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all hover:shadow-md active:scale-95"
            >
              <Github className="size-5" />
              <span>Login with GitHub</span>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="fixed inset-x-0 top-[56px] bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg md:hidden flex flex-col gap-3 border-b dark:border-zinc-800 border-zinc-200 animate-in slide-in-from-top duration-300 z-10">
            {session?.user ? (
              <div className="p-4 flex flex-col gap-4">
                <Link
                  href={`/user/${session.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Avatar className="size-12 border-2 border-zinc-200 dark:border-zinc-700">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} className="object-cover" />
                    <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white">
                      {session.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-white">{session.user.name}</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">View profile</span>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <ThemeToggle className="flex-1" />
                  <Link
                    href="/startup/create"
                    className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlusCircle className="size-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium dark:text-white">Create</span>
                  </Link>
                </div>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-red-600 dark:text-red-400 font-medium border border-red-200 dark:border-red-800/30"
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-3">
                <div className="pb-3 flex justify-end">
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => signIn("github")}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all"
                >
                  <Github className="size-5" />
                  <span>Login with GitHub</span>
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
