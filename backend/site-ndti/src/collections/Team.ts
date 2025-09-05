import { CollectionConfig } from 'payload/types'

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
      type: 'text',
      required: true,
      label: 'Cargo/Função',
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
      fields: [
        {
          name: 'skill',
          type: 'text',
          label: 'Habilidade',
        }
      ]
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