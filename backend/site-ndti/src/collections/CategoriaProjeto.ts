import { CollectionConfig } from 'payload'

export const CategoriaProjeto: CollectionConfig = {
  slug: 'categoria-projeto',
  labels: {
    singular: 'Categoria de Projeto',
    plural: 'Gerenciar Categorias de Projetos',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'descricao', 'ativo'],
    description: 'Gerencie as categorias de projetos disponíveis no sistema',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      label: 'Nome da Categoria',
      admin: {
        description: 'Nome da categoria de projeto (ex: Desenvolvimento Web, IoT & Software)',
      },
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição opcional da categoria',
      },
    },
    {
      name: 'ativo',
      type: 'checkbox',
      label: 'Ativa',
      defaultValue: true,
      admin: {
        description: 'Marque para exibir esta categoria no sistema',
      },
    },
  ],
  timestamps: true,
}