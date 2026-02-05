import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const stats = [
    { icon: "fa-brain", value: "0", label: "Total Interviews" },
    { icon: "fa-bullseye", value: "0/10", label: "Average Score" },
    { icon: "fa-trophy", value: "0 Days", label: "Current Streak" },
    { icon: "fa-clock", value: "0h", label: "Hours Remaining" },
  ];

  const weeklyData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Performance",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#5e72e4",
        borderRadius: 4,
      },
    ],
  };

  const skillData = {
    labels: ["Technical", "Communication", "Problem Solving", "Other"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#5e72e4", "#ff5e7d", "#ffa502", "#ff4757"],
        borderWidth: 0,
      },
    ],
  };

  const skillChartData = {
    labels: ["Technical", "Communication", "Problem Solving", "Other"],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ["#5e72e4", "#ff5e7d", "#ffa502", "#ff4757"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-light-bg">
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={toggleModal}
        >
          <div
            className="bg-white p-5 rounded-xl w-96 text-center relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2.5 right-4 text-xl border-none bg-none cursor-pointer text-text-gray"
              onClick={toggleModal}
            >
              &times;
            </button>
            <div className="text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
              <i className="fas fa-bell"></i>
            </div>
            <h2 className="text-2xl font-bold mb-2">Notifications</h2>
            <p className="text-text-gray mb-4">
              You do not have any notifications.
            </p>
            <button
              className="py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-md cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="bg-white/95 backdrop-blur-lg p-6 flex items-center gap-6 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-none border-none text-text-gray"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="flex-1 relative max-w-md">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-text-gray"></i>
            <input
              placeholder="Search..."
              className="w-full py-3 pl-11 pr-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative bg-none border-none text-2xl cursor-pointer text-text-gray"
              onClick={toggleModal}
            >
              <i className="fas fa-bell"></i>
            </button>
            <button className="bg-none border-none">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-6 flex justify-between items-center gap-4 border border-gray-100 shadow-lg">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Welcome back, User!
              </h1>
              <p className="text-text-gray">
                You've completed 0 practice sessions this week. Keep up the good
                work!
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/90 p-5 rounded-2xl flex items-center gap-4 border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-2xl text-primary">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-text-gray text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Analytics */}
          <div className="mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Performance Analytics
              </h2>
              <p className="text-text-gray">
                Track your progress and identify areas for improvement
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/90 shadow-lg hover:shadow-xl p-6 border border-gray-100 rounded-2xl transition-all hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Weekly Performance
                </h3>
              </div>
              <div className="bg-white/70 p-4 border border-gray-100 rounded-lg">
                <Bar
                  data={weeklyData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>

            <div className="bg-white/90 shadow-lg hover:shadow-xl p-6 border border-gray-100 rounded-2xl transition-all hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Skill Distribution
                </h3>
              </div>
              <div className="flex sm:flex-row flex-col items-center gap-5">
                <div className="relative w-40 h-40">
                  <Pie
                    data={skillChartData}
                    options={{
                      responsive: true,
                      plugins: { legend: { display: false } },
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  {skillData.labels.map((label, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <span
                        className="inline-block rounded-full w-3 h-3"
                        style={{
                          backgroundColor:
                            skillData.datasets[0].backgroundColor[i],
                        }}
                      ></span>
                      <span>
                        {label}: {skillData.datasets[0].data[i]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/90 p-6 rounded-2xl mb-6 border border-gray-100 shadow-lg">
            <div className="mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Recent Activity
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/70 p-5 rounded-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-2">
                  <h3 className="font-semibold">
                    No recent interview sessions
                  </h3>
                </div>
                <p className="text-text-gray text-sm">
                  Start your first interview to see your progress here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
