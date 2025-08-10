"use client";
import { getUncompletedHabits } from "@/app/_lib/_utils/habitUtils";
import { useUncompletedHabits } from "@/app/_lib/_utils/queries";
import CountDown from "../common/CountDown";
import Spinner from "../common/Spinner";
import DashCompTitle from "./DashCompTitle";
import HabitCheckListCard from "./HabitCheckListCard";
import HabitCheckListCardContainer from "./HabitCheckListCardContainer";

function HabitCheckList() {
  const { habitsData, todayHabitCompletionIds, isLoading } =
    useUncompletedHabits();

  const uncompletedHabits = getUncompletedHabits(
    habitsData,
    todayHabitCompletionIds
  );

  const uncompletedHabitsCount = uncompletedHabits.length ?? 0;

  return (
    <div className="border border-dark-sixteen bg-white rounded-lg">
      {/* Title */}
      <DashCompTitle>Today&apos;s Habits Checklist</DashCompTitle>
      {/* Cards */}
      {!isLoading ? (
        <div>
          <HabitCheckListCardContainer
            uncompletedHabits={uncompletedHabits}
            uncompletedHabitsCount={uncompletedHabitsCount}
          >
            {uncompletedHabits.map((el) => (
              <HabitCheckListCard
                key={el.category}
                type={el.category}
                streak={el.current_streak}
                habitId={el.id}
              />
            ))}
          </HabitCheckListCardContainer>

          {/* Time */}
          {uncompletedHabits.length > 0 && <CountDown />}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full py-20">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default HabitCheckList;
