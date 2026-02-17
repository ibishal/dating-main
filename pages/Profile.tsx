import React, { useState } from 'react';
import { currentUser } from '../services/mockData';
import { Camera, Save, User as UserIcon, QrCode } from 'lucide-react';

const Profile: React.FC = () => {
  const [bio, setBio] = useState(currentUser.bio || '');
  const [name, setName] = useState(currentUser.username);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 text-center">
        <div className="inline-block relative mb-6">
           <img 
              src={currentUser.avatarUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-[2rem] border-4 border-blue-50 object-cover shadow-inner"
            />
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white border border-zinc-100 text-zinc-900 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-sm">
               <Camera size={16} />
            </button>
        </div>
        <h1 className="text-2xl font-bold mb-1 text-zinc-900">{name}</h1>
        <div className="inline-block px-3 py-1 bg-blue-50 rounded-full text-[10px] font-mono font-bold text-blue-700 border border-blue-100">
           ID: {currentUser.id}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 space-y-6">
         <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg text-zinc-900">Details</h2>
            <QrCode size={20} className="text-zinc-300" />
         </div>
         
         <div className="space-y-4">
            <div>
               <label className="block text-xs font-mono font-bold text-zinc-400 mb-2 pl-4">DISPLAY_NAME</label>
               <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-zinc-50 rounded-[1.5rem] font-bold text-zinc-900 border-2 border-transparent focus:border-blue-200 outline-none transition-colors"
               />
            </div>
            <div>
               <label className="block text-xs font-mono font-bold text-zinc-400 mb-2 pl-4">BIO</label>
               <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-6 py-4 bg-zinc-50 rounded-[1.5rem] font-medium text-zinc-900 border-2 border-transparent focus:border-blue-200 outline-none transition-colors resize-none h-32"
               />
            </div>
         </div>

         <button className="w-full py-4 bg-blue-600 text-white border border-blue-600 rounded-[1.5rem] font-mono font-bold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            SAVE_CHANGES <Save size={16} />
         </button>
      </div>
    </div>
  );
};

export default Profile;