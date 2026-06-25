# NATURA

Уебсайт на фирма за **строителство, ремонти и архитектура** с административна
система за съдържание, каталог с **апартаменти за продажба** (със запитване) и
**блог**.

## Стек
- **Next.js 16** + React 19 (App Router, Turbopack)
- **Payload CMS 3.85** — админ панел на `/admin`, REST/GraphQL на `/api`
  (в същия Next проект)
- **PostgreSQL 17** (Docker)
- Bootstrap 5 + Sass (темплейт „xbuild")

## Бърз старт (разработка)
```bash
docker compose up -d        # Postgres на localhost:5433
npm install
npm run dev                 # сайт на http://localhost:3100
```
- Публичен сайт: http://localhost:3100
- Админ панел: http://localhost:3100/admin

## Документация
- **[continue.md](continue.md)** — наръчник на проекта: структура, какво е
  готово, какво остава, полезни команди.
- **[deploy.md](deploy.md)** — деплой на продукция (Docker + nginx + SSL).

## Структура (накратко)
| Папка | Какво |
|---|---|
| `app/(frontend)/` | публичният сайт |
| `app/(payload)/` | админ + API (генерирани от Payload) |
| `collections/`, `globals/` | схема на съдържанието |
| `lib/` | заявки към Payload, помощници |
| `deploy/` | nginx конфигурация |
| `docs/` | документация |
