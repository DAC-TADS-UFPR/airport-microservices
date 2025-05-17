import { createProxyMiddleware } from 'http-proxy-middleware';

// desabilita parsing automático do Next
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// configura o middleware
const proxy = createProxyMiddleware({
  target: 'http://localhost:8080', // seu backend
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '', // retira o prefixo /api/proxy
  },
});

export default function handler(req, res) {
  // dispara o proxy
  return proxy(req, res, (err) => {
    if (err) {
      console.error('Proxy error:', err);
      res.status(500).end('Internal Proxy Error');
    }
  });
}