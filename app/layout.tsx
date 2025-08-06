import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./_styles/globals.css";
import { TanstackQueryProvider } from "./_context/QueryProvider";

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
      <body className="antialiased h-dvh bg-linear-to-b from-light-blue to-primary-accent">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
