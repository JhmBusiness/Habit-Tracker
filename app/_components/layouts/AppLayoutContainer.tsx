import { AuthProvider } from "@/app/_context/AuthContext";
import NavContainer from "../navigation/NavContainer";
import PageContainer from "../ui/PageContainer";
import AppContainer from "./AppContainer";

export default function AppLayoutContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <AppContainer>
          <NavContainer />
          <PageContainer>{children}</PageContainer>
        </AppContainer>
      </AuthProvider>
    </>
  );
}
