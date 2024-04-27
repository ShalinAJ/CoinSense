import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RootLayout from "./pages/Root";
import DashboardRootLayout from "./pages/DashboardRoot";
import DashboardPage from "./pages/Dashboard";
import TransactionsPage, {
  action as newTransactionAction,
  loader as transactionsLoader,
} from "./pages/Transactions";
import WalletPage, {
  action as newWalletAction,
  loader as walletsLoader,
} from "./pages/Wallet";
import AccountPage from "./pages/Account";
import { action as logoutAction } from "./pages/Logout";
import { elements } from "chart.js";
import IncomePage from "./pages/Income";
import ExpensePage from "./pages/Expense";
import InvestmentsPage from "./pages/Investments";
import AllInvestmentsPage from "./pages/AllInvestments";
import InvestmentRootLayout from "./pages/InvestmentRoot";
import ErrorPage from "./pages/Error";
import CryptoTradingPage from "./pages/CryptoTrading";
import TradingWalletPage, {
  action as newTopupAction,
  loader as topupsLoader,
} from "./pages/TradingWallet";

var user = JSON.parse(localStorage.getItem("user"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //errorElement: <ErrorPage />, Disabled for now
    children: [
      { index: true, element: user ? <HomePage /> : <LoginPage /> },
      {
        path: "/login",
        element: user ? <Navigate to="/dashboard" /> : <LoginPage />,
      },
      {
        path: "/register",
        element: user ? <Navigate to="/dashboard" /> : <RegisterPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardRootLayout />,
        children: [
          {
            index: true,
            element: user ? <DashboardPage /> : <Navigate to="/login" />,
            loader: transactionsLoader,
          },
          {
            path: "transactions",
            element: user ? <TransactionsPage /> : <Navigate to="/login" />,
            loader: transactionsLoader,
            action: newTransactionAction,
          },
          {
            path: "investment",
            element: <InvestmentRootLayout />,
            children: [
              {
                index: true,
                element: user ? <InvestmentsPage /> : <Navigate to="/login" />, // Removed index: true
                loader: transactionsLoader,
              },
              {
                path: "user-investments",
                element: <AllInvestmentsPage />,
                loader: transactionsLoader,
                action: newTransactionAction,
              },
              {
                path: "crypto-trading",
                element: <CryptoTradingPage />,
                loader: transactionsLoader,
                action: newTransactionAction,
              },
              {
                path: "trading-wallet",
                element: <TradingWalletPage />,
                loader: topupsLoader,
                action: newTopupAction,
              },
            ],
          },
          {
            path: "income",
            element: <IncomePage />,
            loader: transactionsLoader,
            action: newTransactionAction,
          },
          {
            path: "expense",
            element: <ExpensePage />,
            loader: transactionsLoader,
            action: newTransactionAction,
          },
          {
            path: "wallet",
            element: user ? <WalletPage /> : <Navigate to="/login" />,
            action: newWalletAction,
            loader: walletsLoader,
          },
          {
            path: "account",
            element: user ? <AccountPage /> : <Navigate to="/login" />,
            loader: walletsLoader,
          },
        ],
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
