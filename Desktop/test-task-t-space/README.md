## T-Space Company – Tournaments Page (Next.js)

An example Next.js 16 (App Router) application that lists gaming tournaments with search, theming, and a modal preview. A local mock API is powered by json-server.

### Features
- **Tournaments list**: Fetches from a local API and displays responsive cards
- **Search with debounce**: 500ms debounce updates server query by `title`
- **Light/Dark theme**: Toggle and persist via Zustand store
- **Tournament modal**: Styled dialog with join simulation
- **Type-safe utilities**: `ky` instance, `cn` helper, debounced handler

### Tech Stack
- **Runtime/Framework**: Next.js 16, React 19, TypeScript
- **State**: Zustand (+ devtools, persist)
- **HTTP**: ky
- **UI**: Tailwind CSS v4 (via `@tailwindcss/postcss`), shadcn/ui primitives, styled-components (CSS-in-JS for dialog)
- **Lint/Format**: Biome
- **Mock API**: json-server (`db.json`)
- **Other**: React Compiler enabled (`reactCompiler: true`)

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)

### Install dependencies
```bash
npm install
```

### Run the mock API (port 4000)
```bash
npm run server
```

### Run the web app (port 3000)
```bash
npm run dev
```

Open `http://localhost:3000`. The root route redirects to `/tournaments`.

## NPM Scripts
- `dev`: Start Next.js in development
- `build`: Build for production
- `start`: Start production server
- `lint`: Run Biome checks
- `format`: Format with Biome (writes changes)
- `server`: Start json-server on `http://localhost:4000`

## Application Overview

### Routing
- `app/page.tsx`: Client component that redirects to `/tournaments`
- `app/tournaments/page.tsx`: Main page composing header, search, list, and modal inside a themed background

### UI Composition
- Header/search: `modules/tournaments-page/heading-of-tournaments-component/heading-of-tournaments-wrapper.tsx`
  - Theme switch (`shared/store/use-theme-store.tsx`)
  - Debounced search (`shared/lib/debounce.ts` and handler under `handlers/handle-change-with-debounce.tsx`)
- List: `modules/tournaments-page/list-card-with-tournamets-components/list-cards-tournament-wrapper.tsx`
  - Data hook `use-torunamets.tsx` fetches and populates the store
  - Skeleton while loading, empty/error states
  - Click card to open modal
- Modal: `shared/components/dialog/dialog.tsx` using styled-components for layout/visuals
- Background: `shared/ui/background.tsx` applies gradient based on theme

### State Management
- **Theme**: `shared/store/use-theme-store.tsx` (Zustand + persist)
- **Page-scoped data**: `modules/tournaments-page/global-only-for-this-page/store/use-fetch-data-store.tsx`
  - `title` for search query
  - `fetchdataTornametnsList` for list data
  - `setApiFetchDataTournamentsList(endpoint)` fetches data using `kyInstance`

### Data Fetching
- `shared/lib/ky-instance.ts` sets `prefixUrl` to `http://localhost:4000`
- Initial load in `use-torunamets.tsx` GETs `tournaments`
- Search handler queries `GET /tournaments?title=<encoded>` after debounce

## Mock API

The mock database is defined in `db.json`:

- Resource: `GET http://localhost:4000/tournaments`
- Supports basic query like `?title=` used by the UI

Example record:
```json
{
  "id": 1,
  "title": "Cyber Arena 2025",
  "image": "/game-icon-1.jpg",
  "description": "Кібер-турнір року з Fortnite, CS2 і Valorant. Призовий фонд — $50,000.",
  "participants": 230,
  "status": "active"
}
```

## Project Structure (high level)

```
app/
  layout.tsx, globals.css, favicon.ico
  page.tsx                 # redirects to /tournaments
  tournaments/page.tsx     # tournaments page composition
modules/
  tournaments-page/
    heading-of-tournaments-component/
      css-in-js/*          # header/search styled wrappers
      handlers/*           # debounced input handler
      heading-of-tournaments-wrapper.tsx
    list-card-with-tournamets-components/
      components/*         # list item card
      css-in-js/*          # container layout
      hook/use-torunamets.tsx
      list-cards-tournament-wrapper.tsx
    global-only-for-this-page/store/use-fetch-data-store.tsx
shared/
  components/dialog/*      # styled dialog components and wrapper
  lib/{ky-instance,utils,debounce}.ts
  shad-cn/ui/*             # input, switch, skeleton, etc.
  store/{use-modal-store,use-theme-store}.tsx
  types/base-props.ts
  ui/background.tsx
public/
  game-icon-*.jpg, image.png
```

## Development Notes
- **Styling**: Tailwind v4 classes in most UI; some CSS-in-JS via styled-components for dialog and headers
- **Theming**: Body/background colors switch with a persisted Zustand store
- **React Compiler**: Enabled in `next.config.ts` (`reactCompiler: true`)
- **Accessibility**: Inputs use `Label`; focus rings preserved

## Linting & Formatting
```bash
npm run lint
npm run format
```

## Production Build
```bash
npm run build
npm run start
```

Ensure the mock API is running if the page depends on it.

## Troubleshooting
- If the list does not load: start the mock API (`npm run server`) and confirm `http://localhost:4000/tournaments` responds
- CORS errors locally: `ky` uses same-origin to `localhost:4000`; ensure no proxies interfering
- Empty search results: try clearing the search input; `?title=` filter matches by json-server’s default behavior

## License
MIT (for the purposes of the test task; adapt as needed)
