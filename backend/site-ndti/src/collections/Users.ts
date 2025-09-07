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
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
