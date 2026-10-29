# Reglas Generales e Instrucciones del Proyecto (SvnWeb)

Este documento establece las convenciones de arquitectura, patrones de diseño, estándares de código y directrices de desarrollo para el repositorio.

---

## 1. Visión General y Estructura del Proyecto

- **Directorio Principal:** La aplicación web reside en el subdirectorio `client/`.
- **Stack Tecnológico:**
  - **Framework:** React 19
  - **Lenguaje:** TypeScript 5.9+
  - **Bundler / Dev Server:** Vite 8
  - **UI / Estilos:** Material UI (MUI v7), Emotion, CSS Modules / CSS estándar.
  - **Enrutamiento:** React Router 7
  - **Linter:** ESLint 9 (flat config) + `typescript-eslint`

### Comandos de Verificación (ejecutar en `client/`)
- Desarrollo: `npm run dev`
- Compilación y verificación de tipos: `npm run build` (`tsc -b && vite build`)
- Linter: `npm run lint`

---

## 2. Arquitectura y Separación de Responsabilidades

Para mantener el código mantenible, desacoplado y comprobable, se debe seguir una separación estricta de capas (ejemplificada en el módulo `mi-amor`):

```
feature-folder/
├── components/   # UI de presentación pura y componentes visuales
├── game/         # Lógica de dominio pura (sin dependencias de React ni DOM)
├── audio/        # Subsistemas independientes (reproductores, SFX, Web Audio)
├── hooks/        # Orquestación de estado, ciclo de vida y efectos React
├── utils/        # Funciones auxiliares genéricas y utilidades puras
├── constants.ts  # Constantes de configuración, timings y valores fijos
├── types.ts      # Definición exhaustiva de tipos e interfaces
└── Feature.tsx   # Componente raíz o contenedor de la página/módulo
```

### Reglas de Diseño:
1. **Lógica de Dominio Pura (`game/`, `domain/`):**
   - No debe importar React (`useState`, `useEffect`, etc.) ni interactuar directamente con el DOM.
   - Debe ser determinista, basada en funciones puras e inmutables (ej. `swapCandies`, `findMatches`, `settleBoard`).
   - Debe ser 100% testeable de manera unitaria sin necesidad de simular el navegador o React.

2. **Capa de Presentación (`components/`):**
   - Componentes orientados a la vista, priorizando el paso de props limpias y eventos hacia arriba.
   - Evitar side-effects pesados o llamadas de orquestación complejas dentro del cuerpo de los componentes.

3. **Orquestación en Hooks Personalizados (`hooks/`):**
   - Centralizar la máquina de estados, transiciones y comunicación entre la lógica de dominio, audio y animaciones (como en `useCandyGame.ts`).
   - Exponer interfaces limpias para la vista (`board`, `score`, handlers como `selectCandy`, `reset`).

---

## 3. Manejo de Estado Asíncrono, Animaciones y Concurrencia

Al implementar flujos asíncronos complejos (animaciones, temporizadores, cadenas de efectos) se deben aplicar los patrones validados en `useCandyGame.ts`:

1. **Control de Épocas (Epoch Cancellation):**
   - Utilizar un `epochRef` (`useRef(0)`) para invalidar secuencias asíncronas pendientes si el usuario reinicia o interrumpe la acción (`epoch !== epochRef.current`).
2. **Protección contra Desmontaje (Unmount Safety):**
   - Utilizar un `aliveRef` que cambie a `false` en la limpieza de `useEffect` para abortar cualquier actualización de estado asíncrona si el componente fue desmontado.
3. **Bloqueo de Interacción (Busy Guard):**
   - Mantener una bandera sincrónica (`busyRef = useRef(false)`) complementaria al estado (`isBusy`) para bloquear clicks o interacciones dobles antes de que React procese el re-render.
4. **Callbacks Estables:**
   - Para manejadores de eventos pasados a hijos que requieren acceder al estado más reciente sin recrear la referencia de función, utilizar hooks como `useStableCallback`.

---

## 4. Estándares de TypeScript y Calidad de Código

1. **Tipado Estricto:**
   - Prohibido el uso de `any`.
   - Utilizar tipos e interfaces explícitos para contratos de datos, resultados de funciones y props.
   - Preferir `ReadonlySet`, `ReadonlyArray` o `readonly` en estructuras inmutables.
2. **Inmutabilidad:**
   - No mutar arreglos u objetos de estado directamente. Usar spreads, `map`, `filter`, `slice` o retornar nuevos estados creados de forma determinista.
3. **Convenciones de Nomenclatura:**
   - **Componentes y Tipos:** `PascalCase` (`CandyBoard`, `SettleResult`).
   - **Funciones, Hooks y Variables:** `camelCase` (`useCandyGame`, `attemptSwap`, `boardRef`).
   - **Constantes:** `UPPER_SNAKE_CASE` (`CLEAR_DELAY_MS`, `POINTS_PER_CANDY`).
4. **Comentarios de Código:**
   - Agregar comentarios sólo cuando sea indispensable explicar el *por qué* de una decisión no evidente (ej. manejo de cancelación asíncrona o algoritmos complejos), evitando comentarios obvios sobre el *qué*.

---

## 5. Directrices de Git y Flujo de Trabajo

- **Ejecución de Linter y Build:** Antes de dar por concluida una tarea, ejecutar `npm run lint` y `npm run build` en `client/` para asegurar que no se introduzcan advertencias ni errores.
- **Commits:**
  - No realizar `git add` ni commits de forma automática sin solicitud o confirmación explícita del usuario.
  - Proponer mensajes de commit claros, concisos y enfocados en el propósito del cambio (siguiendo estilo convencional tipo `feat:`, `fix:`, `chore:`).
