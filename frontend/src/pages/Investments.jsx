import InvestmentChart from "../charts/InvestmentChart";

const InvestmentsPage = () => {
  return (
    <div className="w-[80%] h-[max-content] bg-white">
      <div>Investments Page</div>
      <div>
        <InvestmentChart />
      </div>
    </div>
  );
};

export default InvestmentsPage;
