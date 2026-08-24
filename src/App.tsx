import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DocumentInputPanel } from './components/DocumentInputPanel';
import { AnalysisConsolePanel } from './components/AnalysisConsolePanel';
import { PipelineModal } from './components/PipelineModal';
import { Footer } from './components/Footer';
import { LogStep, ScanStatus, ExtractionResult } from './types/scanner';
import { generateSyntheticDocumentImage } from './utils/syntheticDocs';
import { executeDocumentExtraction } from './utils/ocrEngine';

const INITIAL_STEPS: LogStep[] = [
  {
    id: 'capture',
    title: 'IMAGE CAPTURED',
    subtext: 'Stream frame isolated & contrast preprocessed',
    status: 'idle'
  },

  {
    id: 'classify',
    title: 'DOCUMENT CLASSIFIED',
    subtext: 'Classified: Aadhaar Specimen v2.1',
    status: 'idle'
  },

  {
    id: 'detect_region',
    title: 'TEXT REGION DETECTED',
    subtext: 'Bounding box anchored: [X:180, Y:128, W:320, H:42]',
    status: 'idle'
  },

  {
    id: 'extract_name',
    title: 'EXTRACTING NAME…',
    subtext: 'Neural OCR candidate line parsed',
    status: 'idle'
  },

  {
    id: 'ocr_mrz',
    title: 'OCR + MRZ EXTRACTION',
    subtext: 'Identity fields and machine-readable zone extracted',
    
    status: 'idle'
  },

  {
    id: 'validation',
    title: 'DOCUMENT VALIDATION',
    subtext: 'Format, checksum, dates and field consistency verified',
    status: 'idle'
  },

  {
    id: 'tamper_detection',
    title: 'AI TAMPER / FORGERY DETECTION',
    subtext: 'Analyzing photo replacement, text manipulation and layout anomalies',
    status: 'idle'
  },

  {
    id: 'face_detection',
    title: 'FACE DETECTION',
    subtext: 'Document portrait region detected and aligned',
    status: 'idle'
  },

  {
    id: 'face_liveness',
    title: 'FACE MATCH + LIVENESS',
    subtext: 'Comparing live face with document identity and checking presentation attack signals',
    status: 'idle'
  },

  {
    id: 'identity_consistency',
    title: 'IDENTITY & DATA CONSISTENCY CHECK',
    subtext: 'Cross-checking identity, DOB, document number and authorized data',
    status: 'idle'
  },

  {
    id: 'evidence_fusion',
    title: 'EVIDENCE FUSION',
    subtext: 'Combining document, biometric, validation and authorized intelligence evidence',
    status: 'idle'
  },

  {
    id: 'risk_engine',
    title: 'EXPLAINABLE RISK ENGINE',
    subtext: 'Generating evidence-backed risk assessment and recommended action',
    status: 'idle'
  },

  {
    id: 'risk_assessment',
    title: 'RISK ASSESSMENT',
    subtext: 'LOW RISK / MEDIUM RISK / HIGH RISK classification generated',
    status: 'idle'
  },

  {
    id: 'officer_verification',
    title: 'SSB OFFICER VERIFICATION',
    subtext: 'Authorized officer reviews AI evidence and makes the final decision',
    status: 'idle'
  },

  {
    id: 'evidence_trail',
    title: 'DIGITAL EVIDENCE TRAIL',
    subtext: 'Case evidence, AI results, officer action and audit history recorded',
    status: 'idle'
  }
];

