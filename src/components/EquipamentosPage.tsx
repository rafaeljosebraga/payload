import React, { useEffect, useState } from 'react'
import { getEquipments, Equipment } from '@/lib/payload'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const EquipamentosPage: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        setLoading(true)
        const data = await getEquipments()
        setEquipments(data)
      } catch (err) {
        setError('Erro ao carregar equipamentos')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEquipments()
  }, [])

  const filteredEquipments = equipments.filter(eq =>
    eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ifnmg-green"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
          Equipamentos
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Consulte a lista completa de equipamentos disponíveis no NDTI, incluindo detalhes técnicos.
        </p>
      </header>

      {/* Barra de busca */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          id="equipment-search"
          name="equipment-search"
          type="text"
          placeholder="Buscar por nome ou código..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-ifnmg-blue focus:border-transparent outline-none"
          aria-label="Buscar equipamentos por nome ou código"
        />
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Marca</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEquipments.length > 0 ? (
                filteredEquipments.map((eq) => (
                  <TableRow key={eq.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{eq.code}</TableCell>
                    <TableCell>{eq.name}</TableCell>
                    <TableCell>{eq.brand}</TableCell>
                    <TableCell>{eq.model}</TableCell>
                    <TableCell>{eq.acquisitionYear}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          eq.status === 'available'
                            ? 'bg-green-100 text-green-700'
                            : eq.status === 'maintenance'
                            ? 'bg-yellow-100 text-yellow-700'
                            : eq.status === 'unavailable'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {eq.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
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
  )
}

export default EquipamentosPage
