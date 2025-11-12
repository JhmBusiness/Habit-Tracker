interface buttonProps {
  styles?: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  type: string;
}

function Button({ styles, onClick, href, children, type }: buttonProps) {
  if (type === "dashboard")
    return (
      <button
      onClick={onClick}
        className={`py-3 px-[18px] flex items-center gap-2 text-xs sm:text-base hover:text-primary-accent duration-200 hover:cursor-pointer rounded-full border border-dark-sixteen bg-white ${styles}`}
      >
        {children}
      </button>
    );
}

export default Button;
