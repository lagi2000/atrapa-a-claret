# Atrapa a Claret · v0.3.0

Juego educativo de Luis A. García y Fernando Soriano / Claret Sevilla.

## Publicar en un repositorio nuevo

1. Crea el repositorio público **atrapa-a-claret**, con un README inicial.
2. Sube el contenido de este paquete. Mantén `public/` con su estructura completa.
3. En Settings → Pages selecciona **GitHub Actions**.
4. El flujo incluido publicará `public/` al subir cambios a `main` o al ejecutarlo manualmente.
5. Copia el enlace que aparezca en Pages cuando termine correctamente. Ese es el enlace para compartir.

La creación del repositorio y la activación de Pages requieren una acción en tu cuenta. Esta entrega no está publicada todavía.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Jugar localmente

Abre `public/index.html` en un navegador moderno, o usa el HTML autocontenido entregado por separado. No necesita servidor, cuenta, instalación de dependencias ni conexión para jugar con los archivos descargados.

## Reglas preservadas

- Cinco fases; cinco aciertos por fase, no necesariamente consecutivos.
- Tres Corazones de María. Los fallos restan vidas, no aciertos.
- 50:50, pista y cambio: una vez cada uno por partida, un comodín por pregunta.
- Cambiar de ruta no permite encadenar otro comodín en la pregunta sustituta.
- Cinco insignias y propuesta de pregunta al completar todas las fases.
- La propuesta abre la aplicación de correo; no se envía automáticamente.

## Dispositivos y controles

- PC/Mac: ratón, A–D para respuestas, 1–3 para comodines y Escape para menú.
- Tablet: controles táctiles y diseño intermedio; vertical y horizontal.
- Smartphone: respuestas apiladas, personaje y controles con espacio propio; desplazamiento vertical para pantallas bajas.
- Controles táctiles de al menos 44 px, fuentes de formulario de 16 px y respeto a movimiento reducido.
- El historial y el sonido se guardan en el navegador. Si el almacenamiento falla, la partida continúa en memoria. No hay sincronización entre dispositivos ni guardado de una partida interrumpida.

## Verificación

Ejecuta `node tests/logic.cjs` (Node, sin instalar paquetes). Doce grupos de pruebas de lógica, incluyendo validación de 79 preguntas, barajado de respuestas, recorrido de 25 aciertos, vidas, comodines, reinicios y almacenamiento defectuoso.

Las pruebas usan un adaptador de DOM: no equivalen a una prueba visual en Safari, Chrome ni dispositivos físicos. El navegador disponible bloqueó la apertura local; esa revisión sigue pendiente. El contraste documental de esta sesión fue selectivo, no una nueva validación histórica completa de las 79 respuestas.

Los escenarios son recreaciones artísticas de las etapas, no reconstrucciones históricas exactas. Los datos temporales se anclan a septiembre de 2026; revisar tras cambios institucionales.
