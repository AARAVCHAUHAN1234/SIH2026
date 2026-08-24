import React from 'react';
import { X, CheckCircle, Cpu, Network, Layers } from 'lucide-react';

interface PipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PipelineModal: React.FC<PipelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pipelineStages = [
    {
      id: '01',
      title: 'PERSON / DOCUMENT CAPTURE',
      desc: 'High-res image capture via scanner or edge camera.',
      isImplemented: true,
      activeTag: 'STAGE 1 (FRONTEND DEMO)',
      stack: 'React + Canvas + File API',
    },
    {
      id: '02',
      title: 'DOCUMENT CLASSIFICATION',
      desc: 'Detect document type (Aadhaar, Passport, DL).',
      isImplemented: true,
      activeTag: 'STAGE 1 (FRONTEND DEMO)',
      stack: 'YOLO / RT-DETR',
    },
    {
      id: '03',
      title: 'OCR & NAME EXTRACTION',
      desc: 'Extract key identity fields (Name, MRZ).',
      isImplemented: true,
      activeTag: 'STAGE 1 (FRONTEND DEMO)',
      stack: 'Tesseract.js / PaddleOCR',
    },
    {
      id: '04',
      title: 'DOCUMENT VALIDATION',
      desc: 'Verify checksums, document structure, & layout rules.',
      isImplemented: false,
      stack: 'FastAPI Validation Service',
    },
    {
      id: '05',
      title: 'AI TAMPER & FORGERY DETECT',
      desc: 'Inspect font anomalies, pixel noise, & copy-paste edits.',
      isImplemented: false,
      stack: 'PyTorch Error Analysis Model',
    },
    {
      id: '06',
      title: 'FACE DETECTION & ALIGNMENT',
      desc: 'Isolate portrait photo region on identity document.',
      isImplemented: false,
      stack: 'OpenCV / InsightFace',
    },
    {
      id: '07',
      title: 'FACE MATCH & LIVENESS',
      desc: 'Match document portrait against live camera stream.',
      isImplemented: false,
      stack: 'ArcFace + Active Liveness AI',
    },
    {
      id: '08',
      title: 'IDENTITY DATA CONSISTENCY',
      desc: 'Cross-check name against border databases & graph.',
      isImplemented: false,
      stack: 'PostgreSQL + Neo4j Identity Graph',
    },
    {
      id: '09',
      title: 'EVIDENCE FUSION',
      desc: 'Aggregate multi-modal scores (OCR + Tamper + Face).',
      isImplemented: false,
      stack: 'Redis + Celery Queue Worker',
    },
    {
      id: '10',
      title: 'EXPLAINABLE RISK ENGINE',
      desc: 'Assign risk tier: LOW (Clear), REVIEW (Officer), HIGH (Escalate).',
      isImplemented: false,
      stack: 'Custom Rule Engine + LLM Explainer',
    },
    {
      id: '11',
      title: 'DIGITAL EVIDENCE ARCHIVE',
      desc: 'Immutably record evidence audit trail for legal compliance.',
      isImplemented: false,
      stack: 'MinIO Storage + Cryptographic Sign',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0E141F] border border-[#1E2836] rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-[#1E2836] flex items-center justify-between bg-[#121A28]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#080B12] border border-[#1E2836] flex items-center justify-center text-amber">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#DCE3EC]">
                IDENTITY VERIFICATION TRANSIT NETWORK
              </h3>
              <p className="font-mono text-xs text-text-dim">
                Full Architecture &amp; System Context Pipeline
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[#1E2836] text-text-dim hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Context Banner */}
          <div className="bg-[#121A28] border border-amber/30 rounded-lg p-4 font-sans text-xs text-text-dim leading-relaxed flex items-start gap-3">
            <Layers className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber font-mono">SCOPE BOUNDARY:</span> This BORDERAI frontend prototype is scoped exclusively to{' '}
              <strong className="text-text font-mono">Stage 1 (Capture → Document Classification → OCR / Name Extraction)</strong>. The remaining stages reflect the complete planned backend architecture.
            </div>
          </div>

          {/* Pipeline Flow Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            {pipelineStages.map((stage) => (
              <div
                key={stage.id}
                className={`p-3.5 rounded-lg border transition-all ${
                  stage.isImplemented
                    ? 'bg-amber/5 border-amber/50 text-text'
                    : 'bg-[#080B12] border-[#161F2C] text-text-dim'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      stage.isImplemented
                        ? 'bg-amber text-ink font-bold'
                        : 'bg-[#121A28] text-text-faint'
                    }`}
                  >
                    STAGE {stage.id}
                  </span>

                  {stage.isImplemented ? (
                    <span className="text-[10px] text-teal font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      ACTIVE IN THIS BUILD
                    </span>
                  ) : (
                    <span className="text-[10px] text-text-faint">BACKEND PIPELINE</span>
                  )}
                </div>

                <div className="font-bold text-sm text-[#DCE3EC] mb-1 font-display">
                  {stage.title}
                </div>

                <p className="text-text-dim font-sans text-xs mb-2 leading-tight">
                  {stage.desc}
                </p>

                <div className="text-[10px] text-text-faint pt-2 border-t border-[#1E2836] flex items-center justify-between">
                  <span>TECH STACK:</span>
                  <span className="text-amber/90">{stage.stack}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Target Technology Stack Summary */}
          <div className="bg-[#080B12] border border-[#1E2836] rounded-lg p-4 font-mono text-xs space-y-2">
            <div className="text-amber font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>RECOMMENDED FULL PIPELINE BACKEND STACK</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px] text-text-dim">
              <div>
                <span className="text-text-faint">BACKEND:</span> FastAPI (Python)
              </div>
              <div>
                <span className="text-text-faint">AI FRAMEWORK:</span> PyTorch
              </div>
              <div>
                <span className="text-text-faint">COMPUTER VISION:</span> OpenCV
              </div>
              <div>
                <span className="text-text-faint">OCR ENGINE:</span> PaddleOCR
              </div>
              <div>
                <span className="text-text-faint">FACE AI:</span> InsightFace / ArcFace
              </div>
              <div>
                <span className="text-text-faint">DOC DETECT:</span> YOLO / RT-DETR
              </div>
              <div>
                <span className="text-text-faint">GRAPH DB:</span> Neo4j + PostgreSQL
              </div>
              <div>
                <span className="text-text-faint">EDGE HARDWARE:</span> NVIDIA Jetson GPU
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E2836] bg-[#121A28] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-amber text-ink font-mono text-xs font-bold hover:bg-amber/90 transition-colors"
          >
            CLOSE SYSTEM CONTEXT
          </button>
        </div>
      </div>
    </div>
  );
};
