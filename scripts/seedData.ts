import path from 'path'
import type { Payload } from 'payload'

const img = (p: string) => path.resolve(process.cwd(), 'public/assets/img', p)

// Minimal Lexical rich-text value from plain paragraphs.
const rich = (...paragraphs: string[]) => ({
  root: {
    type: 'root',
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        { type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
      ],
    })),
  },
})

export async function runSeed(payload: Payload): Promise<{ seeded: boolean }> {
  const existing = await payload.count({ collection: 'projects' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Seed skipped — projects already exist.')
    return { seeded: false }
  }

  payload.logger.info('Seeding NATURA demo content...')

  const media = async (file: string, alt: string) =>
    (await payload.create({ collection: 'media', data: { alt }, filePath: img(file) })).id

  // --- Media ---
  const projCovers = [
    await media('project/06.jpg', 'Жилищна сграда'),
    await media('project/07.jpg', 'Офис сграда'),
    await media('project/08.jpg', 'Реконструкция'),
    await media('project/09.jpg', 'Интериор'),
  ]
  const gallery = [
    await media('project/10.jpg', 'Проект — изглед 1'),
    await media('project/11.jpg', 'Проект — изглед 2'),
    await media('project/12.jpg', 'Проект — изглед 3'),
  ]
  const newsCovers = [
    await media('news/02.jpg', 'Новина 1'),
    await media('news/03.jpg', 'Новина 2'),
    await media('news/04.jpg', 'Новина 3'),
  ]
  const teamPhotos = [
    await media('team/01.jpg', 'Член на екипа 1'),
    await media('team/02.jpg', 'Член на екипа 2'),
    await media('team/03.jpg', 'Член на екипа 3'),
  ]
  const aptImgs = [
    await media('project/13.jpg', 'Апартамент — дневна'),
    await media('project/14.jpg', 'Апартамент — спалня'),
  ]

  // --- Categories ---
  const catBlog = async (name: string) =>
    (await payload.create({ collection: 'categories', data: { name, type: 'blog' } })).id
  const catConstruction = await catBlog('Строителство')
  const catRenovation = await catBlog('Ремонти')
  const catArchitecture = await catBlog('Архитектура')

  // --- Services ---
  const services = [
    {
      title: 'Строителство',
      excerpt: 'Изграждане на жилищни и обществени сгради до ключ.',
      description: rich(
        'Поемаме целия строителен процес — от груб строеж до завършен обект, с контрол на качеството на всеки етап.',
      ),
      order: 1,
    },
    {
      title: 'Ремонти',
      excerpt: 'Цялостни и частични ремонти на жилища и офиси.',
      description: rich('Извършваме довършителни работи, реконструкции и обновяване на съществуващи пространства.'),
      order: 2,
    },
    {
      title: 'Архитектура',
      excerpt: 'Проектиране и архитектурни решения.',
      description: rich('Разработваме архитектурни проекти, съобразени с нуждите на клиента и градската среда.'),
      order: 3,
    },
  ]
  for (const s of services) await payload.create({ collection: 'services', data: s })

  // --- Projects ---
  const projectsData = [
    {
      title: 'Жилищна сграда „Натура Парк“',
      location: 'София, кв. Витоша',
      status: 'completed' as const,
      excerpt: 'Модерна жилищна сграда с 24 апартамента и подземен паркинг.',
      cover: projCovers[0],
      gallery,
      featured: true,
      order: 1,
    },
    {
      title: 'Офис сграда „Меридиан“',
      location: 'Пловдив, център',
      status: 'completed' as const,
      excerpt: 'Клас А офис сграда с озеленени тераси.',
      cover: projCovers[1],
      featured: true,
      order: 2,
    },
    {
      title: 'Реконструкция на жилищен блок',
      location: 'Варна, Морска градина',
      status: 'in_progress' as const,
      excerpt: 'Цялостно обновяване на фасада и общи части.',
      cover: projCovers[2],
      order: 3,
    },
    {
      title: 'Интериорен проект — пентхаус',
      location: 'София, Лозенец',
      status: 'completed' as const,
      excerpt: 'Луксозен интериор с естествени материали.',
      cover: projCovers[3],
      order: 4,
    },
  ]
  const projectIds: number[] = []
  for (const p of projectsData) {
    const doc = await payload.create({ collection: 'projects', data: p })
    projectIds.push(doc.id as number)
  }

  // --- Apartments (linked to the first project) ---
  const apartments = [
    { title: 'Апартамент А-1', type: '2room', floor: 1, area: 78, netArea: 65, exposure: 'Юг/Изток', price: 145000, status: 'available' },
    { title: 'Апартамент А-2', type: '3room', floor: 2, area: 102, netArea: 88, exposure: 'Юг', price: 198000, status: 'available' },
    { title: 'Апартамент Б-5', type: '1room', floor: 3, area: 52, netArea: 44, exposure: 'Изток', price: 92000, status: 'reserved' },
    { title: 'Мезонет М-1', type: 'maisonette', floor: 5, area: 156, netArea: 132, exposure: 'Юг/Запад', price: 320000, status: 'available' },
    { title: 'Студио С-3', type: 'studio', floor: 1, area: 34, netArea: 30, exposure: 'Запад', price: 61000, status: 'sold' },
  ]
  for (const a of apartments) {
    await payload.create({
      collection: 'apartments',
      data: {
        ...a,
        type: a.type as any,
        status: a.status as any,
        project: projectIds[0],
        images: aptImgs,
        description: rich('Просторен апартамент с южно изложение, качествено изпълнение и панорамна гледка.'),
      },
    })
  }

  // --- Posts ---
  const posts = [
    {
      title: 'Тенденции в устойчивото строителство през 2026',
      category: catConstruction,
      cover: newsCovers[0],
      excerpt: 'Енергийна ефективност и зелени материали.',
      content: rich('Устойчивото строителство се превръща в стандарт. Разглеждаме ключовите тенденции за годината.'),
    },
    {
      title: 'Как да планираме ремонт без стрес',
      category: catRenovation,
      cover: newsCovers[1],
      excerpt: 'Практични съвети за организация на ремонта.',
      content: rich('Доброто планиране е половината успех. Ето няколко съвета от нашия опит.'),
    },
    {
      title: 'Ролята на архитекта в модерния проект',
      category: catArchitecture,
      cover: newsCovers[2],
      excerpt: 'Защо доброто проектиране спестява средства.',
      content: rich('Архитектът е ключова фигура, която обединява естетика, функционалност и бюджет.'),
    },
  ]
  for (const p of posts) {
    await payload.create({ collection: 'posts', data: { ...p, _status: 'published' } as any })
  }

  // --- Team ---
  const team = [
    { name: 'Иван Петров', position: 'Управител', photo: teamPhotos[0], bio: 'Над 20 години опит в строителството.', order: 1 },
    { name: 'Мария Георгиева', position: 'Главен архитект', photo: teamPhotos[1], bio: 'Авторски проекти в цялата страна.', order: 2 },
    { name: 'Стефан Колев', position: 'Ръководител обекти', photo: teamPhotos[2], bio: 'Прецизност и контрол на качеството.', order: 3 },
  ]
  for (const t of team) await payload.create({ collection: 'team', data: t })

  // --- Globals ---
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'NATURA',
      phone: '+359 2 123 4567',
      email: 'office@natura.bg',
      address: 'гр. София, бул. Витоша 100',
      workingHours: 'Пон–Пет: 9:00–18:00',
      socials: [
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      items: [
        { label: 'Начало', href: '/' },
        { label: 'За нас', href: '/about' },
        { label: 'Услуги', href: '/service' },
        { label: 'Проекти', href: '/project' },
        { label: 'Апартаменти', href: '/apartments' },
        { label: 'Блог', href: '/news' },
        { label: 'Контакти', href: '/contact' },
      ],
      ctaLabel: 'Запитване',
      ctaHref: '/contact',
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      about: 'NATURA е строителна компания с фокус върху качество, устойчивост и модерна архитектура.',
      columns: [
        {
          title: 'Бързи връзки',
          links: [
            { label: 'За нас', href: '/about' },
            { label: 'Проекти', href: '/project' },
            { label: 'Апартаменти', href: '/apartments' },
          ],
        },
        {
          title: 'Услуги',
          links: [
            { label: 'Строителство', href: '/service' },
            { label: 'Ремонти', href: '/service' },
            { label: 'Архитектура', href: '/service' },
          ],
        },
      ],
      copyright: '© 2026 NATURA. Всички права запазени.',
    },
  })

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'Изграждаме бъдещето с грижа за детайла',
      heroSubtitle: 'Строителство, ремонти и архитектура на високо ниво.',
      heroImage: projCovers[0],
      heroCtaLabel: 'Нашите проекти',
      heroCtaHref: '/project',
      sections: [
        { type: 'about', enabled: true },
        { type: 'services', enabled: true },
        { type: 'projects', enabled: true },
        { type: 'apartments', enabled: true },
        { type: 'team', enabled: true },
        { type: 'blog', enabled: true },
        { type: 'contact', enabled: true },
      ],
    },
  })

  payload.logger.info('Seed complete ✅')
  return { seeded: true }
}
