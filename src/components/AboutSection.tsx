
import React from 'react';
import { Lightbulb, BookOpen, Users, Library } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const AboutSection: React.FC = () => {
  // Usando useInView para animações baseadas na visualização do usuário
  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Usando useInView para animações dos valores
  const { ref: valuesRef, inView: valuesInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  // Array com nossos valores principais
  const values = [
    {
      icon: <Lightbulb className="h-10 w-10 text-ifnmg-blue" />,
      title: "Inovação",
      description: "Buscamos constantemente novas formas de resolver problemas e criar soluções."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-ifnmg-blue" />,
      title: "Conhecimento",
      description: "Valorizamos a educação e o desenvolvimento contínuo de habilidades técnicas."
    },
    {
      icon: <Users className="h-10 w-10 text-ifnmg-blue" />,
      title: "Colaboração",
      description: "Trabalhamos juntos, combinando diferentes especialidades para alcançar objetivos comuns."
    },
    {
      icon: <Library className="h-10 w-10 text-ifnmg-blue" />,
      title: "Qualidade",
      description: "Comprometemo-nos com a excelência em todos os projetos que desenvolvemos."
    }
  ];

  return (
    <section id="sobre" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-heading mb-12 sm:mb-16">Sobre o NDTI</h2>
        
        <div className="mb-16" ref={textRef}>
          <div className="flex flex-col md:flex-row items-center">
            <div className={cn(
              "md:w-1/2 mb-8 md:mb-0 md:pr-8 transition-all duration-700",
              textInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <h3 className="text-2xl font-semibold mb-4 text-ndti-800">Quem Somos</h3>
              <p className="text-gray-700 mb-4">
                O Núcleo de Desenvolvimento Tecnológico e Inovação (NDTI) do IFNMG Campus Montes Claros é um centro dedicado à pesquisa, desenvolvimento e implementação de soluções tecnológicas inovadoras.
              </p>
              <p className="text-gray-700 mb-4">
                Nossa equipe multidisciplinar é composta por professores, técnicos e estudantes apaixonados por tecnologia e inovação, trabalhando juntos para criar soluções que atendam às necessidades da instituição e da comunidade.
              </p>
              <p className="text-gray-700">
                Atuamos como um laboratório de inovação, incubadora de ideias e centro de desenvolvimento tecnológico, conectando o conhecimento acadêmico às demandas reais da sociedade.
              </p>
            </div>
            <div className={cn(
              "md:w-1/2 transition-all duration-700",
              textInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-ndti-700 to-ifnmg-blue opacity-75 blur"></div>
                <div className="relative bg-white p-2 sm:p-4 rounded-lg shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="Equipe NDTI trabalhando" 
                    className="rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={valuesRef}>
          <h3 className="text-2xl font-semibold text-center mb-8 sm:mb-12 text-ndti-800">Nossos Valores</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className={cn(
                  "bg-white p-6 rounded-lg shadow-md text-center card-hover transform transition-all duration-500",
                  valuesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 icon-interactive">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-2 text-ndti-800">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
