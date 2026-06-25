# NATURA — наръчник на проекта

Фирмен сайт (строителство, ремонти, архитектура) с CMS, апартаменти за
продажба и блог. Последно обновен: 2026-06-25.

## Стек
- Next.js 16 + React 19 (App Router, Turbopack)
- Payload CMS 3.85 — admin на `/admin`, REST/GraphQL на `/api` (един проект)
- PostgreSQL 17 (Docker)
- Bootstrap 5 + Sass (темплейт „xbuild")

## Бърз старт (разработка)
```bash
docker compose up -d        # Postgres на localhost:5433
npm run dev                 # сайт на http://localhost:3100
```
- Админ: http://localhost:3100/admin — `s.panev@gmail.com` / `NaturaAdmin2026!`
  (⚠️ смени паролата)
- GitHub: https://github.com/dshomebg/natura.git (клон `main`)
- Портове, изместени от `dshome-*` стека: Postgres **5433**, app **3100**.

## Структура
- `app/(frontend)/` — публичен сайт (route group, собствен root layout, force-dynamic)
- `app/(payload)/` — admin + API (генерирани, не се пипат)
- `app/sitemap.ts`, `app/robots.ts` — SEO
- `collections/` — Payload колекции; `globals/` — глобални настройки
- `lib/data.ts` — server заявки към Payload; `lib/SiteContext.jsx` — globals към клиента
- `lib/media.ts`, `lib/apartments.js`, `lib/socials.js`, `utils/slug.ts` — помощници
- `scripts/seedData.ts` — `runSeed(payload)` за примерни данни

## ✅ Готово (Фази 1–8)
- Ъпгрейд Next 16/React 19, Docker Postgres, Payload + пълна схема + seed
- Целият фронтенд чете от базата: Проекти, Апартаменти, Блог, Услуги, Екип, Начална
- Меню/футър/контакти/hero/секции — редактируеми от админа (globals)
- Апартаменти: листинг с филтри + детайл + форма за запитване; teaser на началната
- Контактни форми → база + имейл нотификация (afterChange hook)
- SEO: sitemap.xml, robots.txt, Open Graph
- Продукционен Docker (standalone) + docker-compose.prod.yml + nginx vhost
- Продукционен build минава; standalone сървър сервира home/admin/api (200)

## 🚀 Деплой
Виж **`docs/deploy.md`**. Накратко:
```bash
cp .env.prod.example .env.prod   # попълни PAYLOAD_SECRET, DB парола, домейн, SMTP
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
# nginx: deploy/nginx/natura.conf + certbot за SSL
```

## ⏳ Остава (по избор / при нужда)
- [ ] **Продукционни тайни**: попълни `.env.prod` (SMTP за реални имейли,
      силен `PAYLOAD_SECRET`, реален домейн в `NEXT_PUBLIC_SERVER_URL`).
- [ ] **Първи админ** на продукция: регистрирай на `/admin` (или мигрирай базата).
- [ ] **Смени dev админ паролата** от default-ната.
- [ ] **Вторични статични страници** още показват демо съдържание — реши кои са
      нужни: `/about`, `/faq`, `/pricing`, `/home-2`, `*-one-page`, `/news-grid`.
      (Основните страници са изцяло динамични от базата.)
- [ ] **Чистене** (ниско приоритетно): някои `data/*.js` още се ползват от
      горните вторични страници; махни ги, когато решиш съдбата им.
- [ ] **payload-types.ts**: `npx payload generate:types` дава
      `ERR_REQUIRE_ASYNC_MODULE` на Windows — пусни в WSL/Linux/CI ако трябват.
- [ ] (прод) обмисли Payload **миграции** вместо auto-push на схемата.

## Полезни команди
```bash
docker exec natura-postgres-dev psql -U natura -d natura -c "\dt"   # таблици
git log --oneline                                                   # история
npm run build                                                       # прод build
```
