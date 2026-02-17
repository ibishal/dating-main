import React from 'react';
import { useNavigate } from 'react-router-dom';
import { matches } from '../services/mockData';
import { MessageSquare, X, Check, Heart } from 'lucide-react';

const Matches: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-zinc-900">Matches</h1>
          <p className="text-zinc-500 font-mono text-xs">People who align with your encrypted preferences.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-5 py-2.5 text-xs font-mono font-bold bg-zinc-50 text-zinc-600 rounded-full hover:bg-zinc-100 border border-zinc-100">FILTER</button>
            <button className="px-5 py-2.5 text-xs font-mono font-bold bg-zinc-50 text-zinc-600 rounded-full hover:bg-zinc-100 border border-zinc-100">SORT</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
            <div className="relative p-2">
               <img src={match.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-[1.5rem] object-cover bg-zinc-50 grayscale group-hover:grayscale-0 transition-all duration-500" />
               <div className="absolute top-0 right-0 bg-white p-1 rounded-full">
                  <div className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                    {match.compatibility}%
                  </div>
               </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                    <h3 className="text-xl font-bold text-zinc-900">{match.anonymousId}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold ${
                        match.status === 'matched' ? 'bg-green-50 text-green-700' :
                        match.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-zinc-50 text-zinc-500'
                    }`}>
                        {match.status.toUpperCase()}
                    </span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4 md:mb-0">
                  {match.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-zinc-50 rounded-full text-[10px] font-mono font-bold text-zinc-500 border border-zinc-100">
                      {tag}
                    </span>
                  ))}
                </div>
            </div>

            <div className="flex gap-2 w-full md:w-auto p-2">
              {match.status === 'matched' || match.status === 'accepted' ? (
                <button 
                  onClick={() => navigate(`/chat/${match.id}`)}
                  className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white border border-blue-600 rounded-[1.5rem] font-mono font-bold text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  CHAT <MessageSquare size={16} />
                </button>
              ) : (
                <>
                  <button className="flex-1 md:flex-none w-14 h-14 bg-zinc-50 text-zinc-400 rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center border border-zinc-100">
                    <X size={20} />
                  </button>
                  <button className="flex-1 md:flex-none w-14 h-14 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors flex items-center justify-center border border-blue-100">
                    <Check size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;