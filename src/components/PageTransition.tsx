'use client';

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

let osmoCreated = false;
function ensureCustomEase() {
  if (!osmoCreated && typeof window !== 'undefined') {
    CustomEase.create('osmo', '0.625, 0.05, 0, 1');
    osmoCreated = true;
  }
}

// ─── Context ───────────────────────────────────────────

interface TransitionContextValue {
  navigateTo: (href: string) => void;
  isTransitioning: boolean;
  /** Internal: called by TransitionContent to register its refs */
  _register: (refs: TransitionRefs) => void;
}

interface TransitionRefs {
  page: HTMLDivElement;
  wrapper: HTMLDivElement;
  middle: HTMLDivElement;
  overlay: HTMLDivElement;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigateTo: () => {},
  isTransitioning: false,
  _register: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

// ─── Provider (wraps everything, including Navbar) ─────

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const transitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const refsRef = useRef<TransitionRefs | null>(null);

  useEffect(() => {
    ensureCustomEase();
  }, []);

  const _register = useCallback((refs: TransitionRefs) => {
    refsRef.current = refs;
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      if (transitioningRef.current) return;

      const targetPath = href.split('#')[0] || '/';
      const hash = href.includes('#') ? href.split('#')[1] : null;

      // Same page → just scroll to hash
      if (targetPath === pathname || (href.startsWith('/#') && pathname === '/')) {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      const refs = refsRef.current;
      if (!refs) {
        router.push(href);
        return;
      }

      transitioningRef.current = true;
      setIsTransitioning(true);

      ensureCustomEase();

      const { page, wrapper, middle, overlay } = refs;

      // ── 1. Freeze current page into snapshot ──
      const scrollY = window.scrollY || 0;

      // Copy page HTML into the wrapper overlay
      wrapper.innerHTML = page.innerHTML;
      const inner = wrapper.firstElementChild as HTMLElement;
      if (inner) {
        inner.style.transform = `translateY(${-scrollY}px)`;
      }

      // ── 2. Set up layers ──
      gsap.set(overlay, { autoAlpha: 1, pointerEvents: 'auto' });

      // Wrapper = snapshot of current page (top card, z-index 3)
      gsap.set(wrapper, {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        overflow: 'clip',
        zIndex: 3,
        willChange: 'transform',
        clipPath: 'rect(0% 100% 100% 0% round 0em)',
      });

      // Middle = accent color layer (middle card, z-index 2)
      gsap.set(middle, {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        zIndex: 2,
        willChange: 'transform',
        clipPath: 'rect(0% 100% 100% 0% round 0em)',
      });

      // Page = will show new content (bottom card, z-index 1)
      gsap.set(page, {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100vh',
        overflow: 'clip',
        zIndex: 1,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        clipPath: 'rect(0% 100% 100% 0% round 0em)',
      });

      // ── 3. Navigate (new content renders behind snapshot) ──
      window.scrollTo(0, 0);
      router.push(targetPath);

      // ── 4. Stacked cards animation ──
      const tl = gsap.timeline({
        onComplete: () => {
          wrapper.innerHTML = '';
          // Reset only GSAP-animated properties, keep React style props intact
          gsap.set(overlay, { autoAlpha: 0, pointerEvents: 'none' });
          gsap.set(wrapper, {
            autoAlpha: 0, scale: 1, yPercent: 0,
            clipPath: 'none', zIndex: '', willChange: '',
          });
          gsap.set(middle, {
            autoAlpha: 0, scale: 1, yPercent: 0,
            clipPath: 'none', zIndex: '', willChange: '',
          });
          gsap.set(page, {
            clearProps: 'position,top,left,right,width,height,overflow,zIndex,willChange,backfaceVisibility,scale,yPercent,clipPath,autoAlpha',
          });
          transitioningRef.current = false;
          setIsTransitioning(false);
        },
      });

      // Phase 1: All three scale down + corners round
      tl.to([wrapper, middle, page], {
        clipPath: 'rect(0% 100% 100% 0% round 1em)',
        duration: 0.8,
      }, 0);

      tl.to(wrapper, {
        scale: 0.95,
        yPercent: 20,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: 'auto',
      }, '<');

      tl.to(middle, {
        scale: 0.875,
        yPercent: 10,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: 'auto',
      }, '<');

      tl.to(page, {
        scale: 0.8,
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: 'auto',
      }, '<');

      // Phase 2: Cards drop off one by one
      tl.to(wrapper, {
        yPercent: 130,
        duration: 1.2,
        ease: 'osmo',
      }, '< 0.9');

      tl.to(middle, {
        yPercent: 120,
        duration: 1.2,
        ease: 'osmo',
      }, '< 0.15');

      // Phase 3: New page scales back to 1
      tl.to(page, {
        scale: 1,
        yPercent: 0,
        duration: 1.2,
        ease: 'expo.inOut',
        overwrite: 'auto',
      }, '< 0.15');

      // Phase 4: Remove rounded corners
      tl.to([wrapper, middle, page], {
        clipPath: 'rect(0% 100% 100% 0% round 0em)',
        duration: 0.8,
        ease: 'osmo',
      }, '> -0.8');
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigateTo, isTransitioning, _register }}>
      {children}
    </TransitionContext.Provider>
  );
}

// ─── Content wrapper (wraps only page content, not Navbar) ──

export function TransitionContent({ children }: { children: React.ReactNode }) {
  const { _register } = useContext(TransitionContext);

  const pageRef = useRef<HTMLDivElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const middleRef = useRef<HTMLDivElement>(null!);
  const overlayRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (pageRef.current && wrapperRef.current && middleRef.current && overlayRef.current) {
      _register({
        page: pageRef.current,
        wrapper: wrapperRef.current,
        middle: middleRef.current,
        overlay: overlayRef.current,
      });
    }
  }, [_register]);

  return (
    <>
      {/* Overlay: holds snapshot + middle layer during transition */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0,
          overflow: 'clip',
        }}
      >
        {/* Middle accent layer */}
        <div
          ref={middleRef}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--color-accent)',
            opacity: 0,
            transformOrigin: 'center center',
          }}
        />
        {/* Snapshot of current page */}
        <div
          ref={wrapperRef}
          style={{
            position: 'fixed',
            inset: 0,
            overflow: 'clip',
            backgroundColor: 'var(--color-cream, #f5f5f0)',
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Actual page content */}
      <div ref={pageRef} style={{ transformOrigin: 'center center' }}>
        {children}
      </div>
    </>
  );
}

// Default export for backwards compat
export default TransitionProvider;
