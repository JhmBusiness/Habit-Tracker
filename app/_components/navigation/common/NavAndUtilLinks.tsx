import {
  FaArrowRightFromBracket,
  FaEarthEurope,
  FaEnvelopesBulk,
  FaListCheck,
  FaUserGroup,
} from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";

import React from "react";
import NavLink from "./NavLink";

interface navProps {
  type: string;
  handleLogOut: () => void;
  closeNavAnimation?: () => void;
  toggleMenu?: () => void;
}

function NavAndUtilLinks({
  type,
  handleLogOut,
  closeNavAnimation,
  toggleMenu,
}: navProps) {
  const navLinks = [
    {
      name: "My Dashboard",
      href: "/app/dashboard",
      icon: LuLayoutDashboard,
      type: type,
    },
    {
      name: "My Habits",
      href: "/app/dashboard#habits",
      icon: FaListCheck,
      type: type,
    },
    {
      name: "My Posts",
      href: "/app/dashboard#posts",
      icon: FaEnvelopesBulk,
      type: type,
    },
    {
      name: "Explore",
      href: "/app/posts/explore",
      icon: FaEarthEurope,
      type: type,
    },
    {
      name: "Friends",
      href: "/app/posts/friends",
      icon: FaUserGroup,
      type: type,
    },
    {
      name: "Log Out",
      href: "/",
      icon: FaArrowRightFromBracket,
      type: type,
      whenClicked: () => handleLogOut(),
    },
  ];

  if (type === "mobile")
    return (
      <div className="p-6 flex flex-col gap-6">
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col shadow-mobile-nav-links">
          {navLinks.slice(0, 3).map((el, index) => (
            <React.Fragment key={el.name}>
              <NavLink
                closeNavAnimation={closeNavAnimation}
                toggleMenu={toggleMenu}
                key={el.name}
                {...el}
              />
              {index < navLinks.length - 4 && (
                <hr className="border-dark-fourty my-3" />
              )}
            </React.Fragment>
          ))}
        </ul>
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col shadow-mobile-nav-links">
          {navLinks.slice(3, 5).map((el, index) => (
            <React.Fragment key={el.name}>
              <NavLink
                closeNavAnimation={closeNavAnimation}
                toggleMenu={toggleMenu}
                key={el.name}
                {...el}
              />
              {index < navLinks.length - 5 && (
                <hr className="border-dark-fourty my-3" />
              )}
            </React.Fragment>
          ))}
        </ul>
        {/* Log out */}
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col shadow-mobile-nav-links">
          {navLinks.slice(5, 6).map((el) => (
            <NavLink
              closeNavAnimation={closeNavAnimation}
              toggleMenu={toggleMenu}
              key={el.name}
              {...el}
            />
          ))}
        </ul>
      </div>
    );
  if (type === "tablet") return;
  if (type === "desktop")
    return (
      <div className="p-8 flex flex-col gap-8 h-full">
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col">
          {navLinks.slice(0, 3).map((el, index) => (
            <React.Fragment key={el.name}>
              <NavLink key={el.name} {...el} />
              {index < navLinks.length - 4 && (
                <hr className="border-dark-fourty my-3" />
              )}
            </React.Fragment>
          ))}
        </ul>
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col">
          {navLinks.slice(3, 5).map((el, index) => (
            <React.Fragment key={el.name}>
              <NavLink key={el.name} {...el} />
              {index < navLinks.length - 5 && (
                <hr className="border-dark-fourty my-3" />
              )}
            </React.Fragment>
          ))}
        </ul>
        {/* Log out */}
        <ul className="px-6 py-3 bg-light rounded-md flex flex-col mt-auto">
          {navLinks.slice(5, 6).map((el) => (
            <NavLink key={el.name} {...el} />
          ))}
        </ul>
      </div>
    );
}

export default NavAndUtilLinks;
