"use client";
import {
  useDailyHabitCompletionIds,
  useUserHabits,
} from "@/app/_lib/_utils/queries";
import { useState } from "react";
import AccountTitle from "../common/AccountTitle";
import Spinner from "../common/Spinner";
import MyHabitsCard from "./MyHabitsCard";

function MyHabits() {
  const { habitsData, loading } = useUserHabits();
  const [displayCount, setDisplayCount] = useState(2);
  const { todayHabitCompletionIds, isLoading: loadingDailyHabitCompIds } =
    useDailyHabitCompletionIds();
  const habitsCompletedSet = new Set(
    todayHabitCompletionIds?.map((comp) => comp.habit_id || []),
  );
  const habitsToRender = habitsData?.slice(0, displayCount);

  function handleIncreaseDisplayCount() {
    setDisplayCount(displayCount + 2);
  }

  function handleDecreaseDisplayCount() {
    if (displayCount === 2) return;
    setDisplayCount(2);
  }

  if (loading || loadingDailyHabitCompIds)
    return (
      <div
        className="p-6 bg-light rounded-md flex flex-col gap-20 justify-center items-center pb-20 scroll-m-6 sm:scroll-m-8 xl:scroll-m-10"
        id="myHabits"
      >
        <AccountTitle category="myHabits" disabled={true}>
          My Habits
        </AccountTitle>
        <Spinner />
      </div>
    );

  if (!habitsData) return;
  if (habitsData?.length === 0) return;

  return (
    <div
      className="p-6 bg-light rounded-md flex flex-col gap-6 justify-center scroll-m-6 sm:scroll-m-8 xl:scroll-m-10 sm:p-8 xl:gap-8 xl:p-10"
      id="myHabits"
    >
      {/* Title and btn */}
      <AccountTitle category="myHabits">My Habits</AccountTitle>
      {/* Cards */}
      <div className="flex flex-col gap-6 xl:gap-8 lg:flex-row lg:flex-wrap lg:w-full">
        {habitsToRender?.map((el) => (
          <MyHabitsCard
            habitData={el}
            key={el.category}
            category={el.category}
            streak={el.current_streak}
            habitId={el.id}
            highestStreak={el.highest_streak}
            isCompletedToday={habitsCompletedSet.has(el.id)}
          />
        ))}
      </div>
      {/* Load more */}
      {habitsData?.length >= 3 && (
        <>
          {displayCount >= habitsData?.length ? (
            <button
              onClick={handleDecreaseDisplayCount}
              className="py-3 px-[18px] rounded-xl border border-dark hover:text-primary-accent hover:border-primary-accent duration-200 hover:cursor-pointer w-fit mx-auto"
            >
              Show Less
            </button>
          ) : (
            <button
              onClick={handleIncreaseDisplayCount}
              className="py-3 px-[18px] rounded-xl border border-dark hover:text-primary-accent hover:border-primary-accent duration-200 hover:cursor-pointer w-fit mx-auto"
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default MyHabits;
