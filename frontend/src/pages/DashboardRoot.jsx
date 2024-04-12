import { Outlet } from "react-router-dom";
import DashboardNavigation from "../components/DashboardNavigation";

const DashboardRootLayout = () => {
  return (
    <>
      <div className="h-[100%] bg-white">
        <div className="flex h-[100%]">
          <DashboardNavigation />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardRootLayout;
