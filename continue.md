# NATURA — какво остава (continue)

Проектен дневник и TODO за продължаване. Последно обновен: 2026-06-13.

## Бърз старт (разработка)
```bash
docker compose up -d        # Postgres на localhost:5433
npm run dev                 # сайт на http://localhost:3100
```
- Админ: http://localhost:3100/admin — вход `s.panev@gmail.com` / `NaturaAdmin2026!`
  (⚠️ смени паролата след първи вход)
- GitHub: https://github.com/dshomebg/natura.git (клон `main`)
- Портове са изместени от `dshome-*` стека: Postgres **5433**, app **3100**.

## Стек
- Next.js 16 + React 19 (App Router, Turbopack)
- Payload CMS 3.85 (admin на `/admin`, REST/GraphQL на `/api`) — един проект
- PostgreSQL 17 (Docker)
- Bootstrap 5 + Sass (темплейт „xbuild")

## Архитектура (накратко)
- `app/(frontend)/` — публичният сайт (route group, собствен root layout)
- `app/(payload)/` — админ + API (генерирани файлове, не се пипат)
- `collections/` — Payload колекции; `globals/` — глобални настройки
- `lib/data.ts` — всички server заявки към Payload (Local API)
- `lib/SiteContext.jsx` — header/footer/settings към клиентски компоненти
- `lib/media.ts`, `lib/apartments.js`, `lib/socials.js` — помощници
- `scripts/seedData.ts` — `runSeed(payload)` за примерни данни

## ✅ Готово (Фази 1–6 + ядро на 7)
- Сетъп, ъпгрейд Next 16/React 19, Docker Postgres, Payload + пълна схема + seed
- Фронтенд навързан към базата: Проекти, Блог, Услуги, Екип, Начална страница
- Header/Footer/меню/контакти — редактируеми от админа (globals + SiteContext)
- Апартаменти: листинг с филтри + детайл + форма за запитване (записва в базата)
- Контактна форма → база; afterChange hook за имейл нотификация (има нужда от тест)

---

## ⏳ Остава да се свърши

### Фаза 7 — финализиране на форми/имейл
- [ ] **Рестарт + тест** на промените (нов dep `@payloadcms/email-nodemailer`,
      email адаптер в `payload.config.ts`, hook в `collections/Inquiries.ts`).
      Пусни `npm run dev`, отвори `/contact`, изпрати съобщение, провери че
      запитването влиза в админа и имейлът се логва в конзолата.
- [ ] **Home контактна форма**: `components/homes/home-1/Contact.jsx` още ползва
      стария EmailJS/статичен вариант — да се навърже към `/api/inquiries`
      (виж `components/contact/ContactForm.jsx` като образец).
- [ ] **Продукционен SMTP**: попълни `SMTP_*` в `.env` (виж `.env.example`),
      за да тръгнат реални имейли. Без тях имейлът само се логва.

### Фаза 8 — SEO + деплой
- [ ] **SEO**: `app/sitemap.ts` (динамичен от Payload), `app/robots.ts`,
      Open Graph мета (`openGraph` в metadata), canonical URL-и.
- [ ] **Dockerfile** за Next/Payload (multi-stage, `output: "standalone"` в
      `next.config.mjs`).
- [ ] **docker-compose.prod.yml**: app + db + volume за качените файлове
      (`/media`). Env за прод (DATABASE_URI сочи към `db:5432`, не localhost).
- [ ] **Nginx vhost** на сървъра: reverse proxy към app контейнера + SSL
      (Let's Encrypt). Сървърът вече има nginx + dshome стек — нов server block.
- [ ] **Payload prod настройки**: `csrf`/`cors` за реалния домейн,
      `serverURL`/`NEXT_PUBLIC_SERVER_URL` към https://домейна.

### Полиране / по избор
- [ ] **Апартаменти на началната страница**: `home-page` global има секция
      `apartments`, но `home-1/page.jsx` още не я рендерира — да се добави teaser.
- [ ] **Статични още страници**: `/about`, `/faq`, `/pricing`, `home-2`,
      `*-one-page` варианти още показват демо съдържание. Реши кои са нужни.
- [ ] **Чистене**: премахни неизползваните `data/*.js` (вече не се внасят от
      навързаните компоненти) и зависимостта `@emailjs/browser`.
- [ ] **payload-types.ts**: `npx payload generate:types` дава
      `ERR_REQUIRE_ASYNC_MODULE` на Windows — типовете не са критични, но ако
      трябват — да се пусне в WSL/Linux или CI.
- [ ] **Смени админ паролата** от default-ната.
- [ ] (опц.) `.gitattributes` вече нормализира към LF — игнорирай CRLF warnings.

## Полезни команди
```bash
# повторно seed-ване на празна база (през временен route или Local API)
# виж историята: app/seed/route.ts беше временен и е премахнат
docker exec natura-postgres-dev psql -U natura -d natura -c "\dt"   # таблици
git log --oneline                                                   # история
```
