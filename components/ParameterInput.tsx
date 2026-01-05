
import React from 'react';
import { LCGParameters } from '../types';

interface ParameterInputProps {
  params: LCGParameters;
  onUpdate: (params: LCGParameters) => void;
}

const ParameterInput: React.FC<ParameterInputProps> = ({ params, onUpdate }) => {
  const handleChange = (key: keyof LCGParameters, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      onUpdate({ ...params, [key]: numValue });
    }
  };

  const inputs = [
    { key: 'm', label: 'Modulus (m)', desc: 'The range [0, m-1]' },
    { key: 'a', label: 'Multiplier (a)', desc: '0 < a < m' },
    { key: 'c', label: 'Increment (c)', desc: '0 ≤ c < m' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
        <p className="text-xs text-indigo-400 mono mb-3">Xₙ₊₁ = (aXₙ + c) mod m</p>
        <p className="text-xs text-slate-500">Starting with X₀ = 1</p>
      </div>

      {inputs.map((input) => (
        <div key={input.key} className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-300">{input.label}</label>
          </div>
          <input
            type="number"
            value={params[input.key as keyof LCGParameters]}
            onChange={(e) => handleChange(input.key as keyof LCGParameters, e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mono"
          />
          <p className="text-[10px] text-slate-500 italic uppercase">{input.desc}</p>
        </div>
      ))}
      
      <div className="pt-2">
        <button 
          onClick={() => onUpdate({ a: 1103515245, c: 12345, m: Math.pow(2, 31) })}
          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-dotted"
        >
          Load ANSI C Constants
        </button>
      </div>
    </div>
  );
};

export default ParameterInput;
