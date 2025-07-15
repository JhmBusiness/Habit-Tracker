import type { Metadata } from "next";
import "./_styles/globals.css";

export const metadata: Metadata = {
  title: "The Pond",
  description:
    "The Pond is an application by James McEvoy to track habits, with the feature of uploading your milestones to its social media feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
