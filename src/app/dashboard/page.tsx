import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import UserStoryList from "./_components/UserStoryList";

const Dashboard = () => {
  return (
    <div className="p-10 md:px-20 lg:px-40 min-h-screen">
      <DashboardHeader />
      <UserStoryList />
    </div>
  );
};

export default Dashboard;
