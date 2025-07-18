"use client";
import { createClient } from "@/app/_lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    // Initiate the Google OAuth flow
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
      // Add a react_hot_toast message here.
    }
  };

  return (
    // Replace testing div with actual design.
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Sign In
      </h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Sign in to manage your habits.
      </p>
      <button
        onClick={handleGoogleSignIn}
        style={{
          backgroundColor: "#4285F4", // Google blue
          color: "white",
          padding: "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="white"
        >
          <path
            d="M17.64 9.2045c0-.6386-.0573-1.2514-.1636-1.841H9v3.4814h4.8436c-.2086 1.1536-.84 2.1527-1.8218 2.8914v2.2418h2.891c1.7-.156 3.1782-1.0415 4.1673-2.3168z"
            fill="#FFFFFF"
          />
          <path
            d="M9 18c2.43 0 4.473-.8068 5.964-2.1809L12.0732 13.578c-.7928.5332-1.8545.8455-3.0732.8455-2.35 0-4.341-1.5832-5.0845-3.714H.9572v2.2418C2.4482 16.944 5.56 18 9 18z"
            fill="#FFFFFF"
          />
          <path
            d="M3.9155 10.7145c-.17-.5332-.2664-1.1045-.2664-1.7145s.0964-1.1814.2664-1.7145V5.0418H.9572c-.5127 1.03-.8027 2.1932-.8027 3.4282s.29 2.3982.8027 3.4282L3.9155 10.7145z"
            fill="#FFFFFF"
          />
          <path
            d="M9 3.5727c1.3218 0 2.5027.4545 3.4418 1.34L15.3455 2.18C13.8545.8068 11.81.0 9 .0 5.56.0 2.4482 1.056 0.9572 3.055L3.9155 5.297c.7436-2.1318 2.7345-3.7143 5.0845-3.7143z"
            fill="#FFFFFF"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
