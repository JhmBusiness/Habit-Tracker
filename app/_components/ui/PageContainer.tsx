import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

function PageContainer({ children }: childrenAndStyles) {
  return (
    <div className="p-4 sm:p-6 md:p-10 sm:rounded-xl md:max-w-[calc(100dvw-128px)]">
      {children}
    </div>
  );
}

export default PageContainer;
