import Link from "next/link";

import { FaCog } from "react-icons/fa";
import { FaBell, FaUserPlus } from "react-icons/fa6";

interface UtilityIconsProps {
  type?: string;
}

function UtilityIcons({ type }: UtilityIconsProps) {
  if (type === "desktop")
    return (
      <div className="absolute flex items-center w-full justify-between z-40 p-6 top-0 text-light">
        <div className="flex justify-center gap-6">
          <Link href="/app/dashboard#account">
            <FaCog className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
          <Link href="/app/dashboard#friends">
            <FaUserPlus className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
          </Link>
        </div>
        <Link href="">
          <FaBell className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
        </Link>
      </div>
    );

  return (
    <div className="absolute flex items-center w-full justify-between z-40 p-4 top-0 text-light">
      <div className="flex justify-center gap-6">
        <Link href="/app/dashboard#account">
          <FaCog className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
        </Link>
        <Link href="/app/dashboard#friends">
          <FaUserPlus className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
        </Link>
      </div>
      <Link href="">
        <FaBell className="w-6 h-6 drop-shadow-icon hover:scale-105 duration-200 active:scale-95" />
      </Link>
    </div>
  );
}

export default UtilityIcons;
