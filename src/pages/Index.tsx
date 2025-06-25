
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import NewsCarouselSection from '@/components/NewsCarouselSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Controlar o progresso de rolagem para o indicador de progresso
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Criar referências para cada seção com threshold e rootMargin para melhor detecção
  const [heroRef, heroInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [newsRef, newsInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [teamRef, teamInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, rootMargin: "-100px 0px" });

  // Atualizar seção ativa com base em qual seção está em visualização
  useEffect(() => {
    if (heroInView) dispatchSectionEvent('hero');
    else if (newsInView) dispatchSectionEvent('novidades');
    else if (aboutInView) dispatchSectionEvent('sobre');
    else if (projectsInView) dispatchSectionEvent('projetos');
    else if (teamInView) dispatchSectionEvent('equipe');
    else if (contactInView) dispatchSectionEvent('contato');
  }, [heroInView, newsInView, aboutInView, projectsInView, teamInView, contactInView]);

  // Função para despachar evento de mudança de seção
  const dispatchSectionEvent = (section: string) => {
    window.dispatchEvent(
      new CustomEvent('sectionChange', { detail: { section } })
    );
  };

  // Controlar progresso de rolagem para o indicador de progresso
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Implementar carregamento lazy para imagens
  useEffect(() => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // Navegador suporta lazy loading nativo
      lazyImages.forEach(img => {
        img.classList.add('lazy-loaded');
      });
    } else {
      // Fallback para navegadores que não suportam lazy loading nativo
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src || lazyImage.src;
            lazyImage.classList.add('lazy-loaded');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(img => {
        lazyImageObserver.observe(img);
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Indicador de progresso */}
      <div 
        className="progress-indicator"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <NavBar />
      <main>
        <div ref={heroRef}>
          <HeroSection />
        </div>
        <div ref={newsRef}>
          <NewsCarouselSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={projectsRef}>
          <ProjectsSection />
        </div>
        <div ref={teamRef}>
          <TeamSection />
        </div>
        <div ref={contactRef}>
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
