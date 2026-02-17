import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pools, confessions } from '../services/mockData';
import { ArrowLeft, Heart, Flame, HelpCircle, Ghost, PenTool, X, Send } from 'lucide-react';

const PoolDetail: React.FC = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const navigate = useNavigate();
  const pool = pools.find(p => p.id === poolId);
  const poolConfessions = confessions.filter(c => c.poolId === poolId || poolId === 'p1');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newConfession, setNewConfession] = useState('');

  if (!pool) return <div className="text-center py-20 font-mono text-zinc-400">POOL_NOT_FOUND</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    setNewConfession('');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-[2rem] shadow-sm border border-zinc-100 sticky top-6 z-10">
        <button 
          onClick={() => navigate('/confessions')}
          className="w-12 h-12 bg-zinc-50 hover:bg-zinc-100 rounded-full flex items-center justify-center transition-colors text-zinc-900"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
           <h1 className="font-bold text-xl flex items-center gap-2 text-zinc-900">
             <span>{pool.emoji}</span> {pool.name}
           </h1>
        </div>
        {!pool.isJoined && (
          <button className="px-5 py-2.5 bg-blue-600 text-white font-mono font-bold text-xs rounded-full hover:bg-blue-700 transition-colors">
            JOIN
          </button>
        )}
      </div>

      {/* Feed */}
      <div className="space-y-4">
        {poolConfessions.length > 0 ? (
          poolConfessions.map((confession) => (
            <div key={confession.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
                    <Ghost size={14} />
                 </div>
                 <span className="text-xs font-mono font-bold text-zinc-400">{confession.timestamp}</span>
              </div>
              
              <p className="text-2xl font-medium leading-relaxed mb-8 text-zinc-900">
                {confession.text}
              </p>
              
              <div className="flex gap-2">
                <ReactionButton count={confession.reactions.heart} icon={Heart} activeColor="bg-rose-50 text-rose-500" />
                <ReactionButton count={confession.reactions.fire} icon={Flame} activeColor="bg-orange-50 text-orange-500" />
                <ReactionButton count={confession.reactions.thinking} icon={HelpCircle} activeColor="bg-blue-50 text-blue-500" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-zinc-100">
            <Ghost size={48} className="mx-auto text-zinc-200 mb-4" />
            <p className="text-zinc-400 font-mono text-sm">NO_CONFESSIONS_FOUND</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-blue-600 text-white border border-blue-500 rounded-[1.5rem] shadow-lg shadow-blue-200 flex items-center justify-center hover:scale-105 transition-transform z-20"
      >
        <PenTool size={24} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-blue-950/20 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={() => setIsModalOpen(false)}>
          <div 
            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-xl border border-zinc-100 p-8 transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-mono text-zinc-900">NEW_CONFESSION</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-zinc-100 text-zinc-900">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="relative mb-6">
                <textarea
                  value={newConfession}
                  onChange={(e) => setNewConfession(e.target.value)}
                  placeholder="What's your secret?"
                  className="w-full h-48 p-6 bg-zinc-50 rounded-[2rem] border-2 border-transparent focus:border-blue-200 outline-none resize-none text-lg font-medium placeholder-zinc-400 text-zinc-900"
                  maxLength={500}
                />
                <div className="absolute bottom-6 right-6 text-[10px] font-mono font-bold text-zinc-400 bg-white px-3 py-1 rounded-full shadow-sm">
                  {newConfession.length}/500
                </div>
              </div>

              <button 
                type="submit"
                disabled={!newConfession.trim()}
                className="w-full py-4 bg-blue-600 text-white rounded-[1.5rem] font-mono font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                POST_ANONYMOUSLY <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const ReactionButton = ({ count, icon: Icon, activeColor }: { count: number, icon: any, activeColor: string }) => (
  <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors bg-zinc-50 hover:${activeColor} group`}>
    <Icon size={18} className="text-zinc-400 group-hover:text-inherit transition-colors" />
    <span className="text-xs font-mono font-bold text-zinc-400 group-hover:text-inherit">{count}</span>
  </button>
);

export default PoolDetail;