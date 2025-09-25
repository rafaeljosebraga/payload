
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, Project } from '@/lib/payload';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        // Exibir todos os projetos
        setProjects(projectsData);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (projectId: string | number) => {
    navigate(`/projetos/${projectId}`);
  };

  if (loading) {
    return (
      <section id="projetos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-16">Nossos Projetos</h2>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ifnmg-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section id="projetos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-heading mb-16">Nossos Projetos</h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum projeto encontrado.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projetos" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-12 sm:mb-16">Nossos Projetos</h2>

        {/* Grid de projetos - responsivo para todas as telas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Container da imagem com efeito gradient */}
              <div className="relative mb-3 sm:mb-4">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-ndti-700 to-ifnmg-blue opacity-75 blur group-hover:opacity-100 transition-opacity"></div>
                {/* Contêiner da imagem com proporção fixa e centralização */}
                <div className="relative aspect-video rounded-lg bg-gray-100 shadow-lg group-hover:shadow-xl transition-shadow overflow-hidden flex items-center justify-center">
                  <img 
                    src={project.image.url} 
                    alt={project.image.alt || project.title} 
                    className="max-h-full max-w-full rounded-lg object-contain"
                  />
                </div>
              </div>


              {/* Nome do projeto */}
              <h3 className="text-lg sm:text-xl font-bold text-ndti-800 text-center group-hover:text-ndti-700 transition-colors px-2">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
