import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Copy, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { LogStep, ScanStatus, ExtractionResult } from '../types/scanner';

interface AnalysisConsolePanelProps {
  steps: LogStep[];
  scanStatus: ScanStatus;
  result: ExtractionResult | null;
  errorMessage: string | null;
  onReset: () => void;
}

export const AnalysisConsolePanel: React.FC<AnalysisConsolePanelProps> = ({
  steps,
  scanStatus,
  result,
  errorMessage,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const [displayedConfidence, setDisplayedConfidence] = useState(0);

  // Confidence count-up ticker animation
  useEffect(() => {
    if (scanStatus === 'success' && result) {
      setDisplayedConfidence(0);
      const target = result.confidence;
      const duration = 1000; // ms
      const stepsCount = 30;
      const increment = target / stepsCount;
      const stepTime = duration / stepsCount;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayedConfidence(target);
          clearInterval(timer);
        } else {
          setDisplayedConfidence(Number(current.toFixed(1)));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [scanStatus, result]);

  const handleCopyName = () => {
    if (result?.extractedName) {
      navigator.clipboard.writeText(result.extractedName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStepIcon = (step: LogStep) => {
    if (step.status === 'done') {
      return <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />;
    }
    if (step.status === 'active') {
      return (
        <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
          <span className="absolute w-4 h-4 rounded-full bg-amber/30 animate-ping"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber"></span>
        </div>
      );
    }
    return <div className="w-3.5 h-3.5 rounded-full border border-[#1E2836] shrink-0" />;
  };

  const isAwaitingInput = steps.every((s) => s.status === 'idle');

  return (
    <div className="bg-[#0E141F] border border-[#1E2836] rounded-lg p-5 flex flex-col justify-between min-h-[460px]">
      {/* Panel Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#161F2C] mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-amber font-semibold tracking-wider">PANEL 02</span>
            <span className="text-[#1E2836] font-mono">/</span>
            <h2 className="font-display text-sm font-bold text-[#DCE3EC]">ANALYSIS CONSOLE</h2>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-dim">
            <Terminal className="w-3.5 h-3.5 text-amber" />
            <span>NEURAL OCR PROCESSOR</span>
          </div>
        </div>

        {/* Console Log Area */}
        {isAwaitingInput ? (
          /* Awaiting Input Empty State */
          <div className="min-h-[220px] flex flex-col items-center justify-center border border-dashed border-[#1E2836] rounded-lg bg-[#080B12] p-8 text-center">
            <div className="w-10 h-10 rounded bg-[#121A28] border border-[#1E2836] flex items-center justify-center text-text-faint mb-3 font-mono">
              &gt;_
            </div>
            <p className="font-mono text-xs text-text-dim uppercase tracking-widest font-semibold mb-1">
              AWAITING INPUT
            </p>
            <p className="font-sans text-xs text-text-faint max-w-xs">
              Upload a document or click "Try demo document" to initiate real-time name extraction.
            </p>
          </div>
        ) : (
          /* Step-by-Step Vertical Log */
          <div className="space-y-3 font-mono text-xs bg-[#080B12] border border-[#1E2836] rounded-lg p-4 mb-4 shadow-inner">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className={`flex items-start justify-between p-2.5 rounded transition-all border ${
                  step.status === 'active'
                    ? 'bg-amber/5 border-amber/30 text-amber'
                    : step.status === 'done'
                    ? 'bg-[#121A28]/60 border-[#1E2836] text-text'
                    : 'bg-transparent border-transparent text-text-faint opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getStepIcon(step)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-faint font-mono">0{idx + 1}.</span>
                      <span className="font-semibold tracking-wide uppercase">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-text-dim font-sans mt-0.5">{step.subtext}</p>
                  </div>
                </div>

                {step.timestamp && (
                  <span className="text-[10px] text-text-faint font-mono shrink-0 ml-2">
                    {step.timestamp}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Result or Error State Panel */}
      {scanStatus === 'success' && result && (
        <div className="bg-[#121A28] border border-teal/40 rounded-lg p-4 space-y-3 transition-all animate-fadeIn">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-teal tracking-widest uppercase flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              ✓ EXTRACTED NAME
            </span>
            <span className="text-[10px] font-mono text-text-faint">
              STAMP: {result.timestamp}
            </span>
          </div>

          {/* Large Mono Name Readout */}
          <div className="bg-[#080B12] border border-[#1E2836] rounded p-3 text-center">
            <div className="font-mono text-2xl md:text-3xl font-bold text-teal tracking-wider select-all break-words">
              {result.extractedName}
            </div>
          </div>

          {/* Confidence Bar & Percentage */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between font-mono text-[11px] text-text-dim">
              <span>OCR CONFIDENCE SCORE:</span>
              <span className="text-teal font-bold">{displayedConfidence.toFixed(1)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#080B12] rounded-full overflow-hidden border border-[#1E2836]">
              <div
                className="h-full bg-teal transition-all duration-1000 ease-out"
                style={{ width: `${displayedConfidence}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-[#161F2C]">
            <button
              onClick={handleCopyName}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#080B12] border border-[#1E2836] hover:border-teal text-text-dim hover:text-teal font-mono text-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal" />
                  <span className="text-teal font-bold">NAME COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>COPY NAME</span>
                </>
              )}
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#080B12] border border-[#1E2836] hover:border-amber text-text-dim hover:text-text font-mono text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SCAN ANOTHER</span>
            </button>
          </div>
        </div>
      )}

      {/* Error State: NAME NOT DETECTED */}
      {scanStatus === 'error_no_name' && (
        <div className="bg-[#121A28] border border-rose/40 rounded-lg p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-rose font-bold tracking-wider">
            <XCircle className="w-5 h-5" />
            <span>NAME NOT DETECTED</span>
          </div>

          <p className="text-text-dim font-sans text-xs leading-relaxed">
            {errorMessage || 'Please upload a clearer image of the document.'}
          </p>

          <div className="pt-2 border-t border-[#161F2C] flex justify-end">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-rose/10 border border-rose/30 text-rose hover:bg-rose/20 font-mono text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>TRY AGAIN</span>
            </button>
          </div>
        </div>
      )}

      {/* Error State: LOW CONFIDENCE */}
      {scanStatus === 'error_low_confidence' && (
        <div className="bg-[#121A28] border border-amber/40 rounded-lg p-4 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber font-bold tracking-wider">
            <AlertTriangle className="w-5 h-5" />
            <span>LOW CONFIDENCE (CONF &lt; 60%)</span>
          </div>

          <p className="text-text-dim font-sans text-xs leading-relaxed">
            Please retake or upload a higher-quality document image.
          </p>

          <div className="pt-2 border-t border-[#161F2C] flex justify-end">
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber/10 border border-amber/30 text-amber hover:bg-amber/20 font-mono text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>SCAN ANOTHER DOCUMENT</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
