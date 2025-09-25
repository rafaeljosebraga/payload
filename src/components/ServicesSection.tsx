
import React from 'react';
import { Code, Database, Server, Monitor, Cpu, Smartphone, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const ServicesSection: React.FC = () => {
  // Criar entradas de animação para cada cartão de serviço com thresholds escalonados
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Array com os serviços oferecidos
  const services = [
    {
      icon: <Code className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Desenvolvimento de Software",
      description: "Criamos sistemas personalizados, sites e aplicações web para atender às necessidades específicas da instituição e seus projetos."
    },
    {
      icon: <Database className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Banco de Dados",
      description: "Modelagem, implementação e otimização de bancos de dados para garantir a segurança e eficiência no armazenamento de informações."
    },
    {
      icon: <Server className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Infraestrutura de TI",
      description: "Planejamento e implementação de soluções de infraestrutura tecnológica, incluindo servidores e redes."
    },
    {
      icon: <Monitor className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Suporte Técnico",
      description: "Oferecemos suporte técnico especializado para resolução de problemas e manutenção de sistemas."
    },
    {
      icon: <Cpu className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Automação de Processos",
      description: "Desenvolvimento de soluções para automatizar e otimizar processos administrativos e acadêmicos."
    },
    {
      icon: <Smartphone className="h-10 w-10 sm:h-12 sm:w-12 text-ifnmg-blue mb-4 transition-transform group-hover:scale-110 duration-300" />,
      title: "Aplicações Móveis",
      description: "Criação de aplicativos móveis para facilitar o acesso a serviços e informações da instituição."
    }
  ];

  return (
    <section id="servicos" className="py-proportional-xl" ref={sectionRef}>
      <div className="proportional-container">
        {/* Cabeçalho da seção */}
        <div className="max-w-3xl mx-auto text-center mb-proportional-xl">
          <div className="inline-flex items-center px-proportional-sm py-proportional-xs rounded-full bg-ifnmg-blue/10 text-ifnmg-blue mb-proportional-sm">
            <Zap className="w-4 h-4 mr-2 pulse-glow" />
            <span className="text-proportional-sm">Nossos Serviços</span>
          </div>
          <h2 className="section-heading font-bold text-ndti-900">
            Soluções tecnológicas para transformar seu projeto
          </h2>
          <p className="text-proportional-base text-gray-600">
            Desenvolvemos soluções inovadoras para atender às necessidades específicas da comunidade acadêmica
          </p>
        </div>
        
        {/* Grade de cartões de serviços */}
        <div className="grid-proportional">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={cn(
                "card-proportional bg-white shadow-md border border-gray-100 hover:border-ndti-300 group transition-all duration-500 hover:-translate-y-2 hover:shadow-xl",
                sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="content-heading font-semibold text-center text-ndti-800 group-hover:text-ifnmg-blue transition-colors">{service.title}</h3>
              <p className="text-proportional-sm text-gray-600 text-center">{service.description}</p>
              <div className="mt-6 flex justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center transform opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  {/* ArrowRight foi removido daqui junto com o import */}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botão de Call-to-Action removido */}
      </div>
    </section>
  );
};

export default ServicesSection;
