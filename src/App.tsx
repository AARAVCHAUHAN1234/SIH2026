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
  { id: 'capture', title: 'IMAGE CAPTURED', subtext: 'Stream frame isolated & contrast preprocessed', status: 'idle' },
  { id: 'classify', title: 'DOCUMENT CLASSIFIED', subtext: 'Classified: Aadhaar Specimen v2.1', status: 'idle' },
  { id: 'detect_region', title: 'TEXT REGION DETECTED', subtext: 'Bounding box anchored: [X:180, Y:128, W:320, H:42]', status: 'idle' },
  { id: 'extract_name', title: 'EXTRACTING NAME…', subtext: 'Neural OCR candidate line parsed', status: 'idle' },
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

    // Reset steps to idle
    setSteps(INITIAL_STEPS);

    const getFormattedTimestamp = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { hour12: false }) + '.' + String(now.getMilliseconds()).padStart(3, '0');
    };

    // Step 1: IMAGE CAPTURED (~0.25s)
    await new Promise((r) => setTimeout(r, 250));
    setSteps((prev) =>
      prev.map((s) =>
        s.id === 'capture'
          ? { ...s, status: 'done', timestamp: getFormattedTimestamp() }
          : s.id === 'classify'
          ? { ...s, status: 'active' }
          : s
      )
    );

    // Step 2: DOCUMENT CLASSIFIED (~0.5s)
    await new Promise((r) => setTimeout(r, 300));
    setSteps((prev) =>
      prev.map((s) =>
        s.id === 'classify'
          ? { ...s, status: 'done', timestamp: getFormattedTimestamp() }
          : s.id === 'detect_region'
          ? { ...s, status: 'active' }
          : s
      )
    );

    // Step 3: TEXT REGION DETECTED (~0.75s)
    await new Promise((r) => setTimeout(r, 350));
    setSteps((prev) =>
      prev.map((s) =>
        s.id === 'detect_region'
          ? { ...s, status: 'done', timestamp: getFormattedTimestamp() }
          : s.id === 'extract_name'
          ? { ...s, status: 'active' }
          : s
      )
    );

    // Step 4: EXTRACTING NAME (~1.3s total)
    await new Promise((r) => setTimeout(r, 550));

    try {
      const outcome = await executeDocumentExtraction(imageSrc, presetId);

      setSteps((prev) =>
        prev.map((s) =>
          s.id === 'extract_name'
            ? { ...s, status: 'done', timestamp: getFormattedTimestamp() }
            : s
        )
      );

      setResult(outcome);
      setScanStatus('success');
    } catch (err: any) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === 'extract_name'
            ? { ...s, status: 'done', timestamp: getFormattedTimestamp() }
            : s
        )
      );

      if (err.message === 'LOW_CONFIDENCE') {
        setScanStatus('error_low_confidence');
      } else {
        setScanStatus('error_no_name');
        setErrorMessage('Could not locate valid identity name line adhering to document layout contract.');
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
    reader.onload = (e) => {
      if (e.target?.result) {
        runScanningPipeline(e.target.result as string);
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
      <Footer />

      {/* System Architecture Pipeline Modal */}
      <PipelineModal
        isOpen={isPipelineModalOpen}
        onClose={() => setIsPipelineModalOpen(false)}
      />
    </div>
  );
}

export default App;
