// This file is for Fns which create and manage queries.
import {
  useDailyHabitCompletionsCountInterface,
  userStats,
  useUserAvatarResult,
  useUserStatsInterface,
} from "../interfaces/dataServiceInterfaces";
import { useQuery } from "@tanstack/react-query";
import {
  getAvatarUrl,
  getDailyHabitCompletionsCount,
  getUserStats,
} from "./dataService";
import { DEFAULT_AVATAR_URL } from "../constants";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/app/_context/AuthContext";

// Returns avatar src, loading state, and any errors.
export function useUserAvatar(
  user: User | null,
  authLoading: boolean
): useUserAvatarResult {
  const userId = user?.id || null;

  const {
    data: avatarUrl,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userAvatar", userId],
    queryFn: () => getAvatarUrl(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    placeholderData: (previousData) => previousData || DEFAULT_AVATAR_URL,
  });

  function getAvatarImageSrc(url: string | null | undefined): string {
    if (url && (url.startsWith("http://") || url.startsWith("https://"))) {
      return url;
    } else if (url && ["0", "1", "2", "3"].includes(url)) {
      return `/profile-pics/${url}.png`;
    }
    return DEFAULT_AVATAR_URL;
  }

  const finalAvatarSrc = getAvatarImageSrc(avatarUrl);

  const combinedIsLoading = isQueryLoading || authLoading;

  return {
    avatarSrc: finalAvatarSrc,
    isLoading: combinedIsLoading,
    error: isError ? (error as Error) : null,
  };
}

// Returns all user stats.
export function useUserStats(): useUserStatsInterface {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const {
    data,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<userStats | null, Error>({
    queryKey: ["userStats", userId],
    queryFn: () => getUserStats(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    userStats: data || null,
    isLoading: isQueryLoading || authLoading,
    isError,
    error,
  };
}

// Creates query and returns the number of habits completed today.
export function useDailyHabitCompletionsCount(): useDailyHabitCompletionsCountInterface {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const todayDate = new Date().toISOString().split("T")[0];

  const {
    data,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<number, Error>({
    queryKey: ["dailyHabitCompletionsCount", userId, todayDate],
    queryFn: () => getDailyHabitCompletionsCount(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return {
    completedCount: data ?? 0,
    isLoading: isQueryLoading || authLoading,
    isError,
    error: isError ? (error as Error) : null,
  };
}
