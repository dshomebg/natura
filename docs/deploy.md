# Деплой на NATURA

Сайтът е **на живо**: https://www.natura-bg.com

Подходът: образът се билдва **локално**, праща се към сървъра като `.tar`,
зарежда се и се пуска. Сървърът **не билдва** (по-малко изненади).

## Среда
- Сървър: `root@157.90.129.12` (srv.pagagal.com), SSH ключ `~/.ssh/pagagal_deploy`
- Директория: `/opt/natura` (там стоят `.env` + `docker-compose.prod.yml`)
- Домейн: **https://www.natura-bg.com** (зад Cloudflare; non-www → www)
- App: контейнер `natura-prod-app` на `127.0.0.1:3100`; база `natura-prod-db`
  (само в compose мрежата). nginx (HestiaCP) proxy-ва домейна към :3100.

## Рутинен деплой (след промени по кода)
От този компютър:
```powershell
.\deploy-prod.ps1
```
Скриптът: тества SSH → билдва `natura-prod-app:latest` локално → `docker save`
→ `scp` към сървъра → `docker load` → `docker compose up -d --no-build`.

> ⚠️ Скриптът обновява само **app образа**. Не пипа базата и не прилага
> промени по схемата (виж по-долу).

## nginx (HestiaCP) — веднъж настроено
Домейнът е в HestiaCP под потребител `pagagal`, със SSL (Let's Encrypt).
Default PHP темплейтът е заменен с proxy към :3100 в:
- `/home/pagagal/conf/web/natura-bg.com/nginx.conf` (порт 80)
- `/home/pagagal/conf/web/natura-bg.com/nginx.ssl.conf` (порт 443)

(Има бекъпи `*.bak.<timestamp>` в същата папка.) При промяна: редактирай тези
файлове, после `nginx -t && systemctl reload nginx`.

## Схема на базата (важно)
В **продукция Payload НЕ прави auto-push** на схемата (за разлика от dev).
Първоначалната схема + данни са прехвърлени от dev базата:
```bash
# локално
docker exec natura-postgres-dev pg_dump -U natura -d natura --no-owner --no-privileges > dump.sql
# към сървъра
scp -i ~/.ssh/pagagal_deploy dump.sql root@157.90.129.12:/opt/natura/
ssh -i ~/.ssh/pagagal_deploy root@157.90.129.12 \
  "cat /opt/natura/dump.sql | docker exec -i natura-prod-db psql -U natura -d natura"
```
**При промяна по схемата** (нови полета/колекции) повтори горното (или премини
към Payload миграции). Само нови таблици/колони се добавят без загуба на данни.

Качените файлове (media) се пазят във volume `natura-prod-media`. При нужда се
прехвърлят по същия начин (tar → volume).

> ⚠️ Media файлове, прехвърлени от Windows, идват със чужд uid и app потребителят
> (`nextjs`, uid 1001) не може да пише в тях → `EACCES` (400) при качване в админа.
> `deploy-prod.ps1` го поправя автоматично (стъпка 6: `chown` на volume-а към
> 1001:65533). Ако прехвърляш media ръчно без пълен деплой, пусни:
> ```bash
> docker run --rm -v natura-prod-media:/media alpine \
>   sh -c 'chown -R 1001:65533 /media && chmod -R u+rwX /media'
> ```

## Админ
https://www.natura-bg.com/admin — текущият потребител дойде с прехвърлената база
(`s.panev@gmail.com`). ⚠️ Смени паролата.

## Имейли
Попълни `SMTP_*` в `/opt/natura/.env` и рестартирай app-а, за да тръгнат реални
имейли за запитванията (иначе само се логват).

## Бекъп
```bash
docker exec natura-prod-db pg_dump -U natura natura > backup.sql   # база
# + volume natura-prod-media (качените файлове)
```
