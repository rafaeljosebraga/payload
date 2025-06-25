
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Novidades from "./pages/Novidades";
import NoticiaDetalhe from "./pages/NoticiaDetalhe";
import Equipamentos from "./pages/Equipamentos";
import Projetos from "./pages/Projetos";
import ProjetoDetalhe from "./pages/ProjetoDetalhe";
import SobreNDTI from "./pages/SobreNDTI";
import Equipe from "./pages/Equipe";
import NotFound from "./pages/NotFound";

// Cliente de consulta para requisições à API
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/novidades/:id" element={<NoticiaDetalhe />} />
          <Route path="/equipamentos" element={<Equipamentos />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
          <Route path="/sobre-ndti" element={<SobreNDTI />} />
          <Route path="/equipe" element={<Equipe />} />
          {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DA ROTA CATCH-ALL "*" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
