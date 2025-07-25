"use client";
import DemoLoginBtn from "./_components/auth/DemoLoginBtn";
import GoogleSignInBtn from "./_components/auth/GoogleSignInBtn";
import LandingLogin from "./_components/auth/LandingLogin";
import LandingPageBg from "./_components/ui/LandingPageBg";

export default function Home() {
  return (
    <LandingPageBg>
      <LandingLogin>
        <h1>
          Welcome to <span className="text-primary-accent">The Pond</span>
        </h1>
        <p className="leading-[1.5em]">
          Start tracking your habits and let&apos;s become better than we were
          yesterday.
        </p>
        <div className="flex gap-4 w-full justify-center mt-2 flex-col sm:flex-row">
          <GoogleSignInBtn />
          <DemoLoginBtn />
        </div>
      </LandingLogin>
    </LandingPageBg>
  );
}
