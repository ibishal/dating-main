import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Ghost, Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleConnect = () => {
    setTimeout(() => {
      navigate('/confessions');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans text-zinc-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="bg-white pl-2 pr-6 py-2 rounded-full shadow-sm flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
              <Ghost size={16} />
            </div>
            <span className="font-mono font-bold tracking-tight">NearClaw</span>
          </div>
          <button 
            onClick={handleConnect}
            className="bg-black text-white px-6 py-3 rounded-full font-mono text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-black/10"
          >
            Connect_Wallet
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-mono font-bold mb-8 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                TEE SECURED NETWORK
              </div>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                ANONYMOUS<br/>
                SOCIAL<br/>
                LAYER.
              </h1>
              <p className="text-xl font-mono text-zinc-500 max-w-lg leading-relaxed">
                The first decentralized platform where your identity is mathematically hidden. Confess, match, and chat inside the Enclave.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 items-start">
               <button 
                onClick={handleConnect}
                className="group bg-white px-8 py-8 rounded-[2.5rem] text-left hover:shadow-xl transition-all duration-300 w-64 md:w-72"
              >
                <div className="flex justify-between items-start mb-12">
                   <div className="p-3 bg-zinc-100 rounded-2xl group-hover:bg-black group-hover:text-white transition-colors">
                     <ArrowRight size={24} />
                   </div>
                </div>
                <span className="font-mono font-bold text-lg block">Start App</span>
                <span className="text-zinc-400 text-sm">Join the network</span>
              </button>
            </div>
          </div>

          {/* Grayscale Carousel Aesthetic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
             {/* Card 1: Micro UI Style Info */}
             <div className="bg-white rounded-[2.5rem] p-8 shadow-sm h-96 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <span className="font-mono text-xs font-bold text-zinc-400">01. PRIVACY</span>
                   <Shield size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-3xl mb-4">Zero Knowledge.</h3>
                  <p className="text-zinc-500 font-mono text-sm">
                    We use Trusted Execution Environments (TEEs) to ensure even nodes can't see your data.
                  </p>
                </div>
                <div className="flex gap-2">
                   <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-black rounded-full"></div>
                   </div>
                </div>
             </div>

             {/* Card 2: Visual Aesthetic (Grayscale Image) */}
             <div className="md:col-span-2 bg-zinc-900 rounded-[2.5rem] h-96 overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1496348323715-c11f0fc6afed?q=80&w=2692&auto=format&fit=crop&saturation=-100" 
                  alt="Abstract Architecture" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                />
                <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                   <h3 className="font-mono text-sm mb-2 opacity-70">CONFESSION_POOLS</h3>
                   <p className="text-3xl md:text-5xl font-bold leading-tight">
                     Say what you can't say anywhere else.
                   </p>
                </div>
             </div>
          </div>

          {/* Feature List / Micro UI Style */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { label: 'TEE Anonymity', status: 'ACTIVE' },
               { label: 'Confidential Match', status: 'BETA' },
               { label: 'E2E Encryption', status: 'ACTIVE' },
               { label: 'Data Sovereignty', status: 'ACTIVE' }
             ].map((feat, i) => (
               <div key={i} className="bg-white rounded-3xl p-6 flex flex-col justify-between h-40 hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                     <div className="w-2 h-2 bg-black rounded-full"></div>
                     <span className="text-[10px] font-mono font-bold bg-zinc-100 px-2 py-1 rounded-full">{feat.status}</span>
                  </div>
                  <span className="font-bold text-lg leading-tight">{feat.label}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;