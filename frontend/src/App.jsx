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

var user = JSON.parse(localStorage.getItem("user"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
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
            path: "/dashboard/transactions",
            element: user ? <TransactionsPage /> : <Navigate to="/login" />,
            loader: transactionsLoader,
            action: newTransactionAction,
          },
          {
            path: "/dashboard/income",
            element: <IncomePage />,
            loader: transactionsLoader,
          },
          {
            path: "/dashboard/expense",
            element: <ExpensePage />,
            loader: transactionsLoader,
          },
          {
            path: "/dashboard/wallet",
            element: user ? <WalletPage /> : <Navigate to="/login" />,
            action: newWalletAction,
            loader: walletsLoader,
          },
          {
            path: "/dashboard/account",
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
