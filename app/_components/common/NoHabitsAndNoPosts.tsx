"use client";
import { useUserHabitCompletionMilestonesToday } from "@/app/_lib/_utils/queries";
import { FaCirclePlus } from "react-icons/fa6";

interface AccountTitleInterface {
  category?: string;
}

function NoHabitsAndNoPosts({ category }: AccountTitleInterface) {
  const { milestoneCompletionsToday } = useUserHabitCompletionMilestonesToday();

  let habitOrPost;
  if (category === "habits") {
    habitOrPost = "Habit";
  } else {
    habitOrPost = "Post";
  }
  return (
    <div className="p-10 text-center border border-dark-sixteen bg-white rounded-lg">
      <h2>No {habitOrPost}s found</h2>
      {category === "habits" ? (
        <p className="text-xs pt-2 pb-3">
          Let&apos;s add your first habit to get started!
        </p>
      ) : (
        <p className="text-xs pt-2 pb-3">
          Posts can only be made when you&apos;ve hit a milestone
        </p>
      )}
      <button
        className={`flex items-center gap-2 mx-auto text-light py-3 px-[18px] rounded-xl duration-200 ${
          category === "posts" && milestoneCompletionsToday?.length === 0
            ? "hover:cursor-not-allowed bg-grey"
            : "hover:cursor-pointer bg-add-green hover:scale-105 active:scale-95"
        }`}
        disabled={
          category === "posts" && milestoneCompletionsToday?.length === 0
        }
      >
        <FaCirclePlus /> New {habitOrPost}
      </button>
    </div>
  );
}

export default NoHabitsAndNoPosts;
