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
      <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36">
        <EquipamentosPage />
      </div>
      <Footer />
    </div>
  )
}

export default Equipamentos
