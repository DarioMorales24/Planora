# Estructura de Desglose de Trabajo (EDT / WBS)
## Sistema Horarios — HOR-2025-01

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Proyecto:** Sistema Horarios  
**Metodología:** Waterfall  

---

## 1. Orientación de la EDT

La EDT está **orientada a entregables** (no a actividades), siguiendo la práctica recomendada del PMBOK®. Se estructura en 3 niveles:

- **Nivel 1:** El proyecto completo.
- **Nivel 2:** Fases del ciclo de vida Waterfall (corresponden a entregables mayores).
- **Nivel 3:** Paquetes de trabajo concretos.

---

## 2. EDT — Vista Jerárquica

```
1.0 Proyecto Sistema Horarios (Entrega completa)
│
├── 1.1 Gestión del Proyecto
│   ├── 1.1.1 Acta de Constitución
│   ├── 1.1.2 Plan de Dirección del Proyecto
│   ├── 1.1.3 Seguimiento y Control (hitos, cambios)
│   └── 1.1.4 Documentación de Gestión (riesgos, interesados, calidad)
│
├── 1.2 Análisis y Requisitos
│   ├── 1.2.1 Especificación de Requisitos (SRS)
│   ├── 1.2.2 Declaración de Alcance Detallado
│   └── 1.2.3 Matriz de Requisitos Trazable
│
├── 1.3 Diseño del Sistema
│   ├── 1.3.1 Diseño de Arquitectura del Sistema
│   ├── 1.3.2 Diseño de Modelo de Datos (DER)
│   ├── 1.3.3 Diseño de Interfaz de Usuario (wireframes)
│   ├── 1.3.4 Diseño del Motor de Generación (algoritmo)
│   └── 1.3.5 Diseño de Flujo de Estados (Maker-Checker)
│
├── 1.4 Construcción — Backend
│   ├── 1.4.1 Módulo de Empleados y Skills (ya iniciado)
│   ├── 1.4.2 Módulo de Disponibilidad (ya iniciado)
│   ├── 1.4.3 Módulo de Demanda de Personal
│   ├── 1.4.4 Motor de Generación de Horarios (completo)
│   ├── 1.4.5 Módulo de Workflow y Aprobación
│   ├── 1.4.6 Módulo de Modificaciones Quirúrgicas y Reemplazos
│   ├── 1.4.7 Módulo de Auditoría
│   ├── 1.4.8 Módulo de Notificaciones (email + .ics)
│   ├── 1.4.9 Módulo de Exportaciones (.xlsx / .csv)
│   └── 1.4.10 Módulo de Autenticación y Roles
│
├── 1.5 Construcción — Frontend
│   ├── 1.5.1 Pantalla de Login y control de sesión
│   ├── 1.5.2 CRUD Empleados (ya iniciado)
│   ├── 1.5.3 CRUD Disponibilidad (ya iniciado)
│   ├── 1.5.4 Pantalla de Configuración de Demanda
│   ├── 1.5.5 Pantalla de Horario Semanal (vista calendario)
│   ├── 1.5.6 Panel de Aprobación (Maker-Checker)
│   ├── 1.5.7 Pantalla de Modificaciones y Reemplazos
│   ├── 1.5.8 Vista de Auditoría
│   └── 1.5.9 Acciones de Exportación en UI
│
├── 1.6 Integración y Empaquetado
│   ├── 1.6.1 Integración Frontend-Backend (proxy /api)
│   ├── 1.6.2 Selección de herramienta Desktop (Electron/Tauri)
│   ├── 1.6.3 Configuración de empaquetado
│   └── 1.6.4 Instalador Windows (.exe)
│
├── 1.7 Pruebas
│   ├── 1.7.1 Pruebas Unitarias (backend servicios + algoritmo)
│   ├── 1.7.2 Pruebas de Integración (API + BD)
│   ├── 1.7.3 Pruebas Funcionales (casos de uso extremo a extremo)
│   ├── 1.7.4 Pruebas del Algoritmo (escenarios críticos)
│   ├── 1.7.5 Pruebas de Aceptación (con evaluador)
│   └── 1.7.6 Informe de Pruebas y Matriz de Trazabilidad ejecutada
│
└── 1.8 Cierre y Entrega
    ├── 1.8.1 Manual de Usuario
    ├── 1.8.2 Manual Técnico
    ├── 1.8.3 Informe Final del Proyecto
    └── 1.8.4 Entrega formal y defensa ante evaluador
```

---

## 3. Tabla EDT Detallada

