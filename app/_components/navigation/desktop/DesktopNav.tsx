import { User } from "@supabase/supabase-js";
import UtilityIcons from "../common/UtilityIcons";
import NavAndUtilLinks from "../common/NavAndUtilLinks";
import { useUserProfile } from "@/app/_lib/_utils/queries";

interface navAuthProps {
  user: User | null;
  logout: () => void;
  avatarSrc: string;
  authLoading: boolean;
  isLoadingAvatar: boolean;
}

function DesktopNav({
  avatarSrc,
  authLoading,
  isLoadingAvatar,
  user,
  logout,
}: navAuthProps) {
  const { profileData } = useUserProfile();
  const displayName = profileData?.display_name.split(" ")[0] || "User";

  return (
    <div className="hidden xl:flex flex-col bg-bg-light h-full w-[420px] rounded-xl overflow-y-scroll no-scrollbar">
      <div className="relative w-full min-h-[240px] overflow-hidden">
        {/* Top */}
        <div className="absolute w-full h-full flex justify-center">
          <UtilityIcons type="desktop" />
          {/* Rounded user pic and welcome msg */}
          <div className="absolute bottom-4 flex flex-col gap-3 items-center justify-center z-10">
            {isLoadingAvatar || authLoading ? (
              <div className="animate-pulse w-32 h-32">
                <div className="rounded-full size-full bg-dark-fourty"></div>
              </div>
            ) : (
              <img
                src={avatarSrc}
                referrerPolicy="no-referrer"
                alt="Rounded image of the user."
                className="rounded-full w-32 h-32"
              />
            )}
            {displayName.length > 8 ? (
              <h3 className="text-light">
                Welcome, {displayName.slice(0, 10) + "..."}!
              </h3>
            ) : (
              <h3 className="text-light">Welcome, {displayName}!</h3>
            )}
          </div>
          {/* Bg and dark gradient */}
          {isLoadingAvatar || authLoading ? (
            <div className="w-full h-full animate-pulse">
              <div className="size-full bg-dark-fourty"></div>
            </div>
          ) : (
            <img
              src={avatarSrc}
              referrerPolicy="no-referrer"
              alt="Avatar blurred background."
              className="w-full blur-[4px] scale-110"
            />
          )}
          <div className="w-full h-20 bg-gradient-to-t from-black to-transparent absolute bottom-0 opacity-80"></div>
        </div>
      </div>
      {/* Nav Links */}
      <NavAndUtilLinks handleLogOut={logout} type="desktop" />
    </div>
  );
}

export default DesktopNav;
