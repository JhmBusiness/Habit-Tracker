import Link from "next/link";

import { FaCog } from "react-icons/fa";
import { FaBell, FaUserPlus } from "react-icons/fa6";

interface UtilityIconsProps {
  type?: string;
  toggleMenu: () => void;
  closeNavAnimation: () => void;
}

function UtilityIcons({
  type,
  toggleMenu,
  closeNavAnimation,
}: UtilityIconsProps) {
  function handleCloseNav() {
    toggleMenu();
    closeNavAnimation();
  }

  if (type === "desktop")
    return (
      <div className="absolute flex items-center w-full justify-between z-40 p-6 top-0 text-light">
        <div className="flex justify-center gap-6">
          <Link href="/app/dashboard#myAccount">
            <FaCog className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
          <Link href="/app/dashboard#coming-soon">
            <FaUserPlus className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
        </div>
        <Link href="/app/dashboard#coming-soon">
          <FaBell className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
        </Link>
      </div>
    );

  return (
    <div className="absolute flex items-center w-full justify-between z-40 p-4 top-0 text-light">
      <div className="flex justify-center gap-6">
        <button onClick={() => handleCloseNav()}>
          <Link href="/app/dashboard#myAccount">
            <FaCog className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
        </button>
        <button onClick={() => handleCloseNav()} disabled={true}>
          <Link href="" className={`opacity-40 pointer-events-none`}>
            <FaUserPlus className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
        </button>
      </div>
      <button onClick={() => handleCloseNav()} disabled={true}>
        <Link href="" className={`opacity-40 pointer-events-none`}>
          <FaBell className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
        </Link>
      </button>
    </div>
  );
}

export default UtilityIcons;
