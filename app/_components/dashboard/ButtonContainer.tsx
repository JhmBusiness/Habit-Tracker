import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function ButtonContainer({ children }: childrenAndStyles) {
  return (
    <div className="grid grid-cols-2 gap-4 text-center lg:grid-cols-4 xl:h-fit 2xl:grid-cols-4 2xl:auto-rows-min">
      {children}
    </div>
  );
}

export default ButtonContainer;
