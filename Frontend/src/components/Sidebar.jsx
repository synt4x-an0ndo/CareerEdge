import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaFileAlt, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

const Sidebar = ({ activePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: "/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/profile", icon: FaUser, label: "Profile" },
    { to: "/create-cv", icon: FaFileAlt, label: "Create CV" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Toggle Button */}
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      <div className="sidebar-header">
        <Link to="/" className="logo">
          {isCollapsed ? (
            <img
              src="/img/logo3.png"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
              alt="CareerEdge Logo"
            />
          ) : (
            <img
              src="/img/logo3.png"
              style={{ width: "100%" }}
              alt="CareerEdge Logo"
            />
          )}
        </Link>
      </div>

      <div className="user-profile">
        <div className="avatar">
          <img
            src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
            alt="User Avatar"
          />
          <div className="status-indicator"></div>
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <h3>User</h3>
          </div>
        )}
      </div>

      <ul className="sidebar-nav">
        <li className="flex justify-center">
          <Link
            to="/extra-add"
            className={`new-session-btn ${isCollapsed ? 'collapsed' : ''}`}
            title={isCollapsed ? "New Practice Session" : ""}
          >
            <FaPlus />
            {!isCollapsed && <span>New Practice Session</span>}
          </Link>
        </li>

        {navItems.map((item) => (
          <li
            key={item.label}
            className={`nav-item ${activePage === item.label ? "active" : ""}`}
          >
            <Link to={item.to} title={isCollapsed ? item.label : ""}>
              <item.icon />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
