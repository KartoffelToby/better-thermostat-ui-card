// Load a custom element's module unless the element is already registered
// (e.g. by another card bundle on the same dashboard). The module is passed
// as a thunk with a literal import path so rollup can bundle it.
export async function ensureElementLoaded(
  tagName: string,
  load: () => Promise<unknown>,
): Promise<void> {
  if (customElements.get(tagName)) return;
  try {
    await load();
  } catch (e) {
    // Best-effort: don't break the card, the element just won't upgrade
    // until its module is available.
    console.warn(`Failed to dynamically import module for ${tagName}:`, e);
  }
}
