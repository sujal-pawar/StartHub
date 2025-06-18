
import Navbar from "../components/Navbar";
import React from "react";
import dynamic from "next/dynamic";
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