import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
import { Equipment } from './collections/Equipment'
import { SiteImages } from './collections/SiteImages'
import { TipoNoticia } from './collections/TipoNoticia'
import { CategoriaProjeto } from './collections/CategoriaProjeto'
import { Role } from './collections/Role'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { pt } from '@payloadcms/translations/languages/pt'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { pt },
  },
  collections: [Users, Media, News, Projects, Team, Equipment, SiteImages, TipoNoticia, CategoriaProjeto, Role],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://payload:payload123@postgres:5432/payload',
    },
  }),
  // Email desabilitado - emails serão exibidos no console
  cors: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
  ],
  serverURL: 'http://localhost:3000',
  sharp,
})
