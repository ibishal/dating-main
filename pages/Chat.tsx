import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { matches, messages as initialMessages } from '../services/mockData';
import { ArrowLeft, Send, MoreHorizontal, ShieldCheck, Phone } from 'lucide-react';
import { Message } from '../types';

const Chat: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const match = matches.find(m => m.id === matchId);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'u1',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  if (!match) return <div>Match not found</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)] bg-white rounded-[2.5rem] shadow-sm overflow-hidden relative">
      {/* Chat Header */}
      <div className="p-6 border-b border-zinc-50 flex justify-between items-center bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/matches')} className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-zinc-100">
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
             <div className="relative">
                <img src={match.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
             </div>
             <div>
                <h2 className="text-sm font-bold text-zinc-900">{match.anonymousId}</h2>
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-400">
                   ENCRYPTED_CHANNEL
                </div>
             </div>
          </div>
        </div>
        <button className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-zinc-100">
           <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] group`}>
               <div 
                  className={`px-6 py-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                  msg.isMe 
                     ? 'bg-black text-white rounded-br-none' 
                     : 'bg-zinc-100 text-zinc-800 rounded-bl-none'
                  }`}
               >
                  {msg.text}
               </div>
               <div className={`text-[10px] font-mono font-bold text-zinc-300 mt-2 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
               </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white">
        <form onSubmit={handleSend} className="bg-zinc-50 p-2 rounded-[2rem] flex gap-2 items-center">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-transparent border-none px-6 py-4 focus:ring-0 outline-none text-zinc-800 placeholder-zinc-400 font-medium"
          />
          <button 
            type="submit" 
            disabled={!inputText.trim()}
            className="p-4 bg-black text-white rounded-full hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;