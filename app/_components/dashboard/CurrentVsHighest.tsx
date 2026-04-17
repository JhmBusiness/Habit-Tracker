"use client";
import { useUserHabits } from "@/app/_lib/_utils/queries";
import Spinner from "../common/Spinner";
import DashCompTitle from "./DashCompTitle";
import CurrentVsHighestGraph from "./CurrentVsHighestGraph";

function CurrentVsHighest() {
  const { habitsData, loading } = useUserHabits();

  if (loading)
    return (
      <div className="border border-dark-sixteen bg-white rounded-lg h-fit 2xl:min-h-0 2xl:border-0 2xl:h-full">
        <DashCompTitle>Current Streak vs Highest</DashCompTitle>
        <div className="flex justify-center items-center min-h-[160px] h-[calc(100%-97px)]">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="border border-dark-sixteen bg-white rounded-lg h-fit 2xl:min-h-0 2xl:border-0 2xl:h-full">
      <DashCompTitle>Current Streak vs Highest</DashCompTitle>
      <CurrentVsHighestGraph habits={habitsData || []} />
    </div>
  );
}

export default CurrentVsHighest;
