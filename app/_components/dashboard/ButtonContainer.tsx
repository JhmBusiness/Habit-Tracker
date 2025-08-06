import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function ButtonContainer({ children }: childrenAndStyles) {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:gap-6">
      {children}
    </div>
  );
}

export default ButtonContainer;
