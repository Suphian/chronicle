"use client";

import { useEffect, useSyncExternalStore } from "react";

// Original motion treatment inspired by the author's botanical-interface reference:
// https://x.com/DamonCrockett/status/2096694775856476231
// No artwork or animation code from that reference is reused.
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

const artwork = ".home-art img, .character-dossier-portrait img, .people-portrait img, .materials-images img, [data-motion-art]";
const cards = ".notebook-cards > a, .home-section-grid > a, .story-list a, [data-motion-card]";
const entrances = ".section-block > h2, .section-inner > h1, .world-page > h1, .atlas-detail-body, [data-motion-reveal]";
const selector = `${artwork}, ${cards}, ${entrances}, .atlas-pin, .atlas-detail`;

/** Progressive enhancement: content is fully visible before JS and without motion. */
export function MotionEnhancements() {
  const reduced = useSyncExternalStore(subscribe, snapshot, serverSnapshot);

  useEffect(() => {
    if (reduced || !window.IntersectionObserver || !Element.prototype.animate) return;
    const registered = new Set<Element>();
    const complete = new WeakSet<Element>();
    const visible = new Set<Element>();
    const animations = new Map<Element, Animation>();
    let cursorFrame = 0;
    let cursorTarget: HTMLElement | null = null;
    let cursorX = 50;
    let cursorY = 50;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const element = entry.target;
        if (!entry.isIntersecting) {
          visible.delete(element);
          animations.get(element)?.pause();
          continue;
        }
        visible.add(element);
        let animation = animations.get(element);
        if (!animation && !complete.has(element)) {
          const art = element.matches(artwork);
          const card = element.matches(cards);
          const frames: Keyframe[] = art
            ? [{ opacity: .65, clipPath: "inset(2% 3% 2% 3% round 18% 24% 15% 21%)", scale: "1.025" }, { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0%)", scale: "1" }]
            : card ? [{ opacity: .7, translate: "0 9px" }, { opacity: 1, translate: "0 0" }]
              : [{ opacity: .6 }, { opacity: 1 }];
          const siblings = element.parentElement ? [...element.parentElement.children] : [];
          const delay = card ? Math.min(Math.max(siblings.indexOf(element), 0) * 45, 180) : 0;
          animation = element.animate(frames, { duration: art ? 1200 : card ? 680 : 550, delay, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "none" });
          animations.set(element, animation);
          const finish = () => {
            if (animations.get(element) !== animation) return;
            complete.add(element);
            animations.delete(element);
            visible.delete(element);
            observer.unobserve(element);
          };
          void animation.finished.then(finish, finish);
        }
        if (document.visibilityState === "visible") animation?.play();
        else animation?.pause();
      }
    }, { threshold: 0.08 });

    const register = (element: Element) => {
      // The illustrated reader stays still; narration and reading position have their own UI.
      if (registered.has(element) || element.closest(".book-shell")) return;
      registered.add(element);
      if (element.matches(".atlas-pin")) element.classList.add("motion-map-pin");
      else if (element.matches(".atlas-detail")) element.classList.add("motion-panel");
      else {
        element.classList.add(element.matches(artwork) ? "motion-artwork" : element.matches(cards) ? "motion-card" : "motion-entrance");
        observer.observe(element);
      }
    };
    const scan = (root: Element | Document) => {
      if (root instanceof Element && root.matches(selector)) register(root);
      root.querySelectorAll(selector).forEach(register);
    };
    const remove = (element: Element) => {
      observer.unobserve(element);
      animations.get(element)?.cancel();
      animations.delete(element);
      visible.delete(element);
      registered.delete(element);
      element.classList.remove("motion-map-pin", "motion-panel", "motion-artwork", "motion-card", "motion-entrance");
      if (element instanceof HTMLElement) {
        element.style.removeProperty("--motion-x");
        element.style.removeProperty("--motion-y");
      }
    };
    scan(document);
    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.removedNodes) if (node instanceof Element) {
          for (const element of registered) if (node === element || node.contains(element)) remove(element);
        }
        for (const node of record.addedNodes) if (node instanceof Element) scan(node);
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const visibility = () => {
      if (document.visibilityState !== "visible") {
        cancelAnimationFrame(cursorFrame);
        cursorFrame = 0;
      }
      for (const [element, animation] of animations) {
        if (document.visibilityState === "visible" && visible.has(element)) animation.play();
        else animation.pause();
      }
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || document.visibilityState !== "visible") return;
      const card = event.target instanceof Element ? event.target.closest<HTMLElement>(".motion-card") : null;
      if (!card) return;
      const bounds = card.getBoundingClientRect();
      cursorTarget = card;
      cursorX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / Math.max(bounds.width, 1) * 100));
      cursorY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / Math.max(bounds.height, 1) * 100));
      if (!cursorFrame) cursorFrame = requestAnimationFrame(() => {
        if (cursorTarget?.isConnected) {
          cursorTarget.style.setProperty("--motion-x", `${cursorX}%`);
          cursorTarget.style.setProperty("--motion-y", `${cursorY}%`);
        }
        cursorFrame = 0;
      });
    };
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("pointermove", pointer, { passive: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("pointermove", pointer);
      cancelAnimationFrame(cursorFrame);
      for (const element of registered) remove(element);
    };
  }, [reduced]);

  return null;
}
