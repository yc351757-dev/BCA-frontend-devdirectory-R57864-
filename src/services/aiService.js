const endpoint = import.meta.env.VITE_AI_ENDPOINT;

// The frontend calls only your own backend endpoint. Never put secret provider keys in VITE_ variables.
async function requestBackend(payload) {
  if (!endpoint) return null;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('AI service request failed');
  return response.json();
}

export async function generateDescription({ title, notes, tone = 'Professional', length = 'Medium', provider = 'demo' }) {
  const result = provider === 'demo' ? null : await requestBackend({ task: 'description', title, notes, tone, length, provider });
  if (result?.text) return result.text;
  const cleanTitle = title.trim() || 'Developer Project';
  const cleanNotes = notes.trim();
  const intro = `${cleanTitle} is a software project focused on delivering a clear, reliable, and user-friendly experience.`;
  const detail = cleanNotes ? ` It brings together ${cleanNotes.replace(/[.!?]+$/,'')}.` : ' It emphasizes thoughtful engineering, maintainable code, and a smooth user experience.';
  const ending = tone === 'Friendly' ? ' Built to make useful technology approachable.' : tone === 'Technical' ? ' The implementation prioritizes modular architecture, performance, and maintainability.' : ' The project demonstrates practical problem-solving, attention to quality, and a focus on real user needs.';
  return length === 'Short' ? `${intro}${detail}` : `${intro}${detail}${ending}`;
}
export async function askHelpAI(prompt) {
  const result = await requestBackend({ task: 'help', prompt });
  if (result?.text) return result.text;
  const p = prompt.toLowerCase();
  if (p.includes('publish') || p.includes('post')) return 'To publish: sign in, open Publish in the navigation, choose an author, add an English title and description, then submit. This demo uses JSONPlaceholder, so posts are not permanently saved by the remote API.';
  if (p.includes('search') || p.includes('find')) return 'Open Developers and use the search field for a name, company, role, or skill. Combine it with the availability and sorting controls to narrow the results.';
  if (p.includes('admin') || p.includes('delete')) return 'The demo admin is admin@devdirectory.local. Sign in with a password of at least four characters. Admin changes are stored in this browser only; production access control must be enforced by a backend.';
  if (p.includes('ai') || p.includes('description')) return 'The AI description writer supports Professional, Friendly, and Technical tones. Add a title and notes, select a tone and length, then choose Generate with AI. Demo mode creates a draft locally; configure VITE_AI_ENDPOINT to use your secure backend.';
  return 'I can help with developer search, profiles, publishing, the description writer, and admin tools. Tell me which feature you want to use. This assistant is in demo mode until a backend AI endpoint is configured.';
}
