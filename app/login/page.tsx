"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Github, Sparkles, Rocket, Users, MessageSquare, TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "../../components/ThemeProvider";
import { ThemeToggle } from "../../components/ThemeToggle";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use this to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
    
    // Rotate featured startups every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    await signIn("github", { callbackUrl });
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <div className="flex h-screen w-full">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 sm:px-16 md:px-20 lg:px-28">
          <div className="absolute top-6 right-6">
            <ThemeToggle />
          </div>
          
          <div className="w-full max-w-md space-y-10">
            <div className="text-center space-y-2">
              <Image 
                src={logo}
                alt="StartHub Logo" 
                width={70} 
                height={70} 
                className="mx-auto mb-4"
                priority
              />
              <h1 className="text-3xl md:text-4xl font-bold dark:text-white tracking-tight">
                Welcome to StartHub
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                Join our community of entrepreneurs and innovators
              </p>
            </div>
            
            <div className="space-y-6">
              <button
                onClick={handleGithubLogin}
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-98'}`}
              >
                <Github className="size-5" />
                <span>{isLoading ? 'Signing in...' : 'Continue with GitHub'}</span>
              </button>
              
              <div className="flex items-center justify-center">
                <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
                <span className="px-4 text-sm text-zinc-500 dark:text-zinc-400">or</span>
                <div className="h-px bg-zinc-300 dark:bg-zinc-700 w-full" />
              </div>
              
              <p className="text-center text-zinc-600 dark:text-zinc-400">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
          
          <p className="absolute bottom-6 text-center text-zinc-500 dark:text-zinc-400 text-sm">
            © 2025 StartHub. All rights reserved.
          </p>
        </div>
        
        {/* Right side - Image/Animation */}
        <div className="hidden lg:block w-1/2 relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
          {isClient && (
            <>
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10"></div>
              
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xl px-10">
                <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-white mb-6">
                  Pitch Your Startup, Connect with Entrepreneurs
                </h2>
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    {
                      title: "Showcase Your Vision",
                      icon: "🚀",
                      description: "Present your startup to a community of founders, investors, and enthusiasts"
                    },
                    {
                      title: "Find Collaborators",
                      icon: "👥",
                      description: "Connect with like-minded individuals who share your passion and goals"
                    },
                    {
                      title: "Get Feedback",
                      icon: "💬",
                      description: "Receive valuable insights to refine your startup idea"
                    },
                    {
                      title: "Grow Together",
                      icon: "📈",
                      description: "Join a supportive ecosystem focused on startup success"
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                      <span className="block text-3xl mb-2">{feature.icon}</span>
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>            
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
