import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  serverExternalPackages: ['sharp'],
  output: 'standalone'
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
