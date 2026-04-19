import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export interface comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: Timestamp;
}

export interface commentTop {
  userId: string;
  content: string;
  created_at: Timestamp;
}
