import React, { useState } from 'react';
import { currentUser } from '../services/mockData';
import { Camera, Save, User as UserIcon, QrCode } from 'lucide-react';

const Profile: React.FC = () => {
  const [bio, setBio] = useState(currentUser.bio || '');
  const [name, setName] = useState(currentUser.username);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm text-center">
        <div className="inline-block relative mb-6">
           <img 
              src={currentUser.avatarUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-[2rem] border-4 border-zinc-50 object-cover shadow-inner"
            />
            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
               <Camera size={16} />
            </button>
        </div>
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        <div className="inline-block px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-mono font-bold text-zinc-500">
           ID: {currentUser.id}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm space-y-6">
         <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Details</h2>
            <QrCode size={20} className="text-zinc-400" />
         </div>
         
         <div className="space-y-4">
            <div>
               <label className="block text-xs font-mono font-bold text-zinc-400 mb-2 pl-4">DISPLAY_NAME</label>
               <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-zinc-50 rounded-[1.5rem] font-bold text-zinc-900 border-2 border-transparent focus:border-black outline-none transition-colors"
               />
            </div>
            <div>
               <label className="block text-xs font-mono font-bold text-zinc-400 mb-2 pl-4">BIO</label>
               <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-6 py-4 bg-zinc-50 rounded-[1.5rem] font-medium text-zinc-900 border-2 border-transparent focus:border-black outline-none transition-colors resize-none h-32"
               />
            </div>
         </div>

         <button className="w-full py-4 bg-black text-white rounded-[1.5rem] font-mono font-bold text-sm hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
            SAVE_CHANGES <Save size={16} />
         </button>
      </div>
    </div>
  );
};

export default Profile;