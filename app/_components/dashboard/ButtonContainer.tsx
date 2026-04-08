import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function ButtonContainer({ children }: childrenAndStyles) {
  return (
    <div className="flex flex-wrap gap-4 justify-center md:gap-6 sm:order-4 sm:justify-items-start xl:order-5 xl:justify-center md:grid md:grid-cols-2 lg:grid-cols-4 xl:col-span-2 2xl:order-4 2xl:col-span-1 2xl:auto-rows-min text-center">
      {children}
    </div>
  );
}

export default ButtonContainer;
