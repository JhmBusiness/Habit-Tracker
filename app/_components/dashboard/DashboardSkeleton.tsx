import { FaCirclePlus, FaEye, FaPencil, FaUserPlus } from "react-icons/fa6";
import Button from "../common/Button";
import ButtonContainer from "./ButtonContainer";
import Spinner from "../common/Spinner";
import DashCompTitle from "./DashCompTitle";

export default function DashboardSkeleton() {
  return (
    <div>
      <div className="p-6 flex flex-col gap-4 sm:gap-6 md:gap-8 bg-light rounded-t-lg md:rounded-t-xl lg:p-8 xl:p-10 xl:grid xl:grid-cols-[1fr_300px] xl:grid-rows-[auto_1fr] 2xl:hidden">
        {/* Up to xl (1280px) */}
        <h2 className="text-center pb-2 sm:pt-2 md:pb-0 lg:pt-0 xl:hidden">
          Welcome to your dashboard!
        </h2>
        {/* Button Container */}
        <div className="min-h-0">
          <ButtonContainer>
            <Button type="dashboard" disabled={true}>
              <FaCirclePlus />
              Add Habit
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaUserPlus />
              Add Friend
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaEye /> View Posts
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaPencil />
              Edit Profile
            </Button>
          </ButtonContainer>
        </div>
        {/* Hero card small */}
        <div className="sm:hidden flex flex-col gap-4">
          <div className="flex justify-center items-center min-h-[146px] border border-dark-sixteen bg-white rounded-xl p-6 gap-6">
            <Spinner />
          </div>
          {/* Radial graph */}
          <div className="flex justify-center items-center border border-dark-sixteen bg-white rounded-lg min-h-[200px]">
            <Spinner />
          </div>
        </div>
        {/* Hero card >= 640px */}
        <div className="hidden sm:grid gap-8 grid-cols-3 order-2 xl:row-span-3 xl:flex xl:flex-col xl:w-fit xl:order-1 2xl:grid 2xl:grid-cols-2 2xl:row-span-1 2xl:w-[452px] 2xl:max-w-[452px] 2xl:flex-1">
          {/* Card 1 */}
          <div className="border border-dark-sixteen bg-white rounded-lg p-6 gap-6 lg:min-h-[204px] xl:h-full xl:flex xl:items-center xl:justify-center xl:max-h-[174px] xl:flex-auto xl:w-[300px] 2xl:max-h-full 2xl:flex-1 2xl:w-[210px]">
            <div className="flex flex-col items-center justify-center text-center h-full">
              <Spinner />
            </div>
          </div>
          {/* Card 2 */}
          <div className="border border-dark-sixteen bg-white rounded-lg p-6 gap-6 lg:min-h-[204px] xl:h-full xl:flex xl:items-center xl:justify-center 2xl:flex-1 2xl:w-[210px] xl:max-h-[183px] xl:flex-auto xl:w-[300px] 2xl:max-h-full">
            <div className="flex flex-col items-center justify-center text-center h-full">
              <Spinner />
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex justify-center items-center min-h-[200px] border border-dark-sixteen bg-white rounded-xl p-6 gap-6 lg:min-h-[204px] xl:min-w-[302px] xl:min-h-[194px] xl:flex-auto xl:w-[300px] 2xl:hidden">
            <Spinner />
          </div>
        </div>
        {/* Habit check list */}
        <div className="border border-dark-sixteen bg-white rounded-lg sm:order-3 xl:order-2 2xl:overflow-y-scroll 2xl:h-full 2xl:flex 2xl:flex-col">
          <DashCompTitle countDown={true}>
            Today&apos;s Habits Checklist
          </DashCompTitle>
          <div className="flex justify-center items-center w-full py-20 h-[calc(100%-97px)]">
            <Spinner />
          </div>
        </div>
        {/* Next milestone */}
        <div className="border border-dark-sixteen bg-white rounded-lg sm:order-5 xl:order-3 2xl:max-w-[452px] 2xl:flex-1">
          <DashCompTitle>Next Milestone</DashCompTitle>
          <div className="flex justify-center items-center h-[104px] sm:h-[112px] 2xl:h-[calc(100%-97px)]">
            <Spinner />
          </div>
        </div>
        {/* Current vs highest */}
        <div className="hidden sm:block w-full sm:order-6 xl:col-span-2 2xl:col-span-1">
          <div className="border border-dark-sixteen bg-white rounded-lg h-fit 2xl:min-h-0 2xl:border-0 2xl:h-full">
            <DashCompTitle>Current Streak vs Highest</DashCompTitle>
            <div className="flex justify-center items-center min-h-[160px] h-[calc(100%-97px)]">
              <Spinner />
            </div>
          </div>
        </div>
        {/* Most Recent post */}
        <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
          <DashCompTitle>Most Recent Post</DashCompTitle>
          <div className="flex justify-center items-center h-[160px]">
            <Spinner />
          </div>
        </div>
      </div>
      <div className="gap-8 p-10 bg-light rounded-t-lg md:rounded-t-xl 2xl:grid grid-cols-[auto_1fr] h-[calc(100dvh-40px)] 2xl:max-h-[calc(100dvh-40px)] 2xl:overflow-y-scroll">
        {/* Left side */}
        <div className="flex flex-col gap-8">
          <div>
            {/* Hero card >= 640px */}
            <div className="hidden sm:grid gap-8 grid-cols-3 order-2 xl:row-span-3 xl:flex xl:flex-col xl:w-fit xl:order-1 2xl:grid 2xl:grid-cols-2 2xl:row-span-1 2xl:w-[452px] 2xl:max-w-[452px] 2xl:flex-1">
              {/* Card 1 */}
              <div className="border border-dark-sixteen bg-white rounded-lg p-6 gap-6 lg:min-h-[204px] xl:h-full xl:flex xl:items-center xl:justify-center xl:max-h-[174px] xl:flex-auto xl:w-[300px] 2xl:max-h-full 2xl:flex-1 2xl:w-[210px]">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <Spinner />
                </div>
              </div>
              {/* Card 2 */}
              <div className="border border-dark-sixteen bg-white rounded-lg p-6 gap-6 lg:min-h-[204px] xl:h-full xl:flex xl:items-center xl:justify-center 2xl:flex-1 2xl:w-[210px] xl:max-h-[183px] xl:flex-auto xl:w-[300px] 2xl:max-h-full">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <Spinner />
                </div>
              </div>
              {/* Card 3 */}
              <div className="flex justify-center items-center min-h-[200px] border border-dark-sixteen bg-white rounded-xl p-6 gap-6 lg:min-h-[204px] xl:min-w-[302px] xl:min-h-[194px] xl:flex-auto xl:w-[300px] 2xl:hidden">
                <Spinner />
              </div>
            </div>
          </div>
          <div className="border border-dark-sixteen bg-white rounded-lg sm:order-5 xl:order-3 2xl:max-w-[452px] 2xl:flex-1">
            <DashCompTitle>Next Milestone</DashCompTitle>
            <div className="flex justify-center items-center h-[104px] sm:h-[112px] 2xl:h-[calc(100%-97px)]">
              <Spinner />
            </div>
          </div>
          <div className="border border-dark-sixteen bg-white rounded-lg sm:order-7 xl:order-4 2xl:order-5 2xl:max-w-[452px] 2xl:flex-1 wrap-anywhere xl:col-span-2">
            <DashCompTitle>Most Recent Post</DashCompTitle>
            <div className="flex justify-center items-center h-[calc(100%-97px)]">
              <Spinner />
            </div>
          </div>
        </div>
        {/* Right side */}

        <div
          className={`grid grid-rows-[auto_1fr_1.4fr] gap-8 h-full min-h-0 overflow-hidden`}
        >
          <ButtonContainer>
            <Button type="dashboard" disabled={true}>
              <FaCirclePlus />
              Add Habit
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaUserPlus />
              Add Friend
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaEye /> View Posts
            </Button>
            <Button type="dashboard" disabled={true}>
              <FaPencil />
              Edit Profile
            </Button>
          </ButtonContainer>

          <div className="border border-dark-sixteen bg-white rounded-lg sm:order-3 xl:order-2 2xl:overflow-y-scroll 2xl:h-full 2xl:flex 2xl:flex-col">
            <DashCompTitle countDown={true}>
              Today&apos;s Habits Checklist
            </DashCompTitle>
            <div className="flex justify-center items-center w-full py-20 h-[calc(100%-97px)]">
              <Spinner />
            </div>
          </div>
          <div className="block w-full order-6 col-span-1 min-h-0 border border-dark-sixteen bg-white rounded-lg h-full">
            <DashCompTitle>Current Streak vs Highest</DashCompTitle>
            <div className="flex justify-center items-center h-[calc(100%-97px)]">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
