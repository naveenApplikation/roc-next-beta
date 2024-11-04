"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styles from "./BottomSheet.module.css";
import { usePathname } from "next/navigation";

type BottomSheetProps = {
  children: React.ReactNode;
};

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [initialY, setInitialY] = useState(0);
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const minY = 30; // Minimum Y position (distance from the top)

  const [{ y }, api] = useSpring(() => ({
    y: 0,
  }));

  useEffect(() => {
    const height = window.innerHeight;
    const initY = height * 0.6; // Start at 70% from the top (30% visible)
    alert(initY);
    setInitialY(initY);
    api.start({ y: initY, immediate: true });
  }, [api, pathname]);

  const bind = useDrag(
    ({
      last,
      movement: [, my],
      velocity: [, vy],
      direction: [, dy],
      cancel,
      memo = y.get(),
    }) => {
      if (initialY === 0) return; // Wait until initialY is set

      const isAtTop = y.get() <= minY + 1;
      const contentEl = contentRef.current;

      if (contentEl) {
        const scrollTop = contentEl.scrollTop;
        const scrollHeight = contentEl.scrollHeight;
        const clientHeight = contentEl.clientHeight;
        const isContentAtTop = scrollTop <= 0;
        const isContentAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        // Determine if we should handle the gesture or let the content scroll
        if (isAtTop) {
          if (
            (dy > 0 && isContentAtTop) || // Pulling down at top of content
            (dy < 0 && isContentAtBottom) // Pulling up at bottom of content
          ) {
            console.log(dy);
            // Allow the sheet to move
          } else {
            // Let the content handle the scroll
            cancel();
            return;
          }
        }
      }

      if (last) {
        if (my < -5 || (vy > 0 && dy < 0)) {
          // Snap to top (minY)
          api.start({ y: minY });
        } else if (my > 5 || (vy > 0 && dy > 0)) {
          // Snap to bottom (initialY)
          api.start({ y: initialY });
        } else {
          // Return to current position
          api.start({ y: y.get() });
        }
      } else {
        // During drag
        let newY = memo + my;
        newY = Math.max(minY, Math.min(newY, initialY)); // Clamp between minY and initialY
        api.start({ y: newY, immediate: true });
      }

      return memo;
    },
    {
      from: () => [0, y.get()],
      axis: "y",
      filterTaps: true,
      pointer: { touch: true },
      preventDefault: true,
    }
  );

  return (
    <animated.div
      className={styles.sheet}
      style={{
        transform: y.to((y) => `translateY(${y}px)`),
        borderRadius: y.to((py) => (py <= minY + 1 ? 0 : 16)),
      }}
      {...bind()}
      ref={sheetRef}
    >
      <animated.div
        className={styles.content}
        ref={contentRef}
        style={{
          overflowY: y.to((py) => (py <= minY + 1 ? "auto" : "hidden")),
          borderRadius: y.to((py) => (py <= minY + 1 ? 0 : 16)),
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  );
};

export default BottomSheet;