| Código EDT | Entregable / Paquete | Descripción | Nivel |
|------------|---------------------|-------------|-------|
| 1.0 | Proyecto Sistema Horarios | Entrega completa del sistema documentado y funcional | 1 |
| 1.1 | Gestión del Proyecto | Actividades de dirección y seguimiento | 2 |
| 1.1.1 | Acta de Constitución | Documento de autorización formal del proyecto | 3 |
| 1.1.2 | Plan de Dirección | Plan de gestión adaptado al proyecto (alcance, tiempo, calidad, riesgos, cambios) | 3 |
| 1.1.3 | Seguimiento y Control | Revisión de avance en hitos, control de cambios | 3 |
| 1.1.4 | Documentación de Gestión | Registros de riesgos, interesados, decisiones | 3 |
| 1.2 | Análisis y Requisitos | Definición formal del qué construir | 2 |
| 1.2.1 | SRS | Documento con 19 RF + 8 RNF (ver 03-SRS) | 3 |
| 1.2.2 | Declaración de Alcance | Alcance detallado con inclusiones/exclusiones y criterios de aceptación | 3 |
| 1.2.3 | Matriz de Requisitos | Base para la trazabilidad posterior | 3 |
| 1.3 | Diseño del Sistema | Definición del cómo construir | 2 |
| 1.3.1 | Arquitectura | Diseño de capas, componentes y comunicación frontend-backend | 3 |
| 1.3.2 | Modelo de Datos (DER) | Diagrama entidad-relación completo con todas las entidades nuevas (Horario, Turno, Aprobación, Auditoría, Usuario, Notificación) | 3 |
| 1.3.3 | Diseño de Interfaz | Wireframes de las 9 pantallas principales | 3 |
| 1.3.4 | Diseño del Motor | Especificación del algoritmo: entradas, salidas, pseudocódigo, complejidad asintótica esperada, estrategia ante demanda insatisfacible | 3 |
| 1.3.5 | Diseño de Workflow | Máquina de estados formal alrededor del HORARIO (borrador/revisión/aprobado) con transiciones y validadores | 3 |
| 1.4 | Construcción — Backend | Implementación de la lógica de negocio | 2 |
| 1.4.1 | Módulo Empleados y Skills | Refactor del código existente + validaciones (`@Valid`) | 3 |
| 1.4.2 | Módulo Disponibilidad | Refactor del código existente + reglas de cruce de medianoche | 3 |
| 1.4.3 | Módulo Demanda | **Nuevo**: entidad Demanda(franja, dia, minimo) + CRUD | 3 |
| 1.4.4 | Motor de Generación | Extensión del servicio actual para incorporar demanda por franjas, optimización y estrategia de degradación | 3 |
| 1.4.5 | Módulo Workflow | Entidad Horario con estado; transiciones; reglas de edición por estado | 3 |
| 1.4.6 | Modificaciones y Reemplazos | Algoritmo de sugerencias de reemplazo por turno afectado | 3 |
| 1.4.7 | Módulo Auditoría | Entidad AuditLog + interceptores de eventos de modificación | 3 |
| 1.4.8 | Módulo Notificaciones | Envío asíncrono (`@Async`); plantillas Thymeleaf; generación .ics | 3 |
| 1.4.9 | Módulo Exportaciones | Generación .xlsx (Apache POI o librería JS en front) y .csv | 3 |
| 1.4.10 | Autenticación y Roles | Login, roles (Gerente, Aprobador, Empleado), autorización por endpoint | 3 |
| 1.5 | Construcción — Frontend | Implementación de interfaz de usuario | 2 |
| 1.5.1 | Login / Sesión | Pantalla de acceso + almacenamiento de sesión local | 3 |
| 1.5.2 | CRUD Empleados | Refinamiento del componente existente + validaciones de formato | 3 |
| 1.5.3 | CRUD Disponibilidad | Refinamiento del componente existente | 3 |
| 1.5.4 | Config. Demanda | **Nuevo**: grilla de franjas horarias × días con mínimos numéricos | 3 |
| 1.5.5 | Horario Semanal | Vista calendario mejorada con estados visuales (borrador/aprobado, brechas de cobertura) | 3 |
| 1.5.6 | Panel de Aprobación | Cola de horarios con acciones de Revisar/Aprobar/Devolver | 3 |
| 1.5.7 | Modificaciones | Selector de turno, edición puntual, lista de reemplazos sugeridos | 3 |
| 1.5.8 | Auditoría | Tabla filtrable del registro de cambios | 3 |
| 1.5.9 | Exportaciones UI | Botones/descarga .xlsx y .csv integrados | 3 |
| 1.6 | Integración y Empaquetado | Unión de componentes y distribución | 2 |
| 1.6.1 | Integración API | Migración de fetch absolutos a proxy `/api`, manejo de errores uniforme | 3 |
| 1.6.2 | Selección herramienta Desktop | Evaluación Electron vs Tauri (decisión DP-02) | 3 |
| 1.6.3 | Configuración de empaquetado | Inclusión del backend JAR dentro del bundle desktop; arranque automático | 3 |
| 1.6.4 | Instalador Windows | Generación del ejecutable instalador y prueba en equipo limpio | 3 |
| 1.7 | Pruebas | Verificación de cumplimiento de requisitos | 2 |
| 1.7.1 | Pruebas Unitarias | JUnit para servicios y algoritmo (cobertura mínima del motor: funciones puras críticas) | 3 |
| 1.7.2 | Pruebas de Integración | Pruebas de endpoints REST con H2 de prueba | 3 |
| 1.7.3 | Pruebas Funcionales | Ejecución manual guiada de casos de uso (checklist) | 3 |
| 1.7.4 | Pruebas del Algoritmo | Escenarios: demanda insatisfacible, trasnoche, retrampas de solapamiento, horas máximas, escapes vacíos | 3 |
| 1.7.5 | Pruebas de Aceptación | Sesión con evaluador/jefe de carrera validando criterios del SRS | 3 |
| 1.7.6 | Informe de Pruebas | Documento de resultados + evidencias (capturas, logs) + matriz de trazabilidad ejecutada | 3 |
| 1.8 | Cierre y Entrega | Documentación final y entrega | 2 |
| 1.8.1 | Manual de Usuario | Guía ilustrada para gerente de sucursal | 3 |
| 1.8.2 | Manual Técnico | Instalación, configuración, estructura de código, mantenimiento | 3 |
| 1.8.3 | Informe Final | Resumen ejecutivo, cumplimiento de objetivos, lecciones aprendidas | 3 |
| 1.8.4 | Entrega y Defensa | Presentación al evaluador con demostración en vivo | 3 |

