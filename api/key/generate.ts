export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const AROLINKS_API_KEY = process.env.AROLINKS_API_KEY || 'a7616376b1ef8920d0ad9a7f6ffbb0313d8bbce7';

  try {
    // Generate dynamic code like gyan-2310, gyan-8492 etc.
    const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
    const code = `gyan-${randomSuffix}`.toLowerCase();

    // Target Translate URL:
    // https://translate.google.com/?sl=auto&tl=en&text=gyan-2310&op=translate
    const targetUrl = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(code)}&op=translate`;
    const arolinksApi = `https://arolinks.com/api?api=${AROLINKS_API_KEY}&url=${encodeURIComponent(targetUrl)}`;

    let shortenedUrl = targetUrl;
    try {
      const apiRes = await fetch(arolinksApi);
      if (apiRes.ok) {
        const apiData: any = await apiRes.json();
        if (apiData.status === 'success' && apiData.shortenedUrl) {
          shortenedUrl = apiData.shortenedUrl;
        }
      }
    } catch (err) {
      console.warn('Arolinks fetch failed in serverless handler, using targetUrl:', err);
    }

    return res.status(200).json({
      success: true,
      code,
      shortenedUrl,
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Key generation failed' });
  }
}
