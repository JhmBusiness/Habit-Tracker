import type { Metadata } from "next";
import AppContainer from "../_components/layouts/AppLayoutContainer";
import PondBg from "../_components/ui/PondBg";
import "../_styles/globals.css";

export const metadata: Metadata = {
  title: "Your Dashboard",
  description: "Manage your habits, and track your progress.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppContainer>
        {children}
        <PondBg />
      </AppContainer>
    </>
  );
}
