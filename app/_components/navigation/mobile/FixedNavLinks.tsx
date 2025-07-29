import { reactChildren } from "@/app/_lib/interfaces/reactChildren";
import { FaEarthEurope, FaListCheck, FaUserGroup } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import NavLink from "../common/NavLink";

const navLinks = [
  {
    name: "Dashboard",
    href: "/app/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    name: "Habits",
    href: "/app/dashboard#habits",
    icon: FaListCheck,
  },
  {
    name: "Friends",
    href: "/app/posts/friends",
    icon: FaUserGroup,
  },
  {
    name: "Explore",
    href: "/app/posts/explore",
    icon: FaEarthEurope,
  },
];

function MobileNavLinks({ children }: reactChildren) {
  return (
    <div className="flex justify-between items-center">
      {navLinks.slice(0, 2).map((el) => (
        <NavLink type="fixed" key={el.name} {...el} />
      ))}
      {children}
      {navLinks.slice(2, 4).map((el) => (
        <NavLink type="fixed" key={el.name} {...el} />
      ))}
    </div>
  );
}

export default MobileNavLinks;
