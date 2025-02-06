import Link from "next/link";
import { ArrowRight, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="fixed top-0 z-50 flex h-20 w-full items-center border-b bg-background/80 px-6 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="#">
          <MessageSquare className="mr-2 h-7 w-7 text-primary" />
          <span className="text-2xl font-bold">ChatArchiver</span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
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
      <main className="flex-1 pt-20">
        <section className="relative w-full px-6 py-24 md:py-32 lg:py-48">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="max-w-4xl space-y-4">
                <h1 className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                  Preserve Your Digital Conversations in Style
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Transform your WhatsApp chats into beautifully archived
                  memories. Simple, secure, and elegantly organized.
                </p>
              </div>
              <div className="space-x-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="lg" className="rounded-full px-8">
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
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(0,0,0,0.1),transparent)]" />
        </section>

        <section
          id="features"
          className="w-full overflow-hidden py-24 lg:py-32"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Key Features
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Everything you need to preserve and relive your precious
                conversations
              </p>
            </div>

            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: ArrowRight,
                  title: "Seamless Login",
                  description:
                    "Quick and secure authentication with your favorite providers. Start archiving in seconds.",
                },
                {
                  icon: Upload,
                  title: "Simple Upload",
                  description:
                    "Drag and drop your WhatsApp chat exports. Automatic parsing and organization.",
                },
                {
                  icon: MessageSquare,
                  title: "Beautiful Display",
                  description:
                    "Clean interface with powerful search, filtering, and media preview capabilities.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-background to-background/50 p-8 transition-all hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="relative w-full py-24 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Three simple steps to get started with ChatArchiver
              </p>
            </div>

            <div className="relative mt-20 grid gap-10 sm:grid-cols-3">
              {/* Connecting line in the background */}
              <div className="absolute left-0 top-12 hidden h-0.5 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent sm:block" />

              {[
                {
                  step: "1",
                  title: "Sign In",
                  description:
                    "Securely authenticate using your Google or GitHub account. Your data stays private and protected.",
                },
                {
                  step: "2",
                  title: "Upload Chats",
                  description:
                    "Export your WhatsApp conversations and upload them to our platform. We'll handle the rest.",
                },
                {
                  step: "3",
                  title: "View and Explore",
                  description:
                    "Browse, search, and relive your conversations in a beautiful, organized interface.",
                },
              ].map((step, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-8 ring-background">
                    {step.step}
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{step.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(0,0,0,0.05),transparent)]" />
        </section>

        <section className="w-full py-24 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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

      <footer className="border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center space-x-2 md:mb-0">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ChatArchiver
              </span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400"
                href="#"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-sm text-gray-500 underline-offset-4 hover:underline dark:text-gray-400"
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
