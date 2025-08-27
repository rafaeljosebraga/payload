import { CollectionConfig } from "payload"

export const SiteImages: CollectionConfig = {
  slug: "site-images",
  labels: {
    singular: "Site Image",
    plural: "Site Images",
  },
  admin: {
    useAsTitle: "slug", // mostra o slug como título na UI
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
}
