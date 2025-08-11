"use client";
import { useUserHabits } from "@/app/_lib/_utils/queries";
import DashCompTitle from "./DashCompTitle";
import MilestoneBar from "./MilestoneBar";
import Spinner from "../common/Spinner";
import { getNextMilestoneHabit } from "@/app/_lib/_utils/habitUtils";

function MilestoneCard() {
  const { habitsData, loading } = useUserHabits();

  const nearestMilestoneHabit = getNextMilestoneHabit(habitsData);
  const daysUntilNextMilestone = nearestMilestoneHabit?.daysUntilNextMilestone;

  if (loading)
    return (
      <div className="border border-dark-sixteen bg-white rounded-lg">
        <DashCompTitle>Next Milestone</DashCompTitle>
        <div className="flex justify-center items-center h-20">
          <Spinner />
        </div>
      </div>
    );

  return (
    <div className="border border-dark-sixteen bg-white rounded-lg">
      <DashCompTitle>
        Next Milestone: {daysUntilNextMilestone}
        {daysUntilNextMilestone !== 1 ? " days" : " day"}
      </DashCompTitle>
      <MilestoneBar nearestMilestoneHabit={nearestMilestoneHabit} />
    </div>
  );
}

export default MilestoneCard;
