'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDocumentInfo } from '@payloadcms/ui'

export const BackButton: React.FC = () => {
  const router = useRouter()
  const { collectionSlug, globalSlug } = useDocumentInfo()

  const handleGoBack = () => {
    // Se for uma collection, volta para a lista da collection
    if (collectionSlug) {
      router.push(`/admin/collections/${collectionSlug}`)
    }
    // Se for um global, volta para a lista de globals (dashboard)
    else if (globalSlug) {
      router.push('/admin')
    }
    // Fallback - volta para onde veio usando history
    else {
      router.back()
    }
  }

  return (
    <button
      onClick={handleGoBack}
      type="button"
      className="btn btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-secondary"
      style={{ marginRight: 'var(--base)' }}
    >
      <span className="btn__content">
        <span className="btn__label">← Voltar</span>
      </span>
    </button>
  )
}
