# Cronograma General — Sistema Horarios (HOR-2025-01)

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Metodología:** Waterfall — 4 meses (16 semanas efectivas de trabajo)  

---

## 1. Supuestos de Planificación

Antes de las fechas, se declaran explícitamente los supuestos, en cumplimiento de la Regla Fundamental ("no inventar fechas reales sin explicar supuestos"):

| # | Supuesto |
|---|----------|
| SP-01 | El proyecto se ejecuta en **16 semanas** calendario de trabajo (4 meses). Las fechas absolutas se fijan al aprobar el Acta; aquí se usa **semana relativa** (S1 = primera semana tras aprobación). |
| SP-02 | Dedicación del desarrollador: **≈ 25–30 horas semanales** compatibles con carga académica. |
| SP-03 | Ya existe un **prototipo funcional** (CRUDs empleados/disponibilidad/turnos/skills + motor básico). El cronograma parte de esa base; no se reconstruye desde cero. |
| SP-04 | La evaluación/decisión de empaquetado Desktop se realiza en paralelo construcciones tempranas para no bloquear el final. |
| SP-05 | El evaluador (jefe de carrera) dispone de hasta 1 semana por hito para revisiones/aprobaciones. |

---

## 2. Fases, Actividades y Duración

### Fase 1 — Inicio (S1)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-01 | Presentación de documentación preliminar al jefe de carrera | 2 días | — | Aprobación verbal/formal |
| A-02 | Ajustes desde feedback del evaluador | 2 días | A-01 | Acta firmada |
| **HITO H-01** | **Acta de Constitución aprobada** | **Fin S1** | A-02 | E-01 |

### Fase 2 — Planificación y Análisis (S2–S3)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-03 | Cierre de decisiones pendientes (DP-04 rúbrica, DP-03 normativa laboral) | 3 días | H-01 | Decisiones documentadas |
| A-04 | Declaración de Alcance detallado + proceso de cambios | 3 días | A-03 | Documento de alcance |
| A-05 | SRS final con revisión contra rúbrica | 4 días | A-03 | E-02 |
| **HITO H-02** | **Requisitos aprobados** | **Fin S3** | A-05 | — |

### Fase 3 — Diseño (S4–S5)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-06 | Modelo de datos completo (DER con nuevas entidades) | 3 días | H-02 | DER |
| A-07 | Diseño de arquitectura y workflow de estados | 3 días | A-06 | Doc. arquitectura |
| A-08 | Diseño del motor de generación (pseudocódigo, estrategia de degradación) | 4 días | A-06 | Doc. algoritmo |
| A-09 | Wireframes de 9 pantallas | 3 días | H-02 | Wireframes |
| A-10 | Prototipo empaquetado Desktop (decisión Electron/Tauri) | 3 días | A-07 | Decisión DP-02 |
| **HITO H-03** | **Diseño completo aprobado** | **Fin S5** | A-06..A-10 | E-05, E-06 |

### Fase 4 — Desarrollo (S6–S12)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-11 | Backend: módulo Demanda + refactor módulos existentes con validaciones | 5 días | H-03 | EDT 1.4.1–1.4.3 |
| A-12 | Backend: autenticación y roles | 4 días | A-11 | EDT 1.4.10 |
| A-13 | Backend: motor de generación completo (núcleo algorítmico) | 10 días | A-11 | EDT 1.4.4 |
| A-14 | Backend: workflow de aprobación | 4 días | A-12, A-13 | EDT 1.4.5 |
| A-15 | Backend: modificaciones quirúrgicas + sugerencia de reemplazos | 5 días | A-14 | EDT 1.4.6 |
| A-16 | Backend: auditoría | 3 días | A-14 | EDT 1.4.7 |
| A-17 | Backend: notificaciones (email + .ics) | 4 días | A-14 | EDT 1.4.8 |
| A-18 | Backend/Frontend: exportaciones .xlsx/.csv | 3 días | A-13 | EDT 1.4.9, 1.5.9 |
| A-19 | Frontend: login + demanda + refinamiento CRUDs | 6 días | A-11 | EDT 1.5.1–1.5.4 |
| A-20 | Frontend: horario semanal + panel de aprobación | 6 días | A-19 (puede solapar) | EDT 1.5.5, 1.5.6 |
| A-21 | Frontend: modificaciones/reemplazos + auditoría | 4 días | A-20 | EDT 1.5.7, 1.5.8 |
| A-22 | Integración: migración a proxy `/api`, manejo uniforme de errores | 3 días | A-21 | EDT 1.6.1 |
| **HITO H-04** | **Desarrollo completo (feature-complete)** | **Fin S12** | A-22 | E-07 |

> **Nota sobre concurrencia:** Aunque el proyecto es Waterfall, con un solo desarrollador A-19/A-20/A-21 se ejecutan **después** de sus dependencias de backend (A-11..A-14 ya completadas o en progreso), porque sin API no hay frontend que probar. El pseudo-solapamiento consiste en que A-19 puede iniciar cuando A-11 termina (no espera A-13).

