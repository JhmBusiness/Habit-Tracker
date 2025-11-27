"use client";
import AccountContainer from "@/app/_components/ui/AccountContainer";
import DashboardContainer from "@/app/_components/ui/DashboardContainer";
import MyHabits from "@/app/_components/my-habits/MyHabits";
import MyPosts from "@/app/_components/my-posts/MyPosts";
import MyAccount from "@/app/_components/my-account/MyAccount";
import AccountManagement from "@/app/_components/account-management/AccountManagement";
import { useEffect, useState } from "react";

function page() {
  function UseWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowWidthSize, setWindowWidthSize] = useState(0);

    useEffect(() => {
      // only execute all the code below in client side
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowWidthSize(window.innerWidth);
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowWidthSize;
  }

  const size = UseWindowSize();

  return (
    <div className="bg-bg-light rounded-lg md:rounded-xl pb-[102px] md:pb-0">
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

export default page;
