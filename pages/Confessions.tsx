import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pools } from '../services/mockData';
import { Users, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

const Confessions: React.FC = () => {
  const navigate = useNavigate();

  // Configuration for the Bento Grid layout
  // We map specific pool IDs to visual styles (spans, colors, themes)
  const gridConfig: Record<string, { 
    span: string; 
    bgClass: string;
    textClass: string;
    subtext: string;
    iconBgClass: string;
    hoverClass: string;
  }> = {
    'p1': { // Crypto
      span: 'md:col-span-2 md:row-span-2',
      bgClass: 'bg-black',
      textClass: 'text-white',
      subtext: 'VOLATILE_MARKETS',
      iconBgClass: 'bg-zinc-800',
      hoverClass: 'hover:bg-zinc-900'
    },
    'p2': { // Dating
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-white',
      textClass: 'text-zinc-900',
      subtext: 'HEARTBREAK',
      iconBgClass: 'bg-zinc-100',
      hoverClass: 'hover:bg-zinc-50'
    },
    'p3': { // Life
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-zinc-200',
      textClass: 'text-zinc-900',
      subtext: 'REALITY',
      iconBgClass: 'bg-white',
      hoverClass: 'hover:bg-zinc-300'
    },
    'p4': { // Campus - Changed to row-span-1 to match others in the bottom row
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-white',
      textClass: 'text-zinc-900',
      subtext: 'ACADEMIA',
      iconBgClass: 'bg-zinc-100',
      hoverClass: 'hover:bg-zinc-50'
    },
    'p5': { // Work
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-zinc-800',
      textClass: 'text-white',
      subtext: 'CORPORATE',
      iconBgClass: 'bg-zinc-700',
      hoverClass: 'hover:bg-zinc-700'
    },
    'p6': { // General
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-white',
      textClass: 'text-zinc-900',
      subtext: 'EVERYTHING_ELSE',
      iconBgClass: 'bg-zinc-100',
      hoverClass: 'hover:bg-zinc-50'
    }
  };

  const totalSecrets = pools.reduce((acc, curr) => acc + curr.confessionCount, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">Confessions</h1>
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Feed &bull; {totalSecrets.toLocaleString()} Secrets
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm text-xs font-mono font-bold flex items-center gap-2">
               <Sparkles size={12} /> TRENDING
            </div>
             <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center">
               <ArrowUpRight size={16} />
            </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-4">
        {pools.map((pool) => {
          const config = gridConfig[pool.id] || { 
            span: 'col-span-1', 
            bgClass: 'bg-white', 
            textClass: 'text-zinc-900', 
            iconBgClass: 'bg-zinc-100',
            subtext: 'POOL',
            hoverClass: 'hover:bg-zinc-50'
          };
          
          return (
            <div 
              key={pool.id}
              onClick={() => navigate(`/pool/${pool.id}`)}
              className={`
                group relative rounded-[2.5rem] p-8 cursor-pointer flex flex-col justify-between shadow-sm transition-all duration-300
                ${config.span}
                ${config.bgClass}
                ${config.textClass}
                ${config.hoverClass}
              `}
            >
              {/* Top Row */}
              <div className="flex justify-between items-start">
                <div className={`
                  w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110
                  ${config.iconBgClass}
                `}>
                  {pool.emoji}
                </div>
                
                <div className={`
                  opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 w-10 h-10 rounded-full flex items-center justify-center
                  ${config.bgClass === 'bg-black' ? 'bg-white text-black' : 'bg-black text-white'}
                `}>
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Bottom Row */}
              <div>
                 <span className={`text-[10px] font-mono font-bold mb-3 block tracking-widest opacity-60`}>
                   {config.subtext}
                 </span>
                <h3 className="text-3xl font-bold leading-none tracking-tight mb-4">
                  {pool.name}
                </h3>
                
                <div className="flex items-center gap-4 opacity-80">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                     <Users size={14} />
                     {pool.memberCount < 1000 ? pool.memberCount : `${(pool.memberCount / 1000).toFixed(1)}k`}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
                     <MessageCircle size={14} />
                     {pool.confessionCount < 1000 ? pool.confessionCount : `${(pool.confessionCount / 1000).toFixed(1)}k`}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Confessions;