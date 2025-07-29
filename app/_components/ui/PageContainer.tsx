import { reactChildren } from "@/app/_lib/interfaces/reactChildren";

function PageContainer({ children }: reactChildren) {
  return <div className="p-4 sm:p-6 md:p-10 sm:rounded-xl">{children}</div>;
}

export default PageContainer;
