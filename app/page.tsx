import { signInAction } from "@/app/actions";
import { FormMessage } from "@/components/library/form-message";
import { SubmitButton } from "@/components/library/submit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800">
      {/* Left Section - Branding */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary to-primary/90 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Flawless</h1>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ticket Management System
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Lorem Impsum Odor.
          </p>
        </div>

        {/* <div className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-20">
          <Image
            src="/abstract-wave.svg"
            alt="Decorative background"
            fill
            className="object-cover"
          />
        </div> */}
      </div>

      {/* Right Section - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              Sign in to your ticket dashboard
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="h-11"
                />
              </div>

              <SubmitButton
                formAction={signInAction}
                className="w-full h-11"
                variant="default"
              >
                Sign In
              </SubmitButton>

              {/* Removed FormMessage since we're not using searchParams */}
              
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}