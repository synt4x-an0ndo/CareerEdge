import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { FaBrain, FaBullseye, FaTrophy, FaClock, FaBell, FaBars, FaSearch } from "react-icons/fa";
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
    { icon: FaBrain, value: "0", label: "Total Interviews" },
    { icon: FaBullseye, value: "0/10", label: "Average Score" },
    { icon: FaTrophy, value: "0 Days", label: "Current Streak" },
    { icon: FaClock, value: "0h", label: "Hours Remaining" },
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
    <div className="flex bg-light-bg min-h-screen">
      {isModalOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/50"
          onClick={toggleModal}
        >
          <div
            className="relative bg-white shadow-lg p-5 rounded-xl w-96 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="top-2.5 right-4 absolute bg-none border-none text-secondary text-xl cursor-pointer"
              onClick={toggleModal}
            >
              &times;
            </button>
            <div className="block bg-primary bg-clip-text mb-4 text-transparent text-4xl">
              <FaBell />
            </div>
            <h2 className="mb-2 font-bold text-2xl">Notifications</h2>
            <p className="mb-4 text-secondary">
              You do not have any notifications.
            </p>
            <button
              className="bg-[#1d2846] hover:bg-[#1d2846]/90 hover:shadow-lg px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-6 bg-white p-6 border-accent border-b">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-none border-none text-secondary"
          >
            <FaBars />
          </button>
          <div className="relative flex-1 max-w-md">
            <FaSearch className="top-1/2 left-3.5 absolute text-secondary -translate-y-1/2" />
            <input
              placeholder="Search..."
              className="bg-light-bg py-3 pr-4 pl-11 border border-accent rounded-lg w-full placeholder-text-gray text-text-dark"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="relative bg-none border-none text-secondary text-2xl cursor-pointer"
              onClick={toggleModal}
            >
              <FaBell />
            </button>
            <button className="bg-none border-none">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                alt="Profile"
                className="rounded-full w-9 h-9"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center gap-4 bg-white shadow-lg mb-6 p-6 border border-accent rounded-2xl">
            <div>
              <h1 className="bg-primary bg-clip-text mb-2 font-bold text-transparent text-3xl">
                Welcome back, User!
              </h1>
              <p className="text-secondary">
                You've completed 0 practice sessions this week. Keep up the good
                work!
              </p>
            </div>
          </div>

          <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 bg-white shadow-lg hover:shadow-xl p-5 border border-accent rounded-2xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="text-primary text-2xl">
                  <stat.icon />
                </div>
                <div>
                  <h3 className="font-bold text-2xl">{stat.value}</h3>
                  <p className="text-secondary text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Analytics */}
          <div className="mb-6">
            <div>
              <h2 className="bg-primary bg-clip-text mb-2 font-bold text-transparent text-2xl">
                Performance Analytics
              </h2>
              <p className="text-secondary">
                Track your progress and identify areas for improvement
              </p>
            </div>
          </div>

          <div className="gap-6 grid lg:grid-cols-2 mb-6">
            <div className="bg-white shadow-lg hover:shadow-xl p-6 border border-accent rounded-2xl transition-all hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="bg-primary bg-clip-text font-bold text-transparent text-xl">
                  Weekly Performance
                </h3>
              </div>
              <div className="bg-light-bg p-4 border border-accent rounded-lg">
                <Bar
                  data={weeklyData}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                  }}
                />
              </div>
            </div>

            <div className="bg-white shadow-lg hover:shadow-xl p-6 border border-accent rounded-2xl transition-all hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="bg-primary bg-clip-text font-bold text-transparent text-xl">
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
          <div className="bg-white shadow-lg mb-6 p-6 border border-accent rounded-2xl">
            <div className="mb-4">
              <h2 className="bg-primary bg-clip-text font-bold text-transparent text-2xl">
                Recent Activity
              </h2>
            </div>
            <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-light-bg hover:shadow-xl p-5 border border-accent rounded-xl transition-all hover:-translate-y-1 duration-300">
                <div className="mb-2">
                  <h3 className="font-semibold">
                    No recent interview sessions
                  </h3>
                </div>
                <p className="text-secondary text-sm">
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
