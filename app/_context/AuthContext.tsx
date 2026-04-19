// // AuthContext will provide the user with the user object, the session and the isLoading state. This context will be used when fetching data for the specific user and is useful for any other user specific UI features.
// "use client";
// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/app/_lib/supabase/client";
// import { User, Session } from "@supabase/supabase-js";

// interface AuthContextType {
//   user: User | null;
//   session: Session | null;
//   loading: boolean;
//   logout: () => Promise<void>;
// }

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// function AuthProvider({ children }: AuthProviderProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [session, setSession] = useState<Session | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const supabase = createClient();
//   const router = useRouter();

//   useEffect(() => {
//     // 01). Fetch initial session.
//     async function getActiveSession() {
//       const { data, error } = await supabase.auth.getSession();

//       if (error) {
//         console.error("Error getting session:", error);
//         setUser(null);
//         setSession(null);
//       } else {
//         setSession(data.session);
//         setUser(data.session?.user || null);
//       }
//       setLoading(false);
//     }
//     getActiveSession();

//     // 02). Real-time auth change listener.
//     const { data } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user || null);
//       setSession(session || null);

//       if (event === "SIGNED_OUT") {
//         router.push("/");
//       }
//     });
//     return () => {
//       data.subscription.unsubscribe();
//     };
//   }, [supabase, router]);

//   // 03). Logout
//   async function logout(): Promise<void> {
//     setLoading(true);
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error("Failed to sign out", error);
//     }
//     setLoading(false);
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         loading,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined)
//     throw new Error("AuthContext was used outside AuthProvider");
//   return context;
// }

// export { AuthProvider, useAuth };

"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/_lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const supabase = useMemo(() => createClient(), []); // ✅ stable instance
  const router = useRouter();

  useEffect(() => {
    // 01). Fetch initial session.
    async function getActiveSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setUser(null);
        setSession(null);
      } else {
        setSession(data.session);
        setUser(data.session?.user || null);
      }

      setLoading(false);
    }

    getActiveSession();

    // 02). Real-time auth change listener (no redirect here)
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setSession(session || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  // 03). Logout (handles redirect)
  async function logout(): Promise<void> {
    setLoading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Failed to sign out", error);
      setLoading(false);
      return;
    }

    setUser(null);
    setSession(null);
    setLoading(false);

    router.replace("/");

    // 🔥 fallback (guaranteed redirect)
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
