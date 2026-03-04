"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const dotX  = useSpring(rawX, { stiffness: 800, damping: 50 });
  const dotY  = useSpring(rawY, { stiffness: 800, damping: 50 });
  const ringX = useSpring(rawX, { stiffness: 200, damping: 28 });
  const ringY = useSpring(rawY, { stiffness: 200, damping: 28 });

  // Only activate on fine-pointer (mouse) devices
  const isFinePtrRef = useRef(false);

  useEffect(() => {
    isFinePtrRef.current = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePtrRef.current) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const updateHover = () => {
      const onOver = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        setHovering(!!el.closest("a, button, [role='button'], [data-cursor='pointer']"));
      };
      document.addEventListener("mouseover", onOver);
      return () => document.removeEventListener("mouseover", onOver);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup",   onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    const cleanHover = updateHover();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup",   onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cleanHover();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches)
    return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-gold/50"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width:  hovering ? 44 : clicking ? 20 : 32,
          height: hovering ? 44 : clicking ? 20 : 32,
          borderColor: hovering ? "rgba(212,160,23,0.9)" : "rgba(212,160,23,0.4)",
          backgroundColor: hovering ? "rgba(212,160,23,0.08)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      />

      {/* Inner gold dot — snappy */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-gold"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          opacity: visible ? 1 : 0,
          width: clicking ? 5 : hovering ? 3 : 6,
          height: clicking ? 5 : hovering ? 3 : 6,
        }}
      />
    </>
  );
}
