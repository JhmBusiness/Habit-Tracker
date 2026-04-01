import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

interface innerCardInterface extends childrenAndStyles {
  type: string;
  position: string;
}

function InnerCardSection({ children, type, position }: innerCardInterface) {
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

  return (
    <div
      className={`${cardLightBgColour[type]} p-4 rounded-sm relative ${position === "bottom" && "sm:col-span-2"} ${position === "topLeft" && "sm:w-fit"}`}
    >
      {children}
    </div>
  );
}

export default InnerCardSection;
