import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pools } from '../services/mockData';
import { Users, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';

const Confessions: React.FC = () => {
  const navigate = useNavigate();

  // Configuration for the Bento Grid layout
  // Theme: Royal Blue (Lighter tone of blue)
  const gridConfig: Record<string, { 
    span: string; 
    bgClass: string;
    textClass: string;
    subtext: string;
    iconBgClass: string;
    hoverClass: string;
    buttonClass: string;
  }> = {
    'p1': { // Crypto
      span: 'md:col-span-2 md:row-span-2',
      bgClass: 'bg-blue-600', // Vibrant Blue
      textClass: 'text-white',
      subtext: 'VOLATILE_MARKETS',
      iconBgClass: 'bg-blue-500',
      hoverClass: 'hover:bg-blue-700',
      buttonClass: 'bg-blue-500 text-white'
    },
    'p2': { // Dating
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-[#E4E4E7]', // Zinc-200
      textClass: 'text-zinc-900',
      subtext: 'HEARTBREAK',
      iconBgClass: 'bg-white',
      hoverClass: 'hover:bg-[#D4D4D8]',
      buttonClass: 'bg-white text-zinc-900'
    },
    'p3': { // Life
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-white',
      textClass: 'text-zinc-900',
      subtext: 'REALITY',
      iconBgClass: 'bg-blue-50',
      hoverClass: 'hover:shadow-md hover:border-zinc-200',
      buttonClass: 'bg-zinc-100 text-zinc-900'
    },
    'p4': { // Campus
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-[#F4F4F5]', // Zinc-100
      textClass: 'text-zinc-900',
      subtext: 'ACADEMIA',
      iconBgClass: 'bg-white',
      hoverClass: 'hover:bg-[#E4E4E7]',
      buttonClass: 'bg-white text-zinc-900'
    },
    'p5': { // Work
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-blue-500', // Slightly lighter blue for secondary dark card
      textClass: 'text-white',
      subtext: 'CORPORATE',
      iconBgClass: 'bg-blue-400',
      hoverClass: 'hover:bg-blue-600',
      buttonClass: 'bg-blue-400 text-white'
    },
    'p6': { // General
      span: 'md:col-span-1 md:row-span-1',
      bgClass: 'bg-[#E4E4E7]', // Zinc-200
      textClass: 'text-zinc-900',
      subtext: 'EVERYTHING_ELSE',
      iconBgClass: 'bg-white',
      hoverClass: 'hover:bg-[#D4D4D8]',
      buttonClass: 'bg-white text-zinc-900'
    }
  };

  const totalSecrets = pools.reduce((acc, curr) => acc + curr.confessionCount, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Minimal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2 text-zinc-900">Confessions</h1>
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live Feed &bull; {totalSecrets.toLocaleString()} Secrets
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm text-xs font-mono font-bold flex items-center gap-2 text-zinc-900 border border-zinc-100">
               <Sparkles size={12} className="text-blue-500" /> TRENDING
            </div>
             <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer">
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
            iconBgClass: 'bg-zinc-50',
            subtext: 'POOL',
            hoverClass: 'hover:shadow-md',
            buttonClass: 'bg-zinc-100 text-zinc-900'
          };
          
          return (
            <div 
              key={pool.id}
              onClick={() => navigate(`/pool/${pool.id}`)}
              className={`
                group relative rounded-[2.5rem] p-8 cursor-pointer flex flex-col justify-between transition-all duration-300 border border-transparent
                ${config.span}
                ${config.bgClass}
                ${config.textClass}
                ${config.hoverClass}
                ${config.bgClass === 'bg-white' ? 'shadow-sm border-zinc-100' : ''}
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
                  ${config.buttonClass}
                `}>
                  <ArrowUpRight size={20} />
                </div>
              </div>

              {/* Bottom Row */}
              <div>
                 <span className={`text-[10px] font-mono font-bold mb-3 block tracking-widest opacity-60 uppercase`}>
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