"use client";
import Image from "next/image";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

import GoogleLogo from "../../../public/logos/google-logo.svg";

function GoogleSignInBtn() {
  const supabase = createClient();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
      router.push("/");
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="border border-dark flex items-center justify-center w-full sm:w-fit max-w-[400px] mx-auto gap-3 rounded-xl py-3 px-[18px] cursor-pointer hover:bg-dark hover:text-light duration-200"
      >
        <Image src={GoogleLogo} width={24} height={24} alt="Google's logo." />
        Sign in with Google
      </button>
    </div>
  );
}

export default GoogleSignInBtn;
