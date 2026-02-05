import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IndexPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50">
      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isScrolled={isScrolled}
      />
      <Hero />
      <RateSection />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
};

const Navbar = ({ isMenuOpen, setIsMenuOpen, isScrolled }) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 20 }}
    className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-out ${isScrolled
      ? "bg-[#060d18]/98 backdrop-blur-2xl py-3 border-b border-white/5"
      : "bg-gradient-to-b from-[#0a1628] to-[#0a1628]/80 backdrop-blur-xl py-5"
      }`}
  >
    {/* Subtle top accent line */}
    <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-transparent via-amber-400/30 to-transparent h-[1px]" />

    <div className="flex justify-between items-center mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
      {/* Logo Section */}
      <motion.div
        className="group flex items-center cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <a href="/" className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="relative flex-shrink-0">
            <div className="flex justify-center items-center bg-gradient-to-br from-amber-400 to-amber-500 shadow-amber-500/30 shadow-lg rounded-xl w-10 h-10">
              <span className="font-extrabold text-[#0a1628] text-xl">C</span>
            </div>
          </div>
          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="font-bold text-white text-xl leading-none tracking-tight">
              Confiden<span className="text-amber-400">See</span>
            </span>
            <span className="font-medium text-[10px] text-gray-400 uppercase tracking-widest">
              Interview Prep
            </span>
          </div>
        </a>
      </motion.div>

      {/* Center Navigation */}
      <div className="hidden lg:flex items-center">
        <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 border border-slate-600 rounded-full">
          {["Features", "Testimonials"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className="relative hover:bg-amber-400 px-5 py-2 rounded-full font-semibold text-amber-400 hover:text-slate-900 text-sm transition-all duration-300"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <ul className="hidden lg:flex items-center gap-6">
        <motion.li
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="/dashboard"
            className="flex items-center gap-2 font-medium text-gray-400 hover:text-white text-sm transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Sign In
          </a>
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex relative items-center gap-2 bg-[length:200%_100%] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:bg-right shadow-amber-500/25 shadow-lg hover:shadow-amber-500/40 px-6 py-2.5 rounded-full font-semibold text-[#0a1628] text-sm transition-all duration-500"
          >
            Get Started
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.li>
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden z-50 flex flex-col gap-1.5 hover:bg-white/5 p-2.5 rounded-lg transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
          className="bg-gray-400 rounded-full w-6 h-0.5 origin-center"
        />
        <motion.div
          animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }}
          className="bg-gray-400 rounded-full w-6 h-0.5"
        />
        <motion.div
          animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
          className="bg-gray-400 rounded-full w-6 h-0.5 origin-center"
        />
      </button>
    </div>

    {/* Mobile Menu */}
    <motion.div
      initial={false}
      animate={{
        height: isMenuOpen ? "auto" : 0,
        opacity: isMenuOpen ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="lg:hidden bg-[#060d18]/98 backdrop-blur-2xl border-white/5 border-t overflow-hidden"
    >
      {isMenuOpen && (
        <div className="flex flex-col items-center gap-2 px-6 py-6">
          <motion.a
            href="#features"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="hover:bg-white/5 py-3 rounded-xl w-full font-medium text-gray-300 hover:text-white text-center transition-all"
          >
            Features
          </motion.a>
          <motion.a
            href="#testimonials"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="hover:bg-white/5 py-3 rounded-xl w-full font-medium text-gray-300 hover:text-white text-center transition-all"
          >
            Testimonials
          </motion.a>
          <motion.a
            href="/dashboard"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hover:bg-white/5 py-3 rounded-xl w-full font-medium text-gray-300 hover:text-white text-center transition-all"
          >
            Sign In
          </motion.a>
          <motion.a
            href="/register"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="bg-gradient-to-r from-amber-400 to-amber-500 mt-2 py-3 rounded-xl w-full font-semibold text-[#0a1628] text-center"
          >
            Get Started
          </motion.a>
        </div>
      )}
    </motion.div>
  </motion.nav>
);

const Hero = () => {
  return (
    <section className="relative flex items-center bg-gradient-to-br from-gray-50 to-gray-100 px-6 sm:px-8 min-h-screen overflow-hidden">
      <div className="-z-10 absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="-top-64 -left-64 absolute bg-primary/30 blur-3xl rounded-full w-[500px] h-[500px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="-right-72 -bottom-72 absolute bg-secondary/30 blur-3xl rounded-full w-[600px] h-[600px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="top-1/2 left-3/4 absolute bg-tertiary/30 blur-3xl rounded-full w-[400px] h-[400px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] opacity-30 [background-size:30px_30px]" />
      </div>

      <div className="z-10 relative mx-auto py-24 max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center bg-primary/10 shadow-lg backdrop-blur-sm mb-8 px-5 py-2 border border-primary/30 rounded-full font-semibold text-primary text-sm"
        >
          <span>✨ AI-Powered Interview Platform</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 font-bold text-gray-900 text-5xl sm:text-6xl lg:text-7xl leading-tight"
        >
          Master Your Next Interview
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-10 max-w-2xl text-gray-600 text-lg sm:text-xl leading-relaxed"
        >
          Practice with AI-generated questions, get real-time feedback, and
          track your progress.
          <br />
          CareerEdge helps you build confidence for your dream job interview.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex sm:flex-row flex-col justify-center items-center gap-4"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex justify-center items-center bg-gradient-to-r from-primary to-secondary shadow-xl hover:shadow-2xl px-10 py-4 rounded-full font-semibold text-white text-lg transition-all duration-300"
          >
            Start Practicing Free
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden top-1/4 left-[10%] absolute lg:flex"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center items-center bg-white/80 shadow-xl backdrop-blur-lg border border-white/90 rounded-2xl w-44 h-44"
          >
            <div className="text-center">
              <div className="mb-4 text-5xl">🎤</div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Voice Analysis
              </h4>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="hidden bottom-1/4 left-[15%] absolute lg:flex"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="flex justify-center items-center bg-white/80 shadow-xl backdrop-blur-lg border border-white/90 rounded-2xl w-44 h-44"
          >
            <div className="text-center">
              <div className="mb-4 text-5xl">📊</div>
              <h4 className="font-semibold text-gray-900 text-sm">
                Performance Metrics
              </h4>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="hidden top-1/2 right-[10%] absolute lg:flex"
        >
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="flex justify-center items-center bg-white/80 shadow-xl backdrop-blur-lg border border-white/90 rounded-2xl w-44 h-44"
          >
            <div className="text-center">
              <div className="mb-4 text-5xl">🤖</div>
              <h4 className="font-semibold text-gray-900 text-sm">
                AI Feedback
              </h4>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bottom-8 left-1/2 absolute text-center -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-gradient-to-b from-primary to-transparent mx-auto mb-2 w-px h-12"
        />
        <p className="text-gray-600 text-sm">Scroll to explore</p>
      </motion.div>
    </section>
  );
};

const RateSection = () => {
  const stats = [
    { value: "10,000+", label: "Auto-crafted interview questions" },
    { value: "95%", label: "User-reported improvement" },
    { value: "5,000+", label: "Happy users and counting…" },
  ];

  return (
    <section className="bg-white px-6 sm:px-8 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="gap-8 grid md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-2xl p-8 rounded-2xl text-center transition-all duration-300"
            >
              <div className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-3 font-black text-transparent text-4xl sm:text-5xl">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: "🎯",
      title: "Personalized Questions",
      desc: "AI generates questions tailored to your target role and industry",
    },
    {
      icon: "⚡",
      title: "Real-time Feedback",
      desc: "Get instant analysis on your answers with actionable insights",
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      desc: "Monitor your improvement with detailed analytics and reports",
    },
    {
      icon: "🎤",
      title: "Voice Practice",
      desc: "Practice speaking your answers with voice recognition technology",
    },
    {
      icon: "💡",
      title: "Smart Hints",
      desc: "Receive contextual hints when you need guidance during practice",
    },
    {
      icon: "🏆",
      title: "Confidence Building",
      desc: "Build real interview confidence through repeated practice",
    },
  ];

  return (
    <section
      id="features"
      className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 sm:px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-4xl sm:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive platform provides all the tools you need to excel
            in your next interview
          </p>
        </motion.div>

        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white shadow-lg hover:shadow-2xl p-8 rounded-2xl transition-all duration-300"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-3 font-bold text-gray-900 text-xl">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "CareerEdge completely transformed my interview preparation. The AI feedback was incredibly accurate and helped me identify my weak spots. I landed my dream job at Google thanks to this platform!",
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
    },
    {
      quote:
        "The personalized questions and real-time feedback were game-changers. I went from nervous and unprepared to confident and ready. I aced 3 interviews in a row and got multiple offers!",
      name: "Michael Chen",
      role: "Product Manager at Amazon",
    },
    {
      quote:
        "As someone who struggled with interview anxiety, CareerEdge gave me the practice and confidence I needed. The performance analytics helped me track my progress. Highly recommend to anyone job hunting!",
      name: "Emily Rodriguez",
      role: "Data Scientist at Netflix",
    },
  ];

  return (
    <section id="testimonials" className="bg-white px-6 sm:px-8 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-4xl sm:text-5xl">
            What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">
            Hear from professionals who landed their dream jobs with CareerEdge
          </p>
        </motion.div>

        <div className="gap-8 grid lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg hover:shadow-2xl p-8 rounded-2xl transition-all duration-300"
            >
              <div className="mb-6 text-primary text-4xl">❝</div>
              <p className="mb-6 text-gray-700 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <h5 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h5>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Basic Pack",
      price: "৳200",
      desc: "Perfect for getting started",
      features: [
        "10 hours of interview practice",
        "AI generated questions",
        "Basic AI feedback and scoring",
        "Voice + text hybrid mode",
        "Basic performance tracking",
        "Use anytime within 30 days",
        "Email support",
      ],
    },
    {
      name: "Standard Pack",
      price: "৳400",
      desc: "Ideal for serious candidates",
      popular: true,
      features: [
        "20 hours of interview practice",
        "AI generated questions",
        "Advanced AI feedback with insights",
        "Voice + text hybrid mode",
        "Detailed performance analytics",
        "Progress tracking & recommendations",
        "Use anytime within 30 days",
        "Priority email support",
        "Offline simulation mode",
      ],
    },
    {
      name: "Premium Pack",
      price: "৳600",
      desc: "For comprehensive preparation",
      features: [
        "30 hours of interview practice",
        "AI generated questions",
        "Advanced AI with personalized learning",
        "Voice + text hybrid mode",
        "Comprehensive analytics dashboard",
        "Custom question creation",
        "Use anytime within 30 days",
        "Priority support + live chat",
        "Offline simulation mode",
        "Interview scheduling assistant",
        "Export performance reports",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 sm:px-8 py-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 font-bold text-gray-900 text-4xl sm:text-5xl">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 text-lg">
            Flexible options designed for every stage of your career journey
          </p>
        </motion.div>

        <div className="gap-8 grid lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${plan.popular
                ? "border-2 border-primary ring-4 ring-primary/10"
                : ""
                }`}
            >
              {plan.popular && (
                <div className="top-0 right-0 absolute bg-gradient-to-r from-primary to-secondary px-3 py-1 rounded-bl-lg font-bold text-white text-xs">
                  Most Popular
                </div>
              )}
              <h3 className="mb-4 font-bold text-gray-900 text-2xl">
                {plan.name}
              </h3>
              <p className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 font-bold text-transparent text-4xl">
                {plan.price}
              </p>
              <p className="mb-6 text-gray-600">{plan.desc}</p>
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-700">
                    <span className="mt-1 text-primary">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-xl py-3 rounded-full w-full font-semibold text-white transition-all duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-6 sm:px-8 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="gap-12 grid lg:grid-cols-4 mb-12">
          <div className="lg:col-span-1">
            <div className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-bold text-transparent text-2xl">
              CareerEdge
            </div>
            <p className="mb-6 max-w-xs text-gray-400">
              Master your interview skills with AI-powered practice and
              feedback.
            </p>
            <div className="flex gap-4">
              {["twitter", "linkedin-in", "instagram", "facebook-f"].map(
                (social, i) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="flex justify-center items-center bg-primary/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary rounded-full w-10 h-10 text-primary hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm">🔗</span>
                  </motion.a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="after:bottom-0 after:left-0 after:absolute relative after:bg-gradient-to-r after:from-primary after:to-secondary mb-6 pb-2 after:w-8 after:h-0.5 font-semibold text-white text-lg">
              Product
            </h4>
            {["Features", "Testimonials"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block mb-3 text-gray-400 hover:text-primary transition-all hover:translate-x-1 duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <h4 className="after:bottom-0 after:left-0 after:absolute relative after:bg-gradient-to-r after:from-primary after:to-secondary mb-6 pb-2 after:w-8 after:h-0.5 font-semibold text-white text-lg">
              Resources
            </h4>
            {["Blog", "Help Center"].map((item) => (
              <a
                key={item}
                href="#"
                className="block mb-3 text-gray-400 hover:text-primary transition-all hover:translate-x-1 duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <div>
            <h4 className="after:bottom-0 after:left-0 after:absolute relative after:bg-gradient-to-r after:from-primary after:to-secondary mb-6 pb-2 after:w-8 after:h-0.5 font-semibold text-white text-lg">
              Company
            </h4>
            {["About Us", "Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="block mb-3 text-gray-400 hover:text-primary transition-all hover:translate-x-1 duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-gray-800 border-t text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CareerEdge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default IndexPage;
