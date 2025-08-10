"use client";
import { authInterface } from "@/app/_lib/interfaces/authInterface";
import { useAnimationControls } from "framer-motion";
import { useState } from "react";
import DraggableNav from "./DraggableNav";
import FixedNavBar from "./FixedNavBar";
import MobileDarkBg from "./MobileDarkBg";

function MobileNav({
  avatarSrc,
  authLoading,
  isLoadingAvatar,
  user,
  logout,
}: authInterface) {
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
    <div className="md:hidden fixed bottom-0 flex flex-col justify-self-center w-full max-w-[408px] shadow-mobile-nav rounded-t-md z-50">
      {/* 01). Fixed nav bar */}
      {!isMenuOpen && (
        <FixedNavBar
          isLoadingAvatar={isLoadingAvatar}
          avatarSrc={avatarSrc}
          authLoading={authLoading}
          isMenuOpen={isMenuOpen}
          logout={logout}
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
