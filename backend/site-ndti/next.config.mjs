import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: ['sharp'],
  output: 'standalone',
  // Configurações para hot reload no Docker
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Verificar mudanças a cada 1 segundo
        aggregateTimeout: 300, // Aguardar 300ms após a última mudança
        ignored: ['**/node_modules/**', '**/.git/**'],
      }
    }
    return config
  }
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
