export const PUBLIC_URL = process.env.PUBLIC_URL || '';

export function withPublicUrl(path) {
  const base = PUBLIC_URL;
  if (!path) return base;

  // Leave absolute URLs untouched.
  if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (!base || base === '.') return cleanPath;

  // If PUBLIC_URL is a full URL, we can still safely append paths to it.
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}${cleanPath}`;
}

export function routerBasename() {
  const base = PUBLIC_URL;
  if (!base || base === '.') return '/';

  // If base is a full URL, use only its pathname part.
  if (base.startsWith('http://') || base.startsWith('https://')) {
    try {
      return (new URL(base).pathname || '/').replace(/\/$/, '') || '/';
    } catch {
      return '/';
    }
  }

  return base.replace(/\/$/, '') || '/';
}


