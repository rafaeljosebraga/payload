
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import EquipePage from '@/components/EquipePage';

const Equipe: React.FC = () => {
  // Efeito para rolar a página para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36"> {/* Added padding top to account for navbar */}
        <EquipePage />
      </div>
      <Footer />
    </div>
  );
};

export default Equipe;
