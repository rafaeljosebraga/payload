import React, { useEffect } from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import EquipamentosPage from '@/components/EquipamentosPage'

const Equipamentos: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-20 pb-12 sm:pb-16">
        <EquipamentosPage />
      </main>
      <Footer />
    </div>
  )
}

export default Equipamentos
