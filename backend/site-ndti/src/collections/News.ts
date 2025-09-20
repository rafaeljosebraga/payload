import { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Notícia',
    plural: 'Notícias',
  },
  admin: {
    defaultColumns: ['title', 'type', 'date', 'updatedAt'],
    description: 'Gerencie as notícias e comunicados do NDTI',
    useAsTitle: 'title',
    components: {
      edit: {
        beforeDocumentControls: [
          '/components/BackButton#BackButton'
        ]
      }
    }
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Descrição',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Data ',
      admin: {
        components: {
          Field: '/components/DateInputWithMask#DateInputWithMask',
        },
      },
    },
    {
      name: 'content',
      type: 'array',
      label: 'Conteúdo',
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Parágrafo',
        }
      ]
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem',
    },
    {
      name: 'type',
      type: 'relationship',
      relationTo: 'tipo-noticia',
      label: 'Tipo',
      required: true,
      admin: {
        description: 'Selecione o tipo de notícia',
      },
      filterOptions: {
        ativo: {
          equals: true,
        },
      },
    },
  ],
}
