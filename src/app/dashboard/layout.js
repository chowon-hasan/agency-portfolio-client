import RightSideBar from "./RightSideBar";
import Sidebar from "./Sidebar";
import "./dashboard.css";
const DashboardLayout = ({ children }) => {
  return (
    <section className="min-h-screen drawer_children flex items-center gap-5">
      <div className="dash_menu">
        <Sidebar />
      </div>
      <div className="dash_children">{children}</div>
      {/* <div className="w-[20%]">
        <RightSideBar />
      </div> */}
    </section>
  );
};

export default DashboardLayout;
