import { childrenAndStyles } from "@/app/_lib/interfaces/childrenAndStyles";

interface innerCardInterface extends childrenAndStyles {
  type: string;
}

function InnerCardSection({ children, type }: innerCardInterface) {
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
    <div className={`${cardLightBgColour[type]} p-4 rounded-sm relative`}>
      {children}
    </div>
  );
}

export default InnerCardSection;
