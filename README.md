# Gridalta — sitio web

Sitio corporativo de **Gridalta**, empresa de reformas y mantenimiento en Alicante y
la Costa Blanca (España). HTML, CSS y JavaScript estáticos: sin framework, sin
dependencias y sin paso de compilación obligatorio.

---

## Qué incluye

| Página | Archivo | Contenido |
| --- | --- | --- |
| Portada | `index.html` | Hero, servicios, proceso, proyectos, testimonios, zonas, preguntas frecuentes |
| Servicios | `servicios.html` | Las seis líneas de servicio en detalle |
| Proyectos | `proyectos.html` | Obra entregada con superficie, plazo y materiales |
| Empresa | `empresa.html` | Historia, compromisos, equipo y materiales |
| Contacto | `contacto.html` | Formulario de presupuesto, datos directos y cobertura |
| Aviso legal | `aviso-legal.html` | Plantilla LSSI — **pendiente de revisar** |
| Privacidad | `privacidad.html` | Plantilla RGPD/LOPDGDD — **pendiente de revisar** |

Además: `robots.txt`, `sitemap.xml`, favicon SVG, imagen para redes sociales y datos
estructurados `schema.org/GeneralContractor` en la portada.

## Estructura

```
├── index.html, servicios.html, …   páginas generadas (son las que se publican)
├── assets/
│   ├── css/styles.css              todo el diseño, con tokens en :root
│   ├── js/main.js                  navegación, acordeón, revelados, formulario
│   └── img/                        arte de relleno en SVG + logo + tarjeta social
├── src/
│   ├── parts/                      cabecera, pie y cuerpo de cada página
│   └── build.js                    ensambla src/parts → páginas HTML
├── robots.txt, sitemap.xml
```

## Cómo editar

**Un texto suelto** → edítalo directamente en el `.html` y listo.

**La cabecera, el pie o el menú** → edita `src/parts/header.html` o
`src/parts/footer.html` y regenera todas las páginas de una vez:

```bash
node src/build.js
```

Esto existe para que el menú y el pie no se descuadren entre páginas. Si prefieres no
usarlo, puedes borrar `src/` y editar los HTML a mano; el sitio funciona igual.

**Colores y tipografías** → están centralizados al principio de `assets/css/styles.css`,
en el bloque `:root`. Cambiando ahí el acento (`--clay`) o la paleta de piedra se
actualiza el sitio entero.

## Antes de publicar

Estos datos son **de ejemplo** y hay que sustituirlos:

- Teléfono `+34 600 000 000` (aparece en cabecera, pie, contacto y enlace de WhatsApp)
- Correo `hola@gridalta.es`
- Dirección `Avda. de la Constitución 24, 03001 Alicante`
- CIF, tomo y folio del Registro Mercantil en `aviso-legal.html`
- Dominio `https://www.gridalta.es` en `sitemap.xml`, `robots.txt` y las etiquetas
  `canonical` / `og:` de `src/parts/head.html`
- Enlaces de redes sociales en el pie (ahora apuntan a `#`)
- Las cifras de la portada (12 años, 480 obras, 4,9 de valoración) y los testimonios

Búsqueda rápida de lo que falta por cambiar:

```bash
grep -rn "600 000 000\|gridalta.es\|B-00000000" --include="*.html" .
```

### Fotografías

Las imágenes de `assets/img/*.svg` son **arte de relleno generado**: degradados de
piedra con trazado arquitectónico, pensados para que el sitio se vea acabado mientras
llegan las fotos reales. Para sustituirlas, coloca tu foto con el mismo nombre
(`cocina.jpg`, `bano.jpg`…) y cambia la extensión en el `<img>` correspondiente. Los
contenedores ya recortan con `object-fit: cover`, así que no hace falta que las fotos
tengan una proporción concreta.

### Formulario de contacto

`assets/js/main.js` valida los campos en el navegador y muestra un mensaje de
confirmación, **pero no envía nada a ningún sitio**. Para que llegue el aviso, conecta
un servicio en el manejador `form.addEventListener('submit', …)`: Formspree, Netlify
Forms, EmailJS o un endpoint propio. El punto exacto está señalado con un comentario.

## Ver el sitio en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Publicar

Al ser estático vale cualquier alojamiento: GitHub Pages, Netlify, Vercel, Cloudflare
Pages o un FTP clásico. No hay que compilar nada: se suben los archivos tal cual.

## Notas técnicas

- Diseño adaptable desde 320 px, sin desbordamiento horizontal.
- Respeta `prefers-reduced-motion`: las animaciones se desactivan si el sistema lo pide.
- Navegación por teclado con enlace de salto al contenido y foco visible.
- Tipografías servidas por Google Fonts, con alternativas del sistema si no cargan.
- Sin cookies, sin analítica y sin scripts de terceros.
