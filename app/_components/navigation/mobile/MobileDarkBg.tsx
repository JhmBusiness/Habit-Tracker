import { motion } from "framer-motion";

interface DarkBgProps {
  toggleMenu: () => void;
  closeNavAnimation: () => void;
}

function MobileDarkBg({ toggleMenu, closeNavAnimation }: DarkBgProps) {
  function handleCloseNav() {
    toggleMenu();
    closeNavAnimation();
  }

  return (
    <motion.div
      onClick={handleCloseNav}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-eighty h-dvh w-full fixed top-0 left-0"
    ></motion.div>
  );
}

export default MobileDarkBg;
