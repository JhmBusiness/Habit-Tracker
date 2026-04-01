"use client";

import { useEffect, useState } from "react";

interface CountDownProps {
  type?: string;
}

function CountDown({ type }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function calculateTimeLeft() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const difference = endOfDay.getTime() - now.getTime();

    if (difference > 0) {
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    } else {
      setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
    }
  }

  useEffect(() => {
    calculateTimeLeft();

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function formatTime(num: number) {
    return num.toString().padStart(2, "0");
  }

  const formattedHour = formatTime(timeLeft.hours);
  const formattedMin = formatTime(timeLeft.minutes);
  const formattedSec = formatTime(timeLeft.seconds);

  return (
    <div className="w-full text-center sm:flex sm:items-center sm:gap-1">
      <h4 className="sm:min-w-[73px]">
        {formattedHour + ":" + formattedMin + ":" + formattedSec}
      </h4>
      {type !== "small" && <p className="text-xs">Time Remaining</p>}
    </div>
  );
}

export default CountDown;
