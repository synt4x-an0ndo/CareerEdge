
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaGoogle, FaLinkedin, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaBriefcase, FaCodeBranch } from 'react-icons/fa';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [domain, setDomain] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    let strength = 0;
    if (registerPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(registerPassword)) strength += 25;
    if (/[0-9]/.test(registerPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(registerPassword)) strength += 25;
    setPasswordStrength(strength);
  }, [registerPassword]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', { loginEmail, loginPassword });
    // Add actual login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register submitted:', { registerFirstName, registerLastName, registerEmail, experienceLevel, domain, registerPassword, confirmPassword, agreedToTerms });
    // Add actual registration logic here
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'None';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Fair';
    if (passwordStrength < 100) return 'Good';
    return 'Strong';
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#ff4757';
    if (passwordStrength < 50) return '#ff4757';
    if (passwordStrength < 75) return '#ffa502';
    if (passwordStrength < 100) return '#2ed573';
    return '#2ed573';
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-light-bg p-8 w-full min-h-screen overflow-hidden">
      <div className="-z-10 fixed inset-0 overflow-hidden">
        <div className="-top-64 -left-64 absolute bg-secondary-light opacity-30 blur-3xl rounded-full w-[500px] h-[500px] animate-pulse-slow filter"></div>
        <div className="-right-72 -bottom-72 absolute bg-primary-light opacity-30 blur-3xl rounded-full w-[600px] h-[600px] animate-pulse-slow animation-delay-2000 filter"></div>
        <div className="top-1/2 left-3/4 absolute bg-secondary/30 opacity-30 blur-3xl rounded-full w-[400px] h-[400px] animate-pulse-slow animation-delay-4000 filter"></div>
      </div>

      <nav className="flex justify-between items-center mb-8 w-full max-w-md">
        <a href="index.html" className="flex items-center font-medium text-text-gray hover:text-primary text-sm transition-all duration-300">
          <FaArrowLeft className="mr-2 text-xs" />
          <span>Back to Home</span>
        </a>
        <div className="flex items-center font-bold text-primary text-lg cursor-pointer">
          <img src="img/logo2.png" alt="Logo" className="h-16" />
        </div>
      </nav>

      <div className="relative bg-lighter-bg shadow-lg backdrop-blur-lg p-8 border border-gray-200 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex mb-6 border-gray-200 border-b">
          <button className={`flex-1 py-4 bg-none border-none text-text-gray font-semibold cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 ${activeTab === 'login' ? 'text-text-dark after:w-1/2' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
          <button className={`flex-1 py-4 bg-none border-none text-text-gray font-semibold cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all duration-300 ${activeTab === 'register' ? 'text-text-dark after:w-1/2' : ''}`} onClick={() => setActiveTab('register')}>Register</button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">Welcome back</h2>
              <p className="text-text-gray text-sm">Sign in to continue your interview preparation</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button type="button" className="flex justify-center items-center bg-white/70 hover:bg-white/90 hover:shadow-lg py-3 border border-gray-200 rounded-full font-medium text-text-dark transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"><FaGoogle className="mr-2 text-lg" /> <span>Continue with Google</span></button>
              <button type="button" className="flex justify-center items-center bg-white/70 hover:bg-white/90 hover:shadow-lg py-3 border border-gray-200 rounded-full font-medium text-text-dark transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"><FaLinkedin className="mr-2 text-lg" /> <span>Continue with LinkedIn</span></button>
            </div>

            <div className="relative flex before:flex-1 after:flex-1 justify-center items-center gap-4 before:bg-gradient-to-r after:bg-gradient-to-l before:from-transparent after:from-transparent before:via-primary/30 after:via-primary/30 before:to-transparent after:to-transparent my-6 before:h-px after:h-px text-center before:content-[''] after:content-['']">
              <span className="bg-white/70 hover:bg-white/90 backdrop-blur-sm px-6 py-2 border border-gray-200 rounded-full font-medium text-text-gray text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 duration-300">or</span>
            </div>

            <div className="mb-6">
              <label htmlFor="login-email" className="block mb-2 font-medium text-text-dark text-sm">Email address</label>
              <div className="relative">
                <FaEnvelope className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <input type="email" id="login-email" placeholder="Enter your email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="login-password" className="block mb-2 font-medium text-text-dark text-sm">Password</label>
              <div className="relative">
                <FaLock className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <input type={showLoginPassword ? 'text' : 'password'} id="login-password" placeholder="Enter your password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
                <button type="button" className="top-1/2 right-4 absolute bg-none border-none text-text-gray -translate-y-1/2 cursor-pointer" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                  {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <a href="#" className="inline-block mt-2 text-primary text-sm no-underline">Forgot password?</a>
            </div>

            <button type="submit" className="relative bg-gradient-to-r from-primary to-secondary hover:shadow-lg py-4 border-none rounded-full w-full overflow-hidden font-semibold text-white transition-all hover:-translate-y-1 duration-300 cursor-pointer">Sign In</button>

            <div className="mt-6 text-text-gray text-sm text-center">
              <p>Don't have an account? <a href="#" className="font-medium text-primary no-underline" onClick={() => setActiveTab('register')}>Register</a></p>
            </div>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">Create account</h2>
              <p className="text-text-gray text-sm">Join thousands mastering interview skills</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button type="button" className="flex justify-center items-center bg-white/70 hover:bg-white/90 hover:shadow-lg py-3 border border-gray-200 rounded-full font-medium text-text-dark transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"><FaGoogle className="mr-2 text-lg" /> <span>Continue with Google</span></button>
              <button type="button" className="flex justify-center items-center bg-white/70 hover:bg-white/90 hover:shadow-lg py-3 border border-gray-200 rounded-full font-medium text-text-dark transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"><FaLinkedin className="mr-2 text-lg" /> <span>Continue with LinkedIn</span></button>
            </div>

            <div className="relative flex before:flex-1 after:flex-1 justify-center items-center gap-4 before:bg-gradient-to-r after:bg-gradient-to-l before:from-transparent after:from-transparent before:via-primary/30 after:via-primary/30 before:to-transparent after:to-transparent my-6 before:h-px after:h-px text-center before:content-[''] after:content-['']">
              <span className="bg-white/70 hover:bg-white/90 backdrop-blur-sm px-6 py-2 border border-gray-200 rounded-full font-medium text-text-gray text-xs uppercase tracking-widest transition-all hover:-translate-y-0.5 duration-300">or</span>
            </div>

            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex-1 mb-6">
                <label htmlFor="first-name" className="block mb-2 font-medium text-text-dark text-sm">First name</label>
                <div className="relative">
                  <FaUser className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                  <input type="text" id="first-name" placeholder="First name" required value={registerFirstName} onChange={(e) => setRegisterFirstName(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
                </div>
              </div>

              <div className="flex-1 mb-6">
                <label htmlFor="last-name" className="block mb-2 font-medium text-text-dark text-sm">Last name</label>
                <div className="relative">
                  <FaUser className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                  <input type="text" id="last-name" placeholder="Last name" required value={registerLastName} onChange={(e) => setRegisterLastName(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="register-email" className="block mb-2 font-medium text-text-dark text-sm">Email address</label>
              <div className="relative">
                <FaEnvelope className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <input type="email" id="register-email" placeholder="Enter your email" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="experience" className="block mb-2 font-medium text-text-dark text-sm">Experience Level</label>
              <div className="relative">
                <FaBriefcase className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <select id="experience" required value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300 appearance-none cursor-pointer">
                  <option value="">Select Experience Level</option>
                  <option value="entry-level">Entry Level</option>
                  <option value="mid-level">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="domain" className="block mb-2 font-medium text-text-dark text-sm">Domain</label>
              <div className="relative">
                <FaCodeBranch className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <select id="domain" required value={domain} onChange={(e) => setDomain(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300 appearance-none cursor-pointer">
                  <option value="">Select Domain</option>
                  <option value="software-engineering">Software Engineering</option>
                  <option value="data-science">Data Science</option>
                  <option value="product-management">Product Management</option>
                  <option value="design">Design (UI/UX)</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="register-password" className="block mb-2 font-medium text-text-dark text-sm">Password</label>
              <div className="relative">
                <FaLock className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <input type={showRegisterPassword ? 'text' : 'password'} id="register-password" placeholder="Create a password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
                <button type="button" className="top-1/2 right-4 absolute bg-none border-none text-text-gray -translate-y-1/2 cursor-pointer" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                  {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="mt-2">
                <div className="bg-gray-200 mb-1 rounded-full w-full h-1 overflow-hidden">
                  <div className="rounded-full h-full transition-all duration-300" style={{ width: `${passwordStrength}%`, backgroundColor: getStrengthColor() }}></div>
                </div>
                <span className="text-text-gray text-xs">Password strength: <span>{getStrengthText()}</span></span>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block mb-2 font-medium text-text-dark text-sm">Confirm password</label>
              <div className="relative">
                <FaLock className="top-1/2 left-4 absolute text-text-gray -translate-y-1/2" />
                <input type="password" id="confirm-password" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white/70 py-3 pr-4 pl-10 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300" />
              </div>
            </div>

            <div className="flex items-start mb-6">
              <input type="checkbox" id="terms" required checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 mr-2" />
              <label htmlFor="terms" className="text-text-gray text-sm leading-tight">I agree to the <a href="#" className="text-primary no-underline">Terms of Service</a> and <a href="#" className="text-primary no-underline">Privacy Policy</a></label>
            </div>

            <button type="submit" className="relative bg-gradient-to-r from-primary to-secondary hover:shadow-lg py-4 border-none rounded-full w-full overflow-hidden font-semibold text-white transition-all hover:-translate-y-1 duration-300 cursor-pointer">Create Account</button>

            <div className="mt-6 text-text-gray text-sm text-center">
              <p>Already have an account? <a href="#" className="font-medium text-primary no-underline" onClick={() => setActiveTab('login')}>Login</a></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
