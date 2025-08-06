import { habit } from "../interfaces/habit";

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
