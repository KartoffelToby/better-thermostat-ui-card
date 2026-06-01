declare global {
  interface Window {
    customCards?: Array<{ type: string }>;
  }
}

export async function ensureElementLoaded(tagName: string, modulePath: string): Promise<void> {
  // If the custom element is already registered, nothing to do
  // check if mushroom is installed by checking for mushroom-card
  //if ((window?.customCards ?? []).filter((card) => card.type === "mushroom-empty-card").length === 0) return;
  if (customElements.get(tagName)) return;

  try {
    await import(modulePath);
  } catch (e) {
    // If import fails, log a warning (non-fatal)
    // We don't want to throw here and break the app; at worst the element won't be upgraded until module is available
    // This is a best-effort dynamic load.
    console.warn(`Failed to dynamically import ${modulePath} for ${tagName}:`, e);
  }
}
