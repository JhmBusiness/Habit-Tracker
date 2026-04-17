"use client";
import { post } from "@/app/_lib/interfaces/posts";
import MostRecentPost from "./MostRecentPost";
import DashCompTitle from "./DashCompTitle";
import { useUserHabitCompletionMilestonesToday } from "@/app/_lib/_utils/queries";
import { FaCirclePlus } from "react-icons/fa6";
import { useModal } from "@/app/_context/ModalContext";

interface MostRecentPostLgProps {
  usersPost: post | undefined;
}

export default function MostRecentPostLg({ usersPost }: MostRecentPostLgProps) {
  const { milestoneCompletionsToday } = useUserHabitCompletionMilestonesToday();
  const { openModal } = useModal();

  return usersPost ? (
    <MostRecentPost usersPost={usersPost} />
  ) : (
    <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
      <DashCompTitle>No Recent Posts 😔</DashCompTitle>
      <div className="flex flex-col h-[calc(100%-97px)] justify-center">
        <p className="pb-4 text-center">
          Hit your next milestone to make a post!
        </p>
        <button
          className={`flex items-center gap-2 mx-auto text-light py-3 px-[18px] rounded-xl duration-200 ${
            milestoneCompletionsToday?.length === 0
              ? "hover:cursor-not-allowed bg-grey"
              : "hover:cursor-pointer bg-add-green hover:scale-105 active:scale-95"
          }`}
          disabled={milestoneCompletionsToday?.length === 0}
          onClick={() => openModal("post-category-selection")}
        >
          <FaCirclePlus /> New Post
        </button>
      </div>
    </div>
  );
}
