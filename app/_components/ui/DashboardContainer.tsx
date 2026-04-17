"use client";
import { useModal } from "@/app/_context/ModalContext";
import {
  useUserHabitCompletionMilestonesToday,
  useUserMostRecentPost,
  useUserStats,
} from "@/app/_lib/_utils/queries";
import { FaCirclePlus, FaEye, FaPencil, FaUserPlus } from "react-icons/fa6";
import Button from "../common/Button";
import NoHabitsAndNoPosts from "../common/NoHabitsAndNoPosts";
import ButtonContainer from "../dashboard/ButtonContainer";
import CurrentVsHighest from "../dashboard/CurrentVsHighest";
import HabitCheckList from "../dashboard/HabitCheckList";
import HeroCards from "../dashboard/HeroCards";
import MilestoneCard from "../dashboard/MilestoneCard";
import MostRecentPost from "../dashboard/MostRecentPost";
import Spinner from "../common/Spinner";
import DashCompTitle from "../dashboard/DashCompTitle";
import MostRecentPostLg from "../dashboard/MostRecentPostLg";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";

interface DashboardContainerProps {
  size: number | null;
}

function DashboardContainer({ size }: DashboardContainerProps) {
  const { userStats, isLoading } = useUserStats();
  const { usersPost, loading: loadingPost } = useUserMostRecentPost();
  const hasHabits = userStats?.active_habit_count;
  const renderNoHabits = !hasHabits && !isLoading;
  const renderNoPosts = !usersPost && !loadingPost;
  const { openModal } = useModal();

  if (size === null) {
    return <DashboardSkeleton />;
  }

  if (renderNoHabits)
    return (
      // Render no posts or habits
      <div className="flex flex-col gap-8 p-10 bg-light rounded-t-xl">
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

        {renderNoHabits && (
          <div className="col-span-2">
            <NoHabitsAndNoPosts
              onClick={() => openModal("new-habit")}
              category="habits"
            />
          </div>
        )}
        {renderNoPosts && (
          <div className="col-span-2">
            <NoHabitsAndNoPosts
              onClick={() => openModal("post-category-selection")}
              category="posts"
            />
          </div>
        )}
      </div>
    );

  if (size <= 1535)
    return (
      <div className="p-6 flex flex-col gap-4 sm:gap-6 md:gap-8 bg-light rounded-t-lg md:rounded-t-xl lg:p-8 xl:p-10 xl:grid xl:grid-cols-[1fr_300px] xl:grid-rows-[auto_1fr] 2xl:hidden">
        {/* Up to xl (1280px) */}
        <h2 className="text-center pb-2 sm:pt-2 md:pb-0 lg:pt-0 xl:hidden">
          Welcome to your dashboard!
        </h2>
        <div className={`${renderNoHabits ? "xl:col-span-2" : ""}`}>
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
        </div>

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
        {renderNoHabits && (
          <div className="xl:col-span-2">
            <NoHabitsAndNoPosts
              onClick={() => openModal("new-habit")}
              category="habits"
            />
          </div>
        )}

        {!loadingPost ? (
          usersPost ? (
            <MostRecentPost usersPost={usersPost} loadingPost={loadingPost} />
          ) : (
            <div className={`xl:col-span-2 order-10`}>
              <NoHabitsAndNoPosts
                onClick={() => openModal("post-category-selection")}
                category="posts"
              />
            </div>
          )
        ) : (
          <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
            <DashCompTitle>Most Recent Post</DashCompTitle>
            <div className="flex justify-center items-center h-[160px]">
              <Spinner />
            </div>
          </div>
        )}
      </div>
    );

  if (size >= 1536)
    return (
      <div
        className={`hidden gap-8 p-10 bg-light rounded-t-lg md:rounded-t-xl 2xl:grid grid-cols-[auto_1fr] h-[calc(100dvh-40px)] 2xl:max-h-[calc(100dvh-40px)] 2xl:overflow-y-scroll`}
      >
        {/* 2xl (1536px) Dashboard */}
        {/* Left side */}
        <div className="flex flex-col gap-8">
          {hasHabits !== 0 && (
            <>
              <HeroCards />
              <MilestoneCard />
            </>
          )}
          {!loadingPost ? (
            <MostRecentPostLg usersPost={usersPost} />
          ) : (
            <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
              <DashCompTitle>Most Recent Post</DashCompTitle>
              <div className="flex justify-center items-center h-[calc(100%-97px)]">
                <Spinner />
              </div>
            </div>
          )}
        </div>
        {/* Right side */}
        <div
          className={`grid grid-rows-[auto_1fr_1.4fr] gap-8 h-full min-h-0 overflow-hidden`}
        >
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
            <div className="block w-full order-6 col-span-1 min-h-0 border border-dark-sixteen bg-white rounded-lg h-full">
              <CurrentVsHighest />
            </div>
          )}
        </div>
      </div>
    );
}

export default DashboardContainer;
