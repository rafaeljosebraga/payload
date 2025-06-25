
import React from 'react';
import { ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-40 md:pb-56 overflow-hidden bg-gradient-to-br from-ndti-950 via-ndti-900 to-ndti-800">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ifnmg-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-ndti-700/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
        <div className="absolute -top-4 left-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white mb-6 group cursor-pointer transition-all hover:bg-white/20">
              <Sparkles className="w-4 h-4 mr-2 group-hover:text-yellow-300 transition-colors" />
              <span>Transformando ideias em inovação</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Núcleo de <span className="text-transparent bg-clip-text bg-gradient-to-r from-ndti-300 to-ifnmg-blue">Desenvolvimento</span> Tecnológico e Inovação
            </h1>
            <p className="text-md sm:text-lg md:text-xl text-gray-200 mb-6 md:mb-8 leading-relaxed max-w-lg">
              Transformando ideias em soluções tecnológicas inovadoras para o IFNMG Campus Montes Claros e toda comunidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#servicos" 
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-ifnmg-blue text-white rounded-md hover:bg-ndti-700 hover:shadow-lg hover:shadow-ndti-700/30 transition-all duration-300 flex items-center group"
              >
                Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contato" 
                className="px-5 sm:px-6 py-2.5 sm:py-3 border border-white/30 text-white rounded-md hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300 flex items-center group"
              >
                Entre em Contato
                <Zap className="ml-2 h-5 w-5 group-hover:text-yellow-300 transition-colors" />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center animate-fade-in-right">
            <div className="relative w-full max-w-md transform transition-all duration-500 hover:scale-105 hover:-rotate-1">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-ifnmg-blue via-ndti-500 to-ndti-700 opacity-75 blur-lg animate-[pulse_4s_ease-in-out_infinite]"></div>
              <div className="relative bg-ndti-900/50 backdrop-blur-sm p-2 sm:p-4 rounded-lg shadow-2xl border border-white/10">
                <AspectRatio ratio={16/10} className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="Inovação Tecnológica" 
                    className="rounded-lg w-full h-full object-cover transform transition-transform hover:scale-105 duration-500 ease-in-out"
                    loading="lazy"
                  />
                </AspectRatio>

                <div className="absolute -bottom-4 -right-4 bg-ndti-800/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg border border-white/10 transition-transform hover:scale-110 hover:rotate-12 cursor-pointer group">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:text-ndti-300 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Onda inferior - agora posicionada mais abaixo */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#f9fafb" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <style>
          {`
            :root {
              --path-fill: #f9fafb;
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default HeroSection;
