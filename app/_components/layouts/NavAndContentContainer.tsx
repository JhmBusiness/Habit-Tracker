import { ReactNode } from "react";

interface NavAndContentProviderProps {
  children: ReactNode;
}

export default function NavAndContentContainer({
  children,
}: NavAndContentProviderProps) {
  return (
    <>
      <div className="h-full md:grid md:grid-cols-[auto_1fr] max-h-dvh overflow-y-scroll">
        {children}
      </div>
    </>
  );
}
