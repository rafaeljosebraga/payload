import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  admin: {
    useAsTitle: 'email',
    description: 'Gerencie os usuários do sistema',
    components: {
      edit: {
        beforeDocumentControls: [
          '/components/BackButton#BackButton'
        ]
      }
    }
  },
  auth: true,
  fields: [
    // Email adicionado por padrão
    // Adicione mais campos conforme necessário
  ],
}
