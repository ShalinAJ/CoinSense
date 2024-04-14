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
  loader as transacitonsLoader,
} from "./pages/Transactions";
import WalletPage from "./pages/Wallet";
import AccountPage from "./pages/Account";

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
          },
          {
            path: "/dashboard/transactions",
            element: user ? <TransactionsPage /> : <Navigate to="/login" />,
            loader: transacitonsLoader,
            action: newTransactionAction,
          },
          {
            path: "/dashboard/wallet",
            element: user ? <WalletPage /> : <Navigate to="/login" />,
          },
          {
            path: "/dashboard/account",
            element: user ? <AccountPage /> : <Navigate to="/login" />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
