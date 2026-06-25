# Деплой на NATURA

Подходът следва този на DSHome: **образът се билдва ЛОКАЛНО** (на този компютър),
праща се към сървъра като `.tar`, зарежда се и се пуска. Сървърът **не билдва** —
така има по-малко изненади.

- Сървър: `root@78.46.93.85`, директория `/opt/natura`
- Домейн: **https://www.natura-bg.com**
- App върви на `127.0.0.1:3100` зад nginx; Postgres е само в compose мрежата
  (`db:5432`) — не се бие с `dshome-postgres` на 5432.

## Първоначална настройка (веднъж, на сървъра)
```bash
ssh root@78.46.93.85
mkdir -p /opt/natura && cd /opt/natura
# създай .env с реалните стойности (compose го чете автоматично):
nano .env            # копирай от .env.prod.example на този компютър и попълни
```
В `.env` задължително:
- силен `PAYLOAD_SECRET` — `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- силна `POSTGRES_PASSWORD`
- `NEXT_PUBLIC_SERVER_URL=https://www.natura-bg.com`
- (по избор) `SMTP_*` за реални имейли

nginx + SSL (веднъж):
```bash
# копирай deploy/nginx/natura.conf в /etc/nginx/sites-available/ и активирай
sudo cp natura.conf /etc/nginx/sites-available/natura.conf
sudo ln -s /etc/nginx/sites-available/natura.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d natura-bg.com -d www.natura-bg.com
```

## Деплой (от този компютър)
```powershell
.\deploy-prod.ps1
```
Скриптът: тества SSH → билдва `natura-prod-app:latest` локално → `docker save` →
`scp` към сървъра → `docker load` → `docker compose up -d --no-build`.

## Първи админ потребител
След първия деплой отвори `https://www.natura-bg.com/admin` и регистрирай
първия потребител (или мигрирай съществуващата база).

## Бележки
- Схемата се синхронизира автоматично (Payload push) при старт.
- Бекъп: периодично `docker exec natura-prod-db pg_dump -U <user> <db> > backup.sql`
  + volume-а `natura-prod-media` (качените файлове).
- Обновяване = просто пусни пак `.\deploy-prod.ps1`.
