export const WA_NUMBER = "6281336664592";
export const WA_DISPLAY = "+62 813-3666-4592";
export const IG_URL = "https://www.instagram.com/apamurahbanget_/";
export const TIKTOK_URL = "https://www.tiktok.com/@apamurahbanget_";

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}