"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans">
            <SessionProvider>
                <Navbar />
                {children}
            </SessionProvider>
        </main>
    );
}