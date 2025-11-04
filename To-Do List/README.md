# To-Do (Vanilla JS + LocalStorage)

Pequeña app To-Do modular en ES Modules, con persistencia en `localStorage` y filtros.

## Estructura
- `public/`: `index.html` (carga `src/js/main.js` como módulo ES).
- `src/js/`: módulos `store`, `todoModel`, `todoView`, `todoController`.
- `src/styles/`: `main.css`.

## Scripts de desarrollo
Sin bundler. Basta con abrir `public/index.html` en un server estático.
- Recomendado: `npx serve public` o VSCode Live Server.

## Roadmap corto
- Editar in-place al doble clic.
- Etiquetas y búsqueda.
- PWA (manifest + SW).
- Tests (Vitest + @testing-library/dom).
