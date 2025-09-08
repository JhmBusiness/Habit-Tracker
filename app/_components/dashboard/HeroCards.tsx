"use client";
import {
  useDailyHabitCompletionsCount,
  useUserStats,
} from "@/app/_lib/_utils/queries";
import GradientRadialCard from "./GradientRadialCard";
import Spinner from "../common/Spinner";

function HeroCards() {
  const { userStats, isLoading: userStatsLoading } = useUserStats();
  const { completedCount, isLoading: habitCompletionsCountLoading } =
    useDailyHabitCompletionsCount();
  const highestEverStreak = userStats?.highest_ever_habit_streak;
  const activeHabits = userStats?.active_habit_count ?? 0;

  return (
    <>
      {/* Highest streak and Active habits together */}
      <div className="sm:hidden flex flex-col gap-4">
        {/* Highest streak and active habits */}
        {!userStatsLoading ? (
          <div className="grid grid-cols-[1fr_auto_1fr] border border-dark-sixteen bg-white rounded-lg p-6 gap-6">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Flame */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="32"
                viewBox="0 0 56 64"
                fill="none"
              >
                <path
                  d="M19.9125 0.678124C20.8875 -0.234331 22.4 -0.221832 23.375 0.690623C26.825 3.92796 30.0625 7.41529 33.0875 11.1901C34.4625 9.39019 36.025 7.42779 37.7125 5.82787C38.7 4.90292 40.225 4.90292 41.2125 5.84037C45.5375 9.96517 49.2 15.4149 51.775 20.5896C54.3125 25.6894 56 30.9016 56 34.5765C56 50.5257 43.525 64 28 64C12.3 64 0 50.5132 0 34.564C0 29.7642 2.225 23.902 5.675 18.1023C9.1625 12.2151 14.0875 6.07786 19.9125 0.678124ZM28.2125 52.0006C31.375 52.0006 34.175 51.1256 36.8125 49.3757C42.075 45.7009 43.4875 38.3513 40.325 32.5766C39.7625 31.4516 38.325 31.3766 37.5125 32.3266L34.3625 35.9889C33.5375 36.9388 32.05 36.9138 31.275 35.9264C29.2125 33.3015 25.525 28.6142 23.425 25.9519C22.6375 24.9519 21.1375 24.9394 20.3375 25.9394C16.1125 31.2516 13.9875 34.6015 13.9875 38.3638C14 46.9258 20.325 52.0006 28.2125 52.0006Z"
                  fill="url(#paint0_linear_540_1664)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_540_1664"
                    x1="28"
                    y1="0"
                    x2="28"
                    y2="64"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CDE4FA" />
                    <stop offset="1" stopColor="#8EB7DE" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Replace with actual figures */}
              {highestEverStreak === 1 ? (
                <h2 className="mt-1">{highestEverStreak} Day</h2>
              ) : (
                <h2 className="mt-1">{highestEverStreak} Days</h2>
              )}
              <p className="text-xs sm:text-base">Highest Ever Streak</p>
            </div>
            <div className="h-full w-[1px] bg-dark-sixteen"></div>
            <div className="flex flex-col items-center justify-center text-center">
              {/* Target */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 64 64"
                fill="none"
              >
                <path
                  d="M56 32C56 28.8483 55.3792 25.7274 54.1731 22.8156C52.967 19.9038 51.1992 17.258 48.9706 15.0294C46.742 12.8008 44.0962 11.033 41.1844 9.82689C38.2726 8.62078 35.1517 8 32 8C28.8483 8 25.7274 8.62078 22.8156 9.82689C19.9038 11.033 17.258 12.8008 15.0294 15.0294C12.8008 17.258 11.033 19.9038 9.82689 22.8156C8.62078 25.7274 8 28.8483 8 32C8 35.1517 8.62078 38.2726 9.82689 41.1844C11.033 44.0962 12.8008 46.742 15.0294 48.9706C17.258 51.1992 19.9038 52.967 22.8156 54.1731C25.7274 55.3792 28.8483 56 32 56C35.1517 56 38.2726 55.3792 41.1844 54.1731C44.0962 52.967 46.742 51.1992 48.9706 48.9706C51.1992 46.742 52.967 44.0962 54.1731 41.1844C55.3792 38.2726 56 35.1517 56 32ZM0 32C0 23.5131 3.37142 15.3737 9.37258 9.37258C15.3737 3.37142 23.5131 0 32 0C40.4869 0 48.6263 3.37142 54.6274 9.37258C60.6286 15.3737 64 23.5131 64 32C64 40.4869 60.6286 48.6263 54.6274 54.6274C48.6263 60.6286 40.4869 64 32 64C23.5131 64 15.3737 60.6286 9.37258 54.6274C3.37142 48.6263 0 40.4869 0 32ZM32 42C34.6522 42 37.1957 40.9464 39.0711 39.0711C40.9464 37.1957 42 34.6522 42 32C42 29.3478 40.9464 26.8043 39.0711 24.9289C37.1957 23.0536 34.6522 22 32 22C29.3478 22 26.8043 23.0536 24.9289 24.9289C23.0536 26.8043 22 29.3478 22 32C22 34.6522 23.0536 37.1957 24.9289 39.0711C26.8043 40.9464 29.3478 42 32 42ZM32 14C36.7739 14 41.3523 15.8964 44.7279 19.2721C48.1036 22.6477 50 27.2261 50 32C50 36.7739 48.1036 41.3523 44.7279 44.7279C41.3523 48.1036 36.7739 50 32 50C27.2261 50 22.6477 48.1036 19.2721 44.7279C15.8964 41.3523 14 36.7739 14 32C14 27.2261 15.8964 22.6477 19.2721 19.2721C22.6477 15.8964 27.2261 14 32 14ZM28 32C28 30.9391 28.4214 29.9217 29.1716 29.1716C29.9217 28.4214 30.9391 28 32 28C33.0609 28 34.0783 28.4214 34.8284 29.1716C35.5786 29.9217 36 30.9391 36 32C36 33.0609 35.5786 34.0783 34.8284 34.8284C34.0783 35.5786 33.0609 36 32 36C30.9391 36 29.9217 35.5786 29.1716 34.8284C28.4214 34.0783 28 33.0609 28 32Z"
                  fill="url(#paint0_linear_540_1671)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_540_1671"
                    x1="32"
                    y1="0"
                    x2="32"
                    y2="64"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#CDE4FA" />
                    <stop offset="1" stopColor="#8EB7DE" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Replace with actual figures */}
              <h2>{activeHabits}</h2>
              <p className="text-xs sm:text-base">
                Active
                <br />
                Habits
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[146px] border border-dark-sixteen bg-white rounded-xl p-6 gap-6">
            <Spinner />
          </div>
        )}
        {/* Circle graph */}
        {!habitCompletionsCountLoading || !userStatsLoading ? (
          <div className="border border-dark-sixteen bg-white rounded-xl">
            <GradientRadialCard
              totalCount={activeHabits}
              completedCount={completedCount}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center border border-dark-sixteen bg-white rounded-lg min-h-[200px]">
            <Spinner />
          </div>
        )}
      </div>
      {/* Seperated Cards */}
      <div className="hidden sm:flex"></div>
    </>
  );
}

export default HeroCards;