**Total de paquetes de trabajo (nivel 3):** 38

---

## 4. Diccionario de la EDT

Se documentan los paquetes de trabajo más relevantes. Los paquetes de refinamiento de código existente (1.4.1, 1.4.2, 1.5.2, 1.5.3) y documentales menores se omiten de este diccionario por ser autoexplicativos.

---

### 1.4.3 — Módulo de Demanda de Personal

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.4.3 |
| **Descripción** | Crear la capacidad de configurar demanda de personal: cuántos trabajadores se requieren por día y franja horaria. Actualmente el sistema modela demanda implícitamente vía `requiredStaff` en Shift; este módulo formaliza el concepto por franja horaria según la descripción del proyecto. |
| **Entregable** | Entidad `Demand` + repositorio + servicio + controlador REST (`/api/demands`) + validaciones |
| **Criterio de aceptación** | El gerente puede definir una grilla lunes-domingo × franjas con mínimo de trabajadores; el motor la consume durante la generación |
| **Dependencias** | 1.3.2 (modelo de datos), 1.4.1 |
| **Esfuerzo estimado** | 3 días |
| **Justificación** | En la descripción del proyecto, la demanda se define por franjas horarias (ej: 09:00–11:00 → 2 trabajadores), no por turno. Esta diferencia debe resolverse en el modelo. |

---

### 1.4.4 — Motor de Generación de Horarios

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.4.4 |
| **Descripción** | Extender el `ScheduleGenerationService` existente para: (a) optimizar contra demanda por franja; (b) minimizar sobreasignación; (c) aplicar estrategia de degradación controlada cuando la demanda no sea satisfacible (devolver marcadores de brecha por franja). |
| **Entregable** | Servicio de generación con tests unitarios del núcleo algorítmico |
| **Criterio de aceptación** | Dados escenarios de prueba definidos (ver 1.7.4), el motor cumple restricciones duras al 100% y reporta brechas de cobertura explícitamente |
| **Dependencias** | 1.3.4, 1.4.1, 1.4.2, 1.4.3 |
| **Esfuerzo estimado** | 10 días |
| **Riesgos asociados** | R-01, R-02 (ver Registro de Riesgos) |

---

### 1.4.5 — Módulo de Workflow y Aprobación

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.4.5 |
| **Descripción** | Implementar la máquina de estados del horario (BORRADOR → EN_REVISION → APROBADO) con protección de aprobados y registro de transiciones. |
| **Entregable** | Entidad `Schedule` con campo estado + endpoints de transición + validaciones de transición por rol |
| **Criterio de aceptación** | Un horario aprobado no puede regenerarse sin revocar aprobación; cada transición registra usuario y fecha |
| **Dependencias** | 1.3.5, 1.4.10 (roles), 1.4.4 |
| **Esfuerzo estimado** | 4 días |

---

