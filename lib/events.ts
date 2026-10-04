/** Tiny window-event bus so far-apart components can trigger shared UI. */
export const EVENTS = {
  toast: "portfolio:toast",
  resume: "portfolio:resume",
  palette: "portfolio:palette",
  party: "portfolio:party",
} as const;

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENTS.toast, { detail: message }));
}

export async function copyText(text: string, message = "Copied to clipboard") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    showToast("Couldn't copy — please copy it manually");
  }
}

/**
 * Opens the in-page résumé preview. Falls back to the normal link (new tab)
 * on phones, browsers without a PDF viewer, or ctrl/cmd/middle-clicks.
 */
export function openResume(e?: React.MouseEvent) {
  if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
  const pdfOk = "pdfViewerEnabled" in navigator ? navigator.pdfViewerEnabled : true;
  if (!pdfOk || window.innerWidth < 640) return;
  e?.preventDefault();
  window.dispatchEvent(new CustomEvent(EVENTS.resume));
}

export function resumeHref(path: string, cacheKey?: string) {
  return cacheKey ? `${path}?v=${cacheKey}` : path;
}
