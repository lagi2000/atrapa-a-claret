# Auditoría de entrega · 13 de septiembre de 2026

## Resultado técnico

Doce grupos de pruebas de lógica superados. Incluyen las 79 preguntas, selección de respuesta tras barajado, recorrido completo de cinco fases, 25 aciertos, pérdida de tres vidas, conservación de aciertos, concesión de insignias, comodines, bloqueos, antirrepetición y guardado defectuoso.

Correcciones aplicadas:

- «Cambio de ruta» bloquea los otros comodines en la pregunta sustituta.
- Los dobles clics no duplican respuestas ni avances.
- Salir al menú cancela una respuesta pendiente; no modifica una nueva partida.
- Un historial corrupto o un navegador sin almacenamiento no detiene el juego.
- Los atajos no actúan en campos de formulario ni se disparan por repetición de tecla.
- Las respuestas usan una base azul común; verde y rojo señalan acierto y error, también acompañados de texto y símbolos.
- La animación de las insignias procede de la versión autocontenida canónica y se conserva en la edición modular.

## Integración visual

Portada aprobada exacta. Cinco escenarios: Sallent, misión/Cataluña-Canarias, Cuba-Madrid, Vic-Fontfroide y misión universal/Roma. Cuatro poses de Claret vinculadas a presentación, acierto/celebración, error/ánimo y victoria.

Los archivos recuperados simulaban transparencia con una cuadrícula. La extracción generativa no produjo canal alfa real; se sustituyó ese fondo por marfil y se integraron como retratos enmarcados. No se afirma que sean recortes transparentes.

## Adaptación implementada

- Escritorio: dos columnas, pregunta protagonista y personaje lateral.
- Tablet de 721–1100 px: cabecera compacta, personaje reducido y respuestas en dos columnas.
- Smartphone hasta 720 px: respuestas en columna, Claret integrado en el panel y controles táctiles compactos.
- Horizontal de poca altura: pregunta y respuestas se distribuyen en dos zonas para conservar una sola vista.
- Portada, prefases, juego, resultados y ventanas usan la altura dinámica disponible sin scroll.
- Formulario compatible con zoom móvil y preferencia de movimiento reducido.

La v0.3.1 incorpora un sistema tipográfico multiplataforma: fuente redondeada para títulos y controles, fuente de lectura para preguntas y textos narrativos, y fuente de interfaz del sistema para información funcional.

**Límite de verificación:** no se completó una prueba renderizada en Chrome, Safari ni dispositivos reales. El navegador del entorno bloqueó tanto el servidor local como la apertura de archivos. Las pruebas de lógica usan un adaptador de DOM, no un navegador completo. La compatibilidad visual debe comprobarse tras publicar.

## Contenido

Se conserva el banco de 79 preguntas y sus respuestas. Se reformularon pistas que revelaban nombres, cifras u opciones de manera directa. No se realizó una segunda revisión histórica exhaustiva de cada respuesta: el contraste documental fue selectivo.

Referencias institucionales consultadas:

- Superior general y anuncio del próximo capítulo: https://www.claret.org/announcement-of-the-xxvii-general-chapter/
- Presentación institucional de la Congregación: https://www.claret.org/
- Presencia en 73 países: contraste adicional con https://procladeint.org/

Las preguntas sobre presencia y superior general quedan referidas a septiembre de 2026 para no presentarlas como datos eternamente actuales.

## Publicación

Proyecto preparado para el repositorio público `lagi2000/atrapa-a-claret`, con validación y despliegue de `public/` mediante GitHub Actions. Enlace previsto: https://lagi2000.github.io/atrapa-a-claret/

La v0.3.2 añade manifiesto PWA, iconos para escritorio/Android/iOS, ejecución independiente, caché completa para juego sin conexión y actualización del caché por versión.

La v0.3.3 elimina la botonera móvil duplicada. La v0.3.4 sustituye el recorte ampliado por dos portadas completas: 16:9 en horizontal y 9:16 en vertical. El navegador selecciona la composición al girar el dispositivo y mantiene una única capa de zonas táctiles alineada con los botones dibujados.
