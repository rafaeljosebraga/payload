
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectById, Project } from '@/lib/payload';
import { formatDate } from '@/lib/utils';

const ProjetoDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProject = async () => {
      if (!id) {
        navigate('/not-found');
        return;
      }
      
      try {
        const projectData = await getProjectById(id);
        if (!projectData) {
          navigate('/not-found');
          return;
        }
        setProject(projectData);
      } catch (error) {
        console.error('Erro ao carregar projeto:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ifnmg-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando projeto...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-2xl font-bold">Projeto não encontrado</h1>
            <button 
              onClick={() => navigate('/projetos')}
              className="mt-4 flex items-center text-ifnmg-blue hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para projetos
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <button 
            onClick={() => navigate('/projetos')}
            className="mb-6 flex items-center text-ifnmg-blue hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar para projetos
          </button>
          
          {/* Hero do projeto */}
          <div className="relative rounded-lg overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-ndti-800/70 to-ifnmg-blue/70 z-10"></div>
            <img 
              src={project.image.url} 
              alt={project.image.alt || project.title} 
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center p-8">
              <span className="inline-block bg-white text-ifnmg-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
                {project.category.nome}
              </span>
              <h1 className="text-4xl font-bold text-white mb-2">{project.title}</h1>
              <p className="text-lg text-gray-200 max-w-2xl">{project.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-ndti-800 mb-6">Sobre o projeto</h2>
                <div className="space-y-4">
                  {project.longDescription?.map((para, index) => (
                    <p key={index} className="text-gray-700">{para.paragraph}</p>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-ndti-800 mb-6">Funcionalidades</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {project.features?.map((feature, index) => (
                    <li key={index} className="text-gray-700">{feature.feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-bold text-gray-800 mb-4">Informações do Projeto</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Início do Projeto</p>
                    <p className="text-gray-800">{formatDate(project.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-gray-800">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tecnologias</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.technologies?.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {tech.technology}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.repository && (
                    <div>
                      <p className="text-sm text-gray-500">Repositório</p>
                      <a 
                        href={project.repository} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ifnmg-blue hover:underline flex items-center"
                      >
                        GitHub <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-bold text-gray-800 mb-4">Equipe</h3>
                <ul className="space-y-2">
                  {project.team?.map((member, index) => (
                    <li key={index} className="text-gray-700">{member.member}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjetoDetalhe;
