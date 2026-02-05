
import React, { useState } from 'react';
import { FaComments, FaRobot, FaTimes, FaUser, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I\'m here to help you with any questions about CareerEdge. How can I assist you today?' },
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
    <div className="right-8 bottom-8 z-50 fixed">
      <div onClick={toggleChatbot} className="relative flex justify-center items-center bg-gradient-to-r from-primary to-secondary shadow-lg hover:shadow-2xl rounded-full w-16 h-16 text-white text-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
        <FaComments />
        <span className="top-1 right-1 absolute bg-success border-2 border-white rounded-full w-3 h-3 animate-pulse"></span>
      </div>

      {isOpen && (
        <div className="right-0 bottom-20 absolute flex flex-col bg-lighter-bg shadow-2xl backdrop-blur-lg border border-gray-200 rounded-2xl w-96 h-[32rem] overflow-hidden animate-slideUp">
          <div className="flex items-center bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-gray-200 border-b">
            <div className="flex justify-center items-center bg-gradient-to-r from-primary to-secondary mr-3 rounded-full w-10 h-10 text-white">
              <FaRobot />
            </div>
            <div>
              <h4 className="m-0 font-semibold text-text-dark text-base">Support Team</h4>
              <p className="m-0 text-text-gray text-sm">We're online and ready to help!</p>
            </div>
            <button onClick={toggleChatbot} className="bg-transparent hover:bg-black/5 ml-auto p-2 border-none rounded-md text-text-gray hover:text-text-dark transition-all duration-300 cursor-pointer">
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col flex-1 gap-4 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 max-w-[85%] ${msg.sender === 'bot' ? 'self-start' : 'self-end flex-row-reverse'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${msg.sender === 'bot' ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-text-gray text-white'}`}>
                  {msg.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className={`p-3 rounded-2xl border ${msg.sender === 'bot' ? 'bg-white/70 border-gray-200' : 'bg-gradient-to-r from-primary to-secondary text-white'}`}>
                  <p className="m-0 text-sm leading-snug">{msg.text}</p>
                  <span className={`text-xs mt-1 block ${msg.sender === 'bot' ? 'text-text-gray' : 'text-white/80'}`}>Just now</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 px-4">
            <button onClick={() => handleSuggestion('How does it work?')} className="bg-primary/10 hover:bg-primary px-4 py-2 border border-gray-200 rounded-full text-primary hover:text-white text-sm transition-all hover:-translate-y-px duration-300 cursor-pointer">How does it work?</button>
            <button onClick={() => handleSuggestion('Pricing plans')} className="bg-primary/10 hover:bg-primary px-4 py-2 border border-gray-200 rounded-full text-primary hover:text-white text-sm transition-all hover:-translate-y-px duration-300 cursor-pointer">Pricing plans</button>
            <button onClick={() => handleSuggestion('Technical issues')} className="bg-primary/10 hover:bg-primary px-4 py-2 border border-gray-200 rounded-full text-primary hover:text-white text-sm transition-all hover:-translate-y-px duration-300 cursor-pointer">Technical issues</button>
          </div>

          <div className="p-4 border-gray-200 border-t">
            <div className="relative flex items-center">
              <input type="text" placeholder="Type your message here..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} className="bg-white/70 py-3 pr-12 pl-4 border border-gray-200 focus:border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 w-full text-sm transition-all duration-300" />
              <button onClick={handleSend} className="right-1.5 absolute flex justify-center items-center bg-gradient-to-r from-primary to-secondary border-none rounded-full w-9 h-9 text-white hover:scale-110 transition-all duration-300 cursor-pointer">
                <FaPaperPlane />
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
