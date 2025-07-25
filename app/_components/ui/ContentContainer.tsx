import { ReactNode } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

export default function ContentContainer({ children }: ModalProviderProps) {
  return (
    <>
      <div className="p-4 md:p-10">{children}</div>
    </>
  );
}
