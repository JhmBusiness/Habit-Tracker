"use client";
import { useUserHabits } from "@/app/_lib/_utils/queries";
import Spinner from "../common/Spinner";
import DashCompTitle from "./DashCompTitle";
import CurrentVsHighestGraph from "./CurrentVsHighestGraph";
import { post } from "@/app/_lib/interfaces/posts";

interface mostRecentPost {
  userPosts: post[];
  loadingPosts: boolean;
}

function CurrentVsHighest() {
  const { habitsData, loading } = useUserHabits();

  if (loading)
    return (
      <div className="border border-dark-sixteen bg-white rounded-lg">
        <DashCompTitle>Current Streak vs Highest</DashCompTitle>
        <div className="flex justify-center items-center h-[160px]">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="border border-dark-sixteen bg-white rounded-lg h-fit">
      <DashCompTitle>Current Streak vs Highest</DashCompTitle>
      <CurrentVsHighestGraph habits={habitsData || []} />
    </div>
  );
}

export default CurrentVsHighest;
