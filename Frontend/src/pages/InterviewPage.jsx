import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const InterviewPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [showTypeAnswer, setShowTypeAnswer] = useState(false);
    const [typedAnswer, setTypedAnswer] = useState('');
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [sampleResponseOpen, setSampleResponseOpen] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [showBackModal, setShowBackModal] = useState(false);
    const timerRef = useRef(null);
    const maxTime = 120; // 2 minutes in seconds

    // Get job info from navigation state
    const jobTitle = location.state?.jobTitle || 'Business Analyst';
    const jobDescription = location.state?.jobDescription || '';

    // Sample interview questions based on job role
    const questionsByRole = {
        'Business Analyst': [
            "Can you describe a situation where you had to analyze complex data to inform a business decision? How did you approach it and what was the outcome?",
            "Tell me about a time when you had to translate business requirements into technical specifications. What challenges did you face?",
            "How do you prioritize competing stakeholder requirements when working on a project?",
            "Describe your experience with data visualization tools. How have you used them to communicate insights?",
            "Tell me about a time when you identified a process improvement opportunity. How did you implement it?",
        ],
        'Product Manager': [
            "How do you prioritize features in a product roadmap when you have limited resources?",
            "Describe a time when you had to make a difficult trade-off decision for a product.",
            "How do you gather and incorporate user feedback into product development?",
            "Tell me about a product launch you led. What was your strategy and what were the results?",
            "How do you measure the success of a product feature?",
        ],
        'Software Engineer': [
            "Describe a challenging technical problem you solved. What was your approach?",
            "How do you ensure code quality in your projects?",
            "Tell me about a time when you had to learn a new technology quickly. How did you approach it?",
            "Describe your experience with debugging a complex issue in production.",
            "How do you handle disagreements about technical decisions with team members?",
        ],
        'default': [
            "Tell me about yourself and your professional background.",
            "What are your greatest strengths and how do they apply to this role?",
            "Describe a challenging situation you faced at work and how you handled it.",
            "Where do you see yourself in 5 years?",
            "Why are you interested in this position?",
        ]
    };

    const questions = questionsByRole[jobTitle] || questionsByRole['default'];

    const sampleResponses = {
        'Business Analyst': [
            "In my previous role, I was tasked with analyzing customer churn data to identify patterns and inform retention strategies. I approached this by first gathering data from multiple sources including CRM, support tickets, and usage analytics. I used SQL to clean and aggregate the data, then applied statistical analysis to identify key factors. I discovered that customers who didn't engage with our onboarding emails were 3x more likely to churn. I presented these findings to stakeholders with clear visualizations, and we implemented an improved onboarding sequence that reduced churn by 25%.",
            "When working on our inventory management system upgrade, I needed to translate complex business requirements from the warehouse team into technical specifications for developers. I conducted multiple workshops with stakeholders to understand their pain points, then created detailed user stories with acceptance criteria. The main challenge was reconciling different workflows across locations. I solved this by creating a flexible configuration system that accommodated variations while maintaining core functionality.",
            "I use a combination of the MoSCoW method and stakeholder impact analysis. First, I categorize requirements as Must-have, Should-have, Could-have, or Won't-have. Then I assess each stakeholder's influence and interest level. I facilitate alignment meetings where stakeholders can discuss trade-offs, and I document the rationale behind prioritization decisions for transparency.",
            "I'm proficient in Tableau, Power BI, and Python visualization libraries. In my last project, I created an executive dashboard in Tableau that tracked KPIs in real-time. I focused on telling a story with data - starting with high-level metrics and allowing drill-down into details. The dashboard became a key tool for weekly leadership meetings.",
            "I noticed our monthly reporting process took 3 days of manual work. I mapped the current process, identified bottlenecks, and proposed an automated solution using Python scripts and scheduled tasks. After getting buy-in from my manager, I developed and tested the automation over two sprints. The result was reducing report generation from 3 days to 2 hours, freeing up the team for higher-value analysis work.",
        ],
        'default': [
            "I have X years of experience in this field, with a strong background in [relevant skills]. I'm passionate about [industry/role focus] and have consistently delivered results in my previous positions.",
            "My greatest strength is my ability to [specific skill]. For example, in my previous role, I [specific example with measurable outcome].",
            "I faced a situation where [describe challenge]. I approached it by [your actions], which resulted in [positive outcome].",
            "In 5 years, I see myself growing into a leadership role where I can mentor others while continuing to develop my expertise in [area].",
            "I'm excited about this opportunity because [specific reasons related to company/role]. My skills in [relevant areas] align well with what you're looking for.",
        ]
    };

    useEffect(() => {
        document.title = 'Interview Practice - CareerEdge';
    }, []);

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setTimeElapsed(prev => {
                    if (prev >= maxTime) {
                        setIsRecording(false);
                        clearInterval(timerRef.current);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isRecording]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleRecording = () => {
        if (isRecording) {
            // Stopping recording - save answer and auto-advance after a short delay
            setIsRecording(false);
            setTimeout(() => {
                autoAdvanceToNextQuestion();
            }, 1500); // 1.5 second delay to show completion
        } else {
            // Starting recording
            setTimeElapsed(0);
            setIsRecording(true);
        }
    };

    const autoAdvanceToNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            // Save current answer
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = typedAnswer || '[Voice Recording]';
            setAnswers(newAnswers);

            // Move to next question
            setCurrentQuestion(prev => prev + 1);
            setTimeElapsed(0);
            setTypedAnswer('');
            setShowTypeAnswer(false);
            setFeedbackOpen(false);
            setSampleResponseOpen(false);
        } else {
            // Last question - go to review
            handleEndReview();
        }
    };

    const handleSubmitTypedAnswer = () => {
        if (typedAnswer.trim()) {
            autoAdvanceToNextQuestion();
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            // Save current answer
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = typedAnswer;
            setAnswers(newAnswers);

            // Move to next question
            setCurrentQuestion(currentQuestion + 1);
            setTimeElapsed(0);
            setIsRecording(false);
            setTypedAnswer('');
            setShowTypeAnswer(false);
            setFeedbackOpen(false);
            setSampleResponseOpen(false);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
            setTimeElapsed(0);
            setIsRecording(false);
            setTypedAnswer(answers[currentQuestion - 1] || '');
            setShowTypeAnswer(false);
            setFeedbackOpen(false);
            setSampleResponseOpen(false);
        }
    };

    const handleEndReview = () => {
        navigate('/dashboard');
    };

    const handleBack = () => {
        setShowBackModal(true);
    };

    const confirmBack = () => {
        setShowBackModal(false);
        navigate('/extra-add');
    };

    const cancelBack = () => {
        setShowBackModal(false);
    };

    const currentSampleResponses = sampleResponses[jobTitle] || sampleResponses['default'];

    return (
        <div className="flex bg-[#0a1628] min-h-screen">
            {/* Back Confirmation Modal */}
            <AnimatePresence>
                {showBackModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 p-4"
                        onClick={cancelBack}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="flex justify-center items-center bg-red-50 rounded-full w-12 h-12">
                                    <i className="text-red-400 text-xl fas fa-exclamation-circle"></i>
                                </div>
                            </div>
                            <h3 className="mb-2 font-bold text-gray-800 text-xl text-center">
                                Return to question generation
                            </h3>
                            <p className="mb-6 text-gray-500 text-center">
                                Are you sure you want to exit this interview and restart at the question generation step? You will not be able to continue the interview.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={cancelBack}
                                    className="hover:bg-gray-50 px-6 py-2.5 border border-gray-300 rounded-full font-medium text-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmBack}
                                    className="bg-red-50 hover:bg-red-100 px-6 py-2.5 rounded-full font-medium text-red-500 transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col flex-1">
                {/* Header */}
                <div className="flex justify-between items-center bg-[#0d1e36]/95 backdrop-blur-lg p-4 border-[#1e3a5f] border-b">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <i className="fa-arrow-left fas"></i>
                        <span>Question Generation</span>
                    </button>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestion === 0}
                            className="disabled:opacity-30 p-2 text-gray-500 hover:text-white transition-colors disabled:cursor-not-allowed"
                        >
                            <i className="fa-chevron-left fas"></i>
                        </button>
                        <div className="bg-[#0a1628] px-5 py-2 border border-[#1e3a5f] rounded-full font-medium text-gray-300">
                            Question {currentQuestion + 1}
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestion === questions.length - 1}
                            className="disabled:opacity-30 p-2 text-gray-500 hover:text-white transition-colors disabled:cursor-not-allowed"
                        >
                            <i className="fa-chevron-right fas"></i>
                        </button>
                    </div>

                    <button
                        onClick={handleEndReview}
                        className="bg-[#1e3a5f] hover:bg-[#2d4a6f] px-5 py-2 rounded-full font-medium text-gray-300 transition-colors"
                    >
                        End & Review
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="mx-auto max-w-3xl">
                        {/* Question Card */}
                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-[#0d1e36] shadow-lg mb-6 p-8 border border-[#1e3a5f] rounded-2xl"
                        >
                            {/* Question Text */}
                            <h2 className="mb-8 font-bold text-white text-xl text-center leading-relaxed">
                                {questions[currentQuestion]}
                            </h2>

                            {/* Timer */}
                            <div className="mb-6 text-center">
                                <div className="font-light text-gray-500 text-5xl">
                                    <span className={isRecording ? 'text-amber-400' : ''}>
                                        {formatTime(timeElapsed)}
                                    </span>
                                    <span className="text-gray-600"> / {formatTime(maxTime)}</span>
                                </div>
                            </div>

                            {/* Microphone Button */}
                            <div className="flex justify-center mb-6">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleRecording}
                                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                            : 'bg-[#3d1a2a] text-red-400 hover:bg-[#4d2a3a]'
                                        }`}
                                >
                                    <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'} text-2xl`}></i>
                                </motion.button>
                            </div>

                            {/* Type Answer Link */}
                            <div className="text-center">
                                <button
                                    onClick={() => setShowTypeAnswer(!showTypeAnswer)}
                                    className="font-medium text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
                                >
                                    Or type your answer
                                </button>
                            </div>

                            {/* Type Answer Textarea */}
                            <AnimatePresence>
                                {showTypeAnswer && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-6"
                                    >
                                        <textarea
                                            value={typedAnswer}
                                            onChange={(e) => setTypedAnswer(e.target.value)}
                                            placeholder="Type your answer here..."
                                            className="bg-[#0a1628] p-4 border border-[#1e3a5f] focus:border-amber-400/50 rounded-xl focus:ring-2 focus:ring-amber-400/20 w-full min-h-[150px] text-gray-300 transition-all resize-none placeholder-gray-500"
                                        />
                                        <div className="flex justify-end mt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={handleSubmitTypedAnswer}
                                                disabled={!typedAnswer.trim()}
                                                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary disabled:opacity-50 shadow-lg hover:shadow-xl px-6 py-3 rounded-full font-medium text-white transition-all duration-300 disabled:cursor-not-allowed"
                                            >
                                                Submit Answer
                                                <i className="fa-arrow-right fas"></i>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Feedback Section */}
                        <div className="bg-[#0d1e36] mb-4 border border-[#1e3a5f] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setFeedbackOpen(!feedbackOpen)}
                                className="flex justify-between items-center hover:bg-[#1e3a5f]/30 px-6 py-4 w-full text-gray-400 transition-colors"
                            >
                                <span className="font-medium">Feedback</span>
                                <i className={`fas fa-chevron-right transition-transform ${feedbackOpen ? 'rotate-90' : ''}`}></i>
                            </button>
                            <AnimatePresence>
                                {feedbackOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-[#1e3a5f] border-t"
                                    >
                                        <div className="p-6 text-gray-400">
                                            <p className="text-sm italic">
                                                Complete your answer to receive AI-powered feedback on your response.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sample Response Section */}
                        <div className="bg-[#0d1e36] border border-[#1e3a5f] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setSampleResponseOpen(!sampleResponseOpen)}
                                className="flex justify-between items-center hover:bg-[#1e3a5f]/30 px-6 py-4 w-full text-gray-400 transition-colors"
                            >
                                <span className="font-medium">Sample Response</span>
                                <i className={`fas fa-chevron-right transition-transform ${sampleResponseOpen ? 'rotate-90' : ''}`}></i>
                            </button>
                            <AnimatePresence>
                                {sampleResponseOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-[#1e3a5f] border-t"
                                    >
                                        <div className="p-6 text-gray-400">
                                            <p className="leading-relaxed">
                                                {currentSampleResponses[currentQuestion] || currentSampleResponses[0]}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Question Progress */}
                        <div className="flex justify-center gap-2 mt-6">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentQuestion(index);
                                        setTimeElapsed(0);
                                        setIsRecording(false);
                                        setTypedAnswer(answers[index] || '');
                                        setShowTypeAnswer(false);
                                        setFeedbackOpen(false);
                                        setSampleResponseOpen(false);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all ${index === currentQuestion
                                            ? 'bg-amber-400 scale-125'
                                            : answers[index]
                                                ? 'bg-green-400'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewPage;
