import { useModal } from "@/app/_context/ModalContext";
import { useUserHabitCompletionMilestonesToday } from "@/app/_lib/_utils/queries";

interface NewPostHabitCategoryBtnProps {
  category: string;
  id: string;
  label: string;
}

function NewPostHabitCategoryBtn({
  category,
  label,
  id: habitId,
}: NewPostHabitCategoryBtnProps) {
  const { openModal } = useModal();
  const { milestoneCompletionsToday } = useUserHabitCompletionMilestonesToday();

  const svgIcon: { [key: string]: React.ReactElement } = {
    fitness: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 40 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 2C6 0.89375 6.89375 0 8 0H10C11.1062 0 12 0.89375 12 2V12V16V26C12 27.1063 11.1062 28 10 28H8C6.89375 28 6 27.1063 6 26V22H4C2.89375 22 2 21.1063 2 20V16C0.89375 16 0 15.1062 0 14C0 12.8938 0.89375 12 2 12V8C2 6.89375 2.89375 6 4 6H6V2ZM34 2V6H36C37.1063 6 38 6.89375 38 8V12C39.1063 12 40 12.8938 40 14C40 15.1062 39.1063 16 38 16V20C38 21.1063 37.1063 22 36 22H34V26C34 27.1063 33.1063 28 32 28H30C28.8937 28 28 27.1063 28 26V16V12V2C28 0.89375 28.8937 0 30 0H32C33.1063 0 34 0.89375 34 2ZM26 12V16H14V12H26Z"
          fill="url(#paint0_linear_553_8021)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_553_8021"
            x1="20"
            y1="0"
            x2="20"
            y2="28"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FAE0CD" />
            <stop offset="1" stopColor="#F46E0D" />
          </linearGradient>
        </defs>
      </svg>
    ),
    sleepSchedule: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 34 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.7816 0C8.85084 0 0 8.95536 0 20C0 31.0446 8.85084 40 19.7816 40C25.1452 40 30.0043 37.8393 33.5712 34.3393C34.0138 33.9018 34.1288 33.2232 33.8456 32.6696C33.5624 32.1161 32.9517 31.8036 32.341 31.9107C31.4736 32.0625 30.5885 32.1429 29.6769 32.1429C21.1004 32.1429 14.1436 25.1071 14.1436 16.4286C14.1436 10.5536 17.3299 5.4375 22.0474 2.74107C22.5873 2.42857 22.8617 1.80357 22.729 1.19643C22.5962 0.589286 22.0828 0.133929 21.4633 0.0803573C20.9057 0.0357144 20.3481 0.00892844 19.7816 0.00892844V0Z"
          fill="url(#paint0_linear_553_8034)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_553_8034"
            x1="17"
            y1="0"
            x2="17"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CDE8FA" />
            <stop offset="1" stopColor="#3498DB" />
          </linearGradient>
        </defs>
      </svg>
    ),
    learning: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 33 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 36C24.9 33.0094 26.7656 30.4594 28.6125 27.9187C29.1 27.2531 29.5875 26.5875 30.0563 25.9125C31.9125 23.2406 33 20.0063 33 16.5094C33 7.3875 25.6125 0 16.5 0C7.3875 0 0 7.3875 0 16.5C0 19.9969 1.0875 23.2406 2.94375 25.9031C3.4125 26.5781 3.9 27.2438 4.3875 27.9094C6.24375 30.45 8.10938 33.0094 9 35.9906H24V36ZM16.5 48C20.6438 48 24 44.6438 24 40.5V39H9V40.5C9 44.6438 12.3562 48 16.5 48ZM9 16.5C9 17.325 8.325 18 7.5 18C6.675 18 6 17.325 6 16.5C6 10.6969 10.6969 6 16.5 6C17.325 6 18 6.675 18 7.5C18 8.325 17.325 9 16.5 9C12.3562 9 9 12.3562 9 16.5Z"
          fill="url(#paint0_linear_430_186)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_186"
            x1="16.5"
            y1="0"
            x2="16.5"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EDCCFA" />
            <stop offset="1" stopColor="#9B59B6" />
          </linearGradient>
        </defs>
      </svg>
    ),
    reading: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 42 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 0C4.03125 0 0 4.03125 0 9V39C0 43.9688 4.03125 48 9 48H36H39C40.6594 48 42 46.6594 42 45C42 43.3406 40.6594 42 39 42V36C40.6594 36 42 34.6594 42 33V3C42 1.34062 40.6594 0 39 0H36H9ZM9 36H33V42H9C7.34062 42 6 40.6594 6 39C6 37.3406 7.34062 36 9 36ZM12 13.5C12 12.675 12.675 12 13.5 12H31.5C32.325 12 33 12.675 33 13.5C33 14.325 32.325 15 31.5 15H13.5C12.675 15 12 14.325 12 13.5ZM13.5 18H31.5C32.325 18 33 18.675 33 19.5C33 20.325 32.325 21 31.5 21H13.5C12.675 21 12 20.325 12 19.5C12 18.675 12.675 18 13.5 18Z"
          fill="url(#paint0_linear_430_182)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_182"
            x1="21"
            y1="0"
            x2="21"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#ECCCFA" />
            <stop offset="1" stopColor="#8E44AD" />
          </linearGradient>
        </defs>
      </svg>
    ),
    hydration: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 36 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.99977 0C2.16533 0 1.36839 0.346875 0.805847 0.95625C0.243304 1.56562 -0.0567193 2.38125 0.00891081 3.21562L2.70912 41.0344C2.99039 44.9625 6.25314 48 10.1909 48H25.8109C29.7487 48 33.0115 44.9625 33.2927 41.0344L35.9929 3.21562C36.0492 2.38125 35.7679 1.56562 35.196 0.95625C34.6241 0.346875 33.8365 0 33.0021 0H2.99977ZM6.84381 14.6719L6.22502 6H29.7862L29.158 14.6719L26.8891 15.8063C25.0702 16.7156 22.9326 16.7156 21.1137 15.8063C19.1541 14.8313 16.8477 14.8313 14.8882 15.8063C13.0693 16.7156 10.9316 16.7156 9.11274 15.8063L6.84381 14.6719Z"
          fill="url(#paint0_linear_430_178)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_178"
            x1="18"
            y1="0"
            x2="18"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CCE8FA" />
            <stop offset="1" stopColor="#5DADE2" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bedHygiene: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.4 0C3.7275 0 4.8 1.08527 4.8 2.42857V21.8571H21.6V9.71429C21.6 8.37098 22.6725 7.28571 24 7.28571H40.8C44.775 7.28571 48 10.5491 48 14.5714V31.5714C48 32.9147 46.9275 34 45.6 34C44.2725 34 43.2 32.9147 43.2 31.5714V29.1429H26.4H24H4.8V31.5714C4.8 32.9147 3.7275 34 2.4 34C1.0725 34 0 32.9147 0 31.5714V2.42857C0 1.08527 1.0725 0 2.4 0ZM13.2 7.28571C14.7913 7.28571 16.3174 7.92538 17.4426 9.06399C18.5679 10.2026 19.2 11.7469 19.2 13.3571C19.2 14.9674 18.5679 16.5117 17.4426 17.6503C16.3174 18.7889 14.7913 19.4286 13.2 19.4286C11.6087 19.4286 10.0826 18.7889 8.95736 17.6503C7.83214 16.5117 7.2 14.9674 7.2 13.3571C7.2 11.7469 7.83214 10.2026 8.95736 9.06399C10.0826 7.92538 11.6087 7.28571 13.2 7.28571Z"
          fill="url(#paint0_linear_430_174)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_174"
            x1="24"
            y1="0"
            x2="24"
            y2="34"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CCF7FA" />
            <stop offset="1" stopColor="#95A5A6" />
          </linearGradient>
        </defs>
      </svg>
    ),
    breakfast: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36.5966 0.10409C37.5299 -0.164647 38.5298 0.0956918 39.2131 0.784331L43.1627 4.765L40.9546 5.42844C36.1216 6.82252 32.7803 8.75407 30.1555 11.0887C27.5557 13.3982 25.7225 16.052 23.8977 18.7225L23.706 18.9997C20.1313 24.2484 16.2483 29.9507 6.06581 35.0819L3.15772 36.5516L0.782922 34.1497C0.174639 33.5367 -0.100338 32.6717 0.0329843 31.8151C0.166306 30.9585 0.707928 30.2278 1.47453 29.8415C11.3404 24.8783 15.0734 19.4028 18.6064 14.2212L18.7981 13.9357C20.6146 11.2651 22.5394 8.48533 25.2725 6.0499C28.0556 3.57248 31.5887 1.54855 36.5966 0.10409ZM5.14922 38.5503L7.26571 37.4837C18.0565 32.0502 22.2561 25.8861 25.9142 20.5197L26.0975 20.2426C27.939 17.5468 29.6055 15.1618 31.922 13.0959C34.2135 11.0551 37.2049 9.29994 41.6962 8.00664L41.7128 7.99824L45.3042 6.9149L47.2207 8.84645C47.8873 9.51829 48.154 10.5009 47.9123 11.4246C47.6707 12.3484 46.9707 13.0707 46.0625 13.331C41.7378 14.5739 38.9297 16.2451 36.8049 18.1347C34.6301 20.0662 33.0469 22.3253 31.1971 25.0295L31.0137 25.2982C27.314 30.7317 22.9561 37.1226 11.857 42.7157C10.8321 43.2364 9.59052 43.0265 8.78225 42.2118L5.14922 38.5503Z"
          fill="url(#paint0_linear_430_170)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_170"
            x1="24"
            y1="0"
            x2="24"
            y2="43"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FAE8CC" />
            <stop offset="1" stopColor="#F39C12" />
          </linearGradient>
        </defs>
      </svg>
    ),
    writing: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.6153 1.55185L29.3512 6.82391L41.1836 18.653L46.4477 13.3904C48.5174 11.3212 48.5174 7.97658 46.4477 5.90744L42.1003 1.55185C40.0306 -0.517285 36.685 -0.517285 34.6153 1.55185ZM27.0168 8.76078L26.1474 9.02532L12.5288 13.1069C10.648 13.6738 9.15482 15.1099 8.53107 16.9806L0.157653 41.9426C-0.201477 43.0102 0.0631451 44.2007 0.847562 45.0038L15.364 30.5009C15.0805 29.9057 14.9198 29.2443 14.9198 28.5452C14.9198 26.0414 16.9517 24.0101 19.4562 24.0101C21.9607 24.0101 23.9926 26.0414 23.9926 28.5452C23.9926 31.0489 21.9607 33.0803 19.4562 33.0803C18.7568 33.0803 18.0953 32.9196 17.4999 32.6362L2.98344 47.1485C3.79621 47.9327 4.97756 48.2067 6.04551 47.8382L31.024 39.4672C32.8858 38.8436 34.3318 37.3508 34.8988 35.4706L38.9816 21.8559L39.2367 20.9867L27.0168 8.76078Z"
          fill="url(#paint0_linear_430_190)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_190"
            x1="24"
            y1="0"
            x2="24"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CCF7FA" />
            <stop offset="1" stopColor="#7F8C8D" />
          </linearGradient>
        </defs>
      </svg>
    ),
    diet: (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M32.5033 0.562465C31.6502 1.59365 30.0003 3.96538 30.0003 6.74959C30.0003 10.4994 31.4346 11.9336 33.7502 14.2491C36.0658 16.5646 37.5001 17.9989 41.2501 17.9989C44.0344 17.9989 46.4063 16.349 47.4375 15.4959C47.8125 15.1866 48 14.7272 48 14.2491C48 13.771 47.8125 13.3117 47.4375 13.0117C46.3688 12.1586 43.8469 10.4994 40.5001 10.4994C37.5001 10.4994 36.7502 11.2493 36.7502 11.2493C36.7502 11.2493 37.5001 10.4994 37.5001 7.49954C37.5001 4.15287 35.8408 1.63115 34.9877 0.562465C34.6877 0.187488 34.2283 0 33.7502 0C33.2721 0 32.8127 0.187488 32.5033 0.562465ZM22.9316 12.7492C19.1816 12.7492 15.7036 14.446 13.3974 17.2677L19.0691 22.9392C19.6504 23.5204 19.6504 24.4766 19.0691 25.0578C18.4879 25.6391 17.5317 25.6391 16.9504 25.0578L11.7661 19.8738V19.8832L0.206908 44.8004C-0.186837 45.6534 -0.00871415 46.6659 0.656902 47.3408C1.32252 48.0158 2.335 48.1845 3.19749 47.7908L15.8254 41.9412L10.9411 37.0571C10.3599 36.4759 10.3599 35.5197 10.9411 34.9385C11.5224 34.3573 12.4786 34.3573 13.0599 34.9385L18.7223 40.5913L28.1159 36.2415C32.4658 34.226 35.2596 29.8669 35.2596 25.0672C35.2502 18.2614 29.7378 12.7492 22.9316 12.7492Z"
          fill="url(#paint0_linear_430_194)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_430_194"
            x1="24"
            y1="0"
            x2="24"
            y2="48"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#CCFADF" />
            <stop offset="1" stopColor="#2ECC71" />
          </linearGradient>
        </defs>
      </svg>
    ),
  };

  const cardLightBgColour: { [key: string]: string } = {
    fitness: "bg-fitness-light",
    sleepSchedule: "bg-sleepSchedule-light",
    learning: "bg-learning-light",
    reading: "bg-reading-light",
    hydration: "bg-hydration-light",
    bedHygiene: "bg-bedHygiene-light",
    breakfast: "bg-breakfast-light",
    writing: "bg-writing-light",
    diet: "bg-diet-light",
  };

  const cardBorderColour: { [key: string]: string } = {
    fitness: "border-fitness-accent",
    sleepSchedule: "border-sleepSchedule-accent",
    learning: "border-learning-accent",
    reading: "border-reading-accent",
    hydration: "border-hydration-accent",
    bedHygiene: "border-bedHygiene-accent",
    breakfast: "border-breakfast-accent",
    writing: "border-writing-accent",
    diet: "border-diet-accent",
  };

  const completedIds: string[] = [];
  milestoneCompletionsToday?.map((el) => completedIds.push(el.habit_id));

  function handleClick() {
    openModal("new-post", { habitId, category });
  }

  return (
    <button
      onClick={handleClick}
      disabled={!completedIds.includes(habitId)}
      className={`py-4 px-[12px] sm:px-5 flex gap-2 items-center justify-center border rounded-sm border-dark-sixteen hover:${cardBorderColour[category]} hover:${cardLightBgColour[category]} cursor-pointer duration-200 disabled:bg-dark-sixteen disabled:border-dark-sixteen disabled:grayscale-75 disabled:cursor-not-allowed`}
    >
      <span className="w-4 h-4 sm:w-6 sm:h-6">{svgIcon[category]}</span>
      <h5>{label}</h5>
    </button>
  );
}

export default NewPostHabitCategoryBtn;
