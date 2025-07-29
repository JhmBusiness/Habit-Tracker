"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function DemoLoginBtn() {
  const router = useRouter();

  const [demoBtnMsg, setDemoBtnMsg] = useState("Try Demo");
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    setDemoBtnMsg("Loading...");

    try {
      // 1). Generate a temporary user's credentials.
      const uniqueId =
        Date.now().toString(36) + Math.random().toString(36).substring(2);
      const email = `demo_user_${uniqueId}@thepond.app`;
      const password =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      // 2). Make a POST request to the demo-login route.
      const response = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 3). Check if the API request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create and sign in demo user."
        );
      }

      // 4). If successful, redirect the user to the dashboard.
      router.push("/app/dashboard");
      toast("Welcome to your Dashboard!");
    } catch (err) {
      // 5). Catch errors and display message to user.
      toast.error("Error! Please try again");
      console.error("Demo login client-side error:", err);
    } finally {
      // 6). Set initial values back.
      setIsDemoLoading(false);
      setDemoBtnMsg("Try Demo");
    }
  };

  return (
    <button
      onClick={handleDemoLogin}
      disabled={isDemoLoading}
      className="bg-primary-accent border border-primary-accent text-light rounded-xl mx-auto py-3 px-[18px] cursor-pointer hover:bg-dark-blue hover:border-dark-blue duration-200 w-full sm:w-fit max-w-[400px]"
    >
      {demoBtnMsg}
    </button>
  );
}

export default DemoLoginBtn;
