import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationProgressBar: React.FC = () => {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start progress immediately on route change
    setVisible(true);
    setProgress(30);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 60);

    const timer2 = setTimeout(() => {
      setProgress(100);
    }, 180);

    const timer3 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 380);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none bg-transparent overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#3B4FD9] via-[#4D6BFF] to-[#7B5CE8] shadow-[0_0_8px_rgba(59,79,217,0.8)] transition-all ease-out"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? '120ms' : '180ms',
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
};
