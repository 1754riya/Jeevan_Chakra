import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const RING_SPRING = { stiffness: 220, damping: 26, mass: 0.35 };

export default function CustomCursor() {
  const isTouch  = useRef(false);
  const [ready,      setReady]      = useState(false);
  const [isPointer,  setIsPointer]  = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);
  const rx = useSpring(mx, RING_SPRING);
  const ry = useSpring(my, RING_SPRING);

  useEffect(() => {
    if (
      'ontouchstart' in window ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    ) {
      isTouch.current = true;
      return;
    }

    const style = document.createElement('style');
    style.id = '__jc_cursor';
    style.textContent =
      'html,html *{cursor:none!important}' +
      'input,textarea,select{cursor:text!important}';
    document.head.appendChild(style);

    const onMove = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setReady(true); // React 18 deduplicates; avoids stale-closure check
    };

    const onOver = (e) => {
      const hit = e.target.closest(
        'a,button,[role="button"],[tabindex]:not([tabindex="-1"]),' +
        'input,select,textarea,label,[data-cursor]'
      );
      setIsPointer(!!hit);
    };

    const onDown = () => setIsClicking(true);
    const onUp   = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      document.getElementById('__jc_cursor')?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouch.current) return null;

  return (
    <>
      {/* Trailing ring — spring lag, expands on interactive elements */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998]"
        style={{
          border: '1.5px solid rgba(99,102,241,0.5)',
          x: rx,
          y: ry,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:           isPointer ? 46 : 32,
          height:          isPointer ? 46 : 32,
          opacity:         ready ? (isPointer ? 0.7 : 0.4) : 0,
          scale:           isClicking ? 0.75 : 1,
          borderColor:     isPointer ? 'rgba(99,102,241,0.85)' : 'rgba(99,102,241,0.5)',
          backgroundColor: isPointer ? 'rgba(99,102,241,0.06)' : 'rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />

      {/* Dot — precise, instant, glowing */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999]"
        style={{
          x: mx,
          y: my,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width:           isPointer ? 10 : 7,
          height:          isPointer ? 10 : 7,
          opacity:         ready ? 1 : 0,
          scale:           isClicking ? 0.5 : 1,
          backgroundColor: isPointer ? '#818cf8' : '#6366f1',
          boxShadow:       isPointer
            ? '0 0 10px 3px rgba(129,140,248,0.75), 0 0 22px 6px rgba(99,102,241,0.35)'
            : '0 0 6px 2px rgba(99,102,241,0.6)',
        }}
        transition={{ duration: 0.07 }}
      />
    </>
  );
}
