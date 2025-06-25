// // storage-adapter-import-placeholder
// import { postgresAdapter } from '@payloadcms/db-postgres'
// import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// import { lexicalEditor } from '@payloadcms/richtext-lexical'
// import path from 'path'
// import { buildConfig } from 'payload'
// import { fileURLToPath } from 'url'
// import sharp from 'sharp'

// import { Users } from './collections/Users'
// import { Media } from './collections/Media'

// const filename = fileURLToPath(import.meta.url)
// const dirname = path.dirname(filename)

// export default buildConfig({
//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },
//   collections: [Users, Media],
//   editor: lexicalEditor(),
//   secret: process.env.PAYLOAD_SECRET || '',
//   typescript: {
//     outputFile: path.resolve(dirname, 'payload-types.ts'),
//   },
//   db: postgresAdapter({
//     pool: {
//       connectionString: process.env.DATABASE_URI || '',
//     },
//   }),
//   sharp,
//   plugins: [
//     payloadCloudPlugin(),
//     // storage-adapter-placeholder
//   ],
// })
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { News } from './collections/News'
import { Projects } from './collections/Projects'
import { Team } from './collections/Team'
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
  collections: [Users, Media, News, Projects, Team],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./site-ndti.db',
    },
  }),
  cors: [
    'http://localhost:8080',
    'http://localhost:3000',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:3000'
  ],
  serverURL: 'http://localhost:3000',
  sharp,
})