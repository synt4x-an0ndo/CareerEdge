import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaFileAlt, FaBriefcase, FaPalette, FaThLarge, FaUser, FaGraduationCap,
  FaTools, FaEye, FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaLinkedin, FaAlignLeft, FaPlus, FaBuilding, FaTrash, FaInfoCircle,
  FaLightbulb, FaDownload, FaSpinner, FaFilePdf, FaFileWord, FaStar,
  FaBars, FaSearch, FaBell, FaCheck, FaArrowLeft, FaArrowRight
} from 'react-icons/fa';

const CreateCVPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedinProfile: '',
    website: '',
    profilePhoto: null,
    professionalSummary: '',
    experiences: [{
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }],
    education: [{
      degree: '',
      institution: '',
      location: '',
      graduationYear: ''
    }],
    skills: ''
  });

  useEffect(() => {
    document.title = 'Create Your Professional CV - CareerEdge';
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and professional design with a modern layout',
      icon: FaFileAlt,
      color: 'from-primary to-secondary'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Bold and authoritative design for leadership positions',
      icon: FaBriefcase,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Modern two-column layout perfect for creative professionals',
      icon: FaPalette,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const steps = [
    { id: 1, name: 'Template', icon: FaThLarge },
    { id: 2, name: 'Personal Info', icon: FaUser },
    { id: 3, name: 'Experience', icon: FaBriefcase },
    { id: 4, name: 'Education', icon: FaGraduationCap },
    { id: 5, name: 'Skills', icon: FaTools },
    { id: 6, name: 'Preview', icon: FaEye }
  ];

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file
      });
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
      }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, {
        degree: '',
        institution: '',
        location: '',
        graduationYear: ''
      }]
    });
  };

  const removeExperience = (index) => {
    const newExperiences = formData.experiences.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      experiences: newExperiences
    });
  };

  const removeEducation = (index) => {
    const newEducation = formData.education.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      education: newEducation
    });
  };

  const handleGenerateCV = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showNotification('CV generated successfully!');
    }, 2000);
  };

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-y-0 z-50";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateY(200%)";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                Choose Your Template
              </h2>
              <p className="text-text-gray">Select a template that best represents your professional style</p>
            </div>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white/90 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${selectedTemplate === template.id
                      ? 'border-primary ring-4 ring-primary/20'
                      : 'border-gray-100 hover:border-primary/50'
                    }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${template.color} flex items-center justify-center mb-4`}>
                    <template.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="mb-2 font-bold text-lg">{template.name}</h3>
                  <p className="text-text-gray text-sm">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="flex items-center mt-4 font-medium text-primary">
                      <FaCheckCircle className="mr-2" />
                      Selected
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                Personal Information
              </h2>
              <p className="text-text-gray">Tell us about yourself</p>
            </div>
            <div className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl">
              <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaUser className="mr-2 text-primary" />Full Name *
                  </label>
                  <input
                    type="text"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange(e, 'fullName')}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaBriefcase className="mr-2 text-primary" />Job Title *
                  </label>
                  <input
                    type="text"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange(e, 'jobTitle')}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaEnvelope className="mr-2 text-primary" />Email *
                  </label>
                  <input
                    type="email"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaPhone className="mr-2 text-primary" />Phone
                  </label>
                  <input
                    type="tel"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaMapMarkerAlt className="mr-2 text-primary" />Location
                  </label>
                  <input
                    type="text"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.location}
                    onChange={(e) => handleInputChange(e, 'location')}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaLinkedin className="mr-2 text-primary" />LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange(e, 'linkedinProfile')}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-gray-700 text-sm">
                    <FaAlignLeft className="mr-2 text-primary" />Professional Summary
                  </label>
                  <textarea
                    className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all resize-none"
                    rows="4"
                    value={formData.professionalSummary}
                    onChange={(e) => handleInputChange(e, 'professionalSummary')}
                    placeholder="A brief summary of your professional background and career objectives..."
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                  Work Experience
                </h2>
                <p className="text-text-gray">Add your professional experience</p>
              </div>
              <button
                onClick={addExperience}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg px-4 py-2 rounded-lg font-bold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
              >
                <FaPlus />
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {formData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary rounded-lg w-10 h-10">
                        <FaBuilding className="text-white" />
                      </div>
                      <h3 className="font-bold text-lg">Experience {index + 1}</h3>
                    </div>
                    {formData.experiences.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="hover:bg-red-50 p-2 rounded-lg text-red-500 hover:text-red-700 transition-all"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Job Title</label>
                      <input
                        type="text"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={exp.jobTitle}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].jobTitle = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Company</label>
                      <input
                        type="text"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={exp.company}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].company = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Start Date</label>
                      <input
                        type="month"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].startDate = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">End Date</label>
                      <input
                        type="month"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all"
                        value={exp.endDate}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].endDate = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                        disabled={exp.currentlyWorking}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="border-gray-300 rounded focus:ring-primary w-4 h-4 text-primary"
                          checked={exp.currentlyWorking}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[index].currentlyWorking = e.target.checked;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                        />
                        <span className="text-gray-700 text-sm">I currently work here</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Description</label>
                      <textarea
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all resize-none"
                        rows="3"
                        value={exp.description}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].description = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                  Education
                </h2>
                <p className="text-text-gray">Add your educational background</p>
              </div>
              <button
                onClick={addEducation}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg px-4 py-2 rounded-lg font-bold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
              >
                <FaPlus />
                Add Education
              </button>
            </div>
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-10 h-10">
                        <FaGraduationCap className="text-white" />
                      </div>
                      <h3 className="font-bold text-lg">Education {index + 1}</h3>
                    </div>
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="hover:bg-red-50 p-2 rounded-lg text-red-500 hover:text-red-700 transition-all"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Degree</label>
                      <input
                        type="text"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].degree = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="Bachelor of Science in Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Institution</label>
                      <input
                        type="text"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].institution = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="University Name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Location</label>
                      <input
                        type="text"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={edu.location}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].location = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="City, Country"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700 text-sm">Graduation Year</label>
                      <input
                        type="number"
                        className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all"
                        value={edu.graduationYear}
                        onChange={(e) => {
                          const newEducation = [...formData.education];
                          newEducation[index].graduationYear = e.target.value;
                          setFormData({ ...formData, education: newEducation });
                        }}
                        placeholder="2024"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                Skills & Expertise
              </h2>
              <p className="text-text-gray">Highlight your key skills and competencies</p>
            </div>
            <div className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl">
              <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  <FaTools className="mr-2 text-primary" />Technical Skills
                </label>
                <textarea
                  className="bg-white/70 px-4 py-3 border border-gray-200 focus:border-primary rounded-lg focus:ring-2 focus:ring-primary/20 w-full placeholder-text-gray text-text-dark transition-all resize-none"
                  rows="4"
                  value={formData.skills}
                  onChange={(e) => handleInputChange(e, 'skills')}
                  placeholder="JavaScript, Python, React, Node.js, SQL, Git, AWS..."
                />
                <p className="mt-2 text-text-gray text-sm">
                  <FaInfoCircle className="mr-1" />
                  Separate skills with commas for best formatting
                </p>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border border-primary/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-r from-primary to-secondary rounded-lg w-10 h-10">
                    <FaLightbulb className="text-white" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-bold text-gray-800">Pro Tips for Skills</h4>
                    <ul className="space-y-1 text-text-gray text-sm">
                      <li>• Include both technical and soft skills</li>
                      <li>• Match skills with the job description you're targeting</li>
                      <li>• Order skills by proficiency level</li>
                      <li>• Include certifications and tools you're proficient in</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-2xl">
                Preview & Download
              </h2>
              <p className="text-text-gray">Review your CV before downloading</p>
            </div>

            <div className="gap-6 grid lg:grid-cols-2">
              {/* Preview Card */}
              <div className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary rounded-lg w-10 h-10">
                    <FaEye className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg">CV Summary</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <FaUser className="text-primary" />
                    <div>
                      <p className="text-text-gray text-sm">Name</p>
                      <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <FaBriefcase className="text-primary" />
                    <div>
                      <p className="text-text-gray text-sm">Job Title</p>
                      <p className="font-medium">{formData.jobTitle || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <FaEnvelope className="text-primary" />
                    <div>
                      <p className="text-text-gray text-sm">Email</p>
                      <p className="font-medium">{formData.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <FaBuilding className="text-primary" />
                    <div>
                      <p className="text-text-gray text-sm">Experience</p>
                      <p className="font-medium">{formData.experiences.length} position(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                    <FaGraduationCap className="text-primary" />
                    <div>
                      <p className="text-text-gray text-sm">Education</p>
                      <p className="font-medium">{formData.education.length} degree(s)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white/90 shadow-lg p-6 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg w-10 h-10">
                    <FaDownload className="text-white" />
                  </div>
                  <h3 className="font-bold text-lg">Download Options</h3>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleGenerateCV}
                    disabled={isGenerating}
                    className="flex justify-center items-center gap-3 bg-gradient-to-r from-primary to-secondary disabled:opacity-50 hover:shadow-lg px-6 py-4 rounded-xl w-full font-bold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FaFilePdf />
                        Download as PDF
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => showNotification('Word document download coming soon!')}
                    className="flex justify-center items-center gap-3 bg-white hover:bg-primary/5 px-6 py-4 border-2 border-primary rounded-xl w-full font-bold text-primary transition-all duration-300 cursor-pointer"
                  >
                    <FaFileWord />
                    Download as Word
                  </button>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 mt-6 p-4 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <FaStar className="mt-1 text-yellow-500" />
                    <div>
                      <h4 className="mb-1 font-bold text-gray-800">Pro Tip</h4>
                      <p className="text-text-gray text-sm">
                        Always save your CV in PDF format to preserve formatting across different devices and systems.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex bg-light-bg min-h-screen">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-6 bg-white/95 backdrop-blur-lg p-6 border-gray-200 border-b">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-none border-none text-text-gray"
          >
            <FaBars />
          </button>
          <div className="relative flex-1 max-w-md">
            <FaSearch className="top-1/2 left-3.5 absolute text-text-gray -translate-y-1/2" />
            <input
              placeholder="Search..."
              className="bg-white/70 py-3 pr-4 pl-11 border border-gray-200 rounded-lg w-full placeholder-text-gray text-text-dark"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative bg-none border-none text-text-gray text-2xl cursor-pointer">
              <FaBell />
            </button>
            <button className="bg-none border-none">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                alt="Profile"
                className="rounded-full w-9 h-9"
              />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Page Header */}
          <div className="flex justify-between items-center gap-4 bg-white/90 shadow-lg backdrop-blur-lg mb-6 p-6 border border-gray-100 rounded-2xl">
            <div>
              <h1 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-3xl">
                Create Your Professional CV
              </h1>
              <p className="text-text-gray">
                Build a stunning CV in minutes with our easy-to-use builder
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-text-gray">
              <FaFileAlt className="text-primary text-2xl" />
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white/90 shadow-lg mb-6 p-4 border border-gray-100 rounded-2xl overflow-x-auto">
            <div className="flex justify-between items-center min-w-max">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all ${currentStep === step.id
                        ? 'text-primary'
                        : currentStep > step.id
                          ? 'text-green-500'
                          : 'text-gray-400'
                      }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${currentStep === step.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : currentStep > step.id
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {currentStep > step.id ? (
                        <FaCheck />
                      ) : (
                        <step.icon />
                      )}
                    </div>
                    <span className="font-medium text-sm whitespace-nowrap">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5'
                }`}
            >
              <FaArrowLeft />
              Previous
            </button>

            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:shadow-lg px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
              >
                Next
                <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleGenerateCV}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 disabled:opacity-50 hover:shadow-lg px-6 py-3 rounded-xl font-bold text-white transition-all hover:-translate-y-0.5 duration-300 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FaDownload />
                    Generate CV
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCVPage;
