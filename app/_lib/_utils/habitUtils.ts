"use client";
import { User } from "@supabase/supabase-js";
import { habit, HabitMilestoneInfo } from "../interfaces/habits";
import { UseMutationResult } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

export function getUncompletedHabits(
  allHabits: habit[],
  completedHabitIds: { habit_id: string }[] | null
) {
  if (!completedHabitIds || completedHabitIds.length === 0) {
    return allHabits;
  }

  const completedIdsSet = new Set(
    completedHabitIds.map((comp) => comp.habit_id)
  );

  const uncompleted = allHabits.filter(
    (habit) => !completedIdsSet.has(habit.id)
  );

  return uncompleted;
}

// Function that sorts an array and returns the first/habit with the lowest amount of days until the next milestone.
export function getNextMilestoneHabit(allHabits: habit[] | undefined) {
  if (!allHabits || allHabits.length === 0) return null;

  let nearestMilestoneHabit: HabitMilestoneInfo | null = null;
  let minDaysLeft = Infinity;

  for (const habit of allHabits) {
    const milestoneInfo = getHabitNextMilestoneInfo(habit);
    if (milestoneInfo && milestoneInfo.daysUntilNextMilestone >= 0) {
      if (milestoneInfo.daysUntilNextMilestone < minDaysLeft) {
        minDaysLeft = milestoneInfo.daysUntilNextMilestone;
        nearestMilestoneHabit = milestoneInfo;
      }
    }
  }

  return nearestMilestoneHabit;
}

// Function to go through the habits and return an object for each one that has both the nextMilestoneStreak, and daysUntilNextMilestone.
export function getHabitNextMilestoneInfo(habit: habit) {
  const currentStreak = habit.current_streak;

  if (currentStreak < 0 || !Number.isFinite(currentStreak)) {
    return null;
  }

  const baseMilestones = [7, 14, 30, 45, 60];
  let nextMilestoneStreak: number | null = null;

  for (const milestone of baseMilestones) {
    if (currentStreak < milestone) {
      nextMilestoneStreak = milestone;
      break;
    }
  }

  if (nextMilestoneStreak === null && currentStreak >= 60) {
    const remainder = (currentStreak - 60) % 30;
    if (remainder === 0) {
      nextMilestoneStreak = currentStreak + 30;
    } else {
      nextMilestoneStreak = currentStreak + (30 - remainder);
    }
  }
  if (nextMilestoneStreak === null && currentStreak === 0) {
    nextMilestoneStreak = 7;
  }
  if (nextMilestoneStreak === null) {
    return null;
  }

  const daysUntilNextMilestone = nextMilestoneStreak - currentStreak;

  return {
    habit,
    nextMilestoneStreak,
    daysUntilNextMilestone,
  };
}
