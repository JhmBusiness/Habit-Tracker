import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function DashCompTitle({ children }: childrenAndStyles) {
  return (
    <div className="text-center py-6 border-b border-b-dark-eight">
      <h2>{children}</h2>
    </div>
  );
}

export default DashCompTitle;
