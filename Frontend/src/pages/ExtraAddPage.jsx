import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaArrowRight } from 'react-icons/fa';

const ExtraAddPage = () => {
    const navigate = useNavigate();
    const [selectedJob, setSelectedJob] = useState('Business Analyst');
    const [customDescription, setCustomDescription] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const maxChars = 4000;

    const jobRoles = [
        { id: 'custom', name: 'Custom Job Description' },
        { id: 'business-analyst', name: 'Business Analyst' },
        { id: 'product-manager', name: 'Product Manager' },
        { id: 'software-engineer', name: 'Software Engineer' },
        { id: 'marketing-specialist', name: 'Marketing Specialist' },
        { id: 'data-analyst', name: 'Data Analyst' },
        { id: 'customer-service', name: 'Customer Service Representative' },
        { id: 'sales-rep', name: 'Sales Representative' },
        { id: 'hr-specialist', name: 'Human Resources Specialist' },
        { id: 'ux-designer', name: 'UX/UI Designer' },
        { id: 'qa-engineer', name: 'QA Engineer' },
    ];

    const jobDescriptions = {
        'Business Analyst': `Job Title: Business Analyst

Role Summary: We are looking for a Business Analyst to join our team. This role is perfect for those who are early in their careers and are eager to dive into analyzing business needs and delivering data-driven solutions.

Responsibilities:
- Work closely with business units and stakeholders to understand and analyze business requirements.
- Translate business needs into functional specifications and system design plans.
- Conduct thorough data analysis using a variety of techniques, ranging from simple data aggregation via statistical analysis to complex data mining.
- Develop and maintain dashboards and reports to track key performance indicators.
- Collaborate with cross-functional teams to identify and implement process improvements.
- Support project managers in planning and executing projects.
- Document business processes and workflows.

Requirements:
- Bachelor's degree in Business Administration, Finance, Computer Science, or a related field.
- Strong analytical and problem-solving skills.
- Excellent communication and interpersonal skills.
- Proficiency in Microsoft Excel, SQL, and data visualization tools.
- Ability to work independently and as part of a team.
- Detail-oriented with strong organizational skills.`,

        'Product Manager': `Job Title: Product Manager

Role Summary: We are seeking a passionate Product Manager to lead our product development initiatives. You will be responsible for defining product strategy and roadmap.

Responsibilities:
- Define and execute product strategy aligned with company goals.
- Gather and prioritize product requirements from customers and stakeholders.
- Work closely with engineering, design, and marketing teams.
- Analyze market trends and competitive landscape.
- Create detailed product specifications and user stories.
- Monitor product performance and iterate based on user feedback.
- Present product updates to executive leadership.

Requirements:
- Bachelor's degree in Business, Engineering, or related field.
- 2+ years of product management experience.
- Strong understanding of agile methodologies.
- Excellent analytical and communication skills.
- Experience with product analytics tools.`,

        'Software Engineer': `Job Title: Software Engineer

Role Summary: We are looking for a talented Software Engineer to join our development team. You will work on building scalable applications and solving complex technical challenges.

Responsibilities:
- Design, develop, and maintain software applications.
- Write clean, maintainable, and efficient code.
- Participate in code reviews and provide constructive feedback.
- Collaborate with cross-functional teams to define requirements.
- Troubleshoot, debug, and upgrade existing systems.
- Stay up-to-date with emerging technologies and industry trends.
- Document technical specifications and system architecture.

Requirements:
- Bachelor's degree in Computer Science or related field.
- Proficiency in at least one programming language (Python, Java, JavaScript, etc.).
- Experience with modern development frameworks and tools.
- Understanding of software development lifecycle.
- Strong problem-solving and analytical skills.`,

        'Marketing Specialist': `Job Title: Marketing Specialist

Role Summary: We are seeking a creative Marketing Specialist to develop and execute marketing campaigns that drive brand awareness and customer engagement.

Responsibilities:
- Plan and execute marketing campaigns across multiple channels.
- Create compelling content for social media, email, and web.
- Analyze campaign performance and optimize for better results.
- Collaborate with design team to create marketing materials.
- Manage social media presence and community engagement.
- Conduct market research and competitor analysis.
- Track and report on marketing KPIs.

Requirements:
- Bachelor's degree in Marketing, Communications, or related field.
- Experience with digital marketing tools and platforms.
- Strong writing and communication skills.
- Creative thinking and attention to detail.
- Knowledge of SEO and content marketing best practices.`,

        'Data Analyst': `Job Title: Data Analyst

Role Summary: We are looking for a Data Analyst to transform data into insights that drive business decisions. You will analyze complex datasets and present findings to stakeholders.

Responsibilities:
- Collect, process, and analyze large datasets.
- Create visualizations and dashboards to communicate insights.
- Develop and maintain data models and reports.
- Identify trends, patterns, and opportunities in data.
- Collaborate with teams to understand data needs.
- Ensure data quality and integrity.
- Present findings to technical and non-technical audiences.

Requirements:
- Bachelor's degree in Statistics, Mathematics, or related field.
- Proficiency in SQL and data analysis tools (Python, R, Excel).
- Experience with data visualization tools (Tableau, Power BI).
- Strong analytical and problem-solving skills.
- Attention to detail and accuracy.`,

        'Customer Service Representative': `Job Title: Customer Service Representative

Role Summary: We are seeking a friendly and professional Customer Service Representative to provide excellent support to our customers and resolve their inquiries efficiently.

Responsibilities:
- Respond to customer inquiries via phone, email, and chat.
- Resolve customer complaints and issues promptly.
- Provide product and service information to customers.
- Document customer interactions and transactions.
- Escalate complex issues to appropriate departments.
- Follow up with customers to ensure satisfaction.
- Identify opportunities to improve customer experience.

Requirements:
- High school diploma or equivalent.
- Excellent verbal and written communication skills.
- Strong problem-solving abilities.
- Patience and empathy when dealing with customers.
- Ability to multitask and work in a fast-paced environment.`,

        'Sales Representative': `Job Title: Sales Representative

Role Summary: We are looking for a motivated Sales Representative to generate leads, build relationships with clients, and drive revenue growth.

Responsibilities:
- Identify and pursue new sales opportunities.
- Build and maintain relationships with clients.
- Present products and services to potential customers.
- Negotiate contracts and close deals.
- Meet and exceed sales targets.
- Maintain accurate records in CRM system.
- Provide feedback on market trends and customer needs.

Requirements:
- Bachelor's degree in Business or related field preferred.
- Proven sales experience and track record.
- Excellent communication and negotiation skills.
- Self-motivated with a results-driven approach.
- Ability to work independently and as part of a team.`,

        'Human Resources Specialist': `Job Title: Human Resources Specialist

Role Summary: We are seeking an HR Specialist to support our human resources functions including recruitment, employee relations, and HR administration.

Responsibilities:
- Manage full-cycle recruitment process.
- Conduct new employee onboarding and orientation.
- Administer employee benefits and compensation programs.
- Handle employee relations and resolve workplace issues.
- Maintain HR records and ensure compliance.
- Support performance management processes.
- Assist with HR policy development and implementation.

Requirements:
- Bachelor's degree in Human Resources or related field.
- Knowledge of HR practices and employment laws.
- Excellent interpersonal and communication skills.
- Strong organizational and multitasking abilities.
- Experience with HRIS systems preferred.`,

        'UX/UI Designer': `Job Title: UX/UI Designer

Role Summary: We are looking for a creative UX/UI Designer to create intuitive and visually appealing user experiences for our digital products.

Responsibilities:
- Design user interfaces for web and mobile applications.
- Conduct user research and usability testing.
- Create wireframes, prototypes, and high-fidelity mockups.
- Collaborate with developers to implement designs.
- Develop and maintain design systems.
- Analyze user feedback to improve designs.
- Stay updated with design trends and best practices.

Requirements:
- Bachelor's degree in Design or related field.
- Proficiency in design tools (Figma, Sketch, Adobe XD).
- Strong portfolio demonstrating UX/UI work.
- Understanding of user-centered design principles.
- Knowledge of HTML/CSS is a plus.`,

        'QA Engineer': `Job Title: QA Engineer

Role Summary: We are seeking a detail-oriented QA Engineer to ensure the quality of our software products through comprehensive testing and quality assurance processes.

Responsibilities:
- Develop and execute test plans and test cases.
- Identify, document, and track software defects.
- Perform manual and automated testing.
- Collaborate with developers to resolve issues.
- Ensure products meet quality standards before release.
- Create and maintain testing documentation.
- Participate in agile development processes.

Requirements:
- Bachelor's degree in Computer Science or related field.
- Experience with software testing methodologies.
- Knowledge of test automation tools preferred.
- Strong attention to detail.
- Excellent problem-solving and communication skills.`,
    };

    useEffect(() => {
        document.title = 'New Practice Session - CareerEdge';
    }, []);

    const handleJobSelect = (jobName) => {
        if (jobName === 'Custom Job Description') {
            setIsCustom(true);
            setSelectedJob(jobName);
            setCustomDescription('');
        } else {
            setIsCustom(false);
            setSelectedJob(jobName);
            setCustomDescription(jobDescriptions[jobName] || '');
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setCustomDescription(value);
        }
    };

    const handleGenerateQuestions = () => {
        // Navigate to interview session with job details
        navigate('/interview', {
            state: {
                jobTitle: selectedJob,
                jobDescription: customDescription || jobDescriptions[selectedJob]
            }
        });
    };

    const charsRemaining = maxChars - (customDescription?.length || 0);

    return (
        <div className="flex flex-col bg-[#0a1628] min-h-screen">
            {/* Fixed Header */}
            <header className="top-0 z-40 sticky flex justify-between items-center bg-[#0d1e36]/95 backdrop-blur-lg px-6 py-4 border-[#1e3a5f] border-b">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 hover:bg-[#1e3a5f]/50 px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-all"
                    >
                        <span className="text-xl">←</span>
                        <span className="hidden sm:inline font-medium text-sm">Dashboard</span>
                    </button>
                </div>

                <h1 className="font-semibold text-white text-lg tracking-wide">
                    New Practice Session
                </h1>

                <div className="flex items-center gap-4">
                    <button className="relative text-gray-400 hover:text-white text-xl transition-colors">
                        <FaBell />
                    </button>
                    <button>
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                            alt="Profile"
                            className="rounded-full w-9 h-9"
                        />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 md:px-6 py-8 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto max-w-4xl"
                >
                    {/* Page Title - Prominent and Visible */}
                    <div className="mb-10 text-center">
                        <h2 className="bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 mb-3 font-bold text-transparent text-3xl md:text-4xl">
                            Select a job description
                        </h2>
                        <p className="text-gray-400 text-base">
                            Choose a role or enter your own job description
                        </p>
                    </div>

                    {/* Job Role Pills */}
                    <div className="flex flex-wrap justify-center gap-3 mb-10">
                        {jobRoles.map((job) => (
                            <motion.button
                                key={job.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleJobSelect(job.name)}
                                className={`px-5 py-2.5 rounded-full border font-medium transition-all duration-300 ${selectedJob === job.name
                                    ? 'bg-amber-400 text-gray-900 border-amber-400 shadow-lg shadow-amber-400/20'
                                    : 'bg-[#1e3a5f] text-white border-[#3d5a7f] hover:border-amber-400/50 hover:bg-[#2a4a6f]'
                                    }`}
                            >
                                {job.name}
                            </motion.button>
                        ))}
                    </div>

                    {/* Job Description Card */}
                    <div className="bg-gradient-to-b from-[#0d1e36] to-[#0a1628] shadow-xl backdrop-blur-sm mb-8 p-6 border border-[#1e3a5f] rounded-2xl">
                        <div className="relative">
                            <textarea
                                className="bg-[#0a1628]/80 p-5 border border-[#1e3a5f] focus:border-amber-400/50 rounded-xl outline-none focus:ring-2 focus:ring-amber-400/20 w-full min-h-[280px] text-gray-200 text-base leading-relaxed transition-all resize-y placeholder-gray-500"
                                value={isCustom ? customDescription : (jobDescriptions[selectedJob] || '')}
                                onChange={handleDescriptionChange}
                                placeholder={isCustom ? "Enter your custom job description here..." : ""}
                                readOnly={!isCustom}
                            />
                            <div className="right-4 bottom-4 absolute font-medium text-amber-400/70 text-sm">
                                {charsRemaining} chars left
                            </div>
                        </div>
                    </div>

                    {/* Generate Questions Button */}
                    <div className="flex flex-col items-center gap-5">
                        <motion.button
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleGenerateQuestions}
                            className="flex items-center gap-3 bg-gradient-to-r from-amber-500 hover:from-amber-400 to-orange-500 hover:to-orange-400 shadow-amber-500/25 shadow-lg hover:shadow-amber-500/40 px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300"
                        >
                            Generate Questions
                            <FaArrowRight />
                        </motion.button>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="font-medium text-gray-500 hover:text-gray-300 transition-colors duration-200"
                        >
                            Skip For Now
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default ExtraAddPage;
