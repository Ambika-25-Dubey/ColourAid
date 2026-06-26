# ColourAid

## Backend Foundation (Milestone 1)

### Folder structure

```
backend/
  config/
  constants/
  controllers/
  database/
    migrations/
  jobs/
  logs/
  middleware/
  models/
  routes/
    v1/
  services/
  storage/
    reports/
    temp/
    uploads/
      original/
      processed/
  tests/
  utils/
  validators/
  server.js
  .env.example
  package.json
```

### Backend setup

1. Copy `.env.example` to `.env`
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the backend:

```bash
npm start
```

4. Development mode:

```bash
npm run dev
```

### API Version

The backend uses versioned routes starting at `/api/v1`.

### Backend folder explanation

- `config/` — environment and runtime configuration
- `constants/` — shared status codes and messages
- `controllers/` — request handlers (empty placeholder for now)
- `database/` — database connection and initialization placeholders
- `jobs/` — background job placeholders
- `logs/` — logging artifacts
- `middleware/` — centralized middleware for error handling and request logging
- `models/` — data models placeholder for future database access
- `routes/` — API routing structure, including versioning
- `services/` — business logic placeholders
- `storage/` — file storage structure for uploads/reports/temp
- `tests/` — future unit and integration test structure
- `utils/` — shared helpers like API response formatting
- `validators/` — request validation placeholders

### Installation instructions

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and update values as needed.

### Development workflow

```bash
cd backend
npm run dev
```

Use this while developing the backend. When ready for production-like runs, use:

```bash
npm start
```

### API Version

The backend uses versioned routes starting at `/api/v1`.

### Available endpoint

- `GET /api/v1/health`

### Expected response

```json
{
  "success": true,
  "message": "ColourAid backend is running.",
  "data": {
    "application": "ColourAid",
    "environment": "development"
  },
  "errors": null
}
```

### Milestone 1 Checklist

- [x] Scaffold backend folders and placeholders
- [x] Add versioned routing
- [x] Add health endpoint at `/api/v1/health`
- [x] Add centralized error middleware
- [x] Add Morgan request logging
- [x] Add reusable API response helper
- [x] Add `.env.example` with minimal configuration
- [x] Update README with installation and endpoint documentation
- [ ] Manual verification of application startup and endpoint behavior
