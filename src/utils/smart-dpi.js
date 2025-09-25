// Detector inteligente de DPI e configuração de tela
export function setupSmartDPI() {
  function detectAndApplyScale() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    // Calcula escala automática baseada em múltiplos fatores
    let autoScale = 1.0;
    
    // DETECÇÃO DE TIPO DE TELA
    // Baseado na densidade de pixels e tamanho físico estimado
    const physicalWidth = screenWidth / dpr;
    const physicalHeight = screenHeight / dpr;
    const diagonalInches = Math.sqrt(physicalWidth**2 + physicalHeight**2) / 96;
    
    // CATEGORIA 1: Laptops pequenos (11-14")
    if (diagonalInches < 15 && width < 1400) {
      autoScale = 1.2; // Conteúdo 20% maior
    }
    // CATEGORIA 2: Laptops médios (15-16")
    else if (diagonalInches >= 15 && diagonalInches < 17 && width < 1600) {
      autoScale = 1.1; // Conteúdo 10% maior
    }
    // CATEGORIA 3: Monitores padrão (17-24")
    else if (diagonalInches >= 17 && diagonalInches < 25) {
      autoScale = 1.0; // Tamanho padrão
    }
    // CATEGORIA 4: Monitores grandes (25-32") - INCLUINDO iMac 27"
    else if (diagonalInches >= 25 && diagonalInches < 33) {
      autoScale = 1.0; // Mantém padrão, layout resolve espaçamento
    }
    // CATEGORIA 5: Monitores ultrawide/grandes (32"+)
    else if (diagonalInches >= 33) {
      autoScale = 0.95; // Ligeiramente menor
    }
    
    // AJUSTES POR SCALING DO SISTEMA OPERACIONAL
    // Para tela 1920x1080 com Windows scaling, precisamos AUMENTAR o conteúdo
    if (dpr >= 1.20 && dpr <= 1.30) {
      // Scaling 125% - usuário já precisa de conteúdo maior
      if (screenWidth === 1920 && screenHeight === 1080) {
        autoScale *= 1.25; // Aplica os 125% que o usuário precisa
      } else {
        autoScale *= 1.05; // Aumenta um pouco para outras resoluções
      }
    } else if (dpr >= 1.45 && dpr <= 1.55) {
      // Scaling 150% - mantém proporcional
      autoScale *= 1.15;
    } else if (dpr >= 1.70 && dpr <= 1.80) {
      // Scaling 175% - mantém proporcional
      autoScale *= 1.1;
    } else if (dpr >= 1.95 && dpr <= 2.05) {
      // Scaling 200% (ou Retina) - mantém proporcional
      autoScale *= 1.05;
    }
    
    // AJUSTES POR LARGURA DE VIEWPORT
    // Para casos específicos que podem não ter sido cobertos
    if (width < 900) {
      autoScale *= 1.1; // Telas estreitas precisam de mais conteúdo
    } else if (width > 2200) {
      autoScale *= 0.9; // Telas muito largas precisam de menos conteúdo
    }
    
    // LIMITES DE SEGURANÇA
    // Garante que a escala não fique muito extrema
    autoScale = Math.max(0.7, Math.min(1.4, autoScale));
    
    // APLICAÇÃO DA ESCALA
    const finalFontSize = 16 * autoScale;
    document.documentElement.style.fontSize = `${finalFontSize}px`;
    
    // PROPRIEDADES CSS PARA USO NO CÓDIGO
    document.documentElement.style.setProperty('--auto-scale', autoScale.toString());
    document.documentElement.style.setProperty('--base-font-size', `${finalFontSize}px`);
    document.documentElement.style.setProperty('--estimated-screen-size', `${diagonalInches.toFixed(1)}in`);
    
    // CLASSES CSS PARA DIFERENTES CATEGORIAS
    const body = document.body;
    body.classList.remove('screen-laptop-small', 'screen-laptop-medium', 'screen-monitor-standard', 'screen-monitor-large', 'screen-monitor-ultra');
    
    if (diagonalInches < 15) {
      body.classList.add('screen-laptop-small');
    } else if (diagonalInches < 17) {
      body.classList.add('screen-laptop-medium');
    } else if (diagonalInches < 25) {
      body.classList.add('screen-monitor-standard');
    } else if (diagonalInches < 33) {
      body.classList.add('screen-monitor-large'); // iMac 27" cai aqui
    } else {
      body.classList.add('screen-monitor-ultra');
    }
  }
  
  // EXECUÇÃO INICIAL
  detectAndApplyScale();
  
  // LISTENERS PARA MUDANÇAS
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(detectAndApplyScale, 200);
  };
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', () => {
    setTimeout(detectAndApplyScale, 300);
  });
  
  // FUNÇÃO DE LIMPEZA
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
}