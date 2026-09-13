# Atrapa a Claret · v0.3.5 PWA

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

La v0.3.5 integra a Claret en un escenario propio durante las preguntas y convierte cada fase superada en una ceremonia de premio, con insignia central animada, brillo y recorrido visual de logros.

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
- Las pantallas principales se ajustan a una sola vista mediante unidades dinámicas de pantalla, sin scroll durante la partida.
- Controles táctiles de al menos 44 px, fuentes de formulario de 16 px y respeto a movimiento reducido.
- El historial y el sonido se guardan en el navegador. Si el almacenamiento falla, la partida continúa en memoria. No hay sincronización entre dispositivos ni guardado de una partida interrumpida.

## Verificación

Ejecuta `node tests/logic.cjs` (Node, sin instalar paquetes). Catorce grupos de pruebas de lógica y estructura, incluyendo validación de 79 preguntas, barajado de respuestas, recorrido de 25 aciertos, vidas, comodines, reinicios, almacenamiento defectuoso y portadas por orientación.

Las pruebas usan un adaptador de DOM: no equivalen a una prueba visual en Safari, Chrome ni dispositivos físicos. El navegador disponible bloqueó la apertura local; esa revisión sigue pendiente. El contraste documental de esta sesión fue selectivo, no una nueva validación histórica completa de las 79 respuestas.

Los escenarios son recreaciones artísticas de las etapas, no reconstrucciones históricas exactas. Los datos temporales se anclan a septiembre de 2026; revisar tras cambios institucionales.
