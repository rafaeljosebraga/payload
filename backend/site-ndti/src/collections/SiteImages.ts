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
      type: "select",
      required: true,
      unique: true,
      label: "Identificador",
      options: [
        {
          label: "Capa",
          value: "capa",
        },
        {
          label: "Contra Capa",
          value: "contra-capa",
        },
      ],
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
