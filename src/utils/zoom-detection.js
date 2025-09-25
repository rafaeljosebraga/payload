// Utilitário para detectar e lidar com mudanças de zoom do browser
export function setupZoomDetection() {
  let lastInnerWidth = window.innerWidth;
  let lastOuterWidth = window.outerWidth;
  let lastDevicePixelRatio = window.devicePixelRatio;
  
  function detectZoomChange() {
    const currentInnerWidth = window.innerWidth;
    const currentOuterWidth = window.outerWidth;
    const currentDevicePixelRatio = window.devicePixelRatio;
    
    // Detecta mudança no zoom
    const zoomChanged = Math.abs(currentDevicePixelRatio - lastDevicePixelRatio) > 0.01;
    const sizeChanged = Math.abs(currentInnerWidth - lastInnerWidth) > 10;
    
    if (zoomChanged || sizeChanged) {
      console.log('Zoom change detected, resetting styles...');
      
      // Reset completo dos estilos
      document.documentElement.style.fontSize = '';
      document.body.classList.remove('high-dpi-adjusted');
      
      // Force reflow
      document.body.offsetHeight;
      
      // Reaplica os estilos se necessário após um delay
      setTimeout(() => {
        // Só aplica ajustes em monitores de alta densidade, não em zoom do browser
        if (currentDevicePixelRatio >= 1.5 && window.screen.width >= 1920) {
          const isHighDensityMonitor = window.screen.width >= 1920 && window.screen.height >= 1080;
          
          if (isHighDensityMonitor) {
            let scale = 0.9;
            if (currentDevicePixelRatio >= 2) scale = 0.85;
            if (window.screen.width >= 2560) scale = 0.8;
            
            document.documentElement.style.fontSize = `${16 * scale}px`;
            document.body.classList.add('high-dpi-adjusted');
          }
        }
      }, 150);
      
      lastInnerWidth = currentInnerWidth;
      lastOuterWidth = currentOuterWidth;
      lastDevicePixelRatio = currentDevicePixelRatio;
    }
  }
  
  // Múltiplos listeners para capturar diferentes tipos de mudança
  window.addEventListener('resize', detectZoomChange);
  window.addEventListener('orientationchange', detectZoomChange);
  
  // Listener para mudanças na viewport visual (zoom)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', detectZoomChange);
  }
  
  // Polling backup para garantir detecção
  const pollInterval = setInterval(detectZoomChange, 1000);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', detectZoomChange);
    window.removeEventListener('orientationchange', detectZoomChange);
    if (window.visualViewport) {
      window.visualViewport.removeEventListener('resize', detectZoomChange);
    }
    clearInterval(pollInterval);
  };
}