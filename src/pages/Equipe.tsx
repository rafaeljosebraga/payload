
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
      <main className="flex-grow pt-20"> {/* Added padding top to account for navbar */}
        <EquipePage />
      </main>
      <Footer />
    </div>
  );
};

export default Equipe;
