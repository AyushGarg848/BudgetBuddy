import React, { useMemo } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = useMemo(() => {
    const combinedData = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = combinedData.map((data) => dateFormat(data.date));

    let cumulativeIncome = 0;
    let cumulativeExpenses = 0;
    const incomeData = [];
    const expenseData = [];

    combinedData.forEach((data) => {
      if (incomes.includes(data)) {
        cumulativeIncome += data.amount;
      } else {
        cumulativeExpenses += data.amount;
      }
      incomeData.push(cumulativeIncome);
      expenseData.push(cumulativeExpenses);
    })

    return {
      labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "green",
          tension: 0.2,
        },
        {
          label: "Expenses",
          data: expenseData,
          backgroundColor: "red",
          tension: 0.2,
        },
      ],
    };
  }, [incomes, expenses]);

  return (
    <ChartStyled>
      <Line data={data} options={{ responsive: true }} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #FCF6F9;
  border: 2px solid #FFFFFF;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: auto;
  width: auto;
  box-sizing: border-box;
`;

export default Chart;
