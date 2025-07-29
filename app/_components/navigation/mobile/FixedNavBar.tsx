import Link from "next/link";
import MobileNavLinks from "./FixedNavLinks";

interface MobileNavProps {
  isLoadingAvatar: boolean;
  avatarSrc: string;
  authLoading: boolean;
  isMenuOpen: boolean;
}

function FixedNavBar({
  isLoadingAvatar,
  authLoading,
  avatarSrc,
  isMenuOpen,
}: MobileNavProps) {
  return (
    <div className="bg-white py-3 px-6 w-full relative z-50">
      <MobileNavLinks>
        {/* Profile Pic */}
        <Link
          href="/app/dashboard#my-account"
          className="w-11 h-11 rounded-lg brightness-100 hover:brightness-105 duration-200"
        >
          {isLoadingAvatar || authLoading ? (
            <div className="rounded-full animate-pulse">
              <div className="size-11 rounded-full bg-dark-fourty"></div>
            </div>
          ) : (
            <img
              src={avatarSrc}
              referrerPolicy="no-referrer"
              alt="User avatar"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </Link>
      </MobileNavLinks>
    </div>
  );
}

export default FixedNavBar;
