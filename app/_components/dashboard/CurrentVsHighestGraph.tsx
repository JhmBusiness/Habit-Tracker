import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  // KEY CHANGE: Now accepts an array of habits
  habits: HabitDataForChart[] | [];
}

function CurrentVsHighestGraph({ habits = [] }: StreakComparisonBarChartProps) {
  const currentStreakData = habits.map((h) => h.current_streak);
  const highestStreakData = habits.map((h) => h.highest_streak);

  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>(() => [
    {
      name: "Current Streak",
      data: currentStreakData,
    },
    {
      name: "Highest Streak",
      data: highestStreakData,
    },
  ]);

  const [chartOptions, setChartOptions] = useState<ApexOptions>({});

  const [dynamicHeight, setDynamicHeight] = useState(habits.length * 120);

  useEffect(() => {
    const newCurrentStreakData = habits.map((h) => h.current_streak);
    const newHighestStreakData = habits.map((h) => h.highest_streak);

    // Determine dynamic height based on number of habits
    setDynamicHeight(habits.length * 120); // Min height 150, then 45px per habit

    // Update chart series data
    setChartSeries([
      {
        name: "Current Streak",
        data: newCurrentStreakData,
      },
      {
        name: "Highest Streak",
        data: newHighestStreakData,
      },
    ]);

    // Update chart options
    setChartOptions({
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          //   easing: "easeout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: "top",
          },
          borderRadius: 4,
          //   barHeight: "40px",
          columnWidth: "40px",
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: -20,
        // offsetX: 0,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
        formatter: function (val: number) {
          return `${val}D`;
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#fff"],
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: undefined,
        shared: true,
        followCursor: true,
        intersect: false,
        inverseOrder: false,
        custom: undefined,
        hideEmptySeries: true,
        fillSeriesColor: false,
        theme: "light",
        style: {
          fontSize: "12px",
          fontFamily: undefined,
        },
        onDatasetHover: {
          highlightDataSeries: false,
        },

        y: {
          formatter: function (val: number) {
            if (val === 0) return "0 Days";

            return val !== 1 ? val + " Days" : val + " Day";
          },
          title: {
            formatter: function (seriesName) {
              return seriesName + ":";
            },
          },
        },
        z: {
          formatter: undefined,
          title: "Size: ",
        },
        marker: {
          show: true,
        },
        items: {
          display: "flex",
        },
        fixed: {
          enabled: false,
          position: "topRight",
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        logBase: 10,
        forceNiceScale: false,
        floating: false,

        labels: {
          show: true,
          showDuplicates: false,
          align: "left",
          minWidth: 0,
          maxWidth: 80,
          style: {
            colors: [],
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
          // useFormattedLabel: true,
          // offsetX: -48,
          formatter: (value: number) => {
            const habit = habits[value - 1];
            const category = habit?.category || "default";
            let result = category;
            switch (category) {
              case "sleepSchedule":
                result = "Sleep Schedule";
                break;

              case "bedHygiene":
                result = "Make Your Bed";
                break;
            }

            result = result.charAt(0).toUpperCase() + result.slice(1);

            return `${result}`;
          },
        },
        axisBorder: {
          show: true,
          color: "#78909C",
          offsetX: 0,
          offsetY: 0,
        },
        axisTicks: {
          show: true,
          color: "#78909C",
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        title: {
          text: undefined,
          rotate: -90,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "12px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-title",
          },
        },
        crosshairs: {
          show: true,
          position: "back",
          stroke: {
            color: "#b6b6b6",
            width: 1,
            dashArray: 0,
          },
        },
      },
      xaxis: {
        // categories: {},
        labels: {
          show: true,
        },
        axisBorder: { show: false }, // Hide axis border
        axisTicks: { show: false }, // Hide axis ticks
      },
      grid: {
        show: true,
      },
      colors: ["#8eb7de", "#5a9dbe"],
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        markers: {
          //   radius: 2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
        labels: {
          colors: ["#374151", "#374151"],
          useSeriesColors: false,
        },
        onItemClick: {
          toggleDataSeries: false,
        },
      },
    });
  }, [habits]);

  return (
    <div className="p-6 h-fit">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="100%"
        height={dynamicHeight}
      />
    </div>
  );
}

export default CurrentVsHighestGraph;
