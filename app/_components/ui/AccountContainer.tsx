import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function AccountContainer({ children }: childrenAndStyles) {
  return (
    <div className="flex flex-col gap-6 p-4 pt-6 sm:gap-8 sm:p-6 sm:pt-8 lg:p-8 lg:pt-10">
      {children}
    </div>
  );
}

export default AccountContainer;
