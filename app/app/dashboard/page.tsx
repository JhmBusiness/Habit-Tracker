import AccountContainer from "@/app/_components/ui/AccountContainer";
import DashboardContainer from "@/app/_components/ui/DashboardContainer";
import MyHabits from "@/app/_components/my-habits/MyHabits";
import MyPosts from "@/app/_components/my-posts/MyPosts";
import MyAccount from "@/app/_components/my-account/MyAccount";

function page() {
  return (
    <div className="bg-bg-light rounded-lg md:rounded-xl h-[5000px]">
      <DashboardContainer />
      <AccountContainer>
        <MyHabits />
        <MyPosts />
        <MyAccount />
      </AccountContainer>
    </div>
  );
}

export default page;
