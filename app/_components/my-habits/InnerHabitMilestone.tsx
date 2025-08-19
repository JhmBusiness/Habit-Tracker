"use client";
import { getHabitNextMilestoneInfo } from "@/app/_lib/_utils/habitUtils";
import { habit } from "@/app/_lib/interfaces/habits";
import { motion } from "framer-motion";

interface innerHabitMilestoneInterface {
  category: string;
  highestStreak: number | undefined;
  habitData: habit | undefined;
}

function InnerHabitMilestone({
  category,
  highestStreak,
  habitData,
}: innerHabitMilestoneInterface) {
  const barBg: { [key: string]: string } = {
    fitness: "bg-fitness-bar-bg",
    sleepSchedule: "bg-sleepSchedule-bar-bg",
    learning: "bg-learning-bar-bg",
    reading: "bg-reading-bar-bg",
    hydration: "bg-hydration-bar-bg",
    bedHygiene: "bg-bedHygiene-bar-bg",
    breakfast: "bg-breakfast-bar-bg",
    writing: "bg-writing-bar-bg",
    diet: "bg-diet-bar-bg",
  };

  const barGradientBg: { [key: string]: string } = {
    fitness: "bg-gradient-to-r from-fitness-accent to-fitness-bar-grad-light",
    sleepSchedule:
      "bg-gradient-to-r from-sleepSchedule-accent to-sleepSchedule-bar-grad-light",
    learning:
      "bg-gradient-to-r from-learning-accent to-learning-bar-grad-light",
    reading: "bg-gradient-to-r from-reading-accent to-reading-bar-grad-light",
    hydration:
      "bg-gradient-to-r from-hydration-accent to-hydration-bar-grad-light",
    bedHygiene:
      "bg-gradient-to-r from-bedHygiene-accent to-bedHygiene-bar-grad-light",
    breakfast:
      "bg-gradient-to-r from-breakfast-accent to-breakfast-bar-grad-light",
    writing: "bg-gradient-to-r from-writing-accent to-writing-bar-grad-light",
    diet: "bg-gradient-to-r from-diet-accent to-diet-bar-grad-light",
  };

  const barShadow: { [key: string]: string } = {
    fitness: "drop-shadow-fitness-bar",
    sleepSchedule: "drop-shadow-sleepSchedule-bar",
    learning: "drop-shadow-learning-bar",
    reading: "drop-shadow-reading-bar",
    hydration: "drop-shadow-hydration-bar",
    bedHygiene: "drop-shadow-bedHygiene-bar",
    breakfast: "drop-shadow-breakfast-bar",
    writing: "drop-shadow-writing-bar",
    diet: "drop-shadow-diet-bar",
  };

  const nearestMilestoneHabit = getHabitNextMilestoneInfo(habitData!);

  const currentHabitStreak = nearestMilestoneHabit?.habit.current_streak;
  const nextMilestone = nearestMilestoneHabit?.nextMilestoneStreak;
  const daysUntilNextMilestone = nearestMilestoneHabit?.daysUntilNextMilestone;

  let cycleStartStreak = 0;
  if (nextMilestone === 7) cycleStartStreak = 0;
  else if (nextMilestone === 14) cycleStartStreak = 7;
  else if (nextMilestone === 30) cycleStartStreak = 14;
  else if (nextMilestone === 45) cycleStartStreak = 30;
  else if (nextMilestone === 60) cycleStartStreak = 45;
  else if (nextMilestone! > 60) {
    cycleStartStreak = nextMilestone! - 30;
  }

  const currentProgressInCycle = currentHabitStreak! - cycleStartStreak;
  const totalDaysInCycle = nextMilestone! - cycleStartStreak;

  const percentage =
    totalDaysInCycle > 0
      ? (currentProgressInCycle / totalDaysInCycle) * 100
      : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        {daysUntilNextMilestone !== 1 ? (
          <h4>{daysUntilNextMilestone} days</h4>
        ) : (
          <h4>{daysUntilNextMilestone} day</h4>
        )}
        <p className="text-xs">until the next milestone</p>
      </div>
      <div className={`relative rounded-xl w-full min-h-6 ${barBg[category]}`}>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full rounded-full ${barShadow[category]} ${barGradientBg[category]} flex items-center`}
        ></motion.div>
      </div>
      <div className="flex gap-1 items-center">
        <p className="text-xs mt-[2px]">Longest streak:</p>
        <h4>{highestStreak}</h4>
      </div>
    </div>
  );
}

export default InnerHabitMilestone;
