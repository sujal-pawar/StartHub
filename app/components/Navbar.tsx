"use client"
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/logo.png';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isSidebarOpen]);
    const { data: session } = useSession();

    return (
        <nav className="dark:bg-black text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Image
                            src={logo}
                            alt="StartHub Logo"
                            height={50}
                            width={50}
                            className="object-contain"
                        />
                        <h1 className="text-xl md:text-2xl font-semibold font-serif  whitespace-nowrap">
                            StartHub
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {
                            session && session.user ? (
                                <>
                                    <Link href={"/startup/create"} className="text-white hover:text-gray-300 transition-colors">
                                        Create
                                    </Link>
                                    <button onClick={() => signOut()}>
                                        Logout
                                    </button>
                                    <Link href={`/user/${session?.user?.id}`} className="text-white hover:text-gray-300 transition-colors">
                                    <span>{session?.user?.image}</span>
                                    </Link>
                                </>
                            ) : (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    signIn('github');
                                    }} className="text-white hover:text-gray-300 transition-colors">
                                    <button type='submit'>Login</button>
                                </form>
                            )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-expanded={isSidebarOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div
                    ref={sidebarRef}
                    className={`fixed inset-y-0 right-0 w-64 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="p-5">
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Image src={logo} alt={'Logo'} height={50} className='mr-2' />
                                <h2 className="text-xl  text-white font-semibold font-serif">StartHub</h2>
                            </div>
                            <button
                                onClick={toggleSidebar}
                                className="text-gray-400 hover:text-white focus:outline-none"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Sidebar Content */}
                        <div className="space-y-3">
                            <a
                                href="#"
                                className="block py-3 px-4 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="block py-3 px-4 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                            >
                                All
                            </a>
                            <div className="border-t border-gray-700 my-4"></div>
                            <a
                                href="#"
                                className="block py-3 px-4 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                            >
                                Contact
                            </a>
                            <a
                                href="#"
                                className="block py-3 px-4 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                            >
                                About Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
