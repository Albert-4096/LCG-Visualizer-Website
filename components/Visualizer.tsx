import React, { useRef, useEffect, useState } from 'react';
import { LCGParameters } from '../types';

interface VisualizerProps {
  params: LCGParameters;
}

const Visualizer: React.FC<VisualizerProps> = ({ params }) => {
  const [resolution, setResolution] = useState(256);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = async () => {
    setLoading(true);
    setError(null);
    try {
        const queryParams = new URLSearchParams({
            a: params.a.toString(),
            c: params.c.toString(),
            m: params.m.toString(),
            size: resolution.toString()
        });
        
        const response = await fetch(`/api/generate?${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to generate image');
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        
        // Clean up previous URL to avoid memory leaks
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
        
        setImageUrl(url);
    } catch (err) {
        console.error(err);
        setError('Failed to load visualization');
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
    return () => {
        if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, resolution]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Grayscale Visualization
          </h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Remote Python Generation</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 uppercase">Res:</label>
          <select 
            value={resolution}
            onChange={(e) => setResolution(Number(e.target.value))}
            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value={128}>128x128</option>
            <option value={256}>256x256</option>
            <option value={512}>512x512</option>
          </select>
          <button 
            onClick={fetchImage}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Re-Generate'}
          </button>
        </div>
      </div>

      <div className="relative group rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-square flex items-center justify-center p-2">
        {loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 z-10">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
             </div>
        )}
        
        {error ? (
            <div className="text-red-400 text-sm p-4 text-center">
                {error}
            </div>
        ) : (
            imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="LCG Visualization" 
                  className="w-full h-full object-contain image-render-pixelated shadow-2xl"
                  style={{ imageRendering: 'pixelated' }}
                />
            )
        )}
        
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-full backdrop-blur-sm">
             <span className="text-xs text-white font-medium flex items-center gap-2">
               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
               Visualizing Pattern Entropy
             </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
           <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Sequence length</span>
           <span className="text-sm font-mono text-indigo-300">{(resolution * resolution).toLocaleString()} points</span>
        </div>
        <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
           <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Color Depth</span>
           <span className="text-sm font-mono text-indigo-300">8-bit Grayscale</span>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;

