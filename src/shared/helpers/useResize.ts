import { useState, useEffect } from 'react';

export const SCREEN_SM = 600;
export const SCREEN_MD = 768;
export const SCREEN_LG = 1024;
export const SCREEN_XL = 1400;
export const SCREEN_XXL = 1920;

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: UIEvent) => {
      const w = event.target as Window
      setWidth(w.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width > SCREEN_SM,
    isScreenMd: width > SCREEN_MD,
    isScreenLg: width > SCREEN_LG,
    isScreenXl: width > SCREEN_XL,
    isScreenXxl: width > SCREEN_XXL,
  };
};