
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Equipamentos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  
  const equipments = [
    {
      id: "EQ001",
      name: "Monitor Dell P2419H",
      category: "Monitores",
      description: "Monitor LED IPS 24 polegadas Full HD"
    },
    {
      id: "EQ002",
      name: "Notebook Dell Latitude 5420",
      category: "Notebooks",
      description: "Intel Core i5, 16GB RAM, 256GB SSD"
    },
    {
      id: "EQ003",
      name: "Projetor Epson PowerLite S41+",
      category: "Projetores",
      description: "3300 lumens, SVGA"
    },
    {
      id: "EQ004",
      name: "Impressora HP LaserJet Pro M404dw",
      category: "Impressoras",
      description: "Impressora laser monocromática"
    },
    {
      id: "EQ005",
      name: "Computador Dell OptiPlex 7070",
      category: "Desktops",
      description: "Intel Core i7, 32GB RAM, 512GB SSD"
    },
    {
      id: "EQ006",
      name: "Switch Cisco Catalyst 2960",
      category: "Redes",
      description: "48 portas Gigabit Ethernet"
    },
    {
      id: "EQ007",
      name: "Scanner HP ScanJet Pro 3000",
      category: "Scanners",
      description: "Scanner de mesa com alimentador automático"
    },
    {
      id: "EQ008",
      name: "Tablet Samsung Galaxy Tab S7",
      category: "Tablets",
      description: "11 polegadas, 128GB, S Pen incluída"
    },
    {
      id: "EQ009",
      name: "Servidor Dell PowerEdge R740",
      category: "Servidores",
      description: "Dual Intel Xeon Silver, 64GB RAM, 4x 1TB SSD RAID"
    },
    {
      id: "EQ010",
      name: "Webcam Logitech C920",
      category: "Periféricos",
      description: "Full HD 1080p"
    }
  ];

  const categories = ["todos", ...Array.from(new Set(equipments.map(eq => eq.category)))];
  
  const filteredEquipments = equipments
    .filter(eq => eq.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  eq.id.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(eq => activeCategory === "todos" || eq.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="progress-indicator" style={{ width: `0%` }}></div>
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
              Equipamentos
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Consulte a lista completa de equipamentos disponíveis no NDTI, incluindo detalhes técnicos.
            </p>
          </header>

          <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por nome ou código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-ifnmg-blue focus:border-transparent outline-none"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === category
                      ? "bg-ifnmg-blue text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category === "todos" ? "Todos" : category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">Categoria</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((equipment) => (
                      <TableRow key={equipment.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{equipment.id}</TableCell>
                        <TableCell>{equipment.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{equipment.category}</TableCell>
                        <TableCell className="text-sm text-gray-500">{equipment.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        Nenhum equipamento encontrado com os filtros atuais.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-8 text-center">
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

export default Equipamentos;
