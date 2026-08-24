export type StepId = 'capture' | 'classify' | 'detect_region' | 'extract_name';

export type StepStatus = 'idle' | 'active' | 'done';

export interface LogStep {
  id: StepId;
  title: string;
  subtext: string;
  timestamp?: string;
  status: StepStatus;
}

export type ScanStatus = 
  | 'idle' 
  | 'scanning' 
  | 'success' 
  | 'error_no_name' 
  | 'error_low_confidence';

export interface ExtractionResult {
  extractedName: string;
  confidence: number; // e.g. 98.7
  timestamp: string;
  documentType: string;
  bBox?: { x: number; y: number; width: number; height: number };
}

export interface DemoPreset {
  id: string;
  label: string;
  name: string;
  docType: string;
  quality: 'high' | 'blurry' | 'invalid';
  expectedOutcome: 'success' | 'low_confidence' | 'no_name';
  presetConfidence: number;
}
