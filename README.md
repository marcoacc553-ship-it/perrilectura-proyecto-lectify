# PerriLectura 🐾📚

Aplicación web educativa que propone **3 lecturas al día**. Cada lectura incluye preguntas de comprensión; al completar las tres se mantiene la racha diaria y se obtienen monedas para adoptar mascotas.

## GitHub Pages

Este repositorio está preparado para publicarse automáticamente con **GitHub Actions + GitHub Pages**.

1. Crea un repositorio en GitHub llamado `PerriLectura`.
2. Sube todos los archivos de esta carpeta a la rama `main`.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment → Source**, selecciona **GitHub Actions**.
5. Haz un push/commit a `main` o ejecuta el workflow manualmente desde **Actions**.
6. Cuando termine, GitHub mostrará el enlace de la página.

La URL de un repositorio de usuario normalmente tendrá esta forma:
`https://TU-USUARIO.github.io/PerriLectura/`

## Uso en celular

El diseño es responsive y el proyecto incluye `manifest.json`, iconos y Service Worker. Desde un navegador compatible, el usuario puede añadir el sitio a la pantalla de inicio para usarlo con una experiencia parecida a una app.

## Estructura

- `index.html` — interfaz principal.
- `css/style.css` — estilos responsive.
- `js/data.js` — lecturas y preguntas.
- `js/storage.js` — progreso local.
- `js/app.js` — lógica de la aplicación.
- `manifest.json` — configuración PWA.
- `sw.js` — caché básica.
- `icons/` — iconos de la aplicación.
- `.github/workflows/deploy-pages.yml` — publicación automática en GitHub Pages.
