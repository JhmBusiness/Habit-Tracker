export interface habit {
  id: string;
  user_id: string;
  category: string;
  description: string;
  isActive: boolean;
  current_streak: number;
  highest_streak: number;
  created_at: string;
}

export interface habitIds {
  habit_id: string;
}

export interface HabitMilestoneInfo {
  habit: habit;
  nextMilestoneStreak: number;
  daysUntilNextMilestone: number;
}

export interface habitListInterface {
  category: string;
  streak: number;
  highestStreak?: number;
  habitId: string;
  habitData?: habit;
  isCompletedToday?: boolean;
}

export interface HabitCompletionRecord {
  id: string;
  user_id: string;
  habit_id: string;
  completed_at_timestamp: string;
  is_milestone: boolean;
}
