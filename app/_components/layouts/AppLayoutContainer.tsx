import { AuthProvider } from "@/app/_context/AuthContext";
import PageContainer from "../ui/PageContainer";
import NavAndContentContainer from "./NavAndContentContainer";
import NavContainer from "./NavContainer";

export default function AppLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <NavAndContentContainer>
          <NavContainer />
          <PageContainer>{children}</PageContainer>
        </NavAndContentContainer>
      </AuthProvider>
    </>
  );
}