### Fase 5 — Pruebas (S13–S14)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-23 | Pruebas unitarias del motor + servicios críticos | 5 días | H-04 | EDT 1.7.1 |
| A-24 | Pruebas de integración API+BD | 3 días | A-23 | EDT 1.7.2 |
| A-25 | Pruebas funcionales por checklist (casos de uso) | 3 días | A-23 | EDT 1.7.3 |
| A-26 | Pruebas de escenarios del algoritmo (8 escenarios) | 3 días | A-23 | EDT 1.7.4 |
| A-27 | Corrección de defectos encontrados | Buffer | A-23..A-26 | — |
| **HITO H-05** | **Ciclo de pruebas cerrado, 0 defectos críticos** | **Fin S14** | A-27 | E-08, E-09 |

### Fase 6 — Implementación y Cierre (S15–S16)

| ID | Actividad | Duración | Dependencia | Entregable |
|----|-----------|----------|-------------|------------|
| A-28 | Empaquetado Desktop + instalador Windows | 4 días | H-05 | EDT 1.6.2–1.6.4 |
| A-29 | Prueba del instalador en equipo limpio | 1 día | A-28 | Evidencia |
| A-30 | Manual de usuario + manual técnico | 4 días | A-28 | E-12, E-13 |
| A-31 | Matriz de trazabilidad ejecutada + informe final | 3 días | A-27 | E-10, E-14 |
| A-32 | Sesión de aceptación con evaluador | 1 día | A-31 | Acta de aceptación |
| A-33 | Defensa/presentación final | 1 día | A-32 | Entrega formal |
| **HITO H-06** | **Proyecto entregado y cerrado** | **Fin S16** | A-33 | Todo |

---

## 3. Vista Resumen por Semana (Gantt textual)

```
Actividad \ Semana     S1  S2  S3  S4  S5  S6  S7  S8  S9  S10 S11 S12 S13 S14 S15 S16
─────────────────────────────────────────────────────────────────────────────────────────
F1 Inicio             ███
F2 Planificación          ████████
F3 Diseño                          ████████
   Backend demanda+roles                   ████████████
   Motor generación (crítico)                     ████████████████
   Workflow+modificaciones+auditoría                       ████████████
   Notificaciones+exportaciones                                ████████
   Frontend (todas las pantallas)                       ████████████████
   Integración                                                        ████
F5 Pruebas                                                                ████████
F6 Empaquetado+cierre                                                               ████████

Hitos:                 ▲          ▲                   ▼(feature-     ▲              ▲
                      H-1        H-2/H-3              complete)     H-5            H-6
                                                    H-4 (S12)
```

## 4. Camino Crítico

Con un único recurso, **todo camino es crítico en lo secuencial**, pero la cadena que gobierna la fecha de término es:

**A-03 → A-05 → A-06 → A-08 → A-11 → A-13 (motor) → A-14 → A-15 → A-21 → A-22 → A-23 → A-26 → A-28 → A-31 → A-33**

Duración estimada del camino crítico: **~80 días de trabajo** distribuidos en 16 semanas. Esto deja una holgura natural de ~15% absorbida por la propia distribución semanal y el buffer de corrección de defectos (A-27).

### Riesgo principal del cronograma

El motor de generación (A-13) es la actividad más incierta. Si A-13 se extiende, todo lo posterior se desplaza. **Mitigación:** A-13 tiene dedicación exclusiva durante S7–S8 y un diseño detallado previo (A-08) que reduce incertidumbre. Si al fin de S8 el motor no está operativo, se activa el plan de contingencia: reducir segunda prioridad en RNF/RF medios (notificaciones .ics pasarían a alcance reducido) previa aprobación mediante control de cambios.

---

## 5. Resumen de Hitos

| Hito | Descripción | Semana |
|------|-------------|--------|
| H-01 | Acta de Constitución aprobada | S1 |
| H-02 | Requisitos aprobados | S3 |
| H-03 | Diseño completo aprobado | S5 |
| H-04 | Feature-complete (todo desarrollado) | S12 |
| H-05 | Pruebas cerradas, 0 críticos | S14 |
| H-06 | Entrega y cierre | S16 |

---

## 6. Control de Cronograma

- **Revisión:** cada 2 semanas con el jefe de carrera (reunión breve de avance).
- **Medición:** % de paquetes EDT completados vs plan (Earned Value simplificado opcional).
- **Variación tolerable:** ±1 semana sin escalamiento; >1 semana exige revisión formal del plan y posible ajuste de alcance vía control de cambios.
- **Herramienta:** seguimiento en esta tabla + checkbox en PROJECT_MAP.md; no se requiere MS Project/Jira para un solo recurso.
