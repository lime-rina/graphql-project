import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { MdLogout } from "react-icons/md";
import TransactionForm from "../components/UI/TransactionForm";
import Cards from "../components/UI/Cards";
import { useMutation, useQuery } from "@apollo/client";
import { LOG_OUT } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transaction.query";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const defaultChartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  };
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);
  const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);
  const { data: transactionsData } = useQuery(GET_TRANSACTIONS);

  const [logout, { loading, client }] = useMutation(LOG_OUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const handleLogout = async () => {
    try {
      await logout();
      client.resetStore();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const [chartData, setChartData] = useState(defaultChartData);

  useEffect(() => {
    if (data?.categoryStatistics?.length > 0) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    } else {
      setChartData(defaultChartData);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={authUserData?.authUser?.profilePicture}
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>
          <TransactionForm />
        </div>

        <Cards
          transactions={transactionsData?.transactions}
          userPicture={authUserData?.authUser?.profilePicture}
        />
      </div>
    </>
  );
};
export default HomePage;
