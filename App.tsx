
import React, { useState, useEffect } from 'react';
import { LCGParameters, HullDobellAnalysis } from './types';
import { analyzeHullDobell } from './services/lcgEngine';
import ParameterInput from './components/ParameterInput';
import AnalysisPanel from './components/AnalysisPanel';
import Visualizer from './components/Visualizer';
import Header from './components/Header';

const App: React.FC = () => {
  const [params, setParams] = useState<LCGParameters>({
    a: 1664525,
    c: 1013904223,
    m: Math.pow(2, 32)
  });

  const [analysis, setAnalysis] = useState<HullDobellAnalysis | null>(null);

  const handleUpdateParams = (newParams: LCGParameters) => {
    setParams(newParams);
  };

  // Perform lightweight local analysis immediately
  useEffect(() => {
    const localAnalysis = analyzeHullDobell(params);
    setAnalysis(localAnalysis);
  }, [params]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Generator Parameters
              </h2>
              <ParameterInput params={params} onUpdate={handleUpdateParams} />
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-2 space-y-8">
            <AnalysisPanel 
              analysis={analysis} 
            />
            
            <Visualizer params={params} />
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-500 text-sm">
        <p>© 2024 LCG Visualization Lab. Computational mathematics made visual.</p>
      </footer>
    </div>
  );
};

export default App;
