import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
export const runtime = 'nodejs';
export const alt = 'Jayavardhan & Co — Chartered Accountants. Clarity in your numbers. Confidence in your next step.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() {
  const [serif, sans] = await Promise.all([readFile(join(process.cwd(), 'node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-400-normal.woff')), readFile(join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff'))]);
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', background: '#14283F', color: '#F7F5F0', width: '100%', height: '100%', padding: '64px 72px', fontFamily: 'Inter', borderTop: '8px solid #A08352' }}><div style={{ display: 'flex', fontFamily: 'Source Serif', fontSize: 42 }}>Jayavardhan & Co</div><div style={{ display: 'flex', fontSize: 17, letterSpacing: 3, marginTop: 12 }}>CHARTERED ACCOUNTANTS</div><div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Source Serif', fontSize: 65, lineHeight: 1.12, marginTop: 68 }}><div>Clarity in your numbers.</div><div>Confidence in your next step.</div></div><div style={{ display: 'flex', borderTop: '1px solid #A08352', paddingTop: 24, marginTop: 44, fontSize: 20 }}>Audit · Tax · Compliance · Financial advisory</div></div>, { ...size, fonts: [{ name: 'Source Serif', data: serif, style: 'normal', weight: 400 }, { name: 'Inter', data: sans, style: 'normal', weight: 400 }] });
}
