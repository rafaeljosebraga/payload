import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Projeto',
    plural: 'Projetos',
  },
  admin: {
    defaultColumns: ['title', 'category', 'startDate', 'endDate', 'updatedAt'],
    description: 'Gerencie os projetos desenvolvidos pelo NDTI',
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
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Validação: Data de fim não pode ser anterior à data de início
        if (data && data.startDate && data.endDate) {
          const startDate = new Date(data.startDate);
          const endDate = new Date(data.endDate);
          
          if (endDate < startDate) {
            throw new Error('A data de fim do projeto não pode ser anterior à data de início.');
          }
        }
        return data;
      }
    ]
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
      type: 'relationship',
      relationTo: 'categoria-projeto',
      label: 'Categoria',
      required: true,
      filterOptions: {
        ativo: {
          equals: true,
        },
      },
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
      type: 'date',
      required: true,
      label: 'Data de Início',
      admin: {
        components: {
          Field: '/components/DateInputWithMask#DateInputWithMask',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: false,
      label: 'Data de Fim',
      admin: {
        components: {
          Field: '/components/DateInputWithMask#DateInputWithMask',
        },
      },
    },
    {
      name: 'team',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      label: 'Equipe do Projeto',
      filterOptions: {
        isActive: {
          equals: true,
        },
      },
      admin: {
        description: 'Selecione os membros da equipe que participaram deste projeto',
      },
    },
    {
      name: 'repository',
      type: 'text',
      label: 'Repositório',
    },
  ],
}
