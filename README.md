# Pixel Hair Studio

Landing page implemented from `Pixel Hair Studio.figcraft`. Preserves the editorial layout, supplied photographs, local Fraunces font, content and colours.

## Run

```sh
npm install
npm run dev
```

`npm run build` creates the production site in `dist/`. `npm run preview` serves that build.

Scroll reveals, image parallax and a lightweight Three.js particle field respect reduced motion. Particles pause in background tabs and gracefully disappear without WebGL. Booking is an explicitly labelled local preview; no appointment is reserved and no data is sent. Images open accessible native dialogs.

Photo attribution is in `Image sources.md`.

## Languages

The English landing is at `/`; the Russian version is at `/ru/`. The header language switch links between them. Both pages are included in the production build. Russian copy includes the page metadata, image descriptions, navigation labels, booking preview and localized appointment dates. The studio's London address and GBP pricing are retained.

## Публикация на GitHub

Проект подготовлен как отдельный Git-репозиторий с веткой `main`.
Создайте пустой репозиторий на GitHub без README и `.gitignore`, затем выполните в папке проекта, заменив `YOUR_REPOSITORY_URL` адресом репозитория:

```sh
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Зависимости, сборки, локальные настройки, секреты и служебные папки ИИ исключены через `.gitignore`. Для запуска после клонирования: `npm ci`, затем `npm run dev`.
