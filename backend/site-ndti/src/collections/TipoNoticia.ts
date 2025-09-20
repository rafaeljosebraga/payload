import { CollectionConfig } from 'payload'

export const TipoNoticia: CollectionConfig = {
  slug: 'tipo-noticia',
  labels: {
    singular: 'Tipo de Notícia',
    plural: 'Gerenciar Tipos de Notícias',
  },
  admin: {
    defaultColumns: ['nome', 'ativo', 'updatedAt'],
    description: 'Gerencie os tipos de notícias disponíveis',
    useAsTitle: 'nome',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      label: 'Nome do Tipo',
      admin: {
        description: 'Nome do tipo de notícia (ex: Edital, Evento, Projeto)',
      },
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição opcional do tipo de notícia',
      },
    },
    {
      name: 'ativo',
      type: 'checkbox',
      label: 'Ativo',
      defaultValue: true,
      admin: {
        description: 'Define se este tipo está ativo para uso',
      },
    },
  ],
}