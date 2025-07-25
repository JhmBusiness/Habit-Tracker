import type { Metadata } from "next";
import "../_styles/globals.css";
import ContentContainer from "../_components/ui/ContentContainer";
import PondBg from "../_components/ui/PondBg";

export const metadata: Metadata = {
  title: "The Pond",
  description:
    "The Pond is an application by James McEvoy to track habits, with the feature of uploading your milestones to its social media feed.",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <ContentContainer>{children}</ContentContainer>
      <PondBg />
    </div>
  );
}
