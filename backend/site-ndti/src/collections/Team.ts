import { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'Membro da Equipe',
    plural: 'Membros da Equipe',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    description: 'Gerencie os membros da equipe do NDTI',
    components: {
      edit: {
        beforeDocumentControls: [
          '/components/BackButton#BackButton'
        ]
      }
    }
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Validação: Data de saída não pode ser anterior à data de entrada
        if (data && data.startDate && data.endDate) {
          const startDate = new Date(data.startDate);
          const endDate = new Date(data.endDate);
          
          if (endDate < startDate) {
            throw new Error('A data de saída do membro não pode ser anterior à data de entrada na equipe.');
          }
        }
        return data;
      }
    ]
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
    },
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'role',
      label: 'Cargo/Função',
      required: true,
      filterOptions: {
        ativo: {
          equals: true,
        },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Foto',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'linkedin',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'github',
      type: 'text',
      label: 'GitHub URL',
    },
    {
      name: 'lattes',
      type: 'text',
      label: 'Currículo Lattes URL',
    },
    {
      name: 'skills',
      type: 'array',
      label: 'Habilidades',
      labels: {
        singular: 'Habilidade',
        plural: 'Habilidades',
      },
      fields: [
        {
          name: 'skill',
          type: 'text',
          label: 'Habilidade',
        }
      ]
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Data de Entrada na Equipe',
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
      label: 'Data de Saída da Equipe',
      admin: {
        components: {
          Field: '/components/DateInputWithMask#DateInputWithMask',
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Ativo',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordem de Exibição',
      defaultValue: 0,
    }
  ]
}