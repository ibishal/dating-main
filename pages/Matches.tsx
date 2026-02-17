import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { matches as initialMatches } from '../services/mockData';
import { MessageSquare, X, Heart, RefreshCw, Layers } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

const Matches: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'discover' | 'connected'>('discover');
  const [profiles, setProfiles] = useState(initialMatches);

  // Filter lists
  const pendingProfiles = profiles.filter(p => p.status === 'pending');
  const connectedProfiles = profiles.filter(p => p.status === 'matched' || p.status === 'accepted');

  // Swipe Handlers
  const handleSwipe = (direction: 'left' | 'right', id: string) => {
    setProfiles(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: direction === 'right' ? 'accepted' : 'rejected' };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto h-full flex flex-col">
      {/* Tab Switcher */}
      <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-zinc-100 flex relative">
        <button
          onClick={() => setActiveTab('discover')}
          className={`flex-1 py-3 rounded-[1.5rem] font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 z-10 ${
            activeTab === 'discover' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'
          }`}
        >
          <Layers size={14} /> DISCOVER
        </button>
        <button
          onClick={() => setActiveTab('connected')}
          className={`flex-1 py-3 rounded-[1.5rem] font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 z-10 ${
            activeTab === 'connected' ? 'bg-blue-600 text-white shadow-md' : 'text-zinc-500 hover:bg-zinc-50'
          }`}
        >
          <MessageSquare size={14} /> CONNECTED
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative min-h-[500px]">
        {activeTab === 'discover' ? (
          <div className="h-full flex flex-col justify-center">
             <AnimatePresence>
              {pendingProfiles.length > 0 ? (
                 pendingProfiles.map((profile, index) => {
                   // Only render the top 2 cards for performance, but map all to maintain structure
                   const isTop = index === 0;
                   if (index > 1) return null;
                   
                   return (
                     <SwipeCard 
                       key={profile.id} 
                       profile={profile} 
                       onSwipe={handleSwipe}
                       isTop={isTop}
                     />
                   );
                 }).reverse() // Reverse to make index 0 on top visually if we were stacking, but we want array[0] to be active. 
                 // Actually for stacking z-index, we usually render reverse order so first element is on top. 
                 // Let's keep it simple: Map normally, but use z-index.
               ) : (
                 <div className="text-center py-20 bg-white rounded-[2.5rem] border border-zinc-100 h-[500px] flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                      <RefreshCw size={32} className="text-zinc-300" />
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 mb-2">You've seen everyone!</h3>
                    <p className="text-zinc-500 font-mono text-xs mb-6">Check back later for more matches.</p>
                    <button onClick={() => setProfiles(initialMatches)} className="px-6 py-3 bg-zinc-100 text-zinc-900 rounded-full font-mono font-bold text-xs hover:bg-zinc-200">
                      RESET DEMO
                    </button>
                 </div>
               )}
             </AnimatePresence>
          </div>
        ) : (
          <div className="space-y-4">
             {connectedProfiles.length > 0 ? (
               connectedProfiles.map((match) => (
                <div key={match.id} className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-zinc-100 flex items-center gap-4 group hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img src={match.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-[1.2rem] object-cover bg-zinc-50" />
                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                        <div className="bg-blue-50 text-blue-600 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-blue-100">
                          {match.compatibility}%
                        </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-zinc-900 truncate">{match.anonymousId}</h3>
                      <div className="flex gap-1 mt-1">
                        {match.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[10px] bg-zinc-50 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-100 font-mono font-bold">{tag}</span>
                        ))}
                      </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/chat/${match.id}`)}
                    className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
               ))
             ) : (
               <div className="text-center py-20 text-zinc-400 font-mono text-sm">NO_CONNECTIONS_YET</div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

interface SwipeCardProps {
  profile: any;
  onSwipe: (dir: 'left' | 'right', id: string) => void;
  isTop: boolean;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, onSwipe, isTop }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  
  // Overlay Opacities
  const likeOpacity = useTransform(x, [20, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -150], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right', profile.id);
    } else if (info.offset.x < -threshold) {
      onSwipe('left', profile.id);
    }
  };

  if (!isTop) {
    return (
      <div className="absolute top-0 left-0 w-full h-[540px] bg-white rounded-[3rem] shadow-sm border border-zinc-100 p-2 scale-95 opacity-50 translate-y-4 -z-10">
         <div className="w-full h-full bg-zinc-100 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute top-0 left-0 w-full h-[540px] bg-white rounded-[3rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 cursor-grab active:cursor-grabbing p-2 touch-none z-20"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-900">
        <img 
          src={profile.avatarUrl} 
          alt="Profile" 
          className="w-full h-full object-cover pointer-events-none"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

        {/* Like/Nope Overlays */}
        <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 left-8 border-4 border-green-400 rounded-xl px-4 py-2 rotate-[-15deg] pointer-events-none">
          <span className="text-green-400 font-bold text-4xl font-mono uppercase tracking-widest">LIKE</span>
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 right-8 border-4 border-rose-500 rounded-xl px-4 py-2 rotate-[15deg] pointer-events-none">
          <span className="text-rose-500 font-bold text-4xl font-mono uppercase tracking-widest">NOPE</span>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
           <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold">{profile.anonymousId}</h2>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold border border-white/20">
                {profile.compatibility}% MATCH
              </div>
           </div>
           
           <div className="flex flex-wrap gap-2 mb-20">
              {profile.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-mono font-bold border border-white/10">
                  {tag}
                </span>
              ))}
           </div>
        </div>
        
        {/* Buttons Overlay (Actionable) */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 z-30 pointer-events-auto">
             <button 
               onClick={(e) => { e.stopPropagation(); onSwipe('left', profile.id); }}
               className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-lg hover:bg-rose-50 hover:scale-110 transition-all active:scale-95"
             >
               <X size={28} strokeWidth={3} />
             </button>
             <button 
               onClick={(e) => { e.stopPropagation(); onSwipe('right', profile.id); }}
               className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-500 hover:scale-110 transition-all active:scale-95"
             >
               <Heart size={28} fill="currentColor" />
             </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Matches;