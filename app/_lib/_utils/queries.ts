// This file is for Fns which create and manage queries.
import { Inputs } from "@/app/_components/my-account/MyAccount";
import { useAuth } from "@/app/_context/AuthContext";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { DEFAULT_AVATAR_URL } from "../constants";
import {
  CreateNewCommentVariables,
  CreateUserHabitVariables,
  CreateUserPostVariables,
  DeleteHabitVariables,
  DeletePostVariables,
  EditUserPostVariables,
  useDailyHabitCompletionsCountInterface,
  UserLikePostVariable,
  userStats,
  useUserAvatarResult,
  useUserStatsInterface,
} from "../interfaces/dataServiceInterfaces";
import { habit, HabitCompletionRecord, habitIds } from "../interfaces/habits";
import { post, PostsCategoryData } from "../interfaces/posts";
import { profileData } from "../interfaces/profile";
import {
  createPostLike,
  createUserComment,
  createUserHabit,
  createUserPost,
  deleteHabit,
  deletePost,
  deletePostLike,
  editUserPost,
  getAllPostComments,
  getAllPostLikes,
  getAllPublicPosts,
  getAvatarUrl,
  getDailyHabitCompletionsCount,
  getDailyHabitCompletionsIds,
  getDailyMilestoneCompletions,
  getMostRecentPost,
  getPostCategoriesCreatedToday,
  getUserHabits,
  getUserPosts,
  getUserProfile,
  getUserStats,
  updateUserProfile,
} from "./dataService";
import { comment } from "../interfaces/comments";
import { getAvatarImageSrc } from "./actions";
import { Likes } from "../interfaces/likes";

// Returns avatar src, loading state, and any errors.
export function useUserAvatar(
  user: User | null,
  authLoading: boolean,
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

  // Create query for posts
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

// Delete user post
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, DeletePostVariables>({
    mutationFn: ({ postId }) => {
      return deletePost({ postId });
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["postCategoriesToday"] });
        queryClient.invalidateQueries({ queryKey: ["mostRecentPost"] });
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error("Deletion failed due to a connection error.");
    },
  });
}

// Delete user habit
export function useDeleteHabit() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, DeleteHabitVariables>({
    mutationFn: ({ habitId }) => {
      return deleteHabit({ habitId });
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["habits"] });
        queryClient.invalidateQueries({ queryKey: ["userStats"] });
        queryClient.invalidateQueries({
          queryKey: ["dailyHabitCompletionsCount"],
        });
      }
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      toast.error("Deletion failed due to a connection error.");
    },
  });
}

// Delete UserAccount
export function useDeleteUserAccount() {
  const { user, session, logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user || !session) {
        throw new Error("User not authenticated");
      }

      const res = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error?.message || "Failed to delete account");
      }

      try {
        await logout();
      } catch (err) {
        console.warn("Logout failed (user likely already deleted):", err);
      }
    },
  });
}

export function useCreateNewUserHabit() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, CreateUserHabitVariables>({
    mutationFn: async ({ category }) => {
      return createUserHabit(category, userId);
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["habits"] });
        queryClient.invalidateQueries({ queryKey: ["userStats"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Deletion failed due to a connection error.");
    },
  });
}

export function useCreateNewPost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, CreateUserPostVariables>({
    mutationFn: async ({
      title,
      content,
      category,
      streakMilestone,
      commentsEnabled,
      isPublic,
    }) => {
      return createUserPost(
        category,
        userId,
        title,
        content,
        streakMilestone,
        commentsEnabled,
        isPublic,
      );
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["postCategoriesToday"] });
        queryClient.invalidateQueries({ queryKey: ["mostRecentPost"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Deletion failed due to a connection error.");
    },
  });
}

export function usePostCategoriesCreatedToday() {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.id || null;

  const {
    data: postCategoryData,
    isLoading: isLoadingPostCategoryData,
    isError: isPostCategoryError,
    error: postCategoryError,
  } = useQuery<PostsCategoryData[], Error>({
    queryKey: ["postCategoriesToday", userId],
    queryFn: () => getPostCategoriesCreatedToday(userId!),
    enabled: !!userId && !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingPostCategoryData;

  return { postCategoryData, loading, isPostCategoryError, postCategoryError };
}

export function useUpdateUserPost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, EditUserPostVariables>({
    mutationFn: async ({
      postId,
      title,
      content,
      category,
      streakMilestone,
      commentsEnabled,
      isPublic,
    }) => {
      return editUserPost(
        postId,
        category,
        userId,
        title,
        content,
        streakMilestone,
        commentsEnabled,
        isPublic,
      );
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({ queryKey: ["postCategoriesToday"] });
        queryClient.invalidateQueries({ queryKey: ["mostRecentPost"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Deletion failed due to a connection error.");
    },
  });
}

// Get all public posts
export function useAllPublicPosts() {
  const { loading: authLoading } = useAuth();

  // Creat query for public posts
  const {
    data: postsData = [],
    isLoading: isLoadingAllPublicPosts,
    isError: isPublicPostsError,
    error: publicPostsError,
  } = useQuery<post[], Error>({
    queryKey: ["publicPosts"],
    queryFn: getAllPublicPosts,
    enabled: !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingAllPublicPosts;

  return { postsData, loading, isPublicPostsError, publicPostsError };
}

// Use a users profile data for posts using their id.
export function useUserProfileById(userId: string | null) {
  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery<profileData, Error>({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  return { profileData, isLoading, isError, error };
}

// Create new comment
export function useCreateNewComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, CreateNewCommentVariables>({
    mutationFn: async ({ comment, postId }) => {
      return createUserComment(comment, userId, postId);
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["postComments"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Comment creation failed due to a connection error.");
    },
  });
}

// Get post comments
export function usePostComments(postId: string | undefined) {
  const { loading: authLoading } = useAuth();

  // Create query for all comments
  const {
    data: postsComments = [],
    isLoading: isLoadingAllPostsComments,
    isError: isPostsCommentsError,
    error: postsCommentsError,
  } = useQuery<comment[], Error>({
    queryKey: [`postComments`, postId],
    queryFn: () => getAllPostComments(postId!),
    enabled: !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingAllPostsComments;

  return { postsComments, loading, isPostsCommentsError, postsCommentsError };
}

// Create new like
export function useUserLikePost() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, UserLikePostVariable>({
    mutationFn: async ({ postId }) => {
      return createPostLike(userId, postId);
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["postLikes"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("failed to like post due to a connection error.");
    },
  });
}

// Use all post likes
export function usePostLikes(postId: string | undefined) {
  const { loading: authLoading } = useAuth();

  // Create query for all likes
  const {
    data: postsLikes = [],
    isLoading: isLoadingAllPostLikes,
    isError: isPostsLikesError,
    error: postsLikesError,
  } = useQuery<Likes[], Error>({
    queryKey: [`postLikes`, postId],
    queryFn: () => getAllPostLikes(postId!),
    enabled: !authLoading,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const loading = authLoading || isLoadingAllPostLikes;

  return { postsLikes, loading, isPostsLikesError, postsLikesError };
}

// Delete post like
export function useDeletePostLike() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation<boolean, Error, UserLikePostVariable>({
    mutationFn: async ({ postId }) => {
      return deletePostLike(userId, postId);
    },
    onSuccess: (isSuccess) => {
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["postLikes"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to unlike post due to a connection error.");
    },
  });
}
