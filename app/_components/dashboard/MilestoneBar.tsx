import { HabitMilestoneInfo } from "@/app/_lib/interfaces/habits";
import { motion } from "framer-motion";

interface milestoneInterface {
  nearestMilestoneHabit: HabitMilestoneInfo | null;
}

function MilestoneBar({ nearestMilestoneHabit }: milestoneInterface) {
  const barBg: { [key: string]: string } = {
    fitness: "bg-fitness-bar-bg",
    sleepSchedule: "bg-sleepSchedule-bar-bg",
    learning: "bg-learning-bar-bg",
    reading: "bg-reading-bar-bg",
    hydration: "bg-hydration-bar-bg",
    bedHygiene: "bg-bedHygiene-bar-bg",
    breakfast: "bg-breakfast-bar-bg",
    writing: "bg-writing-bar-bg",
    diet: "bg-diet-bar-bg",
  };

  const barGradientBg: { [key: string]: string } = {
    fitness: "bg-gradient-to-r from-fitness-accent to-fitness-bar-grad-light",
    sleepSchedule:
      "bg-gradient-to-r from-sleepSchedule-accent to-sleepSchedule-bar-grad-light",
    learning:
      "bg-gradient-to-r from-learning-accent to-learning-bar-grad-light",
    reading: "bg-gradient-to-r from-reading-accent to-reading-bar-grad-light",
    hydration:
      "bg-gradient-to-r from-hydration-accent to-hydration-bar-grad-light",
    bedHygiene:
      "bg-gradient-to-r from-bedHygiene-accent to-bedHygiene-bar-grad-light",
    breakfast:
      "bg-gradient-to-r from-breakfast-accent to-breakfast-bar-grad-light",
    writing: "bg-gradient-to-r from-writing-accent to-writing-bar-grad-light",
    diet: "bg-gradient-to-r from-diet-accent to-diet-bar-grad-light",
  };

  const barShadow: { [key: string]: string } = {
    fitness: "drop-shadow-fitness-bar",
    sleepSchedule: "drop-shadow-sleepSchedule-bar",
    learning: "drop-shadow-learning-bar",
    reading: "drop-shadow-reading-bar",
    hydration: "drop-shadow-hydration-bar",
    bedHygiene: "drop-shadow-bedHygiene-bar",
    breakfast: "drop-shadow-breakfast-bar",
    writing: "drop-shadow-writing-bar",
    diet: "drop-shadow-diet-bar",
  };

  const barSvgIcon: { [key: string]: React.ReactElement } = {
    fitness: (
      <svg
        width="24"
        height="17"
        viewBox="0 0 24 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.6 1.21429C3.6 0.542634 4.13625 0 4.8 0H6C6.66375 0 7.2 0.542634 7.2 1.21429V7.28571V9.71429V15.7857C7.2 16.4574 6.66375 17 6 17H4.8C4.13625 17 3.6 16.4574 3.6 15.7857V13.3571H2.4C1.73625 13.3571 1.2 12.8145 1.2 12.1429V9.71429C0.53625 9.71429 0 9.17165 0 8.5C0 7.82835 0.53625 7.28571 1.2 7.28571V4.85714C1.2 4.18549 1.73625 3.64286 2.4 3.64286H3.6V1.21429ZM20.4 1.21429V3.64286H21.6C22.2638 3.64286 22.8 4.18549 22.8 4.85714V7.28571C23.4638 7.28571 24 7.82835 24 8.5C24 9.17165 23.4638 9.71429 22.8 9.71429V12.1429C22.8 12.8145 22.2638 13.3571 21.6 13.3571H20.4V15.7857C20.4 16.4574 19.8638 17 19.2 17H18C17.3363 17 16.8 16.4574 16.8 15.7857V9.71429V7.28571V1.21429C16.8 0.542634 17.3363 0 18 0H19.2C19.8638 0 20.4 0.542634 20.4 1.21429ZM15.6 7.28571V9.71429H8.4V7.28571H15.6Z"
          fill="#FEEDE2"
        />
      </svg>
    ),
    sleepSchedule: (
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2181 0C5.46669 0 0 5.37321 0 12C0 18.6268 5.46669 24 12.2181 24C15.5309 24 18.5321 22.7036 20.7352 20.6036C21.0085 20.3411 21.0796 19.9339 20.9046 19.6018C20.7297 19.2696 20.3525 19.0821 19.9753 19.1464C19.4396 19.2375 18.8929 19.2857 18.3298 19.2857C13.0326 19.2857 8.73578 15.0643 8.73578 9.85714C8.73578 6.33214 10.7038 3.2625 13.6175 1.64464C13.951 1.45714 14.1205 1.08214 14.0385 0.717857C13.9565 0.353572 13.6394 0.0803572 13.2567 0.0482144C12.9123 0.0214287 12.5679 0.00535706 12.2181 0.00535706V0Z"
          fill="#E5F2FA"
        />
      </svg>
    ),
    learning: (
      <svg
        width="17"
        height="24"
        viewBox="0 0 17 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.3636 18C12.8273 16.5047 13.7884 15.2297 14.7398 13.9594C14.9909 13.6266 15.242 13.2937 15.4835 12.9562C16.4398 11.6203 17 10.0031 17 8.25469C17 3.69375 13.1943 0 8.5 0C3.80568 0 0 3.69375 0 8.25C0 9.99844 0.560227 11.6203 1.51648 12.9516C1.75795 13.2891 2.00909 13.6219 2.26023 13.9547C3.21648 15.225 4.17756 16.5047 4.63636 17.9953H12.3636V18ZM8.5 24C10.6347 24 12.3636 22.3219 12.3636 20.25V19.5H4.63636V20.25C4.63636 22.3219 6.36534 24 8.5 24ZM4.63636 8.25C4.63636 8.6625 4.28864 9 3.86364 9C3.43864 9 3.09091 8.6625 3.09091 8.25C3.09091 5.34844 5.51051 3 8.5 3C8.925 3 9.27273 3.3375 9.27273 3.75C9.27273 4.1625 8.925 4.5 8.5 4.5C6.36534 4.5 4.63636 6.17812 4.63636 8.25Z"
          fill="#F2EAF6"
        />
      </svg>
    ),
    reading: (
      <svg
        width="21"
        height="24"
        viewBox="0 0 21 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 0C2.01562 0 0 2.01562 0 4.5V19.5C0 21.9844 2.01562 24 4.5 24H18H19.5C20.3297 24 21 23.3297 21 22.5C21 21.6703 20.3297 21 19.5 21V18C20.3297 18 21 17.3297 21 16.5V1.5C21 0.670312 20.3297 0 19.5 0H18H4.5ZM4.5 18H16.5V21H4.5C3.67031 21 3 20.3297 3 19.5C3 18.6703 3.67031 18 4.5 18ZM6 6.75C6 6.3375 6.3375 6 6.75 6H15.75C16.1625 6 16.5 6.3375 16.5 6.75C16.5 7.1625 16.1625 7.5 15.75 7.5H6.75C6.3375 7.5 6 7.1625 6 6.75ZM6.75 9H15.75C16.1625 9 16.5 9.3375 16.5 9.75C16.5 10.1625 16.1625 10.5 15.75 10.5H6.75C6.3375 10.5 6 10.1625 6 9.75C6 9.3375 6.3375 9 6.75 9Z"
          fill="#F2E9F6"
        />
      </svg>
    ),
    hydration: (
      <svg
        width="18"
        height="24"
        viewBox="0 0 18 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.49988 0C1.08266 0 0.684195 0.173437 0.402924 0.478125C0.121652 0.782812 -0.0283596 1.19062 0.00445541 1.60781L1.35456 20.5172C1.4952 22.4813 3.12657 24 5.09547 24H12.9055C14.8744 24 16.5057 22.4813 16.6464 20.5172L17.9965 1.60781C18.0246 1.19062 17.884 0.782812 17.598 0.478125C17.312 0.173437 16.9183 0 16.501 0H1.49988ZM3.42191 7.33594L3.11251 3H14.8931L14.579 7.33594L13.4446 7.90313C12.5351 8.35781 11.4663 8.35781 10.5568 7.90313C9.57707 7.41563 8.42386 7.41563 7.44409 7.90313C6.53465 8.35781 5.46581 8.35781 4.55637 7.90313L3.42191 7.33594Z"
          fill="#E5F2FA"
        />
      </svg>
    ),
    bedHygiene: (
      <svg
        width="24"
        height="17"
        viewBox="0 0 24 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.2 0C1.86375 0 2.4 0.542634 2.4 1.21429V10.9286H10.8V4.85714C10.8 4.18549 11.3363 3.64286 12 3.64286H20.4C22.3875 3.64286 24 5.27455 24 7.28571V15.7857C24 16.4574 23.4638 17 22.8 17C22.1363 17 21.6 16.4574 21.6 15.7857V14.5714H13.2H12H2.4V15.7857C2.4 16.4574 1.86375 17 1.2 17C0.53625 17 0 16.4574 0 15.7857V1.21429C0 0.542634 0.53625 0 1.2 0ZM6.6 3.64286C7.39565 3.64286 8.15871 3.96269 8.72132 4.532C9.28393 5.1013 9.6 5.87345 9.6 6.67857C9.6 7.48369 9.28393 8.25584 8.72132 8.82515C8.15871 9.39445 7.39565 9.71429 6.6 9.71429C5.80435 9.71429 5.04129 9.39445 4.47868 8.82515C3.91607 8.25584 3.6 7.48369 3.6 6.67857C3.6 5.87345 3.91607 5.1013 4.47868 4.532C5.04129 3.96269 5.80435 3.64286 6.6 3.64286Z"
          fill="#EEF1F1"
        />
      </svg>
    ),
    breakfast: (
      <svg
        width="24"
        height="21"
        viewBox="0 0 24 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.2983 0.0508346C18.7649 -0.0804092 19.2649 0.0467332 19.6065 0.383045L21.5814 2.32709L20.4773 2.6511C18.0608 3.33193 16.3901 4.27524 15.0777 5.41542C13.7778 6.5433 12.8613 7.83933 11.9488 9.14356L11.853 9.27891C10.0657 11.8423 8.12415 14.6271 3.03291 17.133L1.57886 17.8508L0.391461 16.6778C0.0873195 16.3784 -0.050169 15.9559 0.0164921 15.5376C0.0831532 15.1193 0.353964 14.7624 0.737265 14.5738C5.67019 12.1499 7.5367 9.47578 9.30322 6.94523L9.39904 6.80579C10.3073 5.50155 11.2697 4.144 12.6363 2.9546C14.0278 1.7447 15.7943 0.75627 18.2983 0.0508346ZM2.57461 18.8269L3.63286 18.306C9.02824 15.6524 11.1281 12.642 12.9571 10.0213L13.0487 9.88591C13.9695 8.56937 14.8028 7.40458 15.961 6.39565C17.1067 5.39902 18.6024 4.54183 20.8481 3.91022L20.8564 3.90612L22.6521 3.37704L23.6104 4.32036C23.9437 4.64847 24.077 5.12833 23.9562 5.57948C23.8353 6.03063 23.4854 6.38334 23.0312 6.51049C20.8689 7.11749 19.4649 7.93366 18.4025 8.85647C17.3151 9.79978 16.5234 10.9031 15.5985 12.2237L15.5069 12.3549C13.657 15.0085 11.478 18.1297 5.9285 20.8612C5.41604 21.1155 4.79526 21.0129 4.39113 20.6151L2.57461 18.8269Z"
          fill="#FEF3E2"
        />
      </svg>
    ),
    writing: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.3076 0.775927L14.6756 3.41196L20.5918 9.32648L23.2239 6.69518C24.2587 5.66061 24.2587 3.98829 23.2239 2.95372L21.0502 0.775927C20.0153 -0.258643 18.3425 -0.258643 17.3076 0.775927ZM13.5084 4.38039L13.0737 4.51266L6.26438 6.55346C5.32402 6.8369 4.57741 7.55496 4.26553 8.49032L0.0788266 20.9713C-0.100739 21.5051 0.0315726 22.1004 0.423781 22.5019L7.682 15.2505C7.54024 14.9528 7.45991 14.6222 7.45991 14.2726C7.45991 13.0207 8.47587 12.005 9.7281 12.005C10.9803 12.005 11.9963 13.0207 11.9963 14.2726C11.9963 15.5245 10.9803 16.5401 9.7281 16.5401C9.37842 16.5401 9.04764 16.4598 8.74994 16.3181L1.49172 23.5743C1.89811 23.9664 2.48878 24.1034 3.02275 23.9191L15.512 19.7336C16.4429 19.4218 17.1659 18.6754 17.4494 17.7353L19.4908 10.9279L19.6184 10.4933L13.5084 4.38039Z"
          fill="#EFF0F1"
        />
      </svg>
    ),
    diet: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2517 0.281233C15.8251 0.796826 15.0001 1.98269 15.0001 3.37479C15.0001 5.24968 15.7173 5.96682 16.8751 7.12456C18.0329 8.2823 18.7501 8.99945 20.625 8.99945C22.0172 8.99945 23.2031 8.1745 23.7188 7.74796C23.9063 7.59328 24 7.36361 24 7.12456C24 6.88552 23.9063 6.65584 23.7188 6.50585C23.1844 6.07931 21.9235 5.24968 20.2501 5.24968C18.7501 5.24968 18.3751 5.62465 18.3751 5.62465C18.3751 5.62465 18.7501 5.24968 18.7501 3.74977C18.7501 2.07644 17.9204 0.815575 17.4938 0.281233C17.3438 0.0937442 17.1142 0 16.8751 0C16.636 0 16.4064 0.0937442 16.2517 0.281233ZM11.4658 6.37461C9.59083 6.37461 7.85179 7.22299 6.69868 8.63385L9.53457 11.4696C9.8252 11.7602 9.8252 12.2383 9.53457 12.5289C9.24395 12.8195 8.76584 12.8195 8.47521 12.5289L5.88306 9.93689V9.94158L0.103454 22.4002C-0.0934184 22.8267 -0.00435708 23.3329 0.328451 23.6704C0.661259 24.0079 1.1675 24.0923 1.59875 23.8954L7.91272 20.9706L5.47057 18.5285C5.17995 18.2379 5.17995 17.7598 5.47057 17.4692C5.76119 17.1786 6.23931 17.1786 6.52993 17.4692L9.36114 20.2956L14.058 18.1208C16.2329 17.113 17.6298 14.9335 17.6298 12.5336C17.6251 9.13069 14.8689 6.37461 11.4658 6.37461Z"
          fill="#E6F9EE"
        />
      </svg>
    ),
  };

  const habitCategory = nearestMilestoneHabit?.habit.category || "";
  const currentHabitStreak = nearestMilestoneHabit?.habit.current_streak;
  const nextMilestone = nearestMilestoneHabit?.nextMilestoneStreak;

  let cycleStartStreak = 0;
  if (nextMilestone === 7) cycleStartStreak = 0;
  else if (nextMilestone === 14) cycleStartStreak = 7;
  else if (nextMilestone === 30) cycleStartStreak = 14;
  else if (nextMilestone === 45) cycleStartStreak = 30;
  else if (nextMilestone === 60) cycleStartStreak = 45;
  else if (nextMilestone! > 60) {
    cycleStartStreak = nextMilestone! - 30;
  }

  const currentProgressInCycle = currentHabitStreak! - cycleStartStreak;
  const totalDaysInCycle = nextMilestone! - cycleStartStreak;

  const percentage =
    totalDaysInCycle > 0
      ? (currentProgressInCycle / totalDaysInCycle) * 100
      : 0;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="p-6">
      {/* Days */}
      <div className="flex gap-1 items-center mb-2 ml-2">
        <h2>{currentHabitStreak}</h2>
        <p className="text-xs sm:text-base mt-[2px]">/ {nextMilestone} days</p>
      </div>
      {/* Bar */}
      <div
        className={`relative rounded-xl w-full min-h-6 ${barBg[habitCategory]}`}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full rounded-full ${barShadow[habitCategory]} ${barGradientBg[habitCategory]} flex items-center`}
        >
          <div className="w-3 flex ml-auto relative justify-center mr-2">
            {barSvgIcon[habitCategory]}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default MilestoneBar;
