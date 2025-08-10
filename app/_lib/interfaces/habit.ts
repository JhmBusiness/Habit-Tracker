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
