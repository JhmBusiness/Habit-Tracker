"use client";
import { useModal } from "@/app/_context/ModalContext";
import { useUserMostRecentPost, useUserStats } from "@/app/_lib/_utils/queries";
import { FaCirclePlus, FaEye, FaPencil, FaUserPlus } from "react-icons/fa6";
import Button from "../common/Button";
import NoHabitsAndNoPosts from "../common/NoHabitsAndNoPosts";
import ButtonContainer from "../dashboard/ButtonContainer";
import CurrentVsHighest from "../dashboard/CurrentVsHighest";
import HabitCheckList from "../dashboard/HabitCheckList";
import HeroCards from "../dashboard/HeroCards";
import MilestoneCard from "../dashboard/MilestoneCard";
import MostRecentPost from "../dashboard/MostRecentPost";

interface DashboardContainerProps {
  size: number;
}

function DashboardContainer({ size }: DashboardContainerProps) {
  const { userStats, isLoading } = useUserStats();
  const { usersPost, loading: loadingPost } = useUserMostRecentPost();
  const hasHabits = userStats?.active_habit_count;
  const renderNoHabits = !hasHabits && !isLoading;
  const renderNoPosts = !usersPost && !loadingPost;
  const { openModal } = useModal();

  if (size < 1536)
    return (
      <>
        {/* Up to xl */}
        <div className="p-6 flex flex-col gap-4 sm:gap-6 md:gap-8 bg-light rounded-t-lg md:rounded-t-xl lg:p-8 xl:p-10 xl:grid xl:grid-cols-[1fr_auto] xl:grid-rows-[auto_auto_auto_auto_auto] 2xl:hidden">
          <h2 className="text-center pb-2 sm:order-1 sm:pt-2 md:pb-0 lg:pt-0 xl:hidden">
            Welcome to your dashboard!
          </h2>
          <ButtonContainer>
            <Button onClick={() => openModal("new-habit")} type="dashboard">
              <FaCirclePlus />
              Add Habit
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaUserPlus />
              Add Friend
            </Button>
            <Button type="dashboard" href="#myPosts">
              <FaEye /> View Posts
            </Button>
            <Button type="dashboard" href="#myAccount">
              <FaPencil />
              Edit Profile
            </Button>
          </ButtonContainer>

          {hasHabits !== 0 && (
            <>
              <HeroCards />
              <HabitCheckList />
              <MilestoneCard />
              <div className="hidden sm:block w-full sm:order-6 xl:col-span-2 2xl:col-span-1">
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
      </>
    );

  if (size >= 1536)
    return (
      <div className="hidden gap-8 p-10 bg-light rounded-t-lg md:rounded-t-xl 2xl:grid grid-cols-[auto_1fr] 2xl:h-[calc(100dvh-40px)] 2xl:max-h-[calc(100dvh-40px)] 2xl:overflow-y-scroll">
        {/* Left side */}
        <div className="flex flex-col gap-8">
          {hasHabits !== 0 && (
            <>
              <HeroCards />
              <MilestoneCard />
            </>
          )}
          {usersPost && (
            <MostRecentPost usersPost={usersPost} loadingPost={loadingPost} />
          )}
        </div>
        {/* Right side */}
        {/* <div className="flex flex-col gap-8 h-full min-h-0 overflow-hidden"> */}
        <div className="grid grid-rows-[1fr_auto_1.4fr] gap-8 h-full min-h-0 overflow-hidden">
          {hasHabits !== 0 && <HabitCheckList />}
          <ButtonContainer>
            <Button onClick={() => openModal("new-habit")} type="dashboard">
              <FaCirclePlus />
              Add Habit
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaUserPlus />
              Add Friend
            </Button>
            <Button type="dashboard" href="#myPosts">
              <FaEye /> View Posts
            </Button>
            <Button type="dashboard" href="#myAccount">
              <FaPencil />
              Edit Profile
            </Button>
          </ButtonContainer>
          {hasHabits !== 0 && (
            <div className="hidden sm:block w-full sm:order-6 xl:col-span-2 2xl:col-span-1 min-h-0 border border-dark-sixteen bg-white rounded-lg 2xl:h-full">
              <CurrentVsHighest />
            </div>
          )}
        </div>

        {renderNoHabits && <NoHabitsAndNoPosts category="habits" />}
        {renderNoPosts && <NoHabitsAndNoPosts category="posts" />}
      </div>
    );
}

export default DashboardContainer;
