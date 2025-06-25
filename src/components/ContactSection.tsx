
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contato" className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-heading mb-10 md:mb-16">Entre em Contato</h2>
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Informações de contato e mapa lado a lado */}
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Mapa do Google (agora do lado esquerdo) */}
            <div className="w-full md:w-1/2 h-[250px] sm:h-[300px] md:h-auto">
              <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1910.917129801705!2d-43.8288557823784!3d-16.68517527318592!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x754aa52e8405187%3A0x44d36bc1df7549bc!2sInstituto%20Federal%20do%20Norte%20de%20Minas%20Gerais%20-%20Campus%20Montes%20Claros!5e0!3m2!1spt-BR!2sbr!4v1747848055794!5m2!1spt-BR!2sbr"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "250px" }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa IFNMG Campus Montes Claros"
                ></iframe>
              </div>
            </div>
            
            {/* Informações de contato (agora do lado direito) */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-lg shadow-md p-5 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-ndti-800">Informações de Contato</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-ifnmg-blue mr-3 md:mr-4 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">Endereço</h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        IFNMG - Campus Montes Claros<br />
                        Rua Dois, 300 - Village do Lago I<br />
                        Montes Claros - MG, 39404-058
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 text-ifnmg-blue mr-3 md:mr-4 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">Telefone</h4>
                      <p className="text-gray-600 text-xs md:text-sm">(38) 2103-4141</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-ifnmg-blue mr-3 md:mr-4 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">Email</h4>
                      <p className="text-gray-600 text-xs md:text-sm">ndti.montesclaros@ifnmg.edu.br</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-ifnmg-blue mr-3 md:mr-4 mt-0.5 md:mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm md:text-base">Horário de Funcionamento</h4>
                      <p className="text-gray-600 text-xs md:text-sm">
                        Segunda a Sexta: 8:00 - 12:00, 14:00 - 18:00<br />
                        Fechado em feriados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
