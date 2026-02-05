
import React, { useState, useEffect } from 'react';

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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-8 bg-light-bg overflow-hidden">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute rounded-full filter blur-3xl opacity-30 w-[500px] h-[500px] bg-secondary-light -top-64 -left-64 animate-pulse-slow"></div>
        <div className="absolute rounded-full filter blur-3xl opacity-30 w-[600px] h-[600px] bg-primary-light -bottom-72 -right-72 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute rounded-full filter blur-3xl opacity-30 w-[400px] h-[400px] bg-secondary/30 top-1/2 left-3/4 animate-pulse-slow animation-delay-4000"></div>
      </div>

      <nav className="w-full max-w-md flex justify-between items-center mb-8">
        <a href="index.html" className="flex items-center text-text-gray text-sm font-medium transition-all duration-300 hover:text-primary">
          <i className="fa-arrow-left fas mr-2 text-xs"></i>
          <span>Back to Home</span>
        </a>
        <div className="flex items-center font-bold text-lg text-primary cursor-pointer">
          <img src="img/logo2.png" alt="Logo" className="h-16" />
        </div>
      </nav>

      <div className="w-full max-w-md bg-lighter-bg backdrop-blur-lg rounded-2xl border border-gray-200 p-8 shadow-lg relative overflow-hidden">
        <div className="flex mb-6 border-b border-gray-200">
          <button className={`flex-1 py-4 bg-none border-none text-text-gray font-semibold cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all after:duration-300 ${activeTab === 'login' ? 'text-text-dark after:w-1/2' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
          <button className={`flex-1 py-4 bg-none border-none text-text-gray font-semibold cursor-pointer transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-all duration-300 ${activeTab === 'register' ? 'text-text-dark after:w-1/2' : ''}`} onClick={() => setActiveTab('register')}>Register</button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Welcome back</h2>
              <p className="text-text-gray text-sm">Sign in to continue your interview preparation</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button type="button" className="flex items-center justify-center py-3 rounded-full border border-gray-200 bg-white/70 text-text-dark font-medium cursor-pointer transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg"><i className="fab fa-google mr-2 text-lg"></i> <span>Continue with Google</span></button>
              <button type="button" className="flex items-center justify-center py-3 rounded-full border border-gray-200 bg-white/70 text-text-dark font-medium cursor-pointer transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg"><i className="fab fa-linkedin mr-2 text-lg"></i> <span>Continue with LinkedIn</span></button>
            </div>

            <div className="relative text-center my-6 flex items-center gap-4 justify-center before:content-[''] before:flex-1 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/30 before:to-transparent after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-l after:from-transparent after:via-primary/30 after:to-transparent">
              <span className="text-xs py-2 px-6 rounded-full bg-white/70 border border-gray-200 uppercase tracking-widest font-medium text-text-gray backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90">or</span>
            </div>

            <div className="mb-6">
              <label htmlFor="login-email" className="block mb-2 font-medium text-sm text-text-dark">Email address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <input type="email" id="login-email" placeholder="Enter your email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="login-password" className="block mb-2 font-medium text-sm text-text-dark">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <input type={showLoginPassword ? 'text' : 'password'} id="login-password" placeholder="Enter your password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none text-text-gray cursor-pointer" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                  <i className={`fas ${showLoginPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <a href="#" className="inline-block mt-2 text-sm text-primary no-underline">Forgot password?</a>
            </div>

            <button type="submit" className="w-full py-4 rounded-full border-none bg-gradient-to-r from-primary to-secondary text-white font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg">Sign In</button>

            <div className="text-center mt-6 text-sm text-text-gray">
              <p>Don't have an account? <a href="#" className="text-primary no-underline font-medium" onClick={() => setActiveTab('register')}>Register</a></p>
            </div>
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Create account</h2>
              <p className="text-text-gray text-sm">Join thousands mastering interview skills</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <button type="button" className="flex items-center justify-center py-3 rounded-full border border-gray-200 bg-white/70 text-text-dark font-medium cursor-pointer transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg"><i className="fab fa-google mr-2 text-lg"></i> <span>Continue with Google</span></button>
              <button type="button" className="flex items-center justify-center py-3 rounded-full border border-gray-200 bg-white/70 text-text-dark font-medium cursor-pointer transition-all duration-300 hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg"><i className="fab fa-linkedin mr-2 text-lg"></i> <span>Continue with LinkedIn</span></button>
            </div>

            <div className="relative text-center my-6 flex items-center gap-4 justify-center before:content-[''] before:flex-1 before:h-px before:bg-gradient-to-r before:from-transparent before:via-primary/30 before:to-transparent after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-l after:from-transparent after:via-primary/30 after:to-transparent">
              <span className="text-xs py-2 px-6 rounded-full bg-white/70 border border-gray-200 uppercase tracking-widest font-medium text-text-gray backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90">or</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="mb-6 flex-1">
                <label htmlFor="first-name" className="block mb-2 font-medium text-sm text-text-dark">First name</label>
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                  <input type="text" id="first-name" placeholder="First name" required value={registerFirstName} onChange={(e) => setRegisterFirstName(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>

              <div className="mb-6 flex-1">
                <label htmlFor="last-name" className="block mb-2 font-medium text-sm text-text-dark">Last name</label>
                <div className="relative">
                  <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                  <input type="text" id="last-name" placeholder="Last name" required value={registerLastName} onChange={(e) => setRegisterLastName(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="register-email" className="block mb-2 font-medium text-sm text-text-dark">Email address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <input type="email" id="register-email" placeholder="Enter your email" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="experience" className="block mb-2 font-medium text-sm text-text-dark">Experience Level</label>
              <div className="relative">
                <i className="fas fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <select id="experience" required value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
                  <option value="">Select Experience Level</option>
                  <option value="entry-level">Entry Level</option>
                  <option value="mid-level">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="domain" className="block mb-2 font-medium text-sm text-text-dark">Domain</label>
              <div className="relative">
                <i className="fas fa-code-branch absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <select id="domain" required value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer">
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
              <label htmlFor="register-password" className="block mb-2 font-medium text-sm text-text-dark">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <input type={showRegisterPassword ? 'text' : 'password'} id="register-password" placeholder="Create a password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none text-text-gray cursor-pointer" onClick={() => setShowRegisterPassword(!showRegisterPassword)}>
                  <i className={`fas ${showRegisterPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              <div className="mt-2">
                <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${passwordStrength}%`, backgroundColor: getStrengthColor() }}></div>
                </div>
                <span className="text-xs text-text-gray">Password strength: <span>{getStrengthText()}</span></span>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block mb-2 font-medium text-sm text-text-dark">Confirm password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-text-gray"></i>
                <input type="password" id="confirm-password" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full py-3 pl-10 pr-4 rounded-lg border border-gray-200 bg-white/70 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="flex items-start mb-6">
              <input type="checkbox" id="terms" required checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="mt-1 mr-2" />
              <label htmlFor="terms" className="text-sm text-text-gray leading-tight">I agree to the <a href="#" className="text-primary no-underline">Terms of Service</a> and <a href="#" className="text-primary no-underline">Privacy Policy</a></label>
            </div>

            <button type="submit" className="w-full py-4 rounded-full border-none bg-gradient-to-r from-primary to-secondary text-white font-semibold cursor-pointer transition-all duration-300 relative overflow-hidden hover:-translate-y-1 hover:shadow-lg">Create Account</button>

            <div className="text-center mt-6 text-sm text-text-gray">
              <p>Already have an account? <a href="#" className="text-primary no-underline font-medium" onClick={() => setActiveTab('login')}>Login</a></p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
