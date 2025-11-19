export interface post {
  id: string;
  user_id: string;
  profile_img_url: string;
  category: string;
  title: string;
  content: string;
  comments_count: number;
  likes_count: number;
  comments_enabled: boolean;
  milestone_streak: number;
  is_public: boolean;
}

export interface PostsCategoryData {
  category: string;
}
