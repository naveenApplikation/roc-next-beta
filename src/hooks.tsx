'use client'

import { useEffect } from 'react';

const useScrollRestoration = () => {
  useEffect(() => {
    const handleLoad = () => {
      const scrollpos = localStorage.getItem('scrollpos');
      if (scrollpos) {
        window.scrollTo(0, parseInt(scrollpos));
      }
    };

    const handleBeforeUnload = () => {
      localStorage.setItem('scrollpos', window.scrollY.toString());
    };

    window.addEventListener('DOMContentLoaded', handleLoad);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('DOMContentLoaded', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This hook doesn't return any value
};

export default useScrollRestoration;