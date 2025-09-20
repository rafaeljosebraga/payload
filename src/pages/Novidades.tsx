
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getNews, getTiposNoticia, NewsItem, TipoNoticia } from '@/lib/payload';

const Novidades: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tiposNoticia, setTiposNoticia] = useState<TipoNoticia[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Buscar notícias e tipos do CMS
    const fetchData = async () => {
      try {
        const [newsData, tiposData] = await Promise.all([
          getNews(),
          getTiposNoticia()
        ]);
        setNews(newsData);
        setTiposNoticia(tiposData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredNews = activeFilter === "todos" 
    ? news 
    : news.filter(item => item.type.id.toString() === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ifnmg-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando novidades...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="progress-indicator" style={{ width: `0%` }}></div>
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
              Novidades e Comunicados
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Fique por dentro das últimas atualizações, editais e eventos do Núcleo de Desenvolvimento Tecnológico e Inovação do IFNMG Campus Montes Claros.
            </p>
          </header>

          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                key="todos"
                onClick={() => setActiveFilter("todos")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === "todos"
                    ? "bg-ifnmg-blue text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              {tiposNoticia.map((tipo) => (
                <button
                  key={tipo.id}
                  onClick={() => setActiveFilter(tipo.id.toString())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === tipo.id.toString()
                      ? "bg-ifnmg-blue text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {tipo.nome}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image.url}
                      alt={item.image.alt || item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full inline-block bg-ifnmg-blue text-white">
                        {item.type.nome}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-ndti-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    
                    <Link 
                      to={`/novidades/${item.id}`}
                      className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center text-sm"
                    >
                      Ler mais
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Nenhuma novidade encontrada para este filtro.</p>
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

export default Novidades;
