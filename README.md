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

In local development, the English landing is at `/`; the Russian version is at `/ru/`. On GitHub Pages they are at `/Pixel-Landing/` and `/Pixel-Landing/ru/`. The header language switch links between them. Both pages are included in the production build. Russian copy includes the page metadata, image descriptions, navigation labels, booking preview and localized appointment dates. The studio's London address and GBP pricing are retained.

## Публикация на GitHub

Проект подготовлен как отдельный Git-репозиторий с веткой `main`.
Создайте пустой репозиторий на GitHub без README и `.gitignore`, затем выполните в папке проекта, заменив `YOUR_REPOSITORY_URL` адресом репозитория:

```sh
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Зависимости, сборки, локальные настройки, секреты и служебные папки ИИ исключены через `.gitignore`. Для запуска после клонирования: `npm ci`, затем `npm run dev`.

## GitHub Pages

Сайт публикуется по адресу https://giposfila.github.io/Pixel-Landing/.

1. В настройках репозитория откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions** вместо **Deploy from a branch**.
2. Отправьте изменения с `.github/workflows/deploy.yml` в ветку `main`.
3. Дождитесь успешного workflow **Deploy to GitHub Pages** на вкладке **Actions**. Для повторного запуска используйте **Run workflow**.

Workflow использует Node.js 24, выполняет `npm ci` и `npm run build`, затем публикует только `dist/`. Публикация исходников из корня ветки без сборки не работает: браузер не собирает модули Vite.

В production настроен базовый путь `/Pixel-Landing/`; локальный `npm run dev` работает от `/`. Проверка production-сборки: `npm run build`, затем `npm run preview` и открытие `http://localhost:4173/Pixel-Landing/`. Для своего домена или другого имени репозитория измените `base` в конфигурации Vite.
