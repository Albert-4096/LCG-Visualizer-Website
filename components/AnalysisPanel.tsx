
import React from 'react';
import { HullDobellAnalysis } from '../types';

interface AnalysisPanelProps {
  analysis: HullDobellAnalysis | null;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className={`px-6 py-4 flex items-center justify-between ${analysis.isFullPeriod ? 'bg-emerald-900/20 border-b border-emerald-900/30' : 'bg-amber-900/20 border-b border-amber-900/30'}`}>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <svg className={`w-5 h-5 ${analysis.isFullPeriod ? 'text-emerald-400' : 'text-amber-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Hull-Dobell Theorem Analysis
          </h2>
          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${analysis.isFullPeriod ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
            {analysis.isFullPeriod ? 'Full Period' : 'Partial Period'}
          </span>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ConditionItem 
              label="GCD(c, m) = 1" 
              status={analysis.conditions.relativelyPrime} 
              desc="c & m are relatively prime"
            />
            <ConditionItem 
              label="a-1 divisible by Prime Factors" 
              status={analysis.conditions.primeFactorsDivisible} 
              desc="a-1 divisible by all factors of m"
            />
            <ConditionItem 
              label="Divisible by 4 Rule" 
              status={analysis.conditions.divisibleBy4} 
              desc="a-1 divisible by 4 if 4 divides m"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{analysis.recommendation}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConditionItem: React.FC<{ label: string; status: boolean; desc: string }> = ({ label, status, desc }) => (
  <div className={`p-3 rounded-lg border flex flex-col gap-1 transition-all ${status ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
    <div className="flex items-center justify-between">
      <span className="text-[10px] font-bold text-slate-500 uppercase">{label}</span>
      {status ? (
        <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )}
    </div>
    <span className="text-xs font-medium text-slate-200 truncate">{desc}</span>
  </div>
);

export default AnalysisPanel;
