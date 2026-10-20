# DevDirectory Advanced

A polished React 18 + Vite developer directory based on the BCA lab specification. It includes React Router routes, centralized Axios API access, directory search/filtering, developer profiles and posts, demo authentication, a protected post editor, AI writing/help demo, theme toggle, and an admin/editor workspace.

## Run locally

1. Install Node.js 18+.
2. Extract this ZIP and open the folder in VS Code.
3. In the terminal, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite.

To verify a production bundle:

```bash
npm run build
npm run preview
```

## Demo accounts / roles

- Any identifier (email, username, or mobile number) and any password of at least 4 characters can sign in in **demo mode**.
- Use `admin@devdirectory.local` as the identifier to enter the demo admin/editor panel.
- This is a frontend demo only. Do not use real passwords or personal data.

## Important production notes

- The app uses `https://jsonplaceholder.typicode.com` as required by the lab specification. JSONPlaceholder simulates POSTs and does not permanently persist created posts.
- Demo auth uses browser local storage. It is not secure production authentication. Production needs a backend, hashed passwords, secure sessions/cookies, authorization checks on the server, and verified email/mobile OTP if required.
- The AI assistant and description writer run in demo mode by default. The description writer exposes OpenAI, Gemini, Claude, and local-model provider choices that are sent to your configured backend endpoint; your backend must implement provider routing and hold the secret keys. Do not put secret AI API keys in `VITE_*` frontend variables. Build a backend proxy that holds secrets and add rate limits/authentication before production use.
- Admin actions in this demo modify local browser state only; they are not a shared database.
- Publishing UI and developer content are in English, as requested.

## Lab requirements covered

- React Router routes: `/`, `/users`, `/users/:id`, `/login`, `/signup`, `/add-post`, `/admin`, and a not-found page.
- Centralized Axios client with timeout and JSONPlaceholder base URL.
- Auth context and protected route preserving the originally requested route.
- Controlled post form with title/body limits and inline validation.
- Loading/error/retry states, directory filtering, and responsive design.
