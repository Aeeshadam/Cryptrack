import React from "react";

import { Box } from "@mui/material";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type HistoricDataItem = [number, number];

interface ChartProps {
  historicData: HistoricDataItem[];
}

const Chart: React.FC<ChartProps> = ({ historicData }) => {
  if (!historicData || historicData.length === 0) return null;

  const chartData = {
    labels: historicData.map((data) => new Date(data[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: historicData.map((data) => data[1]),
        fill: true,
        borderColor: "#d8a353",
        backgroundColor: "rgba(233, 188, 120, 0.2)",
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      data-testid="chart"
      sx={{
        height: "400px",
        width: "100%",
        marginY: "2rem",
        color: "grey.100",
      }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.3,
            },
          },
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20,
              },
            },
            y: {
              ticks: {
                callback: function (tickValue: string | number) {
                  if (typeof tickValue === "number") {
                    if (tickValue >= 1) {
                      return tickValue.toFixed(2);
                    } else {
                      return tickValue.toFixed(6);
                    }
                  }
                  return tickValue;
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#fff",
              },
            },
            title: {
              position: "top",
              align: "start",
              display: true,
              text: "Token Performance in the last 30 days",
              color: "#fff",
              font: {
                size: 20,
              },
            },
          },
        }}
      />
    </Box>
  );
};
export default Chart;