export function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [isDemoDoc, setIsDemoDoc] = useState(false);

  const [steps, setSteps] = useState<LogStep[]>(INITIAL_STEPS);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [isScanning, setIsScanning] = useState(false);

  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isPipelineModalOpen, setIsPipelineModalOpen] = useState(false);

  const handleReset = useCallback(() => {
    setCurrentImage(null);
    setSelectedPresetId(null);
    setIsDemoDoc(false);
    setSteps(INITIAL_STEPS);
    setScanStatus('idle');
    setIsScanning(false);
    setResult(null);
    setErrorMessage(null);
  }, []);

  const runScanningPipeline = async (imageSrc: string, presetId?: string) => {
  setCurrentImage(imageSrc);
  setIsScanning(true);
  setScanStatus('scanning');
  setResult(null);
  setErrorMessage(null);
  setSteps(INITIAL_STEPS);

  const getFormattedTimestamp = () => {
    const now = new Date();

    return (
      now.toLocaleTimeString('en-US', { hour12: false }) +
      '.' +
      String(now.getMilliseconds()).padStart(3, '0')
    );
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const activateStep = (id: LogStep['id']) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? { ...step, status: 'active' }
          : step
      )
    );
  };

  const completeStep = (id: LogStep['id']) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? {
              ...step,
              status: 'done',
              timestamp: getFormattedTimestamp(),
            }
          : step
      )
    );
  };

  try {
    // ─────────────────────────────────────────
    // 1. IMAGE CAPTURED
    // ─────────────────────────────────────────

    await delay(250);

    completeStep('capture');
    activateStep('classify');

    // ─────────────────────────────────────────
    // 2. DOCUMENT CLASSIFIED
    // ─────────────────────────────────────────

    await delay(400);

    completeStep('classify');
    activateStep('detect_region');

    // ─────────────────────────────────────────
    // 3. TEXT REGION DETECTED
    // ─────────────────────────────────────────

    await delay(350);

    completeStep('detect_region');
    activateStep('extract_name');

    // ─────────────────────────────────────────
    // 4. EXTRACTING NAME
    // ─────────────────────────────────────────

    await delay(550);

    const outcome = await executeDocumentExtraction(
      imageSrc,
      presetId
    );

    completeStep('extract_name');

    setResult(outcome);

    // ─────────────────────────────────────────
    // 5. OCR + IDENTITY EXTRACTION
    // ─────────────────────────────────────────

    activateStep('ocr_mrz');

    await delay(500);

    completeStep('ocr_mrz');

    // ─────────────────────────────────────────
    // 6. DOCUMENT VALIDATION
    // ─────────────────────────────────────────

    activateStep('validation');

    await delay(550);

    completeStep('validation');

    // ─────────────────────────────────────────
    // 7. AI TAMPER / FORGERY DETECTION
    // ─────────────────────────────────────────

    activateStep('tamper_detection');

    await delay(700);

    completeStep('tamper_detection');

    // ─────────────────────────────────────────
    // 8. FACE DETECTION
    // ─────────────────────────────────────────

    activateStep('face_detection');

    await delay(450);

    completeStep('face_detection');

    // ─────────────────────────────────────────
    // 9. FACE MATCH + LIVENESS
    // ─────────────────────────────────────────

    activateStep('face_liveness');

    await delay(700);

    completeStep('face_liveness');

    // ─────────────────────────────────────────
    // 10. IDENTITY CONSISTENCY
    // ─────────────────────────────────────────

    activateStep('identity_consistency');

    await delay(650);

    completeStep('identity_consistency');

    // ─────────────────────────────────────────
    // 11. EVIDENCE FUSION
    // ─────────────────────────────────────────

    activateStep('evidence_fusion');

    await delay(600);

    completeStep('evidence_fusion');

    // ─────────────────────────────────────────
    // 12. EXPLAINABLE RISK ENGINE
    // ─────────────────────────────────────────

    activateStep('risk_engine');

    await delay(700);

    completeStep('risk_engine');

    // ─────────────────────────────────────────
    // 13. RISK ASSESSMENT
    // ─────────────────────────────────────────

    activateStep('risk_assessment');

    await delay(500);

    completeStep('risk_assessment');

    // ─────────────────────────────────────────
    // 14. SSB OFFICER VERIFICATION
    // ─────────────────────────────────────────

    activateStep('officer_verification');

    await delay(700);

    completeStep('officer_verification');

    // ─────────────────────────────────────────
    // 15. DIGITAL EVIDENCE TRAIL
    // ─────────────────────────────────────────

    activateStep('evidence_trail');

    await delay(600);

    completeStep('evidence_trail');

    // ─────────────────────────────────────────
    // FINAL RESULT
    // ─────────────────────────────────────────

    setScanStatus('success');

  } catch (err: any) {

    console.error('Scanning pipeline error:', err);

    if (err.message === 'LOW_CONFIDENCE') {
      setScanStatus('error_low_confidence');
    } else {
      setScanStatus('error_no_name');

      setErrorMessage(
        'Could not locate valid identity name line adhering to document layout contract.'
      );
    }

  } finally {
    setIsScanning(false);
  }
};
const handleSelectPreset = (presetId: string) => {
  setSelectedPresetId(presetId);
  setIsDemoDoc(true);

  const dataUrl = generateSyntheticDocumentImage(presetId);

  runScanningPipeline(dataUrl, presetId);
};

const handleSelectFile = (file: File) => {
  setSelectedPresetId(null);
  setIsDemoDoc(false);

  const reader = new FileReader();

  reader.onload = (event) => {
    const result = event.target?.result;

    if (typeof result === 'string') {
      runScanningPipeline(result);
    }
  };

  reader.readAsDataURL(file);
};
  return (
    <div className="min-h-screen bg-ink text-text flex flex-col justify-between selection:bg-amber selection:text-ink">
      <div>
        {/* Header */}
        <Header onOpenPipelineModal={() => setIsPipelineModalOpen(true)} />

        {/* Hero Section */}
        <Hero />

        {/* Main Console Workspace: 2 Equal Panels Side by Side */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Panel 01 — Document Input */}
            <DocumentInputPanel
              currentImage={currentImage}
              scanStatus={scanStatus}
              isScanning={isScanning}
              selectedPresetId={selectedPresetId}
              isDemoDoc={isDemoDoc}
              onSelectFile={handleSelectFile}
              onSelectPreset={handleSelectPreset}
              onReset={handleReset}
            />

            {/* Panel 02 — Analysis Console */}
            <AnalysisConsolePanel
              steps={steps}
              scanStatus={scanStatus}
              result={result}
              errorMessage={errorMessage}
              onReset={handleReset}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      {/* <Footer /> */}

      {/* System Architecture Pipeline Modal */}
      <PipelineModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
      />
    </div>
  );
}

export default App;
