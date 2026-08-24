import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, Sparkles } from 'lucide-react';
import { DEMO_PRESETS } from '../utils/syntheticDocs';
import { ScanStatus } from '../types/scanner';

interface DocumentInputPanelProps {
  currentImage: string | null;
  scanStatus: ScanStatus;
  isScanning: boolean;
  selectedPresetId: string | null;
  isDemoDoc: boolean;
  onSelectFile: (file: File) => void;
  onSelectPreset: (presetId: string) => void;
  onReset: () => void;
}

export const DocumentInputPanel: React.FC<DocumentInputPanelProps> = ({
  currentImage,
  scanStatus,
  isScanning,
  selectedPresetId,
  isDemoDoc,
  onSelectFile,
  onSelectPreset,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="bg-[#0E141F] border border-[#1E2836] rounded-lg p-5 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#161F2C] mb-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-amber font-semibold tracking-wider">PANEL 01</span>
          <span className="text-[#1E2836] font-mono">/</span>
          <h2 className="font-display text-sm font-bold text-[#DCE3EC]">DOCUMENT INPUT</h2>
        </div>

        {currentImage && (
          <button
            onClick={onReset}
            disabled={isScanning}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#121A28] border border-[#1E2836] text-[11px] font-mono text-text-dim hover:text-text hover:border-amber transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
            <span>RESET</span>
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!currentImage ? (
        /* Empty / Upload State */
        <div className="flex-1 flex flex-col items-center justify-center">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`w-full flex-1 min-h-[280px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-all ${
              isDragOver
                ? 'border-amber bg-amber/5'
                : 'border-[#1E2836] bg-[#080B12] hover:border-text-dim/50'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
            />

            <div className="w-12 h-12 rounded-full bg-[#121A28] border border-[#1E2836] flex items-center justify-center mb-4 text-amber">
              <Upload className="w-6 h-6" />
            </div>

            <p className="font-display text-base font-semibold text-[#DCE3EC] mb-1">
              Drag and drop a document
            </p>
            <p className="text-xs text-text-dim font-sans mb-4">
              or click to browse from your device
            </p>

            <div className="px-2.5 py-1 rounded bg-[#121A28] border border-[#161F2C] text-[11px] font-mono text-text-faint mb-6">
              FORMAT HINT: JPG · PNG · JPEG
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 rounded bg-amber text-ink font-mono text-xs font-bold hover:bg-amber/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>CHOOSE DOCUMENT</span>
              </button>

              <div className="relative w-full">
                <button
                  onClick={() => setShowPresetsMenu(!showPresetsMenu)}
                  className="w-full py-2.5 px-4 rounded bg-[#121A28] border border-[#1E2836] text-text font-mono text-xs font-medium hover:border-amber transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber" />
                  <span>TRY DEMO DOCUMENT</span>
                </button>

                {/* Demo Presets Dropdown */}
                {showPresetsMenu && (
                  <div className="absolute bottom-full mb-2 inset-x-0 bg-[#0E141F] border border-[#1E2836] rounded-lg shadow-xl p-2 z-30 space-y-1 font-mono text-xs">
                    <div className="text-[10px] text-text-faint px-2 py-1 uppercase tracking-wider">
                      Select Synthetic Specimen:
                    </div>
                    {DEMO_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          setShowPresetsMenu(false);
                          onSelectPreset(preset.id);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded hover:bg-[#121A28] hover:text-amber text-text-dim flex items-center justify-between transition-colors"
                      >
                        <span>{preset.label}</span>
                        {preset.expectedOutcome === 'success' && (
                          <span className="text-[10px] text-teal">✓ PASS</span>
                        )}
                        {preset.expectedOutcome === 'low_confidence' && (
                          <span className="text-[10px] text-amber">! BLURRY</span>
                        )}
                        {preset.expectedOutcome === 'no_name' && (
                          <span className="text-[10px] text-rose">✕ NO NAME</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Active Document Preview State with Scanline Sweeper */
        <div className="flex-1 flex flex-col space-y-3">
          {/* Top Specimen Tag */}
          <div className="flex items-center justify-between font-mono text-[11px] px-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal"></span>
              <span className="text-teal font-semibold">
                {isDemoDoc ? 'SYNTHETIC DEMO DOCUMENT' : 'USER UPLOADED DOCUMENT'}
              </span>
            </div>
            {selectedPresetId && (
              <span className="text-text-faint uppercase">PRESET: {selectedPresetId}</span>
            )}
          </div>

          {/* Document Preview Frame */}
          <div className="relative flex-1 bg-[#080B12] border border-[#1E2836] rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[300px]">
            {/* Embedded Document Image */}
            <img
              src={currentImage}
              alt="Identity Specimen"
              className="max-h-[340px] w-auto object-contain rounded border border-[#161F2C]"
            />

            {/* Amber Scanline Sweeper Overlay during scanning */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-x-0 h-1 bg-amber shadow-[0_0_15px_#F5A623] animate-scanline"></div>
                <div className="absolute inset-0 bg-amber/5 pointer-events-none"></div>
              </div>
            )}

            {/* Highlight bounding box overlay when extraction is success */}
            {scanStatus === 'success' && (
              <div className="absolute top-[35%] left-[28%] w-[50%] h-[12%] border-2 border-teal bg-teal/10 rounded pointer-events-none flex items-start justify-end p-1">
                <span className="bg-teal text-ink font-mono text-[9px] font-bold px-1 rounded">
                  NAME_BBOX
                </span>
              </div>
            )}
          </div>

          {/* Preset quick switcher pills */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-text-dim border-t border-[#161F2C]">
            <span>SWITCH TEST SPECIMEN:</span>
            <div className="flex gap-1.5 overflow-x-auto py-1">
              {DEMO_PRESETS.map((p) => (
                <button
                  key={p.id}
                  disabled={isScanning}
                  onClick={() => onSelectPreset(p.id)}
                  className={`px-2 py-0.5 rounded text-[10px] border transition-colors ${
                    selectedPresetId === p.id
                      ? 'bg-amber/10 border-amber text-amber font-semibold'
                      : 'bg-[#121A28] border-[#1E2836] text-text-dim hover:text-text'
                  }`}
                >
                  {p.id === 'rahul_kumar' ? 'RAHUL' : p.id === 'priya_sharma' ? 'PRIYA' : p.id === 'blurry_doc' ? 'BLURRY' : 'INVALID'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
