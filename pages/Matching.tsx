import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, Filter } from 'lucide-react';

const Matching: React.FC = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);

  const availableInterests = ['Technology', 'Arts', 'Sports', 'Music', 'Travel', 'Gaming', 'Crypto', 'Science', 'Cooking', 'Fitness'];
  const availableValues = ['Honesty', 'Loyalty', 'Adventure', 'Creativity', 'Humor', 'Ambition', 'Kindness', 'Intelligence', 'Independence', 'Empathy'];

  const toggleSelection = (item: string, current: string[], setter: (i: string[]) => void) => {
    if (current.includes(item)) {
      setter(current.filter(i => i !== item));
    } else {
      setter([...current, item]);
    }
  };

  const handleSubmit = () => {
    navigate('/matches');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-[2.5rem] text-center shadow-sm border border-zinc-100">
        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
           <Filter size={24} />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-zinc-900">Discovery</h1>
        <p className="text-zinc-500 font-mono text-xs">
          Set your preferences. We verify matches inside TEEs.
        </p>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 p-2">
        <div className="p-8 pb-4">
          <h2 className="text-sm font-mono font-bold text-zinc-400 mb-6 flex items-center gap-2">
            <Sparkles size={16} /> INTERESTS
          </h2>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map(item => (
              <button
                key={item}
                onClick={() => toggleSelection(item, interests, setInterests)}
                className={`px-5 py-3 rounded-full text-sm font-bold transition-all border ${
                  interests.includes(item)
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-50 mx-auto max-w-[90%]"></div>

        <div className="p-8 pb-4">
          <h2 className="text-sm font-mono font-bold text-zinc-400 mb-6 flex items-center gap-2">
            <Shield size={16} /> VALUES
          </h2>
          <div className="flex flex-wrap gap-2">
            {availableValues.map(item => (
              <button
                key={item}
                onClick={() => toggleSelection(item, values, setValues)}
                className={`px-5 py-3 rounded-full text-sm font-bold transition-all border ${
                  values.includes(item)
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-50 mx-auto max-w-[90%]"></div>

        <div className="p-8">
           <div className="flex justify-between items-center mb-6">
             <h2 className="text-sm font-mono font-bold text-zinc-400">AGE_RANGE</h2>
             <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">18 - 99</span>
           </div>
           <input type="range" className="w-full accent-blue-600 cursor-pointer h-2 bg-blue-50 rounded-lg appearance-none" />
        </div>

        <div className="p-2">
          <button 
            onClick={handleSubmit}
            className="w-full py-5 bg-blue-600 text-white font-mono font-bold text-sm rounded-[2rem] hover:bg-blue-700 transition-all border border-blue-600 shadow-sm shadow-blue-100"
          >
            START_MATCHING
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matching;