import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExclamationCircle, FaArrowLeft, FaChevronLeft, FaChevronRight, FaMicrophone, FaStop, FaArrowRight, FaKeyboard } from 'react-icons/fa';

// Styles object for the redesigned interview page
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a1628 0%, #0d1e36 50%, #0a1628 100%)',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: '1px solid rgba(30, 58, 95, 0.6)',
        backgroundColor: 'rgba(13, 30, 54, 0.95)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 40,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: 1,
    },
    headerCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '12px',
        flex: 1,
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '8px',
        color: '#9ca3af',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    headerTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        letterSpacing: '0.5px',
    },
    questionCard: {
        maxWidth: '80%',
        width: '100%',
        margin: '0 auto',
        padding: '32px 40px',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, rgba(30, 58, 95, 0.4) 0%, rgba(13, 30, 54, 0.8) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
    },
    questionText: {
        fontSize: '20px',
        lineHeight: '1.7',
        fontWeight: '500',
        color: '#f8fafc',
        textAlign: 'center',
        marginBottom: '0',
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '24px 0',
    },
    timerDisplay: {
        fontSize: '56px',
        fontWeight: '300',
        letterSpacing: '2px',
    },
    timerLabel: {
        fontSize: '13px',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
    },
    recordButton: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.3s ease',
    },
    recordButtonIdle: {
        background: 'linear-gradient(145deg, #3d1a2a 0%, #2a1219 100%)',
        boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)',
    },
    recordButtonActive: {
        background: 'linear-gradient(145deg, #ef4444 0%, #dc2626 100%)',
        boxShadow: '0 4px 30px rgba(239, 68, 68, 0.5)',
        animation: 'pulse 1.5s infinite',
    },
    typeAnswerButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '12px',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        border: '1px solid rgba(251, 191, 36, 0.3)',
        color: '#fbbf24',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
};

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
        <div style={styles.container} className="interview-page">
            {/* Custom CSS for animations */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                @keyframes recording-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
                    50% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
                }
                .record-btn-active {
                    animation: recording-pulse 1.5s infinite;
                }
                .back-btn:hover {
                    background-color: rgba(30, 58, 95, 0.5);
                    color: #ffffff;
                }
                .type-answer-btn:hover {
                    background-color: rgba(251, 191, 36, 0.2);
                    border-color: rgba(251, 191, 36, 0.5);
                }
                @media (max-width: 768px) {
                    .question-card-responsive {
                        max-width: 95% !important;
                        padding: 24px 20px !important;
                    }
                    .question-text-responsive {
                        font-size: 17px !important;
                    }
                    .timer-display-responsive {
                        font-size: 44px !important;
                    }
                    .header-responsive {
                        padding: 12px 16px !important;
                    }
                    .header-title-responsive {
                        font-size: 15px !important;
                    }
                }
            `}</style>

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
                            className="bg-[#0d1e36] shadow-2xl p-6 border border-[#1e3a5f] rounded-2xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="flex justify-center items-center bg-red-500/10 rounded-full w-14 h-14">
                                    <FaExclamationCircle className="text-red-400 text-2xl" />
                                </div>
                            </div>
                            <h3 className="mb-2 font-bold text-white text-xl text-center">
                                Return to question generation
                            </h3>
                            <p className="mb-6 text-gray-400 text-center">
                                Are you sure you want to exit this interview and restart at the question generation step? You will not be able to continue the interview.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={cancelBack}
                                    className="bg-[#1e3a5f]/50 hover:bg-[#1e3a5f] px-6 py-2.5 border border-[#1e3a5f] rounded-full font-medium text-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmBack}
                                    className="bg-red-500/20 hover:bg-red-500/30 px-6 py-2.5 border border-red-500/30 rounded-full font-medium text-red-400 transition-colors"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fixed Header */}
            <header style={styles.header} className="header-responsive">
                {/* Left: Back Button */}
                <div style={styles.headerLeft}>
                    <button
                        onClick={handleBack}
                        style={styles.backButton}
                        className="back-btn"
                    >
                        <FaArrowLeft />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                </div>

                {/* Center: Static Title */}
                <div style={styles.headerCenter}>
                    <h1 style={styles.headerTitle} className="header-title-responsive">
                        Question Generation
                    </h1>
                </div>

                {/* Right: Navigation & End Button */}
                <div style={styles.headerRight}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrevQuestion}
                            disabled={currentQuestion === 0}
                            className="hover:bg-[#1e3a5f]/50 disabled:opacity-30 p-2 rounded-lg text-gray-400 hover:text-white transition-all disabled:cursor-not-allowed"
                        >
                            <FaChevronLeft />
                        </button>
                        <div className="bg-[#0a1628] px-4 py-2 border border-[#1e3a5f] rounded-full font-medium text-gray-300 text-sm">
                            {currentQuestion + 1} / {questions.length}
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestion === questions.length - 1}
                            className="hover:bg-[#1e3a5f]/50 disabled:opacity-30 p-2 rounded-lg text-gray-400 hover:text-white transition-all disabled:cursor-not-allowed"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                    <button
                        onClick={handleEndReview}
                        className="hidden sm:block bg-gradient-to-r from-amber-500/20 hover:from-amber-500/30 to-orange-500/20 hover:to-orange-500/30 ml-4 px-5 py-2 border border-amber-500/30 rounded-full font-medium text-amber-400 text-sm transition-all"
                    >
                        End & Review
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex flex-col flex-1 px-4 md:px-6 py-8 overflow-y-auto">
                <div className="flex flex-col gap-8 mx-auto w-full max-w-4xl">

                    {/* Question Card - Dedicated Container */}
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={styles.questionCard}
                        className="question-card-responsive"
                    >
                        <p style={styles.questionText} className="question-text-responsive">
                            {questions[currentQuestion]}
                        </p>
                    </motion.div>

                    {/* Timer Section */}
                    <div style={styles.timerContainer}>
                        <div style={styles.timerDisplay} className="timer-display-responsive">
                            <span className={isRecording ? 'text-amber-400' : 'text-gray-400'}>
                                {formatTime(timeElapsed)}
                            </span>
                            <span className="text-gray-600"> / {formatTime(maxTime)}</span>
                        </div>
                        <span style={styles.timerLabel}>
                            {isRecording ? 'Recording...' : 'Time Elapsed'}
                        </span>
                    </div>

                    {/* Record Button */}
                    <div className="flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleRecording}
                            style={{
                                ...styles.recordButton,
                                ...(isRecording ? styles.recordButtonActive : styles.recordButtonIdle),
                            }}
                            className={isRecording ? 'record-btn-active' : ''}
                        >
                            {isRecording ? (
                                <FaStop className="text-white text-2xl" />
                            ) : (
                                <FaMicrophone className="text-red-400 text-2xl" />
                            )}
                        </motion.button>
                    </div>

                    {/* Type Answer Section */}
                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={() => setShowTypeAnswer(!showTypeAnswer)}
                            style={styles.typeAnswerButton}
                            className="type-answer-btn"
                        >
                            <FaKeyboard />
                            <span>{showTypeAnswer ? 'Hide keyboard' : 'Or type your answer'}</span>
                        </button>

                        <AnimatePresence>
                            {showTypeAnswer && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="w-full max-w-2xl"
                                >
                                    <textarea
                                        value={typedAnswer}
                                        onChange={(e) => setTypedAnswer(e.target.value)}
                                        placeholder="Type your answer here..."
                                        className="bg-[#0a1628]/80 p-5 border border-[#1e3a5f] focus:border-amber-400/50 rounded-xl outline-none focus:ring-2 focus:ring-amber-400/20 w-full min-h-[180px] text-gray-200 text-base leading-relaxed transition-all resize-none placeholder-gray-500"
                                    />
                                    <div className="flex justify-end mt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleSubmitTypedAnswer}
                                            disabled={!typedAnswer.trim()}
                                            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-50 shadow-lg hover:shadow-amber-500/25 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 disabled:cursor-not-allowed"
                                        >
                                            Submit Answer
                                            <FaArrowRight />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Question Progress Dots */}
                    <div className="flex justify-center gap-3 py-4">
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
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentQuestion
                                    ? 'bg-amber-400 scale-150 shadow-lg shadow-amber-400/30'
                                    : answers[index]
                                        ? 'bg-green-400 hover:scale-125'
                                        : 'bg-gray-600 hover:bg-gray-500 hover:scale-110'
                                    }`}
                                title={`Question ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Collapsible Sections - Feedback & Sample Response */}
                    <div className="space-y-3 mt-4">
                        {/* Feedback Section */}
                        <div className="bg-[#0d1e36]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setFeedbackOpen(!feedbackOpen)}
                                className="flex justify-between items-center hover:bg-[#1e3a5f]/30 px-6 py-4 w-full text-gray-300 transition-colors"
                            >
                                <span className="font-medium">Feedback</span>
                                <FaChevronRight className={`transition-transform duration-200 ${feedbackOpen ? 'rotate-90' : ''}`} />
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
                                            <p className="text-sm italic leading-relaxed">
                                                Complete your answer to receive AI-powered feedback on your response.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sample Response Section */}
                        <div className="bg-[#0d1e36]/80 backdrop-blur-sm border border-[#1e3a5f] rounded-xl overflow-hidden">
                            <button
                                onClick={() => setSampleResponseOpen(!sampleResponseOpen)}
                                className="flex justify-between items-center hover:bg-[#1e3a5f]/30 px-6 py-4 w-full text-gray-300 transition-colors"
                            >
                                <span className="font-medium">Sample Response</span>
                                <FaChevronRight className={`transition-transform duration-200 ${sampleResponseOpen ? 'rotate-90' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {sampleResponseOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-[#1e3a5f] border-t"
                                    >
                                        <div className="p-6 text-gray-300">
                                            <p className="text-sm leading-relaxed">
                                                {currentSampleResponses[currentQuestion] || currentSampleResponses[0]}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile End & Review Button */}
                    <div className="sm:hidden flex justify-center mt-4">
                        <button
                            onClick={handleEndReview}
                            className="bg-gradient-to-r from-amber-500/20 hover:from-amber-500/30 to-orange-500/20 hover:to-orange-500/30 px-6 py-3 border border-amber-500/30 rounded-full font-medium text-amber-400 transition-all"
                        >
                            End & Review
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default InterviewPage;
