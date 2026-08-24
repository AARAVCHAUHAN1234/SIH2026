import React from 'react';
import { Scan } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="w-full bg-[#080B12] border-b border-[#1E2836] px-4 md:px-8 py-6 md:py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Big Headline & Context */}
        <div className="lg:col-span-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#121A28] border border-[#1E2836] text-[11px] font-mono text-text-dim">
            <Scan className="w-3.5 h-3.5 text-amber" />
            <span>STAGE 1 SCANNER TERMINAL</span>
            <span className="text-line">|</span>
            <span className="text-teal">LOCAL OCR ENGINE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#DCE3EC] leading-[1.1]">
            Extract identity.{' '}
            <span className="text-amber">Instantly.</span>
          </h1>

          <p className="text-text-dim text-sm md:text-base max-w-2xl font-sans leading-relaxed">
            High-speed browser-isolated document name extraction console. Stream identity documents into the neural classification pipeline for real-time extraction.
          </p>
        </div>

        {/* Right Column: Ambient Radar / Grid Lock Panel */}
        <div className="lg:col-span-4">
          <div className="relative bg-[#0E141F] border border-[#1E2836] rounded-lg p-3.5 overflow-hidden shadow-inner">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

            {/* Radar / Lock Status Header */}
            <div className="flex items-center justify-between font-mono text-[11px] text-text-dim mb-3 relative z-10 border-b border-[#161F2C] pb-2">
              <div className="flex items-center gap-1.5 text-amber font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse"></span>
                <span>NAME_FIELD.LOCK</span>
              </div>
              <div className="text-teal font-mono">OCR READY</div>
            </div>

            {/* Visualizer Frame with Sweeping Line */}
            <div className="relative h-20 bg-[#080B12] border border-[#161F2C] rounded flex items-center justify-center overflow-hidden">
              {/* Looping scan line */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber to-transparent animate-hero-scan"></div>
              
              {/* Radar Grid Graphic */}
              <div className="w-full h-full flex items-center justify-between px-6 font-mono text-[10px] text-text-faint select-none">
                <div>
                  <div>BOUNDS: [180, 128]</div>
                  <div>FPS: 60.0</div>
                </div>
                <div className="w-10 h-10 border border-[#1E2836] rounded-full flex items-center justify-center relative">
                  <div className="w-6 h-6 border border-amber/30 rounded-full animate-ping"></div>
                  <div className="w-1.5 h-1.5 bg-amber rounded-full"></div>
                </div>
                <div className="text-right">
                  <div>CONF: 98.7%</div>
                  <div>LATENCY: 24ms</div>
                </div>
              </div>
            </div>

            {/* Footer mono caption */}
            <div className="flex items-center justify-between font-mono text-[10px] text-text-faint mt-2.5 relative z-10">
              <span>MODEL: TESSERACT_CUSTOM_V2</span>
              <span>ISOLATION: 100% LOCAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
