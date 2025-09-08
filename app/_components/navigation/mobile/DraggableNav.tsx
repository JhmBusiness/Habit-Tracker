"use client";
import {
  LegacyAnimationControls,
  motion,
  PanInfo,
  useDragControls,
  Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { authInterface } from "@/app/_lib/interfaces/authInterface";
import NavAndUtilLinks from "../common/NavAndUtilLinks";
import UtilityIcons from "../common/UtilityIcons";
import { useUserProfile } from "@/app/_lib/_utils/queries";

interface DraggableNavProps extends authInterface {
  toggleMenu: () => void;
  openNavAnimation: () => void;
  closeNavAnimation: () => void;
  animationControls: LegacyAnimationControls;
}

function DraggableNav({
  user,
  logout,
  isLoadingAvatar,
  authLoading,
  avatarSrc,
  isMenuOpen,
  toggleMenu,
  openNavAnimation,
  closeNavAnimation,
  animationControls,
}: DraggableNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();
  const { profileData } = useUserProfile();
  const displayName = profileData?.display_name.split(" ")[0] || "User";

  const [topHeight, setTopHeight] = useState<number>(0);

  const HANDLE_HEIGHT_PX = 28;

  useEffect(() => {
    const measureMenuHeight = () => {
      if (menuRef.current) {
        const actualHeight = menuRef.current.clientHeight - HANDLE_HEIGHT_PX;
        setTopHeight(actualHeight);
      }
    };

    measureMenuHeight();

    window.addEventListener("resize", measureMenuHeight);
    return () => {
      window.removeEventListener("resize", measureMenuHeight);
    };
  }, []);

  const navVariants: Variants = {
    close: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      y: -topHeight,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  function handleDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    // 01). Check menu ref/menu exists
    if (!menuRef.current) return;

    // 02). Work out const for calculations
    const currentYOffset = info.offset.y;
    const currentYVelocity = info.velocity.y;

    // 03). Check whether the menu should close or open on drag
    if (!isMenuOpen) {
      if (-currentYVelocity > 250) {
        toggleMenu();
        openNavAnimation();
      } else if (currentYOffset > -120) {
        closeNavAnimation();
      } else {
        toggleMenu();
        openNavAnimation();
      }
      return;
    }

    if (isMenuOpen) {
      if (currentYVelocity > 250) {
        toggleMenu();
        closeNavAnimation();
      } else if (currentYOffset < 120) {
        openNavAnimation();
      } else {
        toggleMenu();
        closeNavAnimation();
      }
      return;
    }
  }

  return (
    <motion.div
      ref={menuRef}
      className={`bg-light rounded-t-md w-full top-[-28px] absolute h-fit max-h-[94dvh] overflow-y-scroll no-scrollbar`}
      // Animation
      animate={animationControls}
      variants={navVariants}
      // Dragging
      drag="y"
      dragListener={false}
      onDragEnd={handleDragEnd}
      dragControls={controls}
      dragConstraints={{
        top: -topHeight,
        bottom: 0,
      }}
      dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
      // dragElastic={0}
    >
      {/* Pull up bar */}
      <div
        className="py-3 bg-white select-none hover:cursor-grab"
        onPointerDown={(event) => controls.start(event)}
        // onPointerUp={() => controls.cancel()}
        style={{ touchAction: "none" }}
      >
        <div className="bg-grey h-1 w-30 rounded-xl mx-auto"></div>
      </div>
      {/* Account picture  */}
      <div className="relative h-[198px] overflow-hidden">
        <div className="absolute w-full h-full flex items-center justify-center">
          {/* Util icons */}
          <UtilityIcons />
          {/* Rounded user pic and welcome msg */}
          <div className="absolute flex flex-col gap-2 items-center justify-center z-10">
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
            <div className="w-full h-full absolute animate-pulse">
              <div className="size-full bg-dark-fourty"></div>
            </div>
          ) : (
            <img
              src={avatarSrc}
              referrerPolicy="no-referrer"
              alt="Avatar blurred background."
              className="w-full blur-[4px] absolute scale-110"
            />
          )}

          <div className="w-full h-20 bg-gradient-to-t from-black to-transparent absolute bottom-0 opacity-80"></div>
        </div>
      </div>
      {/* Nav links */}
      <NavAndUtilLinks
        handleLogOut={logout}
        closeNavAnimation={closeNavAnimation}
        toggleMenu={toggleMenu}
        type="mobile"
      />
    </motion.div>
  );
}

export default DraggableNav;
