import React, { useState, useEffect } from "react";
import {
  FaBars, FaUser, FaCamera, FaSave, FaLock, FaShieldAlt, FaEnvelope,
  FaBell, FaSignOutAlt, FaTrashAlt, FaDownload, FaCheck,
  FaPhone, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaGlobe,
  FaLinkedin, FaGithub, FaTwitter, FaKey, FaHistory, FaChartLine,
  FaCog, FaUserCircle, FaExclamationTriangle, FaCheckCircle,
  FaLightbulb, FaTimes, FaEye, FaEyeSlash
} from 'react-icons/fa';
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showSystemNotification, setShowSystemNotification] = useState(true);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // System notification messages that rotate
  const systemTips = [
    "Complete your profile to increase visibility to recruiters by 40%",
    "Enable two-factor authentication for enhanced account security",
    "Practice interviews daily to improve your confidence and skills",
    "Update your bio regularly to reflect your latest achievements",
    "Connect your LinkedIn profile to import your experience automatically",
    "Set up practice reminders to stay consistent with your preparation"
  ];

  // Profile Information
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");
  const [location, setLocation] = useState("San Francisco, CA");
  const [bio, setBio] = useState("Passionate software developer with 5+ years of experience in building scalable web applications. Currently focused on interview preparation and career growth.");
  const [jobTitle, setJobTitle] = useState("Senior Software Developer");
  const [company, setCompany] = useState("Tech Innovations Inc.");
  const [website, setWebsite] = useState("https://johndoe.dev");

  // Social Links
  const [linkedin, setLinkedin] = useState("linkedin.com/in/johndoe");
  const [github, setGithub] = useState("github.com/johndoe");
  const [twitter, setTwitter] = useState("@johndoe");

  // Settings
  const [isProfilePrivate, setIsProfilePrivate] = useState(() => {
    return JSON.parse(localStorage.getItem("isProfilePrivate") || "false");
  });
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isTwoFactorEnabled") || "false");
  });
  const [isEmailNotificationsEnabled, setIsEmailNotificationsEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isEmailNotificationsEnabled") || "true");
  });
  const [isPracticeRemindersEnabled, setIsPracticeRemindersEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isPracticeRemindersEnabled") || "true");
  });
  const [isWeeklyReportEnabled, setIsWeeklyReportEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isWeeklyReportEnabled") || "true");
  });
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(() => {
    return JSON.parse(localStorage.getItem("isMarketingEnabled") || "false");
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    showToast("Profile updated successfully!");
  };

  useEffect(() => {
    localStorage.setItem("isProfilePrivate", JSON.stringify(isProfilePrivate));
  }, [isProfilePrivate]);

  useEffect(() => {
    localStorage.setItem("isTwoFactorEnabled", JSON.stringify(isTwoFactorEnabled));
  }, [isTwoFactorEnabled]);

  useEffect(() => {
    localStorage.setItem("isEmailNotificationsEnabled", JSON.stringify(isEmailNotificationsEnabled));
  }, [isEmailNotificationsEnabled]);

  useEffect(() => {
    localStorage.setItem("isPracticeRemindersEnabled", JSON.stringify(isPracticeRemindersEnabled));
  }, [isPracticeRemindersEnabled]);

  useEffect(() => {
    localStorage.setItem("isWeeklyReportEnabled", JSON.stringify(isWeeklyReportEnabled));
  }, [isWeeklyReportEnabled]);

  useEffect(() => {
    localStorage.setItem("isMarketingEnabled", JSON.stringify(isMarketingEnabled));
  }, [isMarketingEnabled]);

  // Rotate system notification tips every 5 seconds
  useEffect(() => {
    if (!showSystemNotification) return;
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % systemTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showSystemNotification, systemTips.length]);

  const handleDangerAction = (action) => {
    if (window.confirm(`Are you sure you want to ${action}? This action cannot be undone.`)) {
      showToast(`${action} confirmed!`);
    }
  };

  // Calculate profile completion
  const calculateCompletion = () => {
    const fields = [fullName, email, phone, location, bio, jobTitle, company, linkedin, github];
    const filled = fields.filter(f => f && f.trim() !== "").length;
    return Math.round((filled / fields.length) * 100);
  };

  const profileCompletion = calculateCompletion();

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUserCircle },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "account", label: "Account", icon: FaCog },
  ];

  // Toggle Switch Component
  const ToggleSwitch = ({ id, checked, onChange, label, description }) => (
    <div className="group flex justify-between items-center hover:bg-gray-50/80 p-4 rounded-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div>
          <span className="block font-medium text-gray-800">{label}</span>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
      <label htmlFor={id} className="inline-block relative w-12 h-6 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <span className="absolute inset-0 bg-gray-300 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary rounded-full transition-all duration-300"></span>
        <span className="top-0.5 left-0.5 absolute bg-white shadow-md rounded-full w-5 h-5 transition-all peer-checked:translate-x-6 duration-300"></span>
      </label>
    </div>
  );

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Toast Notification */}
      {showNotification && (
        <div className="top-6 right-6 z-50 fixed flex items-center gap-3 bg-white shadow-xl px-6 py-4 border-green-500 border-l-4 rounded-lg animate-slide-in">
          <FaCheckCircle className="text-green-500 text-xl" />
          <span className="font-medium text-gray-800">{notificationMessage}</span>
        </div>
      )}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="top-0 z-40 sticky flex justify-between items-center bg-white/95 backdrop-blur-xl px-8 py-5 border-gray-200/80 border-b">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="lg:hidden text-gray-600 hover:text-primary transition-colors">
              <FaBars className="text-xl" />
            </button>
            <div>
              <h1 className="font-bold text-gray-900 text-2xl">Settings</h1>
              <p className="text-gray-500 text-sm">Manage your account preferences</p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl">
            {/* System Notification with Changing Text */}
            {showSystemNotification && (
              <div className="relative bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 mb-6 p-4 border border-primary/20 rounded-2xl overflow-hidden animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
                <div className="relative flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary rounded-full w-10 h-10 animate-pulse">
                      <FaLightbulb className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">
                        <span className="bg-clip-text bg-gradient-to-r from-primary to-secondary font-semibold text-transparent">Pro Tip: </span>
                        <span className="transition-all duration-500">{systemTips[currentTipIndex]}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Progress dots */}
                    <div className="hidden sm:flex items-center gap-1.5">
                      {systemTips.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentTipIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentTipIndex
                              ? 'bg-gradient-to-r from-primary to-secondary w-6'
                              : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setShowSystemNotification(false)}
                      className="flex justify-center items-center hover:bg-gray-200 rounded-full w-8 h-8 text-gray-400 hover:text-gray-600 transition-all duration-300"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Header Card */}
            <div className="relative bg-navy shadow-sm mb-8 border border-navy-light rounded-2xl overflow-hidden">
              {/* Cover Background */}
              <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-light h-32"></div>

              <div className="px-8 pb-6">
                <div className="flex sm:flex-row flex-col sm:items-end gap-6 -mt-16">
                  {/* Avatar */}
                  <div className="group relative">
                    <div className="bg-navy-light shadow-xl p-1.5 rounded-full ring-4 ring-gold/30">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                        alt="User Avatar"
                        className="rounded-full w-28 h-28 object-cover"
                      />
                    </div>
                    <button className="right-0 bottom-0 absolute flex justify-center items-center bg-gold hover:bg-gold/90 shadow-lg rounded-full w-9 h-9 text-navy-dark group-hover:scale-110 transition-all duration-300">
                      <FaCamera className="text-sm" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 pt-4 sm:pt-0">
                    <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4">
                      <div>
                        <h2 className="font-bold text-gold text-2xl">{fullName}</h2>
                        <p className="text-skyblue">{jobTitle} at {company}</p>
                        <div className="flex items-center gap-4 mt-2 text-skyblue/80 text-sm">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gold" /> {location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gold" /> Joined Jan 2024
                          </span>
                        </div>
                      </div>

                      {/* Profile Completion */}
                      <div className="bg-navy-dark px-5 py-3 border border-navy-light rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 -rotate-90 transform">
                              <circle cx="28" cy="28" r="24" stroke="#294062" strokeWidth="4" fill="none" />
                              <circle
                                cx="28" cy="28" r="24"
                                stroke="url(#gradient)"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${profileCompletion * 1.51} 151`}
                                strokeLinecap="round"
                              />
                              <defs>
                                <linearGradient id="gradient">
                                  <stop offset="0%" stopColor="#F3BF5B" />
                                  <stop offset="100%" stopColor="#80A9C5" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <span className="top-1/2 left-1/2 absolute font-bold text-gold text-sm -translate-x-1/2 -translate-y-1/2">{profileCompletion}%</span>
                          </div>
                          <div>
                            <p className="font-semibold text-text-dark text-sm">Profile Complete</p>
                            <p className="text-skyblue text-xs">Add more details to stand out</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white shadow-sm mb-8 p-1.5 border border-gray-200/80 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${activeTab === tab.id
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <tab.icon className="text-lg" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="gap-8 grid lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-primary/10 rounded-xl w-10 h-10">
                          <FaUser className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Personal Information</h3>
                          <p className="text-gray-500 text-sm">Update your personal details here</p>
                        </div>
                      </div>

                      <div className="gap-5 grid md:grid-cols-2">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Full Name</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100 px-4 py-3 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100 px-4 py-3 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Phone Number</label>
                          <div className="relative">
                            <FaPhone className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Location</label>
                          <div className="relative">
                            <FaMapMarkerAlt className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <label className="block mb-2 font-medium text-gray-700 text-sm">Bio</label>
                        <textarea
                          rows="4"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="bg-gray-50 hover:bg-gray-100 px-4 py-3 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300 resize-none"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                        <p className="mt-2 text-gray-400 text-xs text-right">{bio.length}/500 characters</p>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-secondary/10 rounded-xl w-10 h-10">
                          <FaBriefcase className="text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Professional Information</h3>
                          <p className="text-gray-500 text-sm">Your work and career details</p>
                        </div>
                      </div>

                      <div className="gap-5 grid md:grid-cols-2">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Job Title</label>
                          <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100 px-4 py-3 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Company</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="bg-gray-50 hover:bg-gray-100 px-4 py-3 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Personal Website</label>
                          <div className="relative">
                            <FaGlobe className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2" />
                            <input
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-blue-100 rounded-xl w-10 h-10">
                          <FaLinkedin className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Social Links</h3>
                          <p className="text-gray-500 text-sm">Connect your social profiles</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <FaLinkedin className="top-1/2 left-4 absolute text-[#0077b5] -translate-y-1/2" />
                          <input
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="linkedin.com/in/username"
                            className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div className="relative">
                          <FaGithub className="top-1/2 left-4 absolute text-gray-800 -translate-y-1/2" />
                          <input
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="github.com/username"
                            className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                        <div className="relative">
                          <FaTwitter className="top-1/2 left-4 absolute text-[#1da1f2] -translate-y-1/2" />
                          <input
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@username"
                            className="bg-gray-50 hover:bg-gray-100 py-3 pr-4 pl-11 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary disabled:opacity-70 hover:shadow-lg px-8 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 duration-300"
                      >
                        {isSaving ? (
                          <>
                            <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave /> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-primary/10 rounded-xl w-10 h-10">
                          <FaKey className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Password</h3>
                          <p className="text-gray-500 text-sm">Manage your password settings</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">Current Password</label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="bg-gray-50 hover:bg-gray-100 px-4 py-3 pr-12 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="top-1/2 right-4 absolute text-gray-400 hover:text-primary transition-colors -translate-y-1/2 duration-200"
                            >
                              {showCurrentPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                            </button>
                          </div>
                        </div>
                        <div className="gap-4 grid md:grid-cols-2">
                          <div>
                            <label className="block mb-2 font-medium text-gray-700 text-sm">New Password</label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-gray-50 hover:bg-gray-100 px-4 py-3 pr-12 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="top-1/2 right-4 absolute text-gray-400 hover:text-primary transition-colors -translate-y-1/2 duration-200"
                              >
                                {showNewPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block mb-2 font-medium text-gray-700 text-sm">Confirm Password</label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="bg-gray-50 hover:bg-gray-100 px-4 py-3 pr-12 border border-gray-200 focus:border-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 w-full text-gray-900 transition-all duration-300"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="top-1/2 right-4 absolute text-gray-400 hover:text-primary transition-colors -translate-y-1/2 duration-200"
                              >
                                {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-xl font-medium text-white transition-all duration-300">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-green-100 rounded-xl w-10 h-10">
                          <FaShieldAlt className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Security Settings</h3>
                          <p className="text-gray-500 text-sm">Configure your security preferences</p>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <ToggleSwitch
                          id="two-factor"
                          checked={isTwoFactorEnabled}
                          onChange={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
                          label="Two-Factor Authentication"
                          description="Add an extra layer of security to your account"
                        />
                        <ToggleSwitch
                          id="profile-private"
                          checked={isProfilePrivate}
                          onChange={() => setIsProfilePrivate(!isProfilePrivate)}
                          label="Private Profile"
                          description="Only you can see your profile details"
                        />
                      </div>
                    </div>

                    {/* Login History */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-purple-100 rounded-xl w-10 h-10">
                          <FaHistory className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Recent Login Activity</h3>
                          <p className="text-gray-500 text-sm">Monitor your account access</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { device: "Windows PC", location: "San Francisco, CA", time: "Today, 2:30 PM", current: true },
                          { device: "iPhone 14", location: "San Francisco, CA", time: "Yesterday, 8:15 AM", current: false },
                          { device: "MacBook Pro", location: "New York, NY", time: "Feb 3, 2026, 4:22 PM", current: false },
                        ].map((session, idx) => (
                          <div key={idx} className={`flex items-center justify-between p-4 rounded-xl ${session.current ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30' : 'bg-gray-50 border border-gray-100'}`}>
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${session.current ? 'bg-primary' : 'bg-gray-400'}`}></div>
                              <div>
                                <p className={`font-medium ${session.current ? 'text-primary' : 'text-gray-800'}`}>{session.device}</p>
                                <p className="text-gray-500 text-sm">{session.location} • {session.time}</p>
                              </div>
                            </div>
                            {session.current && (
                              <span className="bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-full font-medium text-white text-xs">Current</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-blue-100 rounded-xl w-10 h-10">
                          <FaEnvelope className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Email Notifications</h3>
                          <p className="text-gray-500 text-sm">Choose what emails you want to receive</p>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <ToggleSwitch
                          id="email-notifications"
                          checked={isEmailNotificationsEnabled}
                          onChange={() => setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled)}
                          label="Email Notifications"
                          description="Receive important updates via email"
                        />
                        <ToggleSwitch
                          id="weekly-report"
                          checked={isWeeklyReportEnabled}
                          onChange={() => setIsWeeklyReportEnabled(!isWeeklyReportEnabled)}
                          label="Weekly Progress Report"
                          description="Get a summary of your weekly practice progress"
                        />
                        <ToggleSwitch
                          id="marketing"
                          checked={isMarketingEnabled}
                          onChange={() => setIsMarketingEnabled(!isMarketingEnabled)}
                          label="Marketing Emails"
                          description="Receive tips, product updates, and promotions"
                        />
                      </div>
                    </div>

                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-amber-100 rounded-xl w-10 h-10">
                          <FaBell className="text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Practice Reminders</h3>
                          <p className="text-gray-500 text-sm">Stay on track with your interview preparation</p>
                        </div>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <ToggleSwitch
                          id="practice-reminders"
                          checked={isPracticeRemindersEnabled}
                          onChange={() => setIsPracticeRemindersEnabled(!isPracticeRemindersEnabled)}
                          label="Daily Practice Reminders"
                          description="Get reminded to practice every day"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "account" && (
                  <div className="space-y-6">
                    {/* Data Management */}
                    <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-primary/10 rounded-xl w-10 h-10">
                          <FaDownload className="text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">Data Management</h3>
                          <p className="text-gray-500 text-sm">Download or export your data</p>
                        </div>
                      </div>

                      <p className="mb-4 text-gray-600">Download a copy of all your data including interview history, practice sessions, and profile information.</p>
                      <button className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-2.5 rounded-xl font-medium text-gray-700 transition-all duration-300">
                        <FaDownload /> Export All Data
                      </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 p-6 border border-red-200 rounded-2xl">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="flex justify-center items-center bg-red-100 rounded-xl w-10 h-10">
                          <FaExclamationTriangle className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-800 text-lg">Danger Zone</h3>
                          <p className="text-red-600 text-sm">Irreversible actions - proceed with caution</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white p-4 border border-red-200 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">Sign Out</p>
                            <p className="text-gray-500 text-sm">Sign out from all devices</p>
                          </div>
                          <button
                            onClick={() => handleDangerAction("Sign Out")}
                            className="inline-flex items-center gap-2 bg-white hover:bg-red-50 px-4 py-2 border border-red-300 rounded-lg font-medium text-red-600 transition-all duration-300"
                          >
                            <FaSignOutAlt /> Sign Out
                          </button>
                        </div>

                        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 bg-white p-4 border border-red-200 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">Delete Account</p>
                            <p className="text-gray-500 text-sm">Permanently delete your account and all data</p>
                          </div>
                          <button
                            onClick={() => handleDangerAction("Delete Account")}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium text-white transition-all duration-300"
                          >
                            <FaTrashAlt /> Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Activity Stats */}
                  <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex justify-center items-center bg-primary/10 rounded-xl w-10 h-10">
                        <FaChartLine className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Your Activity</h3>
                    </div>

                    <div className="gap-3 grid grid-cols-2">
                      {[
                        { value: "0", label: "Interviews", color: "from-primary to-indigo-500" },
                        { value: "0%", label: "Avg Score", color: "from-green-500 to-emerald-500" },
                        { value: "0h", label: "Practice Time", color: "from-amber-500 to-orange-500" },
                        { value: "0", label: "Skills", color: "from-purple-500 to-pink-500" },
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-4 border border-gray-100 rounded-xl text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-gray-500 text-xs">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="bg-white shadow-sm p-6 border border-gray-200/80 rounded-2xl">
                    <h3 className="mb-4 font-semibold text-gray-900">Quick Links</h3>
                    <div className="space-y-2">
                      {[
                        { icon: FaLock, label: "Privacy Policy" },
                        { icon: FaShieldAlt, label: "Terms of Service" },
                        { icon: FaEnvelope, label: "Contact Support" },
                      ].map((link, idx) => (
                        <a
                          key={idx}
                          href="#"
                          className="flex items-center gap-3 hover:bg-gray-50 p-3 rounded-lg text-gray-600 hover:text-primary transition-all duration-300"
                        >
                          <link.icon className="text-gray-400" />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
