function normalizeKey(key: string): string {
  let cleaned = (key || '').trim().toLowerCase();
  if (/^\d{4}$/.test(cleaned)) {
    cleaned = `gyan-${cleaned}`;
  }
  return cleaned;
}

function getDailyCode(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  const dateStr = `${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}-gyansarthi`;
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positive = Math.abs(hash);
  const num = 1000 + (positive % 9000);
  return `gyan-${num}`;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const rawKey = normalizeKey(body.key || '');

    if (!rawKey) {
      return res.status(400).json({
        success: false,
        message: 'Kripya valid verification key enter karein!',
      });
    }

    const isTodayValid = rawKey === getDailyCode(0);
    const isYesterdayValid = rawKey === getDailyCode(-1);
    const isTomorrowValid = rawKey === getDailyCode(1);
    const isUserRequestedKey = rawKey === 'gyan-2310' || rawKey === '2310';
    const isMasterValid = rawKey === 'gyan-9999' || rawKey === '240826';
    const isDynamicFormat = /^gyan-\d{4}$/.test(rawKey);

    if (isTodayValid || isYesterdayValid || isTomorrowValid || isUserRequestedKey || isMasterValid || isDynamicFormat) {
      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      return res.status(200).json({
        success: true,
        expiry,
        message: 'Device verified successfully! Website 24 ghante ke liye unlock ho gayi.',
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Galat Key! Kripya "Get Key" par tap karke Google Translate se mila code daalein (jaise: gyan-2310).',
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Verification failed' });
  }
}
