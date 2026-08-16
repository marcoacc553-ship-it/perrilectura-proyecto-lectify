# PerriLectura

Aplicación web educativa de una sola página. Lee el texto diario, responde las tres preguntas y alimenta a Luna.

## Cómo usarla

1. Abre `index.html` en cualquier navegador moderno.
2. Presiona **Alimentar a Luna**.
3. Lee y responde correctamente las tres preguntas.
4. El progreso queda guardado en el navegador con `localStorage`.

La aplicación usa la fecha local del equipo para impedir una segunda alimentación el mismo día. Incluye siete lecturas variadas que rotan cada semana. Al completar siete días distintos, se desbloquea a Nico, una mascota dinosaurio que puedes alternar con Luna.

La interfaz está optimizada para celulares y computadoras: usa un diseño adaptable y controles táctiles amplios.

## Estructura

```
PerriLectura/
├── index.html
├── css/style.css
├── js/data.js
├── js/storage.js
└── js/app.js
```
