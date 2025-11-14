export interface useUserAvatarResult {
  avatarSrc: string;
  isLoading: boolean;
  error: Error | null;
}

export interface userStats {
  user_id: string;
  posts_count: number;
  comments_count: number;
  active_habit_count: number;
  likes_given_count: number;
  likes_received_count: number;
  followers_count: number;
  following_count: number;
  highest_ever_habit_streak: number;
}

export interface useUserStatsInterface {
  userStats: userStats | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface useDailyHabitCompletionsCountInterface {
  completedCount: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export interface DeletePostInterface {
  postId: string | undefined;
}

export interface DeletePostVariables {
  postId?: string;
}

export interface DeleteHabitInterface {
  habitId: string | undefined;
}

export interface DeleteHabitVariables {
  habitId?: string;
}

export interface DeleteUserVariables {
  id?: string;
}

export interface CreateUserHabitVariables {
  category: string;
  userId?: string;
}

export interface CreateUserPostVariables {
  category: string;
  userId?: string;
  title: string;
  content: string;
  streakMilestone: string;
}
