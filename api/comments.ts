// In-memory cache for Vercel serverless container instance
const memoryMap: Record<string, any[]> = {};

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, 'http://localhost');
  const pathParam = url.pathname.replace(/^\/api\/comments\/?/, '');
  const queryParam = req.query?.lectureId;
  const lectureId = decodeURIComponent(queryParam || pathParam || 'default');

  if (req.method === 'GET') {
    const comments = memoryMap[lectureId] || [];
    return res.status(200).json({ success: true, comments });
  }

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if (!data.text || !data.text.trim()) {
        return res.status(400).json({ success: false, error: 'Comment cannot be blank' });
      }

      if (!memoryMap[lectureId]) {
        memoryMap[lectureId] = [];
      }

      const newComment = {
        id: 'cm_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6),
        author: data.author || 'Student',
        text: data.text.trim(),
        userId: data.userId || null,
        timestamp: Date.now(),
        createdAt: new Date().toISOString(),
      };

      memoryMap[lectureId].unshift(newComment);

      return res.status(200).json({
        success: true,
        comment: newComment,
        comments: memoryMap[lectureId],
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
