import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function AccountContainer({ children }: childrenAndStyles) {
  return <div className="flex flex-col gap-6 p-4 pt-6">{children}</div>;
}

export default AccountContainer;
