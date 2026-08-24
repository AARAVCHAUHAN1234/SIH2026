import React from 'react';
import { Network } from 'lucide-react';

interface HeaderProps {
  onOpenPipelineModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPipelineModal }) => {
  return (
    <header className="w-full bg-[#0E141F] border-b border-[#1E2836] px-4 md:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Logo & Wordmark */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-9 h-9 rounded bg-[#080B12] border border-[#1E2836] flex items-center justify-center font-mono font-bold text-amber text-sm tracking-wider shadow-inner">
          AI
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-[#DCE3EC]">
              BORDER<span className="text-amber">AI</span>
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase bg-[#161F2C] text-text-dim rounded border border-[#1E2836]">
              v1.0.4 SCANNER
            </span>
          </div>
          <p className="text-xs text-text-dim font-sans hidden sm:block">
            Identity Verification Transit Network — Stage 1: Name Extraction
          </p>
        </div>
      </div>

      {/* Right: Actions & Demo Pill */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Pipeline Architecture Button */}
        <button
          onClick={onOpenPipelineModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono text-text-dim hover:text-text bg-[#121A28] border border-[#1E2836] hover:border-amber transition-colors"
          title="View full 12-stage pipeline visualizer"
        >
          <Network className="w-3.5 h-3.5 text-amber" />
          <span className="hidden md:inline">SYSTEM CONTEXT</span>
        </button>

        {/* Demo Mode Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161F2C] border border-[#1E2836] font-mono text-xs text-amber font-medium">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse"></span>
          <span>DEMO MODE</span>
        </div>
      </div>
    </header>
  );
};
