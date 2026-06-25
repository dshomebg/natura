# Деплой на NATURA

Продукционен стек: **app** (Next.js + Payload, standalone) + **PostgreSQL**,
зад **nginx** reverse proxy с SSL.

## 1. На сървъра
```bash
git clone https://github.com/dshomebg/natura.git
cd natura
cp .env.prod.example .env.prod      # попълни реалните стойности
```
Генерирай силен `PAYLOAD_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Задай `NEXT_PUBLIC_SERVER_URL=https://твоя-домейн` и DB паролата.

## 2. Старт на контейнерите
```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```
- App слуша само на `127.0.0.1:3100` (не е публичен).
- Postgres е само в compose мрежата (`db:5432`), не е изложен към хоста —
  не се бие с `dshome-postgres` на 5432.
- Качените файлове се пазят във volume `natura-prod-media`.

Първи админ потребител: отвори `https://домейн/admin` и регистрирай.
(Или копирай съществуващата база.)

## 3. nginx + SSL
```bash
sudo cp deploy/nginx/natura.conf /etc/nginx/sites-available/natura.conf
# смени server_name с реалния домейн
sudo ln -s /etc/nginx/sites-available/natura.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d твоя-домейн -d www.твоя-домейн
```

## 4. Обновяване
```bash
git pull
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Бележки
- Схемата се синхронизира автоматично (Payload push) при старт. За по-строг
  контрол в прод може да минеш на миграции (`payload migrate`).
- Имейл нотификации: попълни `SMTP_*` в `.env.prod`. Без тях запитванията само
  се логват.
- Бекъп: периодично `docker exec natura-prod-db pg_dump ...` + volume-а с медия.
