"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import Spinner from "../common/Spinner";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full min-h-[200px]">
      <Spinner />
    </div>
  ),
});

interface MyRadialBarChartProps {
  completedCount: number;
  totalCount: number;
}

function GradientRadialCard({
  completedCount,
  totalCount,
}: MyRadialBarChartProps) {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const [chartSeries] = useState<number[]>([percentage]);

  const [chartOptions] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "80%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
        },
        track: {
          background: "#fafafa",
          strokeWidth: "100%",
          margin: 0,
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#1d1d1d",
            fontSize: "16px",
          },
          value: {
            formatter: function () {
              return `${completedCount}/${totalCount}`;
            },
            color: "#1d1d1d",
            fontSize: "32px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#8EB7DE"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Completed"],
    colors: ["#5A9DBE"],
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
          return val.toFixed(0) + "%";
        },
        title: {
          formatter: function () {
            return "Habits completed";
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
  });

  return (
    <div className="w-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
        width="100%"
        height="200"
      />
    </div>
  );
}

export default GradientRadialCard;
