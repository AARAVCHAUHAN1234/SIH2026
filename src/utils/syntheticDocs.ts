import { DemoPreset } from '../types/scanner';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'rahul_kumar',
    label: 'Preset 1: Rahul Kumar (Valid)',
    name: 'RAHUL KUMAR',
    docType: 'Standard Aadhaar Identity Card',
    quality: 'high',
    expectedOutcome: 'success',
    presetConfidence: 98.7,
  },
  {
    id: 'priya_sharma',
    label: 'Preset 2: Priya Sharma (Valid)',
    name: 'PRIYA SHARMA',
    docType: 'Standard Aadhaar Identity Card',
    quality: 'high',
    expectedOutcome: 'success',
    presetConfidence: 99.2,
  },
  {
    id: 'blurry_doc',
    label: 'Preset 3: Low Quality / Motion Blur',
    name: 'UNKNOWN',
    docType: 'Unreadable Identity Card',
    quality: 'blurry',
    expectedOutcome: 'low_confidence',
    presetConfidence: 41.3,
  },
  {
    id: 'non_id_receipt',
    label: 'Preset 4: Non-ID Document / Receipt',
    name: 'NONE',
    docType: 'Generic Utility Receipt',
    quality: 'invalid',
    expectedOutcome: 'no_name',
    presetConfidence: 0.0,
  },
];

/**
 * Dynamically draws synthetic document cards onto HTML Canvas
 * and returns high-resolution base64 data URLs.
 */
export function generateSyntheticDocumentImage(presetId: string): string {
  const canvas = document.createElement('canvas');
  canvas.width = 650;
  canvas.height = 410;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background panel
  if (presetId === 'non_id_receipt') {
    // Render a store receipt pattern
    ctx.fillStyle = '#EBECEE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Receipt header
    ctx.fillStyle = '#222222';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('METRO TRANSIT STATION RECEIPT', 140, 50);
    ctx.font = '14px monospace';
    ctx.fillText('DATE: 2026-08-24  TIME: 14:32:01', 180, 80);
    ctx.fillText('------------------------------------------', 140, 100);

    ctx.font = '16px monospace';
    ctx.fillText('SINGLE TRANSIT PASS           $12.50', 140, 145);
    ctx.fillText('CARD TOP UP CHARGE            $45.00', 140, 180);
    ctx.fillText('CONVENIENCE FEE                $02.00', 140, 215);

    ctx.fillText('------------------------------------------', 140, 250);
    ctx.font = 'bold 18px monospace';
    ctx.fillText('TOTAL AMOUNT PAID:            $59.50', 140, 285);
    ctx.font = '12px sans-serif';
    ctx.fillText('THANK YOU FOR TRAVELING WITH BORDER EXPRESS', 160, 340);
    ctx.fillText('NO IDENTITY NAME FIELD PRESENT ON THIS RECEIPT', 160, 365);
    return canvas.toDataURL('image/png');
  }

  // Identity Card Background
  ctx.fillStyle = '#FDFDFD';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Border lines
  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 4;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Header band (Ashoka Emblem style header bar)
  ctx.fillStyle = '#FF9933'; // Saffron accent bar
  ctx.fillRect(12, 12, canvas.width - 24, 8);
  ctx.fillStyle = '#138808'; // Green accent bar
  ctx.fillRect(12, 20, canvas.width - 24, 8);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('भारत सरकार', 240, 52);
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('Government of India', 240, 74);

  // Divider line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(30, 88);
  ctx.lineTo(canvas.width - 30, 88);
  ctx.stroke();

  // Photo Box Placeholder
  ctx.fillStyle = '#E2E8F0';
  ctx.fillRect(40, 110, 120, 145);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 110, 120, 145);

  // Avatar silhouette inside photo box
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.arc(100, 160, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(100, 230, 48, 0, Math.PI * 2);
  ctx.fill();

  // Fields
  const nameToRender = presetId === 'priya_sharma' ? 'PRIYA SHARMA' : 'RAHUL KUMAR';
  const nameHindi = presetId === 'priya_sharma' ? 'प्रिया शर्मा' : 'राहुल कुमार';
  const dob = presetId === 'priya_sharma' ? '22/03/1995' : '14/08/1992';
  const gender = presetId === 'priya_sharma' ? 'FEMALE / महिला' : 'MALE / पुरुष';
  const aadhaarNum = presetId === 'priya_sharma' ? 'XXXX XXXX 8192' : 'XXXX XXXX 4829';

  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText('नाम / Name:', 180, 128);

  // Highlight name field text for clarity
  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 22px sans-serif';
  ctx.fillText(`${nameHindi} / ${nameToRender}`, 180, 158);

  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('जन्म तिथि / DOB:', 180, 192);
  ctx.fillStyle = '#0F172A';
  ctx.fillText(dob, 310, 192);

  ctx.fillStyle = '#475569';
  ctx.fillText('लिंग / Gender:', 180, 222);
  ctx.fillStyle = '#0F172A';
  ctx.fillText(gender, 310, 222);

  // Synthetic QR Code placeholder
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(510, 110, 100, 100);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(520, 120, 30, 30);
  ctx.fillRect(570, 120, 30, 30);
  ctx.fillRect(520, 170, 30, 30);
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(530, 130, 10, 10);
  ctx.fillRect(580, 130, 10, 10);
  ctx.fillRect(530, 180, 10, 10);

  // Bottom Aadhaar Number bar
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(30, 290, canvas.width - 60, 50);
  ctx.strokeStyle = '#CBD5E1';
  ctx.strokeRect(30, 290, canvas.width - 60, 50);

  ctx.fillStyle = '#1E293B';
  ctx.font = 'bold 24px monospace';
  ctx.fillText(aadhaarNum, 210, 325);

  // Bottom Disclaimer watermark
  ctx.fillStyle = '#94A3B8';
  ctx.font = '10px monospace';
  ctx.fillText('SYNTHETIC SPECIMEN DOCUMENT — BORDERAI TEST HARNESS — NO REAL PII', 120, 375);

  // If Blurry preset, apply heavy Gaussian Blur simulation filter
  if (presetId === 'blurry_doc') {
    const blurCanvas = document.createElement('canvas');
    blurCanvas.width = canvas.width;
    blurCanvas.height = canvas.height;
    const bCtx = blurCanvas.getContext('2d');
    if (bCtx) {
      bCtx.filter = 'blur(9px) contrast(70%) brightness(85%)';
      bCtx.drawImage(canvas, 0, 0);
      
      // Overlay noise lines
      bCtx.fillStyle = 'rgba(0,0,0,0.15)';
      for (let i = 0; i < canvas.height; i += 4) {
        bCtx.fillRect(0, i, canvas.width, 2);
      }
      return blurCanvas.toDataURL('image/png');
    }
  }

  return canvas.toDataURL('image/png');
}
