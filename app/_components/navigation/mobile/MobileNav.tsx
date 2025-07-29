"use client";
import { useAnimationControls } from "framer-motion";
import { useState } from "react";
import DraggableNav from "./DraggableNav";
import FixedNavBar from "./FixedNavBar";
import MobileDarkBg from "./MobileDarkBg";
import { User } from "@supabase/supabase-js";

interface navAuthProps {
  user: User | null;
  logout: () => void;
  avatarSrc: string;
  authLoading: boolean;
  isLoadingAvatar: boolean;
}

function MobileNav({
  avatarSrc,
  authLoading,
  isLoadingAvatar,
  user,
  logout,
}: navAuthProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const animationControls = useAnimationControls();

  function openNavAnimation() {
    animationControls.start("open");
  }

  function closeNavAnimation() {
    animationControls.start("close");
  }

  function toggleMenu() {
    setIsMenuOpen((menuState) => !menuState);
  }

  return (
    <div className="md:hidden fixed bottom-0 flex flex-col justify-self-center w-full max-w-[408px] shadow-mobile-nav rounded-t-md">
      {/* 01). Fixed nav bar */}
      {!isMenuOpen && (
        <FixedNavBar
          isLoadingAvatar={isLoadingAvatar}
          avatarSrc={avatarSrc}
          authLoading={authLoading}
          isMenuOpen={isMenuOpen}
        />
      )}
      {/* 02). Nav & Bg */}
      {isMenuOpen && (
        <MobileDarkBg
          toggleMenu={toggleMenu}
          closeNavAnimation={closeNavAnimation}
        />
      )}
      <DraggableNav
        user={user}
        logout={logout}
        isLoadingAvatar={isLoadingAvatar}
        avatarSrc={avatarSrc}
        authLoading={authLoading}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        openNavAnimation={openNavAnimation}
        closeNavAnimation={closeNavAnimation}
        animationControls={animationControls}
      />
    </div>
  );
}

export default MobileNav;
