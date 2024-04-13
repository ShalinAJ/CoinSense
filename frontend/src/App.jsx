import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import RootLayout from "./pages/Root";
import DashboardRootLayout from "./pages/DashboardRoot";
import DashboardPage from "./pages/Dashboard";
import TransactionsPage, {
  action as newTransactionAction,
} from "./pages/Transactions";
import WalletPage from "./pages/Wallet";
import AccountPage from "./pages/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/dashboard",
        element: <DashboardRootLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/transactions",
            element: <TransactionsPage />,
            action: newTransactionAction,
          },
          { path: "/dashboard/wallet", element: <WalletPage /> },
          { path: "/dashboard/account", element: <AccountPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
