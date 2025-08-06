"use client";
import { FaCirclePlus, FaEye, FaPencil, FaUserPlus } from "react-icons/fa6";
import Button from "../common/Button";
import ButtonContainer from "../dashboard/ButtonContainer";
import HeroCards from "../dashboard/HeroCards";
import { useUserStats } from "@/app/_lib/_utils/queries";
import HabitCheckList from "../dashboard/HabitCheckList";

function DashboardContainer() {
  const { userStats, isLoading } = useUserStats();
  const hasHabits = userStats?.active_habit_count;

  const renderNoHabits = !hasHabits && !isLoading;

  return (
    <div className="p-6 flex flex-col gap-4 h-[2000px]">
      <h2 className="text-center pb-2">Welcome to your dashboard!</h2>
      <ButtonContainer>
        <Button type="dashboard">
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
        </>
      )}
      {renderNoHabits && (
        <div>
          <h2>No habits found</h2>
        </div>
      )}
    </div>
  );
}

export default DashboardContainer;
