
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Users, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getProjects, Project } from '@/lib/payload';

const Projetos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        console.log('Dados dos projetos recebidos:', projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const categories = ["todos", "Desenvolvimento Web", "Aplicativo Móvel", "Plataforma Web", "IoT & Software"];
  
  const filteredProjects = activeFilter === "todos" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  console.log('Projetos filtrados:', filteredProjects);
  console.log('Filtro ativo:', activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ifnmg-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando projetos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
              Nossos Projetos
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Conheça os projetos desenvolvidos pelo NDTI, onde inovação e tecnologia se encontram para criar soluções que impactam positivamente nossa comunidade.
            </p>
          </header>

          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === category
                      ? "bg-ifnmg-blue text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {category === "todos" ? "Todos" : category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image.url}
                      alt={project.image.alt || project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold bg-ifnmg-blue text-white px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {project.startDate}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-ndti-800 mb-3">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies?.slice(0, 3).map((tech, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tech.technology}
                          </span>
                        ))}
                        {project.technologies && project.technologies.length > 3 && (
                          <span className="text-xs text-gray-500">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Users className="h-3 w-3 mr-1" />
                        {project.team?.length || 0} membros
                      </div>
                      {project.repository && (
                        <a 
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-ndti-700 transition-colors"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link 
                        to={`/projetos/${project.id}`}
                        className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center text-sm"
                      >
                        Ver detalhes
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhum projeto encontrado para esta categoria.</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-ifnmg-blue hover:text-ndti-700 font-medium">
              Voltar para a página inicial
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projetos;
