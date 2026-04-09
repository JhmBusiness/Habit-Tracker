import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";

import Spinner from "../common/Spinner";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full min-h-[200px]">
      <Spinner />
    </div>
  ),
});

interface HabitDataForChart {
  id: string;
  category: string;
  current_streak: number;
  highest_streak: number;
}

interface StreakComparisonBarChartProps {
  habits: HabitDataForChart[];
}

function CurrentVsHighestGraph({ habits = [] }: StreakComparisonBarChartProps) {
  const categories = useMemo(() => {
    return habits.map((h) => {
      let category = h.category;

      switch (category) {
        case "sleepSchedule":
          category = "Sleep Schedule";
          break;
        case "bedHygiene":
          category = "Make Your Bed";
          break;
      }

      return category.charAt(0).toUpperCase() + category.slice(1);
    });
  }, [habits]);

  const series = useMemo(() => {
    return [
      {
        name: "Current Streak",
        data: habits.map((h) => h.current_streak),
      },
      {
        name: "Highest Streak",
        data: habits.map((h) => h.highest_streak),
      },
    ];
  }, [habits]);

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "56%",
          borderRadius: 5,
          borderRadiusApplication: "end",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          show: true,
        },
      },
      yaxis: {
        title: {
          text: "Days",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => {
            if (val === 0) return "0 Days";
            return val === 1 ? "1 Day" : `${val} Days`;
          },
        },
      },
      colors: ["#8eb7de", "#5a9dbe"],
      legend: {
        position: "top",
        horizontalAlign: "left",
      },
      grid: {
        show: true,
      },
    };
  }, [categories]);

  return (
    <>
      <div className="p-6 h-[400px] xl:h-[480px] 2xl:h-[calc(100%-80px)]">
        <Chart
          options={options}
          series={series}
          type="bar"
          width="100%"
          // height={252}
          height="100%"
        />
      </div>
    </>
  );
}

export default CurrentVsHighestGraph;
