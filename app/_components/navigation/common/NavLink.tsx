import Link from "next/link";
import { IconType } from "react-icons";
import { FaChevronRight } from "react-icons/fa6";

// This component will be used in all three navigations. We will return the right link through type.
interface navLinkProps {
  name: string;
  type: string;
  href: string;
  icon: IconType;
  whenClicked?: () => void;
  closeNavAnimation?: () => void;
  toggleMenu?: () => void;
}

function NavLink({
  name,
  href,
  icon,
  type,
  whenClicked,
  closeNavAnimation,
  toggleMenu,
}: navLinkProps) {
  const Icon = icon;

  function handleClick() {
    if (whenClicked) {
      whenClicked();
    }
    if (closeNavAnimation && toggleMenu) {
      closeNavAnimation();
      toggleMenu();
    }
  }

  if (type === "desktop")
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`flex items-center gap-3 px-3 py-3 hover:text-primary-accent duration-200 ${
          name === "Log Out" && "flex-row-reverse justify-between"
        }`}
      >
        <Icon className="w-6 h-6" />
        <h3>{name}</h3>
        {name !== "Log Out" && <FaChevronRight className="ml-auto h-4" />}
      </Link>
    );

  if (type === "tablet")
    return (
      <Link
        href={href}
        onClick={handleClick}
        className="flex flex-col gap-1 items-center hover:text-primary-accent rounded-xs hover:cursor-pointer duration-200 w-[64px] h-[64px] justify-center"
      >
        <Icon className="w-8 h-8" />
        <h6>{name}</h6>
      </Link>
    );

  if (type === "mobile")
    return (
      <Link
        href={href}
        onClick={handleClick}
        className={`flex items-center gap-3 px-3 py-3 hover:text-primary-accent duration-200 ${
          name === "Log Out" && "flex-row-reverse justify-between"
        }`}
      >
        <Icon className="w-6 h-6" />
        <h3>{name}</h3>
        {name !== "Log Out" && <FaChevronRight className="ml-auto h-4" />}
      </Link>
    );

  if (type === "fixed")
    return (
      <Link
        href={href}
        className="mt-[10px] flex flex-col gap-1 items-center hover:text-primary-accent hover:cursor-pointer duration-200 w-[56px] h-[40px]"
      >
        <Icon className="w-6 h-6" />
        <h6>{name}</h6>
      </Link>
    );
}

export default NavLink;
