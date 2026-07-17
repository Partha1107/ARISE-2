# ARISE

ARISE is a personal productivity dashboard built as a React/Vite frontend application. This workspace currently contains the client app and documentation; backend/server code is not included here.

**Quick Links**
- Docs: [docs/](docs/)
- Client: `client/`

## Features
- Dashboard with widgets such as clock, weather, notes, and tasks
- Notes, calendar events, and missions
- Budget and finance tracking
- GitHub integration and mail utilities
- User profile and account-related pages
- Developer and analytics utilities

## Tech Stack
- Frontend: React, Vite, Tailwind CSS
- State management: Zustand
- UI libraries: Recharts, React Calendar, Framer Motion, Lucide Icons
- API client: Axios
- Supabase client integration

## Repo Layout

- `client/` — React application source and frontend tooling
- `docs/` — API and design documentation

## Prerequisites
- Node.js >= 18
- npm

## Quick Start (development)

1. Clone the repo

```
git clone https://github.com/Partha1107/ARISE.git
cd ARISE
```

2. Install dependencies

```
cd client
npm install
```

3. Start the frontend

```
npm run dev
```

4. Open the app

- Visit `http://localhost:5173`

## Environment

The current workspace does not include a backend server. Add any `.env` configuration needed by your backend or custom frontend integrations in the appropriate service directories.

## Docker

This repository contains an empty `docker-compose.yml` placeholder. No active service definitions are configured yet.

## Documentation

The `docs/` directory contains supporting documentation:

- `docs/API.md` — API endpoints and examples
- `docs/DATABASE.md` — database and schema notes
- `docs/FEATURES.md` — feature descriptions
- `docs/ROADMAP.md` — planned work
- `docs/UI.md` — user interface notes

## Tests

No automated tests are configured yet. Consider adding unit tests, integration tests, and React component tests for the frontend.

## Contributing

Contributions are welcome. Open an issue first to discuss major changes, then submit a pull request with focused commits.

