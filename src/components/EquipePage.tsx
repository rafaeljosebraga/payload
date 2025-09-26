
import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Github, Mail, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getTeamMembers, TeamMember } from '@/lib/payload';
import { formatDate } from '@/lib/utils';

const EquipePage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { ref, inView } = useInView({ 
    threshold: 0.2,
    triggerOnce: true 
  });

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setLoading(true);
        const data = await getTeamMembers();
        // Filtrar apenas membros ativos e ordenar
        const activeMembers = data
          .filter(member => member.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setTeamMembers(activeMembers);
      } catch (err) {
        setError('Erro ao carregar membros da equipe');
        console.error('Erro ao carregar equipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ifnmg-green mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando equipe...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="mb-10" ref={ref}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">Nossa Equipe</h1>
        <p className="text-gray-600 max-w-3xl">
          Conheça os profissionais dedicados que compõem o Núcleo de Desenvolvimento de Tecnologia da Informação 
          do IFNMG Campus Montes Claros. Uma equipe multidisciplinar comprometida com a inovação e excelência.
        </p>
      </header>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id} 
                className={cn(
                  "bg-white rounded-lg shadow-md overflow-hidden card-hover transform transition-all duration-500",
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative group">
                  <img 
                    src={member.image?.url || '/placeholder.svg'} 
                    alt={member.image?.alt || member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-5 lg:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-ndti-800 hover:text-gradient-green-yellow">{member.name}</h3>
                  <p className="text-ndti-600 mb-2 md:mb-3 hover:text-gradient-green-yellow text-sm md:text-base">{member.role?.nome}</p>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">{member.description}</p>
                  
                  {/* Informações de período na equipe */}
                  <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-xs text-gray-600 mb-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="font-medium">Período na equipe</span>
                    </div>
                    <div className="text-xs text-gray-700">
                      <span>Desde {formatDate(member.startDate)}</span>
                      {member.endDate && (
                        <span> até {formatDate(member.endDate)}</span>
                      )}
                      {!member.endDate && member.isActive && (
                        <span className="text-green-600 font-medium"> - Ativo</span>
                      )}
                    </div>
                  </div>
                  
                  {member.skills && member.skills.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skillObj, idx) => (
                          <span key={idx} className="px-2 py-1 bg-ifnmg-green/10 text-ifnmg-green text-xs rounded-full">
                            {typeof skillObj === 'string' ? skillObj : skillObj.skill}
                          </span>
                        ))}
                        {member.skills.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{member.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                        <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                        <Github className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} aria-label="Email" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                        <Mail className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
      {/* Botão para voltar à página inicial */}
      <div className="text-center mt-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-ifnmg-blue hover:text-ndti-700 font-medium"
        >
          Voltar para a página inicial
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default EquipePage;
