import Link from "next/link";

interface buttonProps {
  styles?: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  type: string;
  disabled?: boolean;
}

function Button({
  styles,
  onClick,
  href,
  children,
  type,
  disabled,
}: buttonProps) {
  if (type === "dashboard")
    if (!href)
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`py-3 px-[18px] flex items-center gap-2 text-xs sm:text-base hover:text-primary-accent duration-200 hover:cursor-pointer rounded-full border border-dark-sixteen bg-white ${styles} md:w-full justify-center ${disabled ? "opacity-40 pointer-events-none" : ""}`}
        >
          {children}
        </button>
      );

  return (
    <Link
      href={href!}
      onClick={onClick}
      className={`py-3 px-[18px] flex items-center gap-2 text-xs sm:text-base hover:text-primary-accent duration-200 hover:cursor-pointer rounded-full border border-dark-sixteen bg-white ${styles} font-semibold md:w-full justify-center ${disabled ? "opacity-40 pointer-events-none" : ""}`}
    >
      {children}
    </Link>
  );
}

export default Button;
