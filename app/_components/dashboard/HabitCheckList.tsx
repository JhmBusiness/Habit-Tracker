import CountDown from "../common/CountDown";
import DashCompTitle from "./DashCompTitle";
import HabitCheckListCard from "./HabitCheckListCard";

function HabitCheckList() {
  return (
    <div className="border border-dark-sixteen bg-white rounded-lg">
      {/* Title */}
      <DashCompTitle>Today&apos;s Habits Checklist</DashCompTitle>
      {/* Cards */}
      <HabitCheckListCard type="exercise" />
      {/* Time */}
      <CountDown />
    </div>
  );
}

export default HabitCheckList;
