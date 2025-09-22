import { CollectionConfig } from 'payload'

export const Role: CollectionConfig = {
  slug: 'role',
  labels: {
    singular: 'Cargo/Função',
    plural: 'Gerenciar Cargos/Funções',
  },
  admin: {
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'descricao', 'ativo'],
    description: 'Gerencie os cargos e funções dos membros da equipe',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      required: true,
      label: 'Nome do Cargo/Função',
      admin: {
        description: 'Nome do cargo ou função (ex: Coordenador, Pesquisador, Desenvolvedor)',
      },
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição',
      admin: {
        description: 'Descrição opcional do cargo ou função',
      },
    },
    {
      name: 'ativo',
      type: 'checkbox',
      label: 'Ativo',
      defaultValue: true,
      admin: {
        description: 'Define se este cargo/função está ativo para uso',
      },
    },
  ],
  timestamps: true,
}