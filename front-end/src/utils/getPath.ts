export function getPath(url: string) {
  if (typeof url !== "string") {
    return "#";
  }
  try {
    if (!url) return "#";
    if (url?.startsWith("#") || url?.startsWith("/") || url?.startsWith("?")) {
      return url;
    }
    const urlObject = new URL(url);
    return urlObject?.pathname || urlObject;
  } catch (error) {
    if (url?.startsWith("/")) {
      return url;
    }
    console.error("Invalid URL:", error, url);
    return "#";
  }
}
