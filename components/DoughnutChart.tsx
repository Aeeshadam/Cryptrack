import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { PortfolioCoin } from "@/types";
import { useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { Box } from "@mui/material";
import { generateRandomColor } from "@/utils/utils";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface DoughnutChartProps {
  portfolioCoins: PortfolioCoin[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ portfolioCoins }) => {
  const coinList = useSelector((state: AppState) => state.coinList.coins);
  if (!portfolioCoins || portfolioCoins.length === 0) return null;

  const coinValue = portfolioCoins.map((portfolioCoin) => {
    const coin = coinList.find((coin) => coin.id === portfolioCoin.id);
    const coinPrice = coin?.current_price || 0;
    return coinPrice * portfolioCoin.quantity;
  });

  const totalValue = coinValue.reduce((acc, value) => acc + value, 0);

  const chartData = {
    labels: portfolioCoins.map((coin) => coin.name),
    datasets: [
      {
        label: "Coin Allocation",
        data: coinValue,
        backgroundColor: [
          ...portfolioCoins.map(() => generateRandomColor()),
        ] as string[],
        borderColor: "rgba(236, 172, 76, 0.5)",
        borderWidth: 0,
      },
    ],
  };

  return (
    <Box
      height="300px"
      sx={{
        marginY: "2rem",
        width: {
          xs: "100%",
          md: "50%",
          sm: "75%",
        },
      }}
    >
      <Doughnut
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              position: "top",
              align: "start",
              display: true,
              text: "Token Allocation",
              color: "#fff",
              padding: {
                bottom: 20,
              },
              font: {
                size: 20,
              },
            },
            legend: {
              labels: {
                color: "#fff",
              },
              position: "right",
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (tooltipItem: any) {
                  const value = chartData.datasets[0]?.data[
                    tooltipItem.dataIndex
                  ] as number;
                  const percentage = ((value / totalValue) * 100).toFixed(2);
                  return `${
                    chartData.labels![tooltipItem.dataIndex]
                  }: ${percentage}%`;
                },
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default DoughnutChart;
