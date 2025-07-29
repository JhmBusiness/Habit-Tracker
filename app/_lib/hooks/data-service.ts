"use client";
// For handling data fetching from the database or external APIs.
import { useState, useEffect } from "react";
import { createClient } from "@/app/_lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface UseUserAvatarResult {
  avatarSrc: string;
  isLoading: boolean;
}

// This Fn takes a user object and sets a avatarUrl which is then formatted with the helper function getAvatarImageSrc.
export function useUserAvatar(
  user: User | null,
  authLoading: boolean
): UseUserAvatarResult {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(true);
  const supabase = createClient();

  useEffect(() => {
    async function getAvatar() {
      if (authLoading || !user) {
        setAvatarUrl(null);
        setIsLoadingAvatar(false);
        return;
      }

      setIsLoadingAvatar(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading avatar:", error.message);
        setAvatarUrl(null);
      } else if (data) {
        setAvatarUrl(data.avatar_url);
      } else {
        setAvatarUrl(null);
      }

      setIsLoadingAvatar(false);
    }

    getAvatar();
  }, [user, authLoading, supabase]);

  // Fn to provide correct avartar url
  function getAvatarImageSrc(avatarUrl: string | null): string {
    if (
      avatarUrl &&
      (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://"))
    ) {
      return avatarUrl;
    } else if (avatarUrl && ["0", "1", "2", "3"].includes(avatarUrl)) {
      return `/profile-pics/${avatarUrl}.png`;
    }
    return "/profile-pics/0.png";
  }

  const finalAvatarSrc = getAvatarImageSrc(avatarUrl);

  return { avatarSrc: finalAvatarSrc, isLoading: isLoadingAvatar };
}
