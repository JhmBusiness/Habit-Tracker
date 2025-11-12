"use client";
import { useUserMostRecentPost, useUserStats } from "@/app/_lib/_utils/queries";
import { FaCirclePlus, FaEye, FaPencil, FaUserPlus } from "react-icons/fa6";
import Button from "../common/Button";
import ButtonContainer from "../dashboard/ButtonContainer";
import CurrentVsHighest from "../dashboard/CurrentVsHighest";
import HabitCheckList from "../dashboard/HabitCheckList";
import HeroCards from "../dashboard/HeroCards";
import MilestoneCard from "../dashboard/MilestoneCard";
import MostRecentPost from "../dashboard/MostRecentPost";
import NoHabitsAndNoPosts from "../common/NoHabitsAndNoPosts";
import { useModal } from "@/app/_context/ModalContext";

function DashboardContainer() {
  const { userStats, isLoading } = useUserStats();
  const { usersPost, loading: loadingPost } = useUserMostRecentPost();
  const hasHabits = userStats?.active_habit_count;
  const renderNoHabits = !hasHabits && !isLoading;
  const renderNoPosts = !usersPost && !loadingPost;
    const { openModal } = useModal();


  return (
    <div className="p-6 flex flex-col gap-4 bg-light rounded-t-lg md:rounded-t-xl">
      <h2 className="text-center pb-2">Welcome to your dashboard!</h2>
      <ButtonContainer>
        <Button onClick={() => openModal("new-habit")} type="dashboard">
          <FaCirclePlus />
          Add Habit
        </Button>
        <Button type="dashboard">
          <FaUserPlus />
          Add Friend
        </Button>
        <Button type="dashboard">
          <FaEye /> View Posts
        </Button>
        <Button type="dashboard">
          <FaPencil />
          Edit Profile
        </Button>
      </ButtonContainer>

      {hasHabits !== 0 && (
        <>
          <HeroCards />
          <HabitCheckList />
          <MilestoneCard />
          <div className="hidden sm:block w-full">
            <CurrentVsHighest />
          </div>
        </>
      )}
      {usersPost && (
        <MostRecentPost usersPost={usersPost} loadingPost={loadingPost} />
      )}
      {renderNoHabits && <NoHabitsAndNoPosts category="habits" />}
      {renderNoPosts && <NoHabitsAndNoPosts category="posts" />}
    </div>
  );
}

export default DashboardContainer;
