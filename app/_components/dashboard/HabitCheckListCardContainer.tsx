import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";
import { habit } from "@/app/_lib/interfaces/habits";
import { GiPartyPopper } from "react-icons/gi";

interface checkListCardContainer extends childrenAndStyles {
  uncompletedHabits: habit[];
  uncompletedHabitsCount: number;
}

function HabitCheckListCardContainer({
  children,
  uncompletedHabits,
  uncompletedHabitsCount,
}: checkListCardContainer) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 p-6 ${
        uncompletedHabits.length > 0 ? "border-b border-b-dark-eight" : ""
      }`}
    >
      {uncompletedHabitsCount === 0 && (
        <div className="text-center flex flex-col items-center">
          <GiPartyPopper className="w-20 h-20" />
          <h4 className="pt-2 pb-1">Congratulations!</h4>
          <p className="text-xs">
            You&apos;ve completed all of your habits for today!
          </p>
        </div>
      )}
      {children}
    </div>
  );
}

export default HabitCheckListCardContainer;
