import { useAuth } from "@/app/_context/AuthContext";
import { markHabitAsComplete } from "@/app/_lib/_utils/dataService";
import { habitListInterface } from "@/app/_lib/interfaces/habits";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import CountDown from "../common/CountDown";
import DeleteCross from "../common/DeleteCross";
import IconsAndStreak from "../common/IconsAndStreak";
import InnerCardSection from "./InnerCardSection";
import InnerHabitMilestone from "./InnerHabitMilestone";
import { useModal } from "@/app/_context/ModalContext";

function MyHabitsCard({
  category,
  streak,
  habitId,
  highestStreak,
  habitData,
  isCompletedToday,
}: habitListInterface) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [submitting, isSubmitting] = useState(false);
  const { openModal } = useModal();

  const markCompleteMutation = useMutation({
    mutationFn: ({ userId, habitId }: { userId: string; habitId: string }) =>
      markHabitAsComplete(userId, habitId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todayHabitCompletionIds"] });
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      queryClient.invalidateQueries({
        queryKey: ["dailyHabitCompletionsCount"],
      });
    },

    onError: (error) => {
      console.error("Failed to mark habit as complete:", error.message);
    },
  });

  function handleCompleteHabit() {
    isSubmitting(true);
    try {
      if (user?.id && habitId) {
        markCompleteMutation.mutate({ userId: user.id, habitId });
      } else {
        console.warn(
          "Cannot mark habit complete: User not logged in or habit ID missing."
        );
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error marking habit as complete");
    } finally {
      isSubmitting(false);
    }
  }

  const cardBgColour: { [key: string]: string } = {
    fitness: "bg-fitness-bg",
    sleepSchedule: "bg-sleepSchedule-bg",
    learning: "bg-learning-bg",
    reading: "bg-reading-bg",
    hydration: "bg-hydration-bg",
    bedHygiene: "bg-bedHygiene-bg",
    breakfast: "bg-breakfast-bg",
    writing: "bg-writing-bg",
    diet: "bg-diet-bg",
  };

  const cardAccentColour: { [key: string]: string } = {
    fitness: "bg-fitness-accent",
    sleepSchedule: "bg-sleepSchedule-accent",
    learning: "bg-learning-accent",
    reading: "bg-reading-accent",
    hydration: "bg-hydration-accent",
    bedHygiene: "bg-bedHygiene-accent",
    breakfast: "bg-breakfast-accent",
    writing: "bg-writing-accent",
    diet: "bg-diet-accent",
  };

  return (
    <div
      className={`p-4 rounded-md ${cardBgColour[category]} flex flex-col gap-4`}
    >
      {/* icon and streak */}
      <InnerCardSection type={category}>
        <IconsAndStreak streak={streak} category={category} />
        <DeleteCross
          handleClick={() => openModal("delete-habit", { habitId, category })}
        />
      </InnerCardSection>
      {/* Next milestone */}
      <InnerCardSection type={category}>
        <InnerHabitMilestone
          category={category}
          highestStreak={highestStreak}
          habitData={habitData}
        />
      </InnerCardSection>
      {/* Finish, time remaining, and delete */}
      <InnerCardSection type={category}>
        <div className="flex flex-col gap-3 justify-center items-center">
          {!isCompletedToday ? <CountDown /> : <h4>Habit completed!</h4>}
          {!isCompletedToday && (
            <div className="h-[1px] w-10 bg-dark-sixteen"></div>
          )}
          {!isCompletedToday && (
            <button
              onClick={handleCompleteHabit}
              disabled={submitting}
              className={`${cardAccentColour[category]} w-fit py-3 px-10 rounded-xs text-light hover:cursor-pointer hover:brightness-105 active:scale-95 duration-200`}
            >
              Finish
            </button>
          )}
        </div>
      </InnerCardSection>
    </div>
  );
}

export default MyHabitsCard;
