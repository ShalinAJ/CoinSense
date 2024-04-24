import { useLoaderData } from "react-router-dom";
import InvestmentChart from "../charts/InvestmentChart";
import { useEffect, useState } from "react";
import UserInvestmentsWidget from "../components/UserInvestmentsWidget";
import UserMarketOptions from "../components/UserMarketOptions";

const InvestmentsPage = () => {
  const { transactions } = useLoaderData();
  const [recentInvestments, setRecentInvestments] = useState([]);
  const [investmentTotal, setInvestmentTotal] = useState(0);

  useEffect(() => {
    async function recentInvestmentChecker() {
      try {
        const transactionData = await transactions;
        if (Array.isArray(transactionData)) {
          const investments = transactionData.filter(
            (transaction) => transaction.status === "Investment"
          );
          const total = investments.reduce((acc, curr) => acc + curr.amount, 0);
          setInvestmentTotal(total);
          setRecentInvestments(investments);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    recentInvestmentChecker();
  }, [transactions]);

  return (
    <div className="w-[80%] h-[max-content] bg-white px-[28px] pt-[45px]">
      <div className="text-2xl font-bold">Investments</div>
      <p className="text-sm pt-2 font-light">
        Detailed view of your investments{" "}
      </p>
      <div className="flex flex-row justify-between pt-6 pb-10">
        <div className="w-[48.5%]">
          <UserInvestmentsWidget
            investmentTotal={investmentTotal}
            recentInvestments={recentInvestments}
          />
        </div>
        <div className="w-[48.5%]">
          <UserMarketOptions />
        </div>
      </div>
      <div>
        <InvestmentChart className="bg-black" />
      </div>
    </div>
  );
};

export default InvestmentsPage;
