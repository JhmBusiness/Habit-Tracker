// This file is for Fns which create and manage queries.
import { useAuth } from "@/app/_context/AuthContext";
import { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { DEFAULT_AVATAR_URL } from "../constants";
import {
  useDailyHabitCompletionsCountInterface,
  userStats,
  useUserAvatarResult,
  useUserStatsInterface,
} from "../interfaces/dataServiceInterfaces";
import { habit, HabitCompletionRecord, habitIds } from "../interfaces/habits";
import { post } from "../interfaces/posts";
import {
  getAvatarUrl,
  getDailyHabitCompletionsCount,
  getDailyHabitCompletionsIds,
  getDailyMilestoneCompletions,
  getMostRecentPost,
  getUserHabits,
  getUserPosts,
  getUserProfile,
  getUserStats,
  updateUserProfile,
} from "./dataService";
import { profileData } from "../interfaces/profile";
import { Inputs } from "@/app/_components/my-account/MyAccount";
import toast from "react-hot-toast";

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
    } else if (["0", "1", "2", "3"].includes(url!.slice(14, 15))) {
      return `${url}`;
    }
    console.log(url!.slice(14, 15));
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

// Creates a query for both habit_ids created today and also habits a user has.
export function useUncompletedHabits() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  // Creat query for habits
  const {
    data: habitsData,
    isLoading: isLoadingAllHabits,
    isError: isHabitError,
    error: habitError,
  } = useQuery<habit[], Error>({
    queryKey: ["habits", userId],
    queryFn: () => getUserHabits(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // Create query for habit completion ids Today
  const {
    data: todayHabitCompletionIds,
    isLoading: isLoadingTodayCompletions,
    isError: isTodayCompletionError,
    error: todayCompletionError,
  } = useQuery<habitIds[], Error>({
    queryKey: ["todayHabitCompletionIds", userId],
    queryFn: () => getDailyHabitCompletionsIds(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const isLoading =
    isLoadingAllHabits || isLoadingTodayCompletions || authLoading;
  const isError = isHabitError || isTodayCompletionError;
  const error = habitError || todayCompletionError;

  return {
    habitsData: habitsData || [],
    todayHabitCompletionIds: todayHabitCompletionIds || [],
    isLoading,
    isError,
    error,
  };
}

// Creates a query for only the habits that a user has.
export function useUserHabits() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  // Creat query for habits
  const {
    data: habitsData,
    isLoading: isLoadingAllHabits,
    isError: isHabitError,
    error: habitError,
  } = useQuery<habit[], Error>({
    queryKey: ["habits", userId],
    queryFn: () => getUserHabits(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingAllHabits;

  return { habitsData, loading, isHabitError, habitError };
}

export function useDailyHabitCompletionIds() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const {
    data: todayHabitCompletionIds,
    isLoading: isLoadingTodayCompletions,
    isError: isTodayCompletionError,
    error: todayCompletionError,
  } = useQuery<habitIds[], Error>({
    queryKey: ["todayHabitCompletionIds", userId],
    queryFn: () => getDailyHabitCompletionsIds(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const isLoading = isLoadingTodayCompletions || authLoading;

  return {
    todayHabitCompletionIds,
    isLoading,
    isTodayCompletionError,
    todayCompletionError,
  };
}

// Creates query for user posts.
export function useUserMostRecentPost() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const {
    data: usersPost,
    isLoading: isLoadingAllPosts,
    isError: isPostsError,
    error: postsError,
  } = useQuery<post, Error>({
    queryKey: ["mostRecentPost", userId],
    queryFn: () => getMostRecentPost(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingAllPosts;

  return { usersPost, loading, isPostsError, postsError };
}

// Creates query for todays habit completions milestones
export function useUserHabitCompletionMilestonesToday() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const {
    data: milestoneCompletionsToday,
    isLoading: isQueryLoading,
    isError,
    error,
  } = useQuery<HabitCompletionRecord[], Error>({
    queryKey: ["todaysHabitMilestoneCompletions", userId],
    queryFn: () => getDailyMilestoneCompletions(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isQueryLoading;

  return { milestoneCompletionsToday, loading, isError, error };
}

// Creates query for all of users posts
export function useUserPosts() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  // Creat query for habits
  const {
    data: postsData,
    isLoading: isLoadingAllposts,
    isError: isPostsError,
    error: postsError,
  } = useQuery<post[], Error>({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: [],
  });

  const loading = authLoading || isLoadingAllposts;

  return { postsData, loading, isPostsError, postsError };
}

// Creates query for user profile
export function useUserProfile() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  // Creat query for habits
  const {
    data: profileData,
    isLoading: isLoadingProfileData,
    isError: isProfileError,
    error: profileError,
  } = useQuery<profileData, Error>({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingProfileData;

  return { profileData, loading, isProfileError, profileError };
}

// Updates user profile settings, invalidates profile query, and sends toast message.
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting } = useMutation({
    mutationFn: (data: Inputs) => updateUserProfile(data),
    onSuccess: () => {
      toast.success("Profile successfully updated!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["userAvatar"] });
      queryClient.removeQueries({ queryKey: ["userAvatar"], exact: true });
      queryClient.removeQueries({ queryKey: ["userProfile"], exact: true });
    },
    onError: (err) => console.log(err.message),
  });

  return { updateSetting };
}
