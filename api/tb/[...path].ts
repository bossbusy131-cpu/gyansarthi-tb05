export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract path parameters from req.query.path (array in Vercel [...path]) or req.url
  let subPath = '';
  if (Array.isArray(req.query?.path)) {
    subPath = req.query.path.join('/');
  } else if (typeof req.query?.path === 'string') {
    subPath = req.query.path;
  } else {
    const urlObj = new URL(req.url, 'http://localhost');
    subPath = urlObj.pathname.replace(/^\/api\/tb\/?/, '');
  }

  // Parse search query parameters (excluding the 'path' param used by Vercel routing)
  const urlObj = new URL(req.url, 'http://localhost');
  const searchParams = new URLSearchParams(urlObj.search);
  searchParams.delete('path');
  const queryString = searchParams.toString();
  const search = queryString ? `?${queryString}` : '';

  const targetUrl = `https://seashell-app-3z5jp.ondigitalocean.app/api/v1/${subPath}${search}`;

  const headers: Record<string, string> = {
    'origin': 'https://targetboard.co.in',
    'referer': 'https://targetboard.co.in/',
    'accept': 'application/json, text/plain, */*',
  };

  if (req.headers['authorization']) {
    headers['authorization'] = req.headers['authorization'];
  }
  if (req.headers['content-type']) {
    headers['content-type'] = req.headers['content-type'];
  }

  const fetchOptions: RequestInit = {
    method: req.method,
    headers,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'object') {
      fetchOptions.body = JSON.stringify(req.body);
    } else if (typeof req.body === 'string') {
      fetchOptions.body = req.body;
    }
  }

  try {
    const upstreamRes = await fetch(targetUrl, fetchOptions);
    const contentType = upstreamRes.headers.get('content-type') || 'application/json';
    res.setHeader('Content-Type', contentType);

    const bodyText = await upstreamRes.text();
    return res.status(upstreamRes.status).send(bodyText);
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'TargetBoard proxy error' });
  }
}
