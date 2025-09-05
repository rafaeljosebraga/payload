import { CollectionConfig } from "payload/types"

export const SiteImages: CollectionConfig = {
  slug: "site-images",
  labels: {
    singular: "Imagem do Site",
    plural: "Imagens do Site",
  },
  admin: {
    useAsTitle: "slug", // mostra o slug como título na UI
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Identificador",
    },
    {
      name: "description",
      type: "textarea",
      label: "Descrição",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Imagem",
    },
  ],
}
