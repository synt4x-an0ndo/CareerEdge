
import React, { useState } from 'react';
import { FaBars, FaSearch, FaCheckCircle, FaSpinner, FaCheck, FaSave } from 'react-icons/fa';

const MainContent = ({ openSidebar }) => {
  const [selectedInterfaceLang, setSelectedInterfaceLang] = useState('en');
  const [selectedAILang, setSelectedAILang] = useState('en');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const interfaceLanguages = [
    { lang: 'en', flag: '🇺🇸', name: 'English (US)', details: 'Default language with US spelling' },
    { lang: 'bn', flag: '🇧🇩', name: 'বাংলা (Bangla)', details: 'Bangla language interface' },
  ];

  const aiLanguages = [
    { lang: 'en', flag: '🇺🇸', name: 'English', details: 'AI feedback in English' },
    { lang: 'bn', flag: '🇧🇩', name: 'বাংলা', details: 'AI feedback in Bangla' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setIsSaved(false);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1 bg-light-bg">
      <div className="flex items-center gap-6 bg-white/95 backdrop-blur-lg p-6 border-gray-200 border-b">
        <button onClick={openSidebar} className="lg:hidden bg-none border-none text-text-gray">
          <FaBars />
        </button>
        <div className="relative flex-1 max-w-md">
          <FaSearch className="top-1/2 left-3.5 absolute text-text-gray -translate-y-1/2" />
          <input placeholder="Search..." className="bg-white/70 py-3 pr-4 pl-11 border border-gray-200 rounded-lg w-full placeholder-text-gray text-text-dark" />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 font-bold text-transparent text-3xl">Language Settings</h1>
            <p className="text-text-gray">Customize your language preferences for interface and AI feedback</p>
          </div>
        </div>

        <div className="bg-white/90 shadow-lg mb-6 p-6 border border-gray-200 rounded-2xl">
          <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-semibold text-transparent text-xl">Language Preview</h3>
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex-1 bg-white/50 p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-2 text-primary">Interface Language</h4>
              <p className="text-text-gray text-sm">Welcome to CareerEdge! This is how the interface will look in your selected language.</p>
            </div>
            <div className="flex-1 bg-white/50 p-4 border border-gray-200 rounded-lg">
              <h4 className="mb-2 text-primary">AI Feedback Language</h4>
              <p className="text-text-gray text-sm">Great job on your interview response! Your communication skills are improving steadily.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 shadow-lg hover:shadow-2xl mb-6 p-6 border border-gray-200 rounded-2xl transition-all hover:-translate-y-1 duration-300">
          <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-semibold text-transparent text-xl">Interface Language</h3>
          <p className="mb-4 text-text-gray">Choose the language you prefer for the user interface</p>
          <div className="flex flex-col gap-4">
            {interfaceLanguages.map(lang => (
              <div key={lang.lang} onClick={() => setSelectedInterfaceLang(lang.lang)} className={`flex items-center p-4 bg-white/50 rounded-xl border cursor-pointer transition-all duration-300 ${selectedInterfaceLang === lang.lang ? 'bg-primary/10 border-primary shadow-lg' : 'border-gray-200'}`}>
                <div className="flex justify-center items-center mr-3 rounded-full w-8 h-8 text-lg">{lang.flag}</div>
                <div className="flex-1">
                  <div className="mb-1 font-semibold">{lang.name}</div>
                  <div className="text-text-gray text-sm">{lang.details}</div>
                </div>
                <div className={`text-success text-lg transition-all duration-300 ${selectedInterfaceLang === lang.lang ? 'opacity-100' : 'opacity-0'}`}><FaCheckCircle /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 shadow-lg hover:shadow-2xl mb-6 p-6 border border-gray-200 rounded-2xl transition-all hover:-translate-y-1 duration-300">
          <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-semibold text-transparent text-xl">AI Feedback Language</h3>
          <p className="mb-4 text-text-gray">Choose the language the AI will use when providing feedback</p>
          <div className="flex flex-col gap-4">
            {aiLanguages.map(lang => (
              <div key={lang.lang} onClick={() => setSelectedAILang(lang.lang)} className={`flex items-center p-4 bg-white/50 rounded-xl border cursor-pointer transition-all duration-300 ${selectedAILang === lang.lang ? 'bg-primary/10 border-primary shadow-lg' : 'border-gray-200'}`}>
                <div className="flex justify-center items-center mr-3 rounded-full w-8 h-8 text-lg">{lang.flag}</div>
                <div className="flex-1">
                  <div className="mb-1 font-semibold">{lang.name}</div>
                  <div className="text-text-gray text-sm">{lang.details}</div>
                </div>
                <div className={`text-success text-lg transition-all duration-300 ${selectedAILang === lang.lang ? 'opacity-100' : 'opacity-0'}`}><FaCheckCircle /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 shadow-lg hover:shadow-2xl mb-6 p-6 border border-gray-200 rounded-2xl transition-all hover:-translate-y-1 duration-300">
          <h3 className="bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-semibold text-transparent text-xl">Additional Language Settings</h3>
          <p className="mb-4 text-text-gray">Fine-tune your language preferences</p>
          <div className="mb-4">
            <label className="block mb-2 text-text-gray text-sm">Speech Recognition Language</label>
            <select className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300">
              <option value="en-US">English (United States)</option>
              <option value="bn-BD">Bangla (Bangladesh)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-text-gray text-sm">Text-to-Speech Voice</label>
            <select className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300">
              <option value="en-US-1">English Voice 1 (Female)</option>
              <option value="en-US-2">English Voice 2 (Male)</option>
              <option value="bn-BD-1">Bangla Voice 1 (Female)</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-text-gray text-sm">Translation Preferences</label>
            <select className="bg-white/70 p-3 border border-gray-200 focus:border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-text-dark transition-all duration-300">
              <option value="auto">Auto-detect language</option>
              <option value="manual">Always ask for translation</option>
              <option value="none">Never translate</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-right">
          <button onClick={handleSave} disabled={isSaving || isSaved} className={`py-3 px-5 bg-gradient-to-r from-primary to-secondary border-none rounded-lg text-white font-semibold cursor-pointer inline-flex gap-2 items-center transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg ${isSaving || isSaved ? 'bg-gradient-to-r from-success to-primary' : ''}`}>
            {isSaving ? (
              <><FaSpinner className="animate-spin" /> Saving...</>
            ) : isSaved ? (
              <><FaCheck /> Settings Saved!</>
            ) : (
              <><FaSave /> Save Language Settings</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
