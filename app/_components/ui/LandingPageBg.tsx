import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function LandingPageBg({ children }: childrenAndStyles) {
  return (
    <div className="p-4 sm:p-0 w-full h-full flex justify-center items-center">
      {children}
      <div className="absolute inset-0 animate-gradient-flow z-[-1]"></div>
    </div>
  );
}

export default LandingPageBg;
