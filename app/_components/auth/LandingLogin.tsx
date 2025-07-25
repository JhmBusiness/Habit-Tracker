import { ReactNode } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

function LandingLogin({ children }: ModalProviderProps) {
  return (
    <div className="bg-white p-10 sm:p-20 w-fit h-fit mx-auto rounded-xl text-center max-w-[560px] flex flex-col gap-3 shadow-primary">
      {children}
    </div>
  );
}

export default LandingLogin;
