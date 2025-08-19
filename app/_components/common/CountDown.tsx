"use client";

import { useEffect, useState } from "react";

function CountDown() {
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
    <div className="w-full text-center">
      <h4 className="pb-1">
        {formattedHour + ":" + formattedMin + ":" + formattedSec}
      </h4>
      <p className="text-xs">Time Remaining</p>
    </div>
  );
}

export default CountDown;
