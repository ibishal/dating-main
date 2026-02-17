import React from 'react';
import { Download, Trash2, ExternalLink, HardDrive, FileJson } from 'lucide-react';

const DataSovereignty: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
         <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
            <HardDrive size={24} />
         </div>
        <h1 className="text-3xl font-bold mb-4">Your Data, <br/>Your Rules.</h1>
        <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-md">
          Export your encrypted history or purge it from the TEE nodes permanently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm flex flex-col justify-between h-64 group hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center mb-4 text-zinc-900">
              <FileJson size={20} />
            </div>
            <h3 className="text-lg font-bold mb-2">Export JSON</h3>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              Download your full history including keys and chat logs.
            </p>
          </div>
          <button className="w-full py-3 border-2 border-zinc-100 rounded-full font-mono font-bold text-xs hover:bg-black hover:text-white hover:border-black transition-colors">
            DOWNLOAD
          </button>
        </div>

        {/* Delete Card */}
        <div className="bg-red-50 p-6 rounded-[2.5rem] border-2 border-transparent hover:border-red-100 flex flex-col justify-between h-64 transition-colors">
          <div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 text-red-500">
              <Trash2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Nuclear Option</h3>
            <p className="text-xs text-red-700/60 font-mono leading-relaxed">
              Permanently burn your identity from the protocol.
            </p>
          </div>
          <button className="w-full py-3 bg-red-500 text-white rounded-full font-mono font-bold text-xs hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
            DELETE_ACCOUNT
          </button>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-black text-white p-8 rounded-[2.5rem] shadow-sm flex items-center justify-between group cursor-pointer">
        <div>
           <h3 className="font-bold text-lg mb-1">On-Chain Audit</h3>
           <p className="font-mono text-xs text-zinc-500">Verify integrity on NearBlocks</p>
        </div>
        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
           <ExternalLink size={18} />
        </div>
      </div>
    </div>
  );
};

export default DataSovereignty;