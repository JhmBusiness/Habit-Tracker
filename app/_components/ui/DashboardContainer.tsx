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
import { useEffect } from "react";

function DashboardContainer() {
  const { userStats, isLoading } = useUserStats();
  const { usersPost, loading: loadingPost } = useUserMostRecentPost();
  const hasHabits = userStats?.active_habit_count;
  const renderNoHabits = !hasHabits && !isLoading;
  const renderNoPosts = !usersPost && !loadingPost;
  const { openModal } = useModal();

  return (
    <>
      {/* Up to xl */}
      <div className="p-6 flex flex-col gap-4 sm:gap-6 md:gap-8 bg-light rounded-t-lg md:rounded-t-xl lg:p-8 xl:p-10 xl:grid xl:grid-cols-[1fr_auto] xl:grid-rows-[auto_auto_auto_auto_auto]">
        <h2 className="text-center pb-2 sm:order-1 sm:pt-2 md:pb-0 lg:pt-0 xl:hidden">
          Welcome to your dashboard!
        </h2>
        <ButtonContainer>
          <Button onClick={() => openModal("new-habit")} type="dashboard">
            <FaCirclePlus />
            Add Habit
          </Button>
          <Button type="dashboard">
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
            <div className="hidden sm:block w-full sm:order-6 xl:col-span-2">
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

      {/* 2xl */}
      {/* <div className="hidden gap-8 p-10 bg-light rounded-t-lg md:rounded-t-xl 2xl:grid grid-cols-2">
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
        <div className="flex flex-col gap-8">
          {hasHabits !== 0 && <HabitCheckList />}
          <ButtonContainer>
            <Button onClick={() => openModal("new-habit")} type="dashboard">
              <FaCirclePlus />
              Add Habit
            </Button>
            <Button type="dashboard">
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
            <div className="hidden sm:block w-full sm:order-6 xl:col-span-2">
              <CurrentVsHighest />
            </div>
          )}
        </div>

        {renderNoHabits && <NoHabitsAndNoPosts category="habits" />}
        {renderNoPosts && <NoHabitsAndNoPosts category="posts" />}
      </div> */}
    </>
  );
}

export default DashboardContainer;
