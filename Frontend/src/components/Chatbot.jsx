
import React, { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m here to help you with any questions about ConfidenSee. How can I assist you today?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: 'Thanks for your message! A representative will get back to you shortly.' }]);
      }, 1000);
    }
  };

  const handleSuggestion = (text) => {
    setMessages([...messages, { sender: 'user', text }]);
    // Simulate bot response
    setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: `You asked about: \"${text}\". Here is some information...` }]);
      }, 1000);
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div onClick={toggleChatbot} className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl relative">
        <i className="fas fa-comments"></i>
        <span className="absolute top-1 right-1 w-3 h-3 bg-success rounded-full border-2 border-white animate-pulse"></span>
      </div>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-96 h-[32rem] bg-lighter-bg rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden backdrop-blur-lg animate-slideUp">
          <div className="flex items-center p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-gray-200">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white mr-3">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h4 className="m-0 text-base font-semibold text-text-dark">Support Team</h4>
              <p className="m-0 text-sm text-text-gray">We're online and ready to help!</p>
            </div>
            <button onClick={toggleChatbot} className="bg-transparent border-none text-text-gray cursor-pointer ml-auto p-2 rounded-md transition-all duration-300 hover:bg-black/5 hover:text-text-dark">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 max-w-[85%] ${msg.sender === 'bot' ? 'self-start' : 'self-end flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${msg.sender === 'bot' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-text-gray text-white'}`}>
                  <i className={`fas ${msg.sender === 'bot' ? 'fa-robot' : 'fa-user'}`}></i>
                </div>
                <div className={`p-3 rounded-2xl border ${msg.sender === 'bot' ? 'bg-white/70 border-gray-200' : 'bg-gradient-to-r from-primary to-secondary text-white'}`}>
                  <p className="m-0 text-sm leading-snug">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'bot' ? 'text-text-gray' : 'text-white/80'}`}>Just now</span>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 flex flex-wrap gap-2 mb-4">
            <button onClick={() => handleSuggestion('How does it work?')} className="bg-primary/10 border border-gray-200 text-primary py-2 px-4 rounded-full text-sm cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-px">How does it work?</button>
            <button onClick={() => handleSuggestion('Pricing plans')} className="bg-primary/10 border border-gray-200 text-primary py-2 px-4 rounded-full text-sm cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-px">Pricing plans</button>
            <button onClick={() => handleSuggestion('Technical issues')} className="bg-primary/10 border border-gray-200 text-primary py-2 px-4 rounded-full text-sm cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-px">Technical issues</button>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="relative flex items-center">
              <input type="text" placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="w-full py-3 pr-12 pl-4 rounded-full border border-gray-200 bg-white/70 text-sm transition-all duration-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
              <button onClick={handleSend} className="absolute right-1.5 w-9 h-9 bg-gradient-to-r from-primary to-secondary border-none rounded-full text-white cursor-pointer transition-all duration-300 flex items-center justify-center hover:scale-110">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
       <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
