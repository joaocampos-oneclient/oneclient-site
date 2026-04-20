# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|

## User Preferences
- Responder sempre em portugues brasileiro.
- OneClient deve ser descrito como plataforma de aceleracao de vendas com robos de IA.

## Patterns That Work
- Para deploy estatico na Vercel, usar `vercel.json` com `framework: null` e comandos nulos.

## Patterns That Don't Work
- Preset legado de framework na Vercel pode forcar deteccao incorreta (ex.: Next.js) e quebrar deploy estatico.

## Domain Notes
- Repositorio `oneclient-site` e intencionalmente estatico (HTML/CSS/JSX via CDN Babel), sem build step.
