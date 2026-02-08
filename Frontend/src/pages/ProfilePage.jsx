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
    <div className="group flex items-center justify-between rounded-xl p-4 transition-all duration-300 hover:bg-gray-50/80">
      <div className="flex items-center gap-4">
        <div>
          <span className="block font-medium text-gray-800">{label}</span>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <label htmlFor={id} className="relative inline-block h-6 w-12 cursor-pointer">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-gray-300 transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary"></span>
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-6"></span>
      </label>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Toast Notification */}
      {showNotification && (
        <div className="animate-slide-in fixed right-6 top-6 z-50 flex items-center gap-3 rounded-lg border-l-4 border-green-500 bg-white px-6 py-4 shadow-xl">
          <FaCheckCircle className="text-xl text-green-500" />
          <span className="font-medium text-gray-800">{notificationMessage}</span>
        </div>
      )}

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200/80 bg-white/95 px-8 py-5 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="text-gray-600 transition-colors hover:text-primary lg:hidden">
              <FaBars className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Manage your account preferences</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-6xl">
            {/* System Notification with Changing Text */}
            {showSystemNotification && (
              <div className="animate-fade-in relative mb-6 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50"></div>
                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
                      <FaLightbulb className="text-lg text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-semibold text-transparent">Pro Tip: </span>
                        <span className="transition-all duration-500">{systemTips[currentTipIndex]}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Progress dots */}
                    <div className="hidden items-center gap-1.5 sm:flex">
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
                      className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-300 hover:bg-gray-200 hover:text-gray-600"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Header Card */}
            <div className="relative mb-8 overflow-hidden rounded-2xl border border-navy-light bg-navy shadow-sm">
              {/* Cover Background */}
              <div className="h-32 bg-gradient-to-r from-navy-dark via-navy to-navy-light"></div>

              <div className="px-8 pb-6">
                <div className="-mt-16 flex flex-col gap-6 sm:flex-row sm:items-end">
                  {/* Avatar */}
                  <div className="group relative">
                    <div className="rounded-full bg-navy-light p-1.5 shadow-xl ring-4 ring-gold/30">
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                        alt="User Avatar"
                        className="h-28 w-28 rounded-full object-cover"
                      />
                    </div>
                    <button className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy-dark shadow-lg transition-all duration-300 hover:bg-gold/90 group-hover:scale-110">
                      <FaCamera className="text-sm" />
                    </button>
                  </div>

                  {/* User Info */}
                  <div className="flex-1 pt-4 sm:pt-0">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <h2 className="text-2xl font-bold text-gold">{fullName}</h2>
                        <p className="text-skyblue">{jobTitle} at {company}</p>
                        <div className="mt-2 flex items-center gap-4 text-sm text-skyblue/80">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gold" /> {location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="text-gold" /> Joined Jan 2024
                          </span>
                        </div>
                      </div>

                      {/* Profile Completion */}
                      <div className="rounded-xl border border-navy-light bg-navy-dark px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-14 w-14">
                            <svg className="h-14 w-14 -rotate-90 transform">
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
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gold">{profileCompletion}%</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-dark">Profile Complete</p>
                            <p className="text-xs text-skyblue">Add more details to stand out</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8 flex space-x-1 rounded-xl border border-gray-200/80 bg-white p-1.5 shadow-sm">
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
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <FaUser className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                          <p className="text-sm text-gray-500">Update your personal details here</p>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Phone Number</label>
                          <div className="relative">
                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Location</label>
                          <div className="relative">
                            <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          rows="4"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                        <p className="mt-2 text-right text-xs text-gray-400">{bio.length}/500 characters</p>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                          <FaBriefcase className="text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                          <p className="text-sm text-gray-500">Your work and career details</p>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Job Title</label>
                          <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Company</label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-medium text-gray-700">Personal Website</label>
                          <div className="relative">
                            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              value={website}
                              onChange={(e) => setWebsite(e.target.value)}
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                          <FaLinkedin className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                          <p className="text-sm text-gray-500">Connect your social profiles</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="relative">
                          <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0077b5]" />
                          <input
                            type="text"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="linkedin.com/in/username"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div className="relative">
                          <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800" />
                          <input
                            type="text"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            placeholder="github.com/username"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                        <div className="relative">
                          <FaTwitter className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1da1f2]" />
                          <input
                            type="text"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            placeholder="@username"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70"
                      >
                        {isSaving ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
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
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <FaKey className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                          <p className="text-sm text-gray-500">Manage your password settings</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-primary"
                            >
                              {showCurrentPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                            </button>
                          </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                            <div className="relative">
                              <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-primary"
                              >
                                {showNewPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-gray-900 transition-all duration-300 hover:bg-gray-100 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 hover:text-primary"
                              >
                                {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                              </button>
                            </div>
                          </div>
                        </div>
                        <button className="rounded-xl bg-primary px-6 py-2.5 font-medium text-white transition-all duration-300 hover:bg-primary/90">
                          Update Password
                        </button>
                      </div>
                    </div>

                    {/* Security Settings */}
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                          <FaShieldAlt className="text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                          <p className="text-sm text-gray-500">Configure your security preferences</p>
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
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                          <FaHistory className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Recent Login Activity</h3>
                          <p className="text-sm text-gray-500">Monitor your account access</p>
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
                                <p className="text-sm text-gray-500">{session.location} • {session.time}</p>
                              </div>
                            </div>
                            {session.current && (
                              <span className="rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-white">Current</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                          <FaEnvelope className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Choose what emails you want to receive</p>
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

                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                          <FaBell className="text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Practice Reminders</h3>
                          <p className="text-sm text-gray-500">Stay on track with your interview preparation</p>
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
                    <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                          <FaDownload className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
                          <p className="text-sm text-gray-500">Download or export your data</p>
                        </div>
                      </div>

                      <p className="mb-4 text-gray-600">Download a copy of all your data including interview history, practice sessions, and profile information.</p>
                      <button className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-2.5 font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200">
                        <FaDownload /> Export All Data
                      </button>
                    </div>

                    {/* Danger Zone */}
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                      <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
                          <FaExclamationTriangle className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-800">Danger Zone</h3>
                          <p className="text-sm text-red-600">Irreversible actions - proceed with caution</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-white p-4 sm:flex-row sm:items-center">
                          <div>
                            <p className="font-medium text-gray-800">Sign Out</p>
                            <p className="text-sm text-gray-500">Sign out from all devices</p>
                          </div>
                          <button
                            onClick={() => handleDangerAction("Sign Out")}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 font-medium text-red-600 transition-all duration-300 hover:bg-red-50"
                          >
                            <FaSignOutAlt /> Sign Out
                          </button>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-white p-4 sm:flex-row sm:items-center">
                          <div>
                            <p className="font-medium text-gray-800">Delete Account</p>
                            <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                          </div>
                          <button
                            onClick={() => handleDangerAction("Delete Account")}
                            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:bg-red-700"
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
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                        <FaChartLine className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-gray-900">Your Activity</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "0", label: "Interviews", color: "from-primary to-indigo-500" },
                        { value: "0%", label: "Avg Score", color: "from-green-500 to-emerald-500" },
                        { value: "0h", label: "Practice Time", color: "from-amber-500 to-orange-500" },
                        { value: "0", label: "Skills", color: "from-purple-500 to-pink-500" },
                      ].map((stat, idx) => (
                        <div key={idx} className="rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-4 text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
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
                          className="flex items-center gap-3 rounded-lg p-3 text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:text-primary"
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
