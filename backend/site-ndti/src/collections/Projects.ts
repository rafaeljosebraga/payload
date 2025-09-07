import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projeto',
    plural: 'Projetos',
  },
  admin: {
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    description: 'Gerencie os projetos desenvolvidos pelo NDTI',
    useAsTitle: 'title',
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
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Desenvolvimento Web', value: 'Desenvolvimento Web' },
        { label: 'Aplicativo Móvel', value: 'Aplicativo Móvel' },
        { label: 'Plataforma Web', value: 'Plataforma Web' },
        { label: 'IoT & Software', value: 'IoT & Software' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagem',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Descrição',
    },
    {
      name: 'technologies',
      type: 'array',
      label: 'Tecnologias',
      fields: [
        {
          name: 'technology',
          type: 'text',
          label: 'Tecnologia',
        }
      ]
    },
    {
      name: 'longDescription',
      type: 'array',
      label: 'Descrição Longa',
      fields: [
        {
          name: 'paragraph',
          type: 'textarea',
          label: 'Parágrafo',
        }
      ]
    },
    {
      name: 'features',
      type: 'array',
      label: 'Características',
      fields: [
        {
          name: 'feature',
          type: 'text',
          label: 'Característica',
        }
      ]
    },
    {
      name: 'startDate',
      type: 'text',
      required: true,
      label: 'Data de Início',
    },
    {
      name: 'status',
      type: 'text',
      required: true,
      label: 'Status',
    },
    {
      name: 'team',
      type: 'array',
      label: 'Equipe',
      fields: [
        {
          name: 'member',
          type: 'text',
          label: 'Membro',
        }
      ]
    },
    {
      name: 'repository',
      type: 'text',
      label: 'Repositório',
    },
  ],
}
