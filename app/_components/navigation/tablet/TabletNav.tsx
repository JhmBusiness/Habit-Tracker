import Link from "next/link";
import { User } from "@supabase/supabase-js";

import NavLink from "../common/NavLink";

import { LuLayoutDashboard } from "react-icons/lu";
import { FaCog } from "react-icons/fa";
import {
  FaEarthEurope,
  FaListCheck,
  FaUserGroup,
  FaEnvelopesBulk,
  FaArrowRightFromBracket,
  FaBell,
  FaUserPlus,
} from "react-icons/fa6";
import { authInterface } from "@/app/_lib/interfaces/authInterface";

const navLinks = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    name: "Habits",
    href: "/app/dashboard#myHabits",
    icon: FaListCheck,
  },
  {
    name: "Posts",
    href: "/app/dashboard#myPosts",
    icon: FaEnvelopesBulk,
  },
  {
    name: "Explore",
    href: "/app/posts/explore",
    icon: FaEarthEurope,
  },
  {
    name: "Friends",
    href: "/app/posts/friends",
    icon: FaUserGroup,
    tempDisabled: true,
  },
];

function TabletNav({
  avatarSrc,
  authLoading,
  isLoadingAvatar,
  user,
  logout,
}: authInterface) {
  const utilityLinks = [
    {
      name: "Settings",
      href: "/app/dashboard#account",
      icon: FaCog,
    },
    {
      name: "Notifications",
      href: "",
      icon: FaBell,
      tempDisabled: true,
    },
    {
      name: "Add Friends",
      href: "/app/dashboard#friends",
      icon: FaUserPlus,
      tempDisabled: true,
    },
    {
      name: "Log Out",
      href: "",
      icon: FaArrowRightFromBracket,
      handleClick: logout,
    },
  ];

  return (
    <div className="hidden md:flex 2xl:hidden flex-col h-dvh bg-bg-light p-4 overflow-y-scroll no-scrollbar gap-6">
      {/* Top bar */}
      <div className="bg-light px-4 py-6 flex flex-col gap-4 items-center rounded-t-md rounded-b-sm">
        <Link
          href="/app/dashboard#myAccount"
          className="w-12 h-12 rounded-lg brightness-100 hover:brightness-105 duration-200"
        >
          {isLoadingAvatar || authLoading ? (
            <div className="rounded-full animate-pulse">
              <div className="size-12 rounded-full bg-dark-fourty"></div>
            </div>
          ) : (
            <img
              src={avatarSrc}
              referrerPolicy="no-referrer"
              alt="User avatar"
              className="size-12 rounded-full object-cover"
            />
          )}
        </Link>
        {navLinks.map((el) => (
          <NavLink type="tablet" key={el.name} {...el} />
        ))}
      </div>
      <div className="bg-light px-4 py-6 flex flex-col gap-4 items-center rounded-t-sm rounded-b-md">
        {utilityLinks.map((el) => (
          <NavLink type="tablet" key={el.name} {...el} />
        ))}
      </div>
    </div>
  );
}

export default TabletNav;
