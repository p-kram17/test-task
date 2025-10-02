# Posts SPA (Next.js + Node/Express)

SPA з пошуком (autocomplete) та пагінацією на основі JSONPlaceholder.

## Як запустити

- Вимоги: Node.js 18+
- Корінь проєкту: `c:/Users/machine/Desktop/inforce`

1) Встановити залежності (FE + BE):

```powershell
npm install
```

2) Запустити бекенд (порт 4000):

```powershell
npm run server:dev
```

Перевірка: http://localhost:4000/health → `{ "status":"ok" }`

3) Запустити фронтенд (порт 3000) у другому терміналі:

```powershell
npm run dev
```

Відкрити: http://localhost:3000

## Функціонал
- За замовчуванням відображається 10 постів на сторінці (усього 100 → 10 сторінок).
- Пошук з автодоповненням за `title`/`body` (натискання Enter або кнопки показує alert).
- Клік по пропозиції заповнює поле і ховає список.
- Пагінація перемикає сторінки (по 10 постів).

## Реалізація
- Фронтенд: Next.js (React) — точка входу `app/page.tsx` делегує в модуль `modules/enter-page/`
- Бекенд: Node.js + Express — `backend/server.js`
- HTTP-клієнт: `shared/lib/ky.ts` (похід на бекенд `http://localhost:4000`)
- Типи: `shared/types/post.ts`

### Модуль `modules/enter-page/`
- `page.tsx` — контейнер сторінки, лише UI, логіка винесена в хуки
- `hooks/use-search.ts` — керує пошуком, notice, очисткою, isSearching
- `hooks/use-posts.ts` — завантаження списку/пошуку, пагінація, кеш сторінок, LocalStorage
- `search-section/` — інпут, autocomplete-список, хук для підказок з debounce і кешем
- `posts-list/post-list-wrapper.tsx` — список постів (оптимізований React.memo)
- `pagination/pagination-wrapper.tsx` — пагінація, стабільні обробники кліків

## Додаткові критерії (relevant)
- Typescript — ✔️
- Custom Server / Node JS — ✔️ (`backend/server.js`)
- LocalStorage — ✔️ збереження `currentPage` та `lastSearchTerm`
- Program optimization (Memoization) — ✔️ кеш сторінок у `usePosts`, кеш підказок у `use-search-input`
- Documentation (how to start FE/BE) — ✔️ цей README
- UI/UX micro-animations — ✔️ легка анімація появи списку підказок
- Code Style — ✔️ Biome + EditorConfig, впорядковані імпорти

> Примітка: JSON Server та модальні вікна не використовуються — не частина цього ТЗ.

## Структура
- `backend/server.js` — API: `/posts?page&limit`, `/search?q`
- `app/page.tsx` — віддає модуль `modules/enter-page/page.tsx`
- `modules/enter-page/search-section/components/search-input.tsx` — інпут з autocomplete
- `modules/enter-page/posts-list/post-list-wrapper.tsx` — список постів
- `modules/enter-page/pagination/pagination-wrapper.tsx` — пагінація
- `shared/lib/use-debounce.ts` — debounce hook
- `shared/lib/ky.ts` — ky instance на бекенд

## Code Style
- Запуск лінтера: `npm run lint`
- Форматування: `npm run format`
- Конфіги: `biome.json`, `.editorconfig`
