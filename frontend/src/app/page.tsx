import Link from "next/link";
import { ArrowRight, Github, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <MessageSquare className="h-6 w-6 mr-2" />
          <span className="font-bold">ChatArchiver</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#how-it-works"
          >
            How It Works
          </Link>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Archive Your Chats, Relive Your Memories
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Securely store and beautifully display your WhatsApp
                  conversations with our easy-to-use chat archiver.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="#login">Get Started</Link>
                </Button>
                <Button variant="outline" asChild>
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
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <ArrowRight className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Easy Login</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Quickly sign in with your Google or GitHub account.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Upload className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Simple Upload</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Effortlessly upload your exported WhatsApp chats.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <MessageSquare className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-bold">Beautiful Display</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  View your chats in a clean, organized interface.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <ol className="grid gap-6 sm:grid-cols-3">
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-3xl font-bold text-primary">1</span>
                <h3 className="text-xl font-bold">Sign In</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Log in securely using your Google or GitHub account.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-3xl font-bold text-primary">2</span>
                <h3 className="text-xl font-bold">Upload Chats</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Upload your exported WhatsApp chat files to our secure
                  platform.
                </p>
              </li>
              <li className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                <span className="text-3xl font-bold text-primary">3</span>
                <h3 className="text-xl font-bold">View and Explore</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Browse through your archived chats in our user-friendly
                  interface.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section
          id="login"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get Started Today
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who trust ChatArchiver to preserve
                  their digital conversations.
                </p>
              </div>
              <div className="space-y-2 space-x-2">
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/api/auth/login">
                    <Github className="mr-2 size-4" />
                    Sign up with Google
                  </Link>
                </Button>
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/api/auth/login">
                    <Github className="mr-2 size-4" />
                    Sign up with GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 ChatArchiver. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
