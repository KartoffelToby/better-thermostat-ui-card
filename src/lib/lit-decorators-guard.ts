export * from "lit/decorators.js";
import { customElement as baseCustomElement } from "lit/decorators.js";

export function customElement(name: string) {
  const base = baseCustomElement(name as any);
  return function (classOrDescriptor: any, descriptor?: any) {
    const registry = (window as any).customElements;
    if (!registry) {
      return base(classOrDescriptor, descriptor);
    }
    const orig = registry.define;
    if (typeof orig !== "function") {
      return base(classOrDescriptor, descriptor);
    }
    const guarded = function (n: string, ctor: any, opts?: any) {
      try {
        if (typeof registry.get === "function" && registry.get(n)) return;
      } catch (_err) {
        // fallthrough
      }
      return orig.call(registry, n, ctor, opts);
    };
    registry.define = guarded;
    try {
      return base(classOrDescriptor, descriptor);
    } finally {
      registry.define = orig;
    }
  };
}
