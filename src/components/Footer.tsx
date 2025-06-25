
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ndti-950 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Seção de informações do NDTI */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">NDTI</h3>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
              Núcleo de Desenvolvimento Tecnológico e Inovação do IFNMG Campus Montes Claros
            </p>
            <div className="flex space-x-4">
              {/* Ícones de redes sociais */}
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
          
          {/* Seção de links rápidos */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#sobre" className="text-gray-300 hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#projetos" className="text-gray-300 hover:text-white transition-colors">Projetos</a></li>
              <li><a href="#equipe" className="text-gray-300 hover:text-white transition-colors">Equipe</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Seção de links institucionais */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Links Institucionais</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li><a href="https://www.ifnmg.edu.br" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">IFNMG</a></li>
              <li><a href="https://www.ifnmg.edu.br/montesclaros" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Campus Montes Claros</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Portal do Aluno</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Portal do Servidor</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Biblioteca Virtual</a></li>
            </ul>
          </div>
          
          {/* Seção de newsletter */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
              Inscreva-se para receber novidades, atualizações sobre projetos e eventos.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="px-3 md:px-4 py-2 w-full bg-ndti-900 border border-ndti-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-ndti-300 text-white text-sm"
              />
              <button
                type="submit"
                className="bg-ifnmg-blue hover:bg-ndti-700 px-3 md:px-4 py-2 rounded-r-md transition-colors"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Rodapé com direitos autorais e links */}
        <div className="border-t border-ndti-800 mt-6 md:mt-10 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} NDTI - IFNMG Campus Montes Claros. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
