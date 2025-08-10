"use client";
// For handling data fetching from the database or external APIs.
import { createClient } from "@/app/_lib/supabase/client";
import toast from "react-hot-toast";

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
async function getUserProfile(userId: string) {
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

// Fetch user habits
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

// Fetch user posts
export async function getUserPosts(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user posts:", error.message);
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
  return data;
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
