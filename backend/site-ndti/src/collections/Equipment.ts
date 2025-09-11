import { CollectionConfig } from 'payload'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  labels: {
    singular: 'Equipamento',
    plural: 'Equipamentos',
  },
  admin: {
    defaultColumns: ['name', 'brand', 'model', 'status', 'updatedAt'],
    description: 'Gerencie os equipamentos do NDTI',
    useAsTitle: 'name',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome',
      admin: {
        description: 'Nome do equipamento',
      },
    },
    {
      name: 'brand',
      type: 'text',
      required: true,
      label: 'Marca',
      admin: {
        description: 'Marca do equipamento',
      },
    },
    {
      name: 'model',
      type: 'text',
      required: true,
      label: 'Modelo',
      admin: {
        description: 'Modelo do equipamento',
      },
    },
    {
      name: 'acquisitionYear',
      type: 'number',
      required: true,
      label: 'Ano de Aquisição',
      admin: {
        description: 'Ano em que o equipamento foi adquirido',
        step: 1,
      },
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      label: 'Código',
      unique: true,
      admin: {
        description: 'Código único de identificação do equipamento',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status',
      defaultValue: 'available',
      options: [
        {
          label: 'Disponível',
          value: 'available',
        },
        {
          label: 'Em Manutenção',
          value: 'maintenance',
        },
        {
          label: 'Indisponível',
          value: 'unavailable',
        },
        {
          label: 'Fora de Uso',
          value: 'out_of_order',
        },
      ],
      admin: {
        description: 'Status atual do equipamento',
      },
    },
  ],
}
