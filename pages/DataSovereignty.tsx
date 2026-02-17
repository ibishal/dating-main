import React from 'react';
import { Download, Trash2, ExternalLink, HardDrive, FileJson } from 'lucide-react';

const DataSovereignty: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100">
         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <HardDrive size={24} />
         </div>
        <h1 className="text-3xl font-bold mb-4 text-zinc-900">Your Data, <br/>Your Rules.</h1>
        <p className="text-zinc-500 font-mono text-sm leading-relaxed max-w-md">
          Export your encrypted history or purge it from the TEE nodes permanently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Export Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100 flex flex-col justify-between h-64 group hover:shadow-md transition-shadow">
          <div>
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-blue-600">
              <FileJson size={20} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-zinc-900">Export JSON</h3>
            <p className="text-xs text-zinc-500 font-mono leading-relaxed">
              Download your full history including keys and chat logs.
            </p>
          </div>
          <button className="w-full py-3 border-2 border-blue-50 bg-blue-50 rounded-full font-mono font-bold text-xs text-blue-700 hover:bg-blue-100 transition-colors">
            DOWNLOAD
          </button>
        </div>

        {/* Delete Card */}
        <div className="bg-rose-50 p-6 rounded-[2.5rem] border-2 border-transparent hover:border-rose-100 flex flex-col justify-between h-64 transition-colors">
          <div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 text-rose-500">
              <Trash2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-rose-900 mb-2">Nuclear Option</h3>
            <p className="text-xs text-rose-700/60 font-mono leading-relaxed">
              Permanently burn your identity from the protocol.
            </p>
          </div>
          <button className="w-full py-3 bg-rose-200 text-rose-900 rounded-full font-mono font-bold text-xs hover:bg-rose-300 transition-colors shadow-sm">
            DELETE_ACCOUNT
          </button>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-zinc-100 text-zinc-900 p-8 rounded-[2.5rem] shadow-sm flex items-center justify-between group cursor-pointer border border-zinc-200">
        <div>
           <h3 className="font-bold text-lg mb-1">On-Chain Audit</h3>
           <p className="font-mono text-xs text-zinc-500">Verify integrity on NearBlocks</p>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-zinc-900 shadow-sm group-hover:scale-110 transition-transform">
           <ExternalLink size={18} />
        </div>
      </div>
    </div>
  );
};

export default DataSovereignty;