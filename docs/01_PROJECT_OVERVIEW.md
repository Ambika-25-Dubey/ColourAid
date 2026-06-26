# ColourAid — Project Overview

## What is ColourAid?

ColourAid is a full-stack web application that helps users understand and compensate for colour-vision deficiency (CVD). It combines validated clinical screening tools with real-time image correction so that users can both assess their vision profile and immediately see the world more clearly.

The application is non-diagnostic: results are educational indicators only. Users are encouraged to seek formal assessment from a qualified optometrist or ophthalmologist.

---

## Core User Journey

```
Take Ishihara Screening
    │
    ├─ Pass (all 3 plates correct) → Results saved → Adaptive theme unlocked
    │
    └─ Fail one or more plates    → Farnsworth D-15 colour arrangement test
                                        │
                                        └─ Results saved + Error-axis plotted
                                            │
                                            └─ Adaptive theme & Image Correction unlocked
```

---

## Feature Modules

| Module | Description |
|---|---|
| **Ishihara Screening** | 3-plate pseudo-isochromatic plate test. Saved to SQLite via REST API. |
| **Farnsworth D-15** | 15-cap drag-and-drop arrangement test with error-axis canvas plot. Saved to SQLite. |
| **Adaptive Global Themes** | CSS custom-property themes (Protan/Deutan, Tritan) applied across the UI based on test profile. |
| **Image Correction** | Drag-and-drop image upload. Server-side Daltonization (Sharp `recomb`) with client-side fallback (Canvas LMS pipeline). Supports Protanopia, Deuteranopia, Tritanopia. |

---

## Tech Stack

### Frontend
- Vanilla HTML5, CSS3, JavaScript (ES2022)
- Google Fonts — Inter
- Canvas API for error-axis plot and client-side image processing

### Backend
- Node.js 20 (ESM, `type: "module"`)
- Express.js 5
- SQLite via `sqlite` + `sqlite3`
- Sharp for server-side image matrix operations
- Multer for multipart file upload
- Helmet + CORS + Morgan middleware

---

## Project Structure (Top-level)

```
ColourAid/
├── index.html          # SPA shell
├── app.js              # All frontend JavaScript
├── style.css           # CSS with custom-property CVD themes
├── assets/             # Pre-generated Ishihara plate PNGs
├── generate_plates.py  # Python script to regenerate Ishihara plates
├── backend/            # Express API server
│   ├── server.js
│   ├── config/         # env.js
│   ├── constants/      # HTTP status codes & message strings
│   ├── controllers/    # Request handlers
│   ├── database/       # connection.js, initDatabase.js, colouraid.db
│   ├── middleware/      # requestLogger, errorMiddleware
│   ├── models/         # SQLite data-access layer
│   ├── routes/v1/      # Versioned API routes
│   ├── services/       # Business logic
│   ├── storage/        # Uploaded / processed images on disk
│   ├── tests/          # Node built-in test runner suites
│   └── utils/          # apiResponse helper
└── docs/               # This documentation
```

---

## API Endpoints

All routes are prefixed `/api/v1`.

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Server liveness check |
| `POST` | `/assessments/ishihara` | Save Ishihara screening result |
| `GET` | `/assessments/ishihara?sessionId=` | List Ishihara results (scoped to session) |
| `GET` | `/assessments/ishihara/:id` | Fetch one Ishihara result |
| `DELETE` | `/assessments/ishihara/:id` | Delete one Ishihara result |
| `POST` | `/assessments/farnsworth` | Save D-15 result |
| `GET` | `/assessments/farnsworth?sessionId=` | List D-15 results (scoped to session) |
| `GET` | `/assessments/farnsworth/:id` | Fetch one D-15 result |
| `DELETE` | `/assessments/farnsworth/:id` | Delete one D-15 result |
| `POST` | `/images/upload` | Upload a raw image (PNG / JPEG) |
| `GET` | `/images/:filename` | Serve a stored image |
| `POST` | `/images/process` | Daltonize an image (`type`, `action` in form body) |

---

## Running the Project

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev        # nodemon hot-reload
npm test           # run unit tests
```

### Frontend
Open `index.html` directly in a browser while the backend server is running on port 3000 (default). The frontend fetches `/api/v1/…` which should be proxied or served from the same origin.
