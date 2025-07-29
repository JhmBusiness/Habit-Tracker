"use client";
import { useAuth } from "@/app/_context/AuthContext";
import { useUserAvatar } from "@/app/_lib/hooks/data-service";
import MobileNav from "../navigation/mobile/MobileNav";
import TabletNav from "../navigation/tablet/TabletNav";
import DesktopNav from "../navigation/desktop/DesktopNav";

// interface navContainerProps {
//   children: ReactNode;
// }

function NavContainer() {
  const { user, loading: authLoading, logout } = useAuth();
  const { avatarSrc, isLoading: isLoadingAvatar } = useUserAvatar(
    user,
    authLoading
  );

  return (
    <div className="md:sticky md:top-0 md:h-dvh xl:py-10 xl:pl-10">
      <DesktopNav
        user={user}
        logout={logout}
        avatarSrc={avatarSrc}
        authLoading={authLoading}
        isLoadingAvatar={isLoadingAvatar}
      />
      <TabletNav
        user={user}
        logout={logout}
        avatarSrc={avatarSrc}
        authLoading={authLoading}
        isLoadingAvatar={isLoadingAvatar}
      />
      <MobileNav
        user={user}
        logout={logout}
        avatarSrc={avatarSrc}
        authLoading={authLoading}
        isLoadingAvatar={isLoadingAvatar}
      />
    </div>
  );
}

export default NavContainer;
