import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080B12] border-t border-[#1E2836] py-6 px-4 text-center font-mono text-xs text-text-faint space-y-1.5">
      <div className="flex items-center justify-center gap-1.5 text-text-dim">
        <Lock className="w-3.5 h-3.5 text-teal" />
        <span>Your documents are processed locally in your browser. No data is sent to any server.</span>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-text-faint text-[11px]">
        <ShieldAlert className="w-3 h-3 text-amber/80" />
        <span>This is a prototype for demo purposes only. Do not use for real identity verification.</span>
      </div>
    </footer>
  );
};
