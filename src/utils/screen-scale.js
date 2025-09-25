// Utility para ajustar automaticamente a escala baseada na densidade da tela
export function adjustScreenScale() {
  const devicePixelRatio = window.devicePixelRatio || 1;
  const screenWidth = window.screen.width;
  const viewportWidth = window.innerWidth;
  
  // Detecta se é uma tela de alta densidade
  if (devicePixelRatio >= 1.5) {
    // Aplica uma escala menor para telas de alta densidade
    let scale = 0.9;
    
    if (devicePixelRatio >= 2) {
      scale = 0.85;
    }
    
    if (screenWidth >= 1920) {
      scale = 0.8;
    }
    
    // Aplica a escala no root element
    document.documentElement.style.fontSize = `${16 * scale}px`;
    
    // Adiciona uma classe CSS para identificação
    document.body.classList.add('high-dpi-adjusted');
  }
  
  // Detecta monitores ultrawide
  const aspectRatio = screenWidth / window.screen.height;
  if (aspectRatio > 2.3) {
    document.body.classList.add('ultrawide-display');
  }
}

// Função para resetar a escala
export function resetScreenScale() {
  document.documentElement.style.fontSize = '';
  document.body.classList.remove('high-dpi-adjusted', 'ultrawide-display');
}

// Auto-executa quando a janela carrega
if (typeof window !== 'undefined') {
  window.addEventListener('load', adjustScreenScale);
  window.addEventListener('resize', adjustScreenScale);
}