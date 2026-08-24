export type StepId =
  | 'capture'
  | 'classify'
  | 'detect_region'
  | 'extract_name'
  | 'ocr_mrz'
  | 'validation'
  | 'tamper_detection'
  | 'face_detection'
  | 'face_liveness'
  | 'identity_consistency'
  | 'evidence_fusion'
  | 'risk_engine'
  | 'risk_assessment'
  | 'officer_verification'
  | 'evidence_trail';

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
  confidence: number;
  timestamp: string;
  documentType: string;
  bBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
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