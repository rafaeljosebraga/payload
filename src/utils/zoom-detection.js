// Sistema de proporções consistentes para todas as telas
export function setupProportionalScaling() {
  // Configuração base para proporções consistentes
  const BASE_WIDTH = 1440; // Largura de referência
  const MIN_SCALE = 0.5;   // Escala mínima (50%) - para telas muito pequenas
  const MAX_SCALE = 2.0;   // Escala máxima (200%) - para telas muito grandes
  
  function updateProportionalScaling() {
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    // Calcula escala baseada na largura da tela
    const widthScale = currentWidth / BASE_WIDTH;
    const constrainedScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, widthScale));
    
    // Calcula unidades fluidas baseadas no viewport (expandidas)
    const fluidUnit = Math.max(0.3, Math.min(4, currentWidth / 80)); // 0.3vw a 4vw
    const aspectRatio = currentWidth / currentHeight;
    
    // Define propriedades CSS customizadas para proporções consistentes
    const root = document.documentElement;
    
    // Escala principal
    root.style.setProperty('--scale-factor', constrainedScale.toString());
    
    // Unidades fluidas expandidas
    root.style.setProperty('--fluid-unit', `${fluidUnit}px`);
    root.style.setProperty('--fluid-vw', `${Math.max(0.2, Math.min(2.5, currentWidth / 800))}vw`);
    
    // Espaçamentos proporcionais
    root.style.setProperty('--spacing-xs', `${constrainedScale * 0.25}rem`);
    root.style.setProperty('--spacing-sm', `${constrainedScale * 0.5}rem`);
    root.style.setProperty('--spacing-md', `${constrainedScale * 1}rem`);
    root.style.setProperty('--spacing-lg', `${constrainedScale * 1.5}rem`);
    root.style.setProperty('--spacing-xl', `${constrainedScale * 2}rem`);
    root.style.setProperty('--spacing-2xl', `${constrainedScale * 3}rem`);
    
    // Tamanhos de fonte proporcionais
    root.style.setProperty('--text-xs', `${constrainedScale * 0.75}rem`);
    root.style.setProperty('--text-sm', `${constrainedScale * 0.875}rem`);
    root.style.setProperty('--text-base', `${constrainedScale * 1}rem`);
    root.style.setProperty('--text-lg', `${constrainedScale * 1.125}rem`);
    root.style.setProperty('--text-xl', `${constrainedScale * 1.25}rem`);
    root.style.setProperty('--text-2xl', `${constrainedScale * 1.5}rem`);
    root.style.setProperty('--text-3xl', `${constrainedScale * 1.875}rem`);
    root.style.setProperty('--text-4xl', `${constrainedScale * 2.25}rem`);
    
    // Container responsivo expandido - alinhado com Tailwind
    const containerMaxWidth = Math.min(currentWidth * 0.95, 1400); // Alinhado com tailwind.config.ts
    root.style.setProperty('--container-max-width', `${containerMaxWidth}px`);
    
    // Padding responsivo baseado na tela - alinhado com Tailwind
    const responsivePadding = Math.max(16, Math.min(24, currentWidth * 0.02));
    root.style.setProperty('--container-padding', `${responsivePadding}px`);
    
    // Adiciona classe para identificar o tipo de tela (expandido)
    document.body.classList.remove('screen-xxs', 'screen-xs', 'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-xxl');
    
    if (currentWidth < 480) {
      document.body.classList.add('screen-xxs'); // Telas muito pequenas
    } else if (currentWidth < 640) {
      document.body.classList.add('screen-xs');
    } else if (currentWidth < 768) {
      document.body.classList.add('screen-sm');
    } else if (currentWidth < 1024) {
      document.body.classList.add('screen-md');
    } else if (currentWidth < 1280) {
      document.body.classList.add('screen-lg');
    } else if (currentWidth < 1920) {
      document.body.classList.add('screen-xl');
    } else {
      document.body.classList.add('screen-xxl'); // Telas muito grandes
    }
    
    console.log(`Escala proporcional: ${constrainedScale.toFixed(2)}x para ${currentWidth}px`);
  }
  
  // Debounce para performance
  let resizeTimeout;
  function debouncedUpdate() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(updateProportionalScaling, 100);
  }
  
  // Inicialização
  updateProportionalScaling();
  
  // Event listeners
  window.addEventListener('resize', debouncedUpdate);
  window.addEventListener('orientationchange', () => {
    setTimeout(updateProportionalScaling, 200);
  });
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', debouncedUpdate);
    window.removeEventListener('orientationchange', updateProportionalScaling);
    clearTimeout(resizeTimeout);
  };
}