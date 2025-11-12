"use client";
// For handling data fetching from the database or external APIs.
import { Inputs } from "@/app/_components/my-account/MyAccount";
import { createClient } from "@/app/_lib/supabase/client";
import toast from "react-hot-toast";
import { HabitCompletionRecord } from "../interfaces/habits";
import {
  CreateUserHabitVariables,
  DeleteHabitInterface,
  DeletePostInterface,
  DeleteUserVariables,
} from "../interfaces/dataServiceInterfaces";

// Fetch avatar URL from supabase.
export async function getAvatarUrl(userId: string): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching user avatar URL:", error.message);
    throw new Error(`Failed to fetch user avatar URL: ${error.message}`);
  }

  return data?.avatar_url || null;
}

// Fetch user profile
export async function getUserProfile(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, original_avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error.message);
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }
  return data;
}

// Fetch user stats
export async function getUserStats(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching user stats:", error.message);
    throw new Error(`Failed to fetch user stats: ${error.message}`);
  }
  return data;
}

// Fetch all user habits
export async function getUserHabits(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user habits:", error.message);
    throw new Error(`Failed to fetch user habits: ${error.message}`);
  }
  return data;
}

// Fetch all user habits
export async function getUserHabitCurrentStreak(habitId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("habits")
    .select("current_streak")
    .eq("id", habitId);

  if (error) {
    console.error("Error fetching user habits:", error.message);
    throw new Error(`Failed to fetch user habits: ${error.message}`);
  }
  return data;
}

// Fetch all user posts
export async function getUserPosts(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user posts:", error.message);
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
  return data;
}

// Fetch user posts
export async function getMostRecentPost(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      console.log(`No recent posts found for user ID: ${userId}`);
      return null;
    }

    console.error("Error fetching user posts:", error.message);
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }

  return data || null;
}

// Fetch all habit id's for the habit completions created today.
export async function getDailyHabitCompletionsIds(userId: string) {
  const supabase = createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { data, error } = await supabase
    .from("habit_completions")
    .select("habit_id")
    .eq("user_id", userId)
    .gte("completed_at_timestamp", today.toISOString())
    .lt("completed_at_timestamp", tomorrow.toISOString());

  if (error) {
    console.error(
      "Error fetching daily habit completion count:",
      error.message
    );
    throw new Error(
      `Failed to fetch daily habit completion count: ${error.message}`
    );
  }

  return data;
}

// Fetch habit completions count
export async function getDailyHabitCompletionsCount(
  userId: string
): Promise<number> {
  const supabase = createClient();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const { count, error } = await supabase
    .from("habit_completions")
    .select("id", { count: "exact" })
    .eq("user_id", userId)
    .gte("completed_at_timestamp", today.toISOString())
    .lt("completed_at_timestamp", tomorrow.toISOString());

  if (error) {
    console.error(
      "Error fetching daily habit completion count:",
      error.message
    );
    throw new Error(
      `Failed to fetch daily habit completion count: ${error.message}`
    );
  }

  return count || 0;
}

// Fetch all milestone habit completions today
export async function getDailyMilestoneCompletions(
  userId: string
): Promise<HabitCompletionRecord[]> {
  const supabase = createClient();

  const now = new Date();
  const todayUtcStart = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0,
      0,
      0,
      0
    )
  );
  const tomorrowUtcStart = new Date(todayUtcStart);
  tomorrowUtcStart.setUTCDate(todayUtcStart.getUTCDate() + 1);

  const { data, error } = await supabase
    .from("habit_completions")
    .select("*")
    .eq("user_id", userId)
    .eq("is_milestone", true)
    .gte("completed_at_timestamp", todayUtcStart.toISOString())
    .lt("completed_at_timestamp", tomorrowUtcStart.toISOString());

  if (error) {
    console.error("Error fetching daily milestone completions:", error.message);
    throw new Error(
      `Failed to fetch daily milestone completions: ${error.message}`
    );
  }

  return data || [];
}

// Mark habit as completed
export async function markHabitAsComplete(
  userId: string | undefined,
  habitId: string
): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase.from("habit_completions").insert([
    {
      user_id: userId,
      habit_id: habitId,
    },
  ]);

  if (error) {
    console.log("Error marking habit as complete:", error?.message);
    throw new Error(`Failed to mark habit as complete: ${error?.message}`);
  }

  toast.success("Habit completed!");
}

// Fetch user comments

// Fetch user likes

// ----- Updates -----
export async function updateUserProfile({ username, avatarUrl }: Inputs) {
  const supabase = createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (username.includes(" ") || username.length === 0) {
    toast.error("Invalid username");
    throw new Error("User profile could not be updated");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ display_name: username, avatar_url: avatarUrl })
    .eq("id", sessionData.session?.user.id)
    .select();

  if (error?.code === "23505") {
    toast.error("Username already taken");
  } else if (error) {
    console.error(error);
    toast.error("Error! Please try again");
    throw new Error("User profile could not be updated");
  }
  return data;
}

// ----- Deletions -----
export async function deletePost({ postId }: DeletePostInterface) {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);
    if (error) {
      console.log("Supabase deletion error:", error);
      toast.error("Failed to delete post! Please try again.");
      return false;
    }
    toast.success("Post deleted successfully!");
    return true;
  } catch (err) {
    console.error("Network or Execution Error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}

export async function deleteHabit({ habitId }: DeleteHabitInterface) {
  const supabase = createClient();

  try {
    const { error } = await supabase.from("habits").delete().eq("id", habitId);
    if (error) {
      console.log("Supabase deletion error:", error);
      toast.error("Failed to delete habit! Please try again.");
      return false;
    }
    toast.success("Habit deleted successfully!");
    return true;
  } catch (err) {
    console.error("Network or Execution Error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}

export async function createUserHabit(category: string, userId?: string) {
  const supabase = createClient();

  if (!userId) {
    console.error("No userID provided to createUserhabit.");
    toast.error("User not authenticated. Please log in again.");
    return false;
  }

  try {
    const { error } = await supabase
      .from("habits")
      .insert([{ user_id: userId, category }])
      .select();

    if (error) {
      console.log("Supabase insert error:", error);
      toast.error("Failed to create habit! Please try again.");
      return false;
    }

    toast.success("Habit created successfully!");
    return true;
  } catch (err) {
    console.error("Network or Execution Error:", err);
    toast.error("An unexpected error occurred. Please try again.");
    return false;
  }
}
