import { Navigation } from "@/components/global/navigation";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen  w-full flex-col  gap-3 bg-background">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
