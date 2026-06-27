import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Projects } from './collections/Projects'
import { Apartments } from './collections/Apartments'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Inquiries } from './collections/Inquiries'

import { SiteSettings } from './globals/SiteSettings'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { HomePage } from './globals/HomePage'
import { PageMeta } from './globals/PageMeta'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Configure SMTP only when env vars are present; otherwise Payload falls back
// to logging emails to the console (fine for local development).
const email = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromName: process.env.SMTP_FROM_NAME || 'NATURA',
      defaultFromAddress: process.env.SMTP_FROM || 'no-reply@natura.bg',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
    })
  : undefined

export default buildConfig({
  email,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— NATURA',
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Projects,
    Apartments,
    Posts,
    Services,
    Team,
    Inquiries,
  ],
  globals: [SiteSettings, Header, Footer, HomePage, PageMeta],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Auto-sync the schema on boot in production too (this project relies on
    // push rather than migration files).
    push: true,
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
