import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";
import CountDown from "../common/CountDown";

interface DashCompTitleProps extends childrenAndStyles {
  countDown?: boolean;
}

function DashCompTitle({ children, countDown }: DashCompTitleProps) {
  return (
    <div className="text-center py-6 border-b border-b-dark-eight sm:flex items-center justify-between sm:p-8">
      <h2>{children}</h2>
      {countDown === true && (
        <div className="sm:flex hidden">
          <CountDown type="small" />
        </div>
      )}
    </div>
  );
}

export default DashCompTitle;
