
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const SobreNDTI: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-24">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-ndti-800 mb-2">Sobre o NDTI</h1>
            <p className="text-lg text-gray-600 mb-8">
              Núcleo de Desenvolvimento de Tecnologia da Informação do IFNMG Campus Montes Claros
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                  <h2 className="text-2xl font-bold text-ndti-800 mb-4">Nossa História</h2>
                  <p className="text-gray-700 mb-4">
                    O Núcleo de Desenvolvimento de Tecnologia da Informação (NDTI) foi fundado em 2018 no IFNMG Campus Montes Claros 
                    com o objetivo de desenvolver soluções tecnológicas para atender às demandas institucionais, além de proporcionar 
                    um ambiente de aprendizado prático para os estudantes dos cursos de tecnologia da informação.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Desde sua criação, o NDTI tem sido um espaço de inovação e criatividade, onde docentes, técnicos administrativos 
                    e discentes trabalham em conjunto para desenvolver projetos que contribuam para a melhoria dos processos acadêmicos 
                    e administrativos do campus.
                  </p>
                  <p className="text-gray-700">
                    Ao longo dos anos, o núcleo expandiu suas atividades, passando a atuar também em projetos de pesquisa, extensão e 
                    inovação, estabelecendo parcerias com outras instituições e empresas da região.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold text-ndti-800 mb-4">Nossos Objetivos</h2>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="h-6 w-6 rounded-full bg-ifnmg-blue flex items-center justify-center text-white font-bold mr-3 mt-1">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Desenvolver Soluções Tecnológicas</h3>
                        <p className="text-gray-700">Criar sistemas, aplicativos e ferramentas digitais para atender às necessidades específicas do campus.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-6 w-6 rounded-full bg-ifnmg-blue flex items-center justify-center text-white font-bold mr-3 mt-1">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Proporcionar Experiência Prática</h3>
                        <p className="text-gray-700">Oferecer aos estudantes a oportunidade de aplicar conhecimentos teóricos em projetos reais.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-6 w-6 rounded-full bg-ifnmg-blue flex items-center justify-center text-white font-bold mr-3 mt-1">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Promover a Inovação Tecnológica</h3>
                        <p className="text-gray-700">Incentivar a criação de soluções inovadoras que possam contribuir para o avanço tecnológico institucional.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-6 w-6 rounded-full bg-ifnmg-blue flex items-center justify-center text-white font-bold mr-3 mt-1">4</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Estabelecer Parcerias</h3>
                        <p className="text-gray-700">Colaborar com outras instituições, empresas e organizações em projetos conjuntos.</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="h-6 w-6 rounded-full bg-ifnmg-blue flex items-center justify-center text-white font-bold mr-3 mt-1">5</div>
                      <div>
                        <h3 className="font-semibold text-gray-800">Contribuir para o Desenvolvimento Regional</h3>
                        <p className="text-gray-700">Desenvolver projetos que possam impactar positivamente a região de Montes Claros e Norte de Minas Gerais.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link 
                    to="/equipe" 
                    className="inline-flex items-center px-6 py-3 bg-ifnmg-green text-white rounded-md hover:bg-ndti-700 transition-colors"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Conheça Nossa Equipe
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4">Áreas de Atuação</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-800">Desenvolvimento Web</li>
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-600">Desenvolvimento Mobile</li>
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-800">Internet das Coisas (IoT)</li>
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-600">Inteligência Artificial</li>
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-800">Sistemas de Gestão</li>
                    <li className="text-gray-700 pl-4 border-l-2 border-ndti-600">Análise de Dados</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="font-bold text-gray-800 mb-4">Infraestrutura</h3>
                  <p className="text-gray-700 mb-4">
                    O NDTI está localizado no Bloco de Tecnologia da Informação do IFNMG Campus Montes Claros, contando com:
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Laboratório de desenvolvimento</li>
                    <li>• Sala de reuniões para brainstorming</li>
                    <li>• Equipamentos de última geração</li>
                    <li>• Servidores dedicados</li>
                    <li>• Ambiente colaborativo de trabalho</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-bold text-gray-800 mb-4">Entre em Contato</h3>
                  <p className="text-gray-700 mb-3">
                    Interessado em conhecer mais sobre o NDTI ou propor uma parceria? Entre em contato conosco:
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> ndti.montesclaros@ifnmg.edu.br<br />
                    <strong>Telefone:</strong> (38) 2103-4141<br />
                    <strong>Local:</strong> Bloco de TI, IFNMG Campus Montes Claros
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SobreNDTI;
