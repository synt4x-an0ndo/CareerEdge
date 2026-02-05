
import React, { useState } from 'react';

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
    <div className="flex-1 flex flex-col bg-light-bg">
      <div className="bg-white/95 backdrop-blur-lg p-6 flex items-center gap-6 border-b border-gray-200">
        <button onClick={openSidebar} className="lg:hidden bg-none border-none text-text-gray">
          <i className="fas fa-bars"></i>
        </button>
        <div className="flex-1 relative max-w-md">
          <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-text-gray"></i>
          <input placeholder="Search..." className="w-full py-3 pl-11 pr-4 bg-white/70 border border-gray-200 rounded-lg text-text-dark placeholder-text-gray" />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">Language Settings</h1>
            <p className="text-text-gray">Customize your language preferences for interface and AI feedback</p>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl mb-6 border border-gray-200 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Language Preview</h3>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 p-4 bg-white/50 rounded-lg border border-gray-200">
              <h4 className="mb-2 text-primary">Interface Language</h4>
              <p className="text-text-gray text-sm">Welcome to ConfidenSee! This is how the interface will look in your selected language.</p>
            </div>
            <div className="flex-1 p-4 bg-white/50 rounded-lg border border-gray-200">
              <h4 className="mb-2 text-primary">AI Feedback Language</h4>
              <p className="text-text-gray text-sm">Great job on your interview response! Your communication skills are improving steadily.</p>
            </div>
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl mb-6 border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h3 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interface Language</h3>
          <p className="text-text-gray mb-4">Choose the language you prefer for the user interface</p>
          <div className="flex flex-col gap-4">
            {interfaceLanguages.map(lang => (
              <div key={lang.lang} onClick={() => setSelectedInterfaceLang(lang.lang)} className={`flex items-center p-4 bg-white/50 rounded-xl border cursor-pointer transition-all duration-300 ${selectedInterfaceLang === lang.lang ? 'bg-primary/10 border-primary shadow-lg' : 'border-gray-200'}`}>
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-lg">{lang.flag}</div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{lang.name}</div>
                  <div className="text-sm text-text-gray">{lang.details}</div>
                </div>
                <div className={`text-success text-lg transition-all duration-300 ${selectedInterfaceLang === lang.lang ? 'opacity-100' : 'opacity-0'}`}><i className="fas fa-check-circle"></i></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl mb-6 border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h3 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Feedback Language</h3>
          <p className="text-text-gray mb-4">Choose the language the AI will use when providing feedback</p>
          <div className="flex flex-col gap-4">
            {aiLanguages.map(lang => (
              <div key={lang.lang} onClick={() => setSelectedAILang(lang.lang)} className={`flex items-center p-4 bg-white/50 rounded-xl border cursor-pointer transition-all duration-300 ${selectedAILang === lang.lang ? 'bg-primary/10 border-primary shadow-lg' : 'border-gray-200'}`}>
                <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-lg">{lang.flag}</div>
                <div className="flex-1">
                  <div className="font-semibold mb-1">{lang.name}</div>
                  <div className="text-sm text-text-gray">{lang.details}</div>
                </div>
                <div className={`text-success text-lg transition-all duration-300 ${selectedAILang === lang.lang ? 'opacity-100' : 'opacity-0'}`}><i className="fas fa-check-circle"></i></div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 p-6 rounded-2xl mb-6 border border-gray-200 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          <h3 className="mb-4 text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Additional Language Settings</h3>
          <p className="text-text-gray mb-4">Fine-tune your language preferences</p>
          <div className="mb-4">
            <label className="block text-text-gray mb-2 text-sm">Speech Recognition Language</label>
            <select className="w-full p-3 rounded-lg bg-white/70 border border-gray-200 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="en-US">English (United States)</option>
              <option value="bn-BD">Bangla (Bangladesh)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-text-gray mb-2 text-sm">Text-to-Speech Voice</label>
            <select className="w-full p-3 rounded-lg bg-white/70 border border-gray-200 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="en-US-1">English Voice 1 (Female)</option>
              <option value="en-US-2">English Voice 2 (Male)</option>
              <option value="bn-BD-1">Bangla Voice 1 (Female)</option>
            </select>
          </div>
          <div>
            <label className="block text-text-gray mb-2 text-sm">Translation Preferences</label>
            <select className="w-full p-3 rounded-lg bg-white/70 border border-gray-200 text-text-dark transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option value="auto">Auto-detect language</option>
              <option value="manual">Always ask for translation</option>
              <option value="none">Never translate</option>
            </select>
          </div>
        </div>

        <div className="text-right mt-4">
        <button onClick={handleSave} disabled={isSaving || isSaved} className={`py-3 px-5 bg-gradient-to-r from-primary to-secondary border-none rounded-lg text-white font-semibold cursor-pointer inline-flex gap-2 items-center transition-all duration-300 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-lg ${isSaving || isSaved ? 'bg-gradient-to-r from-success to-primary' : ''}`}>
            {isSaving ? (
              <><i className="fas fa-spinner fa-spin"></i> Saving...</>
            ) : isSaved ? (
              <><i className="fas fa-check"></i> Settings Saved!</>
            ) : (
              <><i className="fas fa-save"></i> Save Language Settings</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
