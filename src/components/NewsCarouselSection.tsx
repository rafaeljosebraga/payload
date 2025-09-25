import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getNews, NewsItem } from '@/lib/payload';

const NewsCarouselSection: React.FC = () => {
  const [api, setApi] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Buscar notícias do CMS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        // Limitar a 4 itens para o carousel da página principal
        setNewsItems(newsData.slice(0, 4));
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        // Em caso de erro, usar dados padrão
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  // Auto-advance slides
  useEffect(() => {
    if (!api || !autoAdvance) return;

    const interval = setInterval(() => {
      api.scrollNext(); // Using scrollNext() instead of next()
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [api, autoAdvance]);

  // Update current slide when API changes
  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Pause auto-advance on hover
  const handleMouseEnter = () => setAutoAdvance(false);
  const handleMouseLeave = () => setAutoAdvance(true);

  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-ndti-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ifnmg-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  if (newsItems.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-ndti-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-ndti-800">
              <span className="text-gradient">Novidades</span>
            </h2>
            <Link 
              to="/novidades" 
              className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center"
            >
              Ver todas
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma novidade disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-ndti-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-ndti-800">
            <span className="text-gradient">Novidades</span>
          </h2>
          <Link 
            to="/novidades" 
            className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center"
          >
            Ver todas
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Carousel 
            setApi={setApi} 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {newsItems.map((item) => (
                <CarouselItem 
                  key={item.id} 
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative overflow-hidden rounded-xl group card-hover">
                    <div className="aspect-ratio h-48 md:h-64 overflow-hidden">
                      <img
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-4 md:p-6">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block w-fit bg-white text-ndti-800">
                        {item.type.nome}
                      </span>
                      <h3 className="text-xl text-white font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200 text-sm line-clamp-2">{item.description}</p>
                      
                      <Link 
                        to={`/novidades/${item.id}`} 
                        className="mt-3 inline-block text-white hover:text-ndti-100 font-medium text-sm"
                      >
                        Ler mais
                        <ArrowRight className="ml-1 inline-block h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2">
              {newsItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => api?.scrollTo(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === idx 
                      ? "w-6 bg-ifnmg-blue" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation arrows */}
            <CarouselPrevious 
              className="left-2 lg:-left-12 opacity-80 hover:opacity-100 transition-opacity" 
              variant="secondary"
              size="icon"
            />
            <CarouselNext 
              className="right-2 lg:-right-12 opacity-80 hover:opacity-100 transition-opacity"
              variant="secondary"
              size="icon"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default NewsCarouselSection;
