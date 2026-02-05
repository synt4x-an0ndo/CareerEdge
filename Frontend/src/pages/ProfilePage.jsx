import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState("user@example.com");
  const [bio, setBio] = useState(
    "Passionate about technology and interview preparation"
  );
  const [jobTitle, setJobTitle] = useState("Software Developer");
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveChanges = () => {
    alert("Profile changes saved!");
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

  const handleUpdatePrivacy = () => {
    const message = "Settings updated successfully!";
    const notification = document.createElement("div");
    notification.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateY(200%)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const handleDangerAction = (action) => {
    if (
      window.confirm(
        `Are you sure you want to ${action}? This action cannot be undone.`
      )
    ) {
      alert(`${action} confirmed!`);
    }
  };

  return (
    <div className="flex bg-light-bg min-h-screen">
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-6 bg-white/95 backdrop-blur-lg p-6 border-gray-200 border-b">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-none border-none text-text-gray"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="relative flex-1 max-w-md">
            <i className="top-1/2 left-3.5 absolute text-text-gray -translate-y-1/2 fas fa-search"></i>
            <input
              placeholder="Search..."
              className="bg-white/70 py-3 pr-4 pl-11 border border-gray-200 rounded-lg w-full placeholder-text-gray text-text-dark"
            />
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-3xl">
                Profile Settings
              </h1>
              <p className="text-text-gray">
                Manage your account settings and preferences
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[260px]">
              <div className="bg-white/90 shadow-lg hover:shadow-xl mb-6 p-6 border border-gray-100 rounded-2xl transition-all hover:-translate-y-1 duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                    alt="User Avatar"
                    className="border-2 border-primary rounded-full w-20 h-20 object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <button className="inline-flex items-center gap-2 bg-transparent hover:bg-primary/10 px-4 py-2.5 border border-primary rounded-lg text-primary transition-all hover:-translate-y-0.5 duration-300 cursor-pointer">
                      <i className="fas fa-camera"></i> Change Avatar
                    </button>
                    <button className="inline-flex items-center gap-2 bg-transparent hover:bg-primary/10 px-4 py-2.5 border border-primary rounded-lg text-primary transition-all hover:-translate-y-0.5 duration-300 cursor-pointer">
                      <i className="fas fa-sync-alt"></i> Regenerate
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-text-gray text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-text-gray text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-text-gray text-sm">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    rows="3"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300 resize-y"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-text-gray text-sm">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300"
                  />
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={handleSaveChanges}
                    className="inline-flex relative items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg px-4 py-2.5 border-none rounded-lg overflow-hidden font-semibold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    <i className="fas fa-save"></i> Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-white/90 shadow-lg hover:shadow-xl mb-6 p-6 border border-gray-100 rounded-2xl transition-all hover:-translate-y-1 duration-300">
                <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-bold text-transparent text-xl">
                  Privacy & Security
                </h3>
                <div className="group flex justify-between items-center hover:bg-gray-50 mb-3 p-3 rounded-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full group-hover:scale-110 transition-all duration-300">
                      <i className="text-primary fas fa-lock"></i>
                    </div>
                    <div>
                      <span className="font-medium">Make profile private</span>
                      <p className="text-gray-500 text-sm">Only you can see your profile</p>
                    </div>
                  </div>
                  <label
                    htmlFor="toggle-profile-private"
                    className="inline-block relative w-14 h-7 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="toggle-profile-private"
                      checked={isProfilePrivate}
                      onChange={() => {
                        setIsProfilePrivate(!isProfilePrivate);
                        handleUpdatePrivacy();
                      }}
                      className="sr-only peer"
                    />
                    <span className="before:top-0.5 before:left-0.5 absolute before:absolute after:absolute inset-0 bg-gray-200 before:bg-white after:bg-white peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary after:opacity-0 peer-checked:after:opacity-20 before:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:before:shadow-[0_2px_8px_rgba(0,0,0,0.15)] peer-checked:before:shadow-[0_2px_4px_rgba(0,0,0,0.2)] rounded-full before:rounded-full after:rounded-full group-hover:ring-4 group-hover:ring-primary/10 before:w-6 after:w-full before:h-6 after:h-full before:content-[''] after:content-[''] hover:before:scale-110 transition-all before:transition-all after:transition-all peer-checked:before:translate-x-7 duration-500 before:duration-500 after:duration-500 ease-in-out before:ease-in-out"></span>
                  </label>
                </div>
                <div className="group flex justify-between items-center hover:bg-gray-50 mb-3 p-3 rounded-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full group-hover:scale-110 transition-all duration-300">
                      <i className="text-primary fas fa-shield-alt"></i>
                    </div>
                    <div>
                      <span className="font-medium">Two-factor authentication</span>
                      <p className="text-gray-500 text-sm">Add an extra layer of security</p>
                    </div>
                  </div>
                  <label
                    htmlFor="toggle-two-factor"
                    className="inline-block relative w-14 h-7 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="toggle-two-factor"
                      checked={isTwoFactorEnabled}
                      onChange={() => {
                        setIsTwoFactorEnabled(!isTwoFactorEnabled);
                        handleUpdatePrivacy();
                      }}
                      className="sr-only peer"
                    />
                    <span className="before:top-0.5 before:left-0.5 absolute before:absolute after:absolute inset-0 bg-gray-200 before:bg-white after:bg-white peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary after:opacity-0 peer-checked:after:opacity-20 before:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:before:shadow-[0_2px_8px_rgba(0,0,0,0.15)] peer-checked:before:shadow-[0_2px_4px_rgba(0,0,0,0.2)] rounded-full before:rounded-full after:rounded-full group-hover:ring-4 group-hover:ring-primary/10 before:w-6 after:w-full before:h-6 after:h-full before:content-[''] after:content-[''] hover:before:scale-110 transition-all before:transition-all after:transition-all peer-checked:before:translate-x-7 duration-500 before:duration-500 after:duration-500 ease-in-out before:ease-in-out"></span>
                  </label>
                </div>
                <div className="group flex justify-between items-center hover:bg-gray-50 mb-3 p-3 rounded-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full group-hover:scale-110 transition-all duration-300">
                      <i className="text-primary fas fa-envelope"></i>
                    </div>
                    <div>
                      <span className="font-medium">Email notifications</span>
                      <p className="text-gray-500 text-sm">Get updates and reminders via email</p>
                    </div>
                  </div>
                  <label
                    htmlFor="toggle-email-notifications"
                    className="inline-block relative w-14 h-7 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="toggle-email-notifications"
                      checked={isEmailNotificationsEnabled}
                      onChange={() => {
                        setIsEmailNotificationsEnabled(!isEmailNotificationsEnabled);
                        handleUpdatePrivacy();
                      }}
                      className="sr-only peer"
                    />
                    <span className="before:top-0.5 before:left-0.5 absolute before:absolute after:absolute inset-0 bg-gray-200 before:bg-white after:bg-white peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary after:opacity-0 peer-checked:after:opacity-20 before:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:before:shadow-[0_2px_8px_rgba(0,0,0,0.15)] peer-checked:before:shadow-[0_2px_4px_rgba(0,0,0,0.2)] rounded-full before:rounded-full after:rounded-full group-hover:ring-4 group-hover:ring-primary/10 before:w-6 after:w-full before:h-6 after:h-full before:content-[''] after:content-[''] hover:before:scale-110 transition-all before:transition-all after:transition-all peer-checked:before:translate-x-7 duration-500 before:duration-500 after:duration-500 ease-in-out before:ease-in-out"></span>
                  </label>
                </div>
                <div className="group flex justify-between items-center hover:bg-gray-50 mb-3 p-3 rounded-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 group-hover:bg-primary/20 p-2 rounded-full group-hover:scale-110 transition-all duration-300">
                      <i className="text-primary fas fa-bell"></i>
                    </div>
                    <div>
                      <span className="font-medium">Practice reminders</span>
                      <p className="text-gray-500 text-sm">Get reminded to practice regularly</p>
                    </div>
                  </div>
                  <label
                    htmlFor="toggle-practice-reminders"
                    className="inline-block relative w-14 h-7 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id="toggle-practice-reminders"
                      checked={isPracticeRemindersEnabled}
                      onChange={() => {
                        setIsPracticeRemindersEnabled(!isPracticeRemindersEnabled);
                        handleUpdatePrivacy();
                      }}
                      className="sr-only peer"
                    />
                    <span className="before:top-0.5 before:left-0.5 absolute before:absolute after:absolute inset-0 bg-gray-200 before:bg-white after:bg-white peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary after:opacity-0 peer-checked:after:opacity-20 before:shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:before:shadow-[0_2px_8px_rgba(0,0,0,0.15)] peer-checked:before:shadow-[0_2px_4px_rgba(0,0,0,0.2)] rounded-full before:rounded-full after:rounded-full group-hover:ring-4 group-hover:ring-primary/10 before:w-6 after:w-full before:h-6 after:h-full before:content-[''] after:content-[''] hover:before:scale-110 transition-all before:transition-all after:transition-all peer-checked:before:translate-x-7 duration-500 before:duration-500 after:duration-500 ease-in-out before:ease-in-out"></span>
                  </label>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={handleUpdatePrivacy}
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-primary/10 px-4 py-2.5 border border-primary rounded-lg text-primary transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    <i className="fas fa-shield-alt"></i> Update Privacy
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-[260px]">
              <div className="bg-white/90 shadow-lg mb-6 p-5 border border-gray-100 rounded-2xl">
                <h4 className="mb-4 font-bold text-text-dark text-xl">
                  Your Activity
                </h4>
                <div className="gap-3 grid grid-cols-2">
                  <div className="bg-white/70 p-3 border border-gray-100 rounded-lg text-center">
                    <div className="mb-1 font-bold text-primary text-xl">0</div>
                    <div className="text-text-gray text-sm">
                      Interviews Completed
                    </div>
                  </div>
                  <div className="bg-white/70 p-3 border border-gray-100 rounded-lg text-center">
                    <div className="mb-1 font-bold text-primary text-xl">
                      0%
                    </div>
                    <div className="text-text-gray text-sm">Average Score</div>
                  </div>
                  <div className="bg-white/70 p-3 border border-gray-100 rounded-lg text-center">
                    <div className="mb-1 font-bold text-primary text-xl">
                      0h
                    </div>
                    <div className="text-text-gray text-sm">Total Practice</div>
                  </div>
                  <div className="bg-white/70 p-3 border border-gray-100 rounded-lg text-center">
                    <div className="mb-1 font-bold text-primary text-xl">0</div>
                    <div className="text-text-gray text-sm">
                      Skills Improved
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 shadow-lg mb-6 p-6 border border-red-300 rounded-2xl">
                <h3 className="mb-4 font-bold text-danger text-xl">
                  Danger Zone
                </h3>
                <p className="mb-4 text-text-gray">
                  Once you delete your account, there is no going back. Please
                  be certain.
                </p>
                <div className="flex justify-end gap-2 mt-4 text-right">
                  <button
                    onClick={() => handleDangerAction("Sign Out")}
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-red-100 px-4 py-2.5 border border-danger rounded-lg text-danger transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    <i className="fas fa-sign-out-alt"></i> Sign Out
                  </button>
                  <button
                    onClick={() => handleDangerAction("Delete Account")}
                    className="inline-flex items-center gap-2 bg-transparent hover:bg-red-100 px-4 py-2.5 border border-danger rounded-lg text-danger transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
                  >
                    <i className="fas fa-trash-alt"></i> Delete Account
                  </button>
                </div>
              </div>

              <div className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl">
                <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-bold text-transparent text-xl">
                  Data Management
                </h3>
                <p className="mb-4 text-text-gray">
                  Download a copy of your data or request account deletion
                </p>
                <div className="mt-4 text-right">
                  <button className="inline-flex items-center gap-2 bg-transparent hover:bg-primary/10 px-4 py-2.5 border border-primary rounded-lg text-primary transition-all hover:-translate-y-0.5 duration-300 cursor-pointer">
                    <i className="fas fa-download"></i> Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
