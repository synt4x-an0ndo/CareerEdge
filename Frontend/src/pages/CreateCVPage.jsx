import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    document.title = 'Create Your Professional CV - ConfidenSee';
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const templates = [
    {
      id: 'modern',
      name: 'Modern Professional',
      description: 'Clean and professional design with a modern layout',
      icon: 'fa-file-alt',
      color: 'from-primary to-secondary'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Bold and authoritative design for leadership positions',
      icon: 'fa-briefcase',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Modern two-column layout perfect for creative professionals',
      icon: 'fa-palette',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const steps = [
    { id: 1, name: 'Template', icon: 'fa-th-large' },
    { id: 2, name: 'Personal Info', icon: 'fa-user' },
    { id: 3, name: 'Experience', icon: 'fa-briefcase' },
    { id: 4, name: 'Education', icon: 'fa-graduation-cap' },
    { id: 5, name: 'Skills', icon: 'fa-tools' },
    { id: 6, name: 'Preview', icon: 'fa-eye' }
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
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Choose Your Template
              </h2>
              <p className="text-text-gray">Select a template that best represents your professional style</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white/90 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
                    selectedTemplate === template.id
                      ? 'border-primary ring-4 ring-primary/20'
                      : 'border-gray-100 hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${template.color} flex items-center justify-center mb-4`}>
                    <i className={`fas ${template.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{template.name}</h3>
                  <p className="text-text-gray text-sm">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="mt-4 flex items-center text-primary font-medium">
                      <i className="fas fa-check-circle mr-2"></i>
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
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Personal Information
              </h2>
              <p className="text-text-gray">Tell us about yourself</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-user mr-2 text-primary"></i>Full Name *
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange(e, 'fullName')}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-briefcase mr-2 text-primary"></i>Job Title *
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange(e, 'jobTitle')}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-envelope mr-2 text-primary"></i>Email *
                  </label>
                  <input
                    type="email"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-phone mr-2 text-primary"></i>Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.phone}
                    onChange={(e) => handleInputChange(e, 'phone')}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-map-marker-alt mr-2 text-primary"></i>Location
                  </label>
                  <input
                    type="text"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.location}
                    onChange={(e) => handleInputChange(e, 'location')}
                    placeholder="New York, NY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fab fa-linkedin mr-2 text-primary"></i>LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={formData.linkedinProfile}
                    onChange={(e) => handleInputChange(e, 'linkedinProfile')}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-align-left mr-2 text-primary"></i>Professional Summary
                  </label>
                  <textarea
                    className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
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
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Work Experience
                </h2>
                <p className="text-text-gray">Add your professional experience</p>
              </div>
              <button
                onClick={addExperience}
                className="py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                Add Experience
              </button>
            </div>
            <div className="space-y-4">
              {formData.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <i className="fas fa-building text-white"></i>
                      </div>
                      <h3 className="font-bold text-lg">Experience {index + 1}</h3>
                    </div>
                    {formData.experiences.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="month"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={exp.startDate}
                        onChange={(e) => {
                          const newExperiences = [...formData.experiences];
                          newExperiences[index].startDate = e.target.value;
                          setFormData({ ...formData, experiences: newExperiences });
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="month"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          checked={exp.currentlyWorking}
                          onChange={(e) => {
                            const newExperiences = [...formData.experiences];
                            newExperiences[index].currentlyWorking = e.target.checked;
                            setFormData({ ...formData, experiences: newExperiences });
                          }}
                        />
                        <span className="text-sm text-gray-700">I currently work here</span>
                      </label>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
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
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  Education
                </h2>
                <p className="text-text-gray">Add your educational background</p>
              </div>
              <button
                onClick={addEducation}
                className="py-2 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                Add Education
              </button>
            </div>
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <i className="fas fa-graduation-cap text-white"></i>
                      </div>
                      <h3 className="font-bold text-lg">Education {index + 1}</h3>
                    </div>
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                      <input
                        type="text"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                      <input
                        type="number"
                        className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Skills & Expertise
              </h2>
              <p className="text-text-gray">Highlight your key skills and competencies</p>
            </div>
            <div className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-tools mr-2 text-primary"></i>Technical Skills
                </label>
                <textarea
                  className="w-full py-3 px-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  rows="4"
                  value={formData.skills}
                  onChange={(e) => handleInputChange(e, 'skills')}
                  placeholder="JavaScript, Python, React, Node.js, SQL, Git, AWS..."
                />
                <p className="text-text-gray text-sm mt-2">
                  <i className="fas fa-info-circle mr-1"></i>
                  Separate skills with commas for best formatting
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Pro Tips for Skills</h4>
                    <ul className="text-sm text-text-gray space-y-1">
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
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Preview & Download
              </h2>
              <p className="text-text-gray">Review your CV before downloading</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Preview Card */}
              <div className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <i className="fas fa-eye text-white"></i>
                  </div>
                  <h3 className="font-bold text-lg">CV Summary</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-user text-primary"></i>
                    <div>
                      <p className="text-sm text-text-gray">Name</p>
                      <p className="font-medium">{formData.fullName || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-briefcase text-primary"></i>
                    <div>
                      <p className="text-sm text-text-gray">Job Title</p>
                      <p className="font-medium">{formData.jobTitle || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-envelope text-primary"></i>
                    <div>
                      <p className="text-sm text-text-gray">Email</p>
                      <p className="font-medium">{formData.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-building text-primary"></i>
                    <div>
                      <p className="text-sm text-text-gray">Experience</p>
                      <p className="font-medium">{formData.experiences.length} position(s)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <i className="fas fa-graduation-cap text-primary"></i>
                    <div>
                      <p className="text-sm text-text-gray">Education</p>
                      <p className="font-medium">{formData.education.length} degree(s)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white/90 rounded-2xl p-6 border border-gray-100 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <i className="fas fa-download text-white"></i>
                  </div>
                  <h3 className="font-bold text-lg">Download Options</h3>
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={handleGenerateCV}
                    disabled={isGenerating}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-xl cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Generating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-file-pdf"></i>
                        Download as PDF
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => showNotification('Word document download coming soon!')}
                    className="w-full py-4 px-6 bg-white border-2 border-primary text-primary rounded-xl cursor-pointer font-bold transition-all duration-300 hover:bg-primary/5 flex items-center justify-center gap-3"
                  >
                    <i className="fas fa-file-word"></i>
                    Download as Word
                  </button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <i className="fas fa-star text-yellow-500 mt-1"></i>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Pro Tip</h4>
                      <p className="text-sm text-text-gray">
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
    <div className="flex min-h-screen bg-light-bg">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-lg p-6 flex items-center gap-6 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-none border-none text-text-gray"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="flex-1 relative max-w-md">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-text-gray"></i>
            <input
              placeholder="Search..."
              className="w-full py-3 pl-11 pr-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative bg-none border-none text-2xl cursor-pointer text-text-gray">
              <i className="fas fa-bell"></i>
            </button>
            <button className="bg-none border-none">
              <img
                src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                alt="Profile"
                className="w-9 h-9 rounded-full"
              />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Page Header */}
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mb-6 flex justify-between items-center gap-4 border border-gray-100 shadow-lg">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Create Your Professional CV
              </h1>
              <p className="text-text-gray">
                Build a stunning CV in minutes with our easy-to-use builder
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-text-gray">
              <i className="fas fa-file-alt text-2xl text-primary"></i>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white/90 rounded-2xl p-4 mb-6 border border-gray-100 shadow-lg overflow-x-auto">
            <div className="flex items-center justify-between min-w-max">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all ${
                      currentStep === step.id
                        ? 'text-primary'
                        : currentStep > step.id
                        ? 'text-green-500'
                        : 'text-gray-400'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        currentStep === step.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        <i className={`fas ${step.icon}`}></i>
                      )}
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
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
              className={`py-3 px-6 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:-translate-y-0.5'
              }`}
            >
              <i className="fas fa-arrow-left"></i>
              Previous
            </button>
            
            {currentStep < 6 ? (
              <button
                onClick={nextStep}
                className="py-3 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-xl cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
              >
                Next
                <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button
                onClick={handleGenerateCV}
                disabled={isGenerating}
                className="py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl cursor-pointer font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Generating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-download"></i>
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
