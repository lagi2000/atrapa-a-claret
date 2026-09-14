# Atrapa a Claret · v0.3.6.1 PWA

Juego educativo de Luis A. García y Fernando Soriano / Claret Sevilla.

## Jugar en línea

**https://lagi2000.github.io/atrapa-a-claret/**

El repositorio incluye un flujo de GitHub Actions que valida la lógica y publica `public/` en GitHub Pages con cada cambio en `main`.

## Instalar como aplicación

- Android, Windows, macOS y ChromeOS: usa el botón **Instalar app** cuando aparezca en la portada.
- iPhone/iPad: pulsa **Instalar app** y sigue la indicación **Compartir → Añadir a pantalla de inicio**.
- Una vez instalada se abre en una ventana independiente, a pantalla completa y puede jugarse sin conexión.
- El progreso y el sonido continúan guardándose únicamente en el dispositivo.

La portada utiliza una sola botonera: las zonas pulsables coinciden con los botones dibujados en la imagen. Hay dos composiciones nativas, horizontal (16:9) y vertical (9:16), que se seleccionan automáticamente al girar teléfono o tableta.

La v0.3.6.1 reemplaza las reglas de diseño acumuladas: Claret pertenece al panel de pregunta, las herramientas permanecen en su fila y las pantallas de premio tienen una composición explícita. Conserva las insignias originales, con giro y brillo respetando la preferencia de movimiento reducido. El giro no reinicia la partida.

## Jugar localmente

Abre `public/index.html` en un navegador moderno, o usa el HTML autocontenido entregado por separado. No necesita servidor, cuenta, instalación de dependencias ni conexión para jugar con los archivos descargados.

## Reglas preservadas

- Cinco fases; cinco aciertos por fase, no necesariamente consecutivos.
- Cada fase comienza con una presentación de su tema, escenario y objetivo.
- Tres Corazones de María. Los fallos restan vidas, no aciertos.
- 50:50, pista y cambio: una vez cada uno por partida, un comodín por pregunta.
- Cambiar de ruta no permite encadenar otro comodín en la pregunta sustituta.
- Cinco insignias y propuesta de pregunta al completar todas las fases.
- La propuesta abre la aplicación de correo; no se envía automáticamente.

## Dispositivos y controles

- PC/Mac: ratón, A–D para respuestas, 1–3 para comodines y Escape para menú.
- Tablet: controles táctiles y diseño intermedio; vertical y horizontal.
- Smartphone: respuestas apiladas, Claret integrado en el panel y controles táctiles compactos.
- Las pantallas principales usan altura dinámica y áreas seguras. Las reglas y el formulario permiten desplazamiento interno cuando el contenido lo necesita; por debajo de 300 px de altura se prioriza que el contenido siga siendo accesible.
- Controles táctiles de al menos 44 px, fuentes de formulario de 16 px y respeto a movimiento reducido.
- El historial y el sonido se guardan en el navegador. Si el almacenamiento falla, la partida continúa en memoria. No hay sincronización entre dispositivos ni guardado de una partida interrumpida.

## Verificación

Ejecuta `node tests/logic.cjs` (Node, sin instalar paquetes). Diecisiete grupos de pruebas de lógica y estructura: 79 preguntas, correspondencia de respuestas, 25 aciertos, vidas, comodines, reinicios, almacenamiento defectuoso, portadas, estructura del personaje, inicio de la animación y actualización de recursos.

Las pruebas de lógica usan un adaptador de DOM y no verifican el diseño. La revisión en navegador se realiza con `public/layout-check.html`: muestra el juego real dentro de una ventana redimensionable, sin alterar preguntas ni puntuaciones. Se ha completado una partida de 25 aciertos con cinco premios y victoria, cambiando entre tamaños de teléfono, tablet y escritorio. Esta comprobación no equivale a probar Safari/iOS o dispositivos físicos. El banco de preguntas no se ha reescrito ni se afirma una nueva validación histórica exhaustiva de sus fuentes.

Los escenarios son recreaciones artísticas de las etapas, no reconstrucciones históricas exactas. Los datos temporales se anclan a septiembre de 2026; revisar tras cambios institucionales.