### 1.4.6 — Modificaciones Quirúrgicas y Reemplazos

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.4.6 |
| **Descripción** | Endpoint y lógica para modificar un turno puntual dentro de un horario aprobado + algoritmo de sugerencia de reemplazos: dados los requisitos del turno (día, horario, skills), listar empleados candidatos ordenados por aptitud. |
| **Entregable** | `PUT /api/schedule/shift/{id}` + `GET /api/schedule/shift/{id}/replacements` |
| **Criterio de aceptación** | La lista de reemplazos solo incluye empleados disponibles, sin exceder horas contractuales, con skills requeridas, y sin solapamiento |
| **Dependencias** | 1.4.5, 1.4.4 |
| **Esfuerzo estimado** | 5 días |

---

### 1.4.8 — Módulo de Notificaciones

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.4.8 |
| **Descripción** | Servicio de correo con Spring Mail (asíncrono con `@Async`), plantillas Thymeleaf para el cuerpo HTML, y generación de archivos `.ics` (biblioteca ical4j o similar) adjuntos. |
| **Entregable** | Servicio de notificación + plantillas + tests con servidor SMTP de prueba |
| **Criterio de aceptación** | Tras aprobación de un horario, cada empleado afectado recibe correo con su agenda y archivo .ics que importa correctamente en Google Calendar |
| **Dependencias** | 1.4.5, RF-013, RF-014 |
| **Esfuerzo estimado** | 4 días |
| **Supuesto** | Servidor SMTP disponible (SA-05 del Acta) |

---

### 1.6.2 — Selección de Herramienta Desktop

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.6.2 |
| **Descripción** | Evaluación formal de Electron vs Tauri: prototipo mínimo con cada uno levantando el backend embebido, medición de tamaño del binario y complejidad de configuración. |
| **Entregable** | Acta de decisión técnica (media página) justificando la elección |
| **Criterio de aceptación** | Uno de los dos prototipos levanta frontend + backend + H2 en un solo proceso de instalación |
| **Dependencias** | 1.6.1 |
| **Esfuerzo estimado** | 3 días |
| **Resuelve** | Decisión pendiente DP-02 del Diagnóstico |

---

### 1.7.4 — Pruebas del Algoritmo

| Campo | Contenido |
|-------|-----------|
| **Código** | 1.7.4 |
| **Descripción** | Suite de escenarios críticos sobre el motor: (1) cobertura de demanda exacta, (2) demanda insatisfacible → brechas reportadas, (3) turnos de trasnoche, (4) anti-solapamiento, (5) límites de horas contractuales, (6) descansos mínimos, (7) distintas cantidades de trabajadores (5/50/100), (8) rotación semanal determinista. |
| **Entregable** | Clase de tests JUnit dedicada + documento de resultados por escenario |
| **Criterio de aceptación** | 100% de escenarios ejecutados con resultado documentado (pass o brecha conocida y justificada) |
| **Dependencias** | 1.4.4 |
| **Esfuerzo estimado** | 5 días |

---

## 5. Coherencia EDT ↔ SRS

Cada paquete de trabajo de construcción cubre requisitos funcionales específicos:

| Paquete | RF cubiertos |
|---------|-------------|
| 1.4.1 + 1.5.2 | RF-001, RF-002, RF-003, RF-019 |
| 1.4.2 + 1.5.3 | RF-005 |
| 1.4.3 + 1.5.4 | RF-004 |
| 1.4.4 | RF-006 |
| 1.4.5 + 1.5.5 + 1.5.6 | RF-007, RF-008, RF-009 |
| 1.4.6 + 1.5.7 | RF-010, RF-011 |
| 1.4.7 + 1.5.8 | RF-012 |
| 1.4.8 | RF-013, RF-014 |
| 1.4.9 + 1.5.9 | RF-015, RF-016 |
| 1.4.10 + 1.5.1 | RF-018 |
| 1.6.2–1.6.4 | RF-017 |

**Cobertura:** Los 19 RF están cubiertos por al menos un paquete de trabajo. No hay RF huérfanos ni paquetes sin RF asociado (los de gestión/diseño/pruebas son soporte transversal).

---

## 6. Supuestos de Planificación

1. El estudiante dispone de los 4 meses completos para el proyecto.
2. Los paquetes ya iniciados (1.4.1, 1.4.2, 1.5.2, 1.5.3, parte de 1.4.4) cuentan con avance reutilizable; sus esfuerzos estimados son de **refactor y extensión**, no de creación desde cero.
3. Las estimaciones asumen dedicación parcial compatible con carga académica (~25-30 horas semanales efectivas de proyecto).
4. Esfuerzos expresados en días-persona (1 día = ~6 horas efectivas de trabajo).
