const API_BASE = (
  import.meta.env.VITE_BASE_URL ||
  import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
  ""
).trim();

export function getImageUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  if (!API_BASE) return path;

  const fullUrl = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
  console.log("getImageUrl:", path, "->", fullUrl);
  return fullUrl;
}
