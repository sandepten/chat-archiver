import Link from "next/link";
import { ArrowRight, Upload, MessageSquare, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageSquare className="h-6 w-6 mr-2 text-primary" />
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            ChatArchiver
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-sm font-medium">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
                  Archive Your Chats, Relive Your Memories
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Securely store and beautifully display your WhatsApp
                  conversations with our easy-to-use chat archiver.
                </p>
              </div>
              <div className="space-x-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="lg" className="rounded-full">
                      Get Started
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </SignedIn>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="rounded-full"
                >
                  <Link href="#how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform hover:scale-105">
                <ArrowRight className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Easy Login</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  Quickly sign in with your Google or GitHub account.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform hover:scale-105">
                <Upload className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Simple Upload</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  Effortlessly upload your exported WhatsApp chats.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg transition-transform hover:scale-105">
                <MessageSquare className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Beautiful Display</h3>
                <p className="text-gray-500 dark:text-gray-300">
                  View your chats in a clean, organized interface.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
              How It Works
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold">Sign In</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Log in securely using your Google or GitHub account.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold">Upload Chats</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Upload your exported WhatsApp chat files to our secure
                  platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow-lg transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold">View and Explore</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Browse through your archived chats in our user-friendly
                  interface.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of users who trust ChatArchiver to preserve their
                digital conversations.
              </p>
              <div className="space-y-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="lg" className="rounded-full">
                      Sign Up Now
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </SignedIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                ChatArchiver
              </span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
                href="#"
              >
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2023 ChatArchiver. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
