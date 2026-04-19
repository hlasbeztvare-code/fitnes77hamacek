export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' = 'light') => {
  if (typeof window === 'undefined' || !window.navigator || !window.navigator.vibrate) return;
  const patterns = { 
    light: 10, 
    medium: 30, 
    heavy: 50, 
    success: [10, 50, 20] 
  };
  try { window.navigator.vibrate(patterns[type]); } catch (_e) {}
};
