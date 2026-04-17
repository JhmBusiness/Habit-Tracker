"use client";
import AccountManagement from "@/app/_components/account-management/AccountManagement";
import MyAccount from "@/app/_components/my-account/MyAccount";
import MyHabits from "@/app/_components/my-habits/MyHabits";
import MyPosts from "@/app/_components/my-posts/MyPosts";
import AccountContainer from "@/app/_components/ui/AccountContainer";
import DashboardContainer from "@/app/_components/ui/DashboardContainer";
import { useEffect, useState } from "react";

export default function page() {
  function UseWindowSize() {
    const [windowWidthSize, setWindowWidthSize] = useState<number | null>(null);

    useEffect(() => {
      function handleResize() {
        setWindowWidthSize(window.innerWidth);
      }

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowWidthSize;
  }

  const size = UseWindowSize();
  // const size = null;

  return (
    <div className="bg-bg-light rounded-lg md:rounded-xl pb-[102px] md:pb-0 scroll-m-6 sm:scroll-m-8 xl:scroll-m-10">
      <DashboardContainer size={size} />
      <AccountContainer>
        <MyHabits />
        <MyPosts />
        <MyAccount />
        <AccountManagement />
      </AccountContainer>
    </div>
  );
}
