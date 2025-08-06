import { User } from "@supabase/supabase-js";

export interface authInterface {
  avatarSrc: string;
  authLoading: boolean;
  isLoadingAvatar: boolean;
  user?: User | null;
  logout: () => void;
  isMenuOpen?: boolean;
}
