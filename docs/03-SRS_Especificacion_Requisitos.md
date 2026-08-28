# Especificación de Requisitos de Software (SRS)
## Sistema Horarios — Gestor de Jornadas Laborales Automatizado

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Proyecto:** HOR-2025-01 — Sistema Horarios  
**Institución:** Duoc UC — Analista Programador  

---

## Índice

1. [Introducción](#1-introducción)
2. [Descripción General](#2-descripción-general)
3. [Requisitos del Sistema](#3-requisitos-del-sistema)
   - 3.1 [Requisitos Funcionales](#31-requisitos-funcionales)
   - 3.2 [Requisitos No Funcionales](#32-requisitos-no-naturales)
4. [Especificación de Interfaz](#4-especificación-de-interfaz)
5. [Anexos](#5-anexos)

---

## 1. Introducción

### 1.1 Propósito

Este documento describe los requisitos de software del sistema **Horarios**, un gestor de jornadas laborales automatizado para pequeñas y medianas sucursales. Su propósito es servir como referencia única y definitiva para todos los aspectos funcionales y no funcionales del sistema durante las fases de diseño, implementación, prueba y验收.

Este documento será utilizado por:
- El desarrollador responsable de la implementación.
- El evaluador académico (jefe de carrera) como base para verificar el cumplimiento de competencias.
- Cualquier mantenedor futuro del sistema.

### 1.2 Alcance del Documento

El documento cubre exclusivamente los requisitos del producto de software. No incluye documentación de gestión del proyecto (cronograma, riesgos, costos), que se trata en documentos separados.

### 1.3 Definiciones, Acrónimos y Abreviaturas

| Término | Definición |
|---------|-----------|
| **PME** | Pequeña y Mediana Empresa |
| **Sucursal** | Establecimiento comercial o de servicios que utiliza el sistema |
| **Turno / Jornada** | Bloque horario asignado a un empleado (ej: 09:00–17:00) |
| **Franja horaria** | Intervalo de tiempo definido para fines de configuración de demanda (ej: 09:00–11:00) |
| **Demanda** | Cantidad mínima de trabajadores requerida en una franja horaria específica |
| **Disponibilidad** | Días y horarios en que un empleado puede trabajar |
| **Workflow Maker-Checker** | Proceso de aprobación con estados: borrador → revisión → aprobado |
| **Modificación quirúrgica** | Cambio puntual a un turno específico sin reconstruir el horario completo |
| **Local-First** | Paradigma donde toda la lógica y datos residen localmente en el equipo del usuario |
| **.ics** | Formato de archivo de calendario estándar (RFC 5545) |
| **H2** | Base de datos relacional embebida en Java |

### 1.4 Referencias

| Documento | Descripción |
|-----------|-------------|
| Acta de Constitución del Proyecto | Documento que autoriza formalmente el proyecto |
| DESCRIPCIÓN DEL PROYECTO.md | Contexto general del problema y solución |
| PROJECT_MAP.md | Mapa técnico de la estructura de código actual |
| DOCUMENTACION_PROYECTO.md | Documentación técnica del backend/frontend |

### 1.5 Vista General del Documento

La Sección 2 describe el contexto general del sistema. La Sección 3 detalla los requisitos funcionales y no funcionales. La Sección 4 describe las interfaces externas. Los Anexos contienen información complementaria.

---

## 2. Descripción General

### 2.1 Perspectiva del Producto

El sistema **Horarios** es una aplicación independiente (standalone) de escritorio que opera sin dependencia de servidores remotos. Está compuesto por dos subsistemas acoplados ejecutándose localmente:

1. Un servidor backend REST API (Spring Boot) que gestiona negocio y persistencia.
2. Una interfaz frontend (React) que consume la API.

Posteriormente, ambos subsistemas serán empaquetados como una sola aplicación de escritorio instalable mediante una herramienta como Electron o Tauri.

El sistema se diferencia de soluciones existentes (planillas de cálculo, sistemas de RR.HH. completos) por ser **ligero, local, especializado exclusivamente en planificación de turnos**, y orientado al segmento de PMEs que no requieren módulos complejos de nómina o gestión financiera.

### 2.2 Funciones del Producto

Las funciones principales del sistema son:

| # | Función | Descripción breve | Prioridad |
|---|---------|-------------------|-----------|
| F-01 | Gestión de empleados | CRUD completo de empleados con datos contractuales | Alta |
| F-02 | Configuración de demanda | Definir cobertura necesaria por franja horaria/día | Alta |
| F-03 | Gestión de disponibilidad | Registrar cuando cada empleado puede trabajar | Alta |
| F-04 | Motor de generación automática | Algoritmo que produce horario semanal óptimo | Crítica |
| F-05 | Visualización de horarios | Mostrar horario generado/semanal agrupado por día y empleado | Alta |
| F-06 | Flujo de aprobación | Pasar horarios de borrador a aprobados vía Maker-Checker | Alta |
| F-07 | Modificaciones quirúrgicas | Editar turno individual post-aprobación | Media |
| F-08 | Sugerencia de reemplazos | Recomendar empleados disponibles para cubrir ausencias | Media |
| F-09 | Auditoría de cambios | Registrar qué se modificó, quién y cuándo | Media |
| F-10 | Notificaciones por correo | Enviar detalles de turnos a empleados vía email | Media |
| F-11 | Exportación .ics | Generar archivos de calendario compatibles | Media |
| F-12 | Exportación .xlsx | Descargar datos en formato Excel | Baja |
| F-13 | Exportación .csv | Descargar datos en formato CSV | Baja |
| F-14 | Empaquetado Desktop | Compilar e instalar como aplicación nativa | Alta |

### 2.3 Características del Usuario

| Tipo | Descripción | Competencias requeridas |
|------|-------------|------------------------|
| **Gerente de Sucursal** | Usuario principal. Configura demanda, revisa y aprueba horarios, gestiona excepciones. | Conocimientos básicos de informática. Familiaridad con planillas de cálculo. |
| **Empleado** | Usuario final indirecto. Recibe su horario por correo. | Conocimientos básicos para leer email y abrir archivos adjuntos. |
| **Administrador del Sistema** | En este proyecto, coincide con el Gerente de Sucursal. Gestiona la instancia local del software. | Conocimientos para instalar y ejecutar la aplicación en Windows. |

### 2.4 Restricciones Generales

| # | Restricción | Detalle |
|---|-------------|---------|
| GR-01 | Backend debe usar Spring Boot 3.2 + Java 17 | Definido en especificación tecnológica |
| GR-02 | Frontend debe usar React 19 + Vite | Definido en especificación tecnológica |
| GR-03 | Base de datos: H2 embebida | Sin opciones alternas; no MySQL/PostgreSQL |
| GR-04 | Aplicación debe funcionar sin Internet | Conexión solo necesaria para envío de correos |
| GR-05 | Plataforma target: Windows | Instalador .exe para Windows |
| GR-06 | Stack tecnológico no modificado sin justificación formal | Criterio establecido en prompt PMBOK |

### 2.5 Supuestos e Independencias

| # | Supuesto | Detalle |
|---|----------|---------|
| SI-01 | El número de empleados por sucursal oscila entre 10 y 100 | Dimensiona almacenamiento y rendimiento |
| SI-02 | Las sucursales operan de lunes a domingo | El algoritmo considera 7 días semanales |
| SI-03 | Existe al menos un SMTP accesible para envío de correos | Puede ser Gmail, Outlook, Mailgun tier gratuito |
| SI-04 | Los empleados tienen dirección de correo electrónico registrada | Requisito para funcionalidad de notificaciones |
| SI-05 | La normativa laboral aplicable se refiere a Chile (horas máximas, descansos) | Para configurar restricciones del algoritmo |

---

## 3. Requisitos del Sistema

### 3.1 Requisitos Funcionales

#### RF-001: Registro de Empleados

| Campo | Valor |
|-------|-------|
| **ID** | RF-001 |
| **Nombre** | Registro de Empleados |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe permitir registrar nuevos empleados con toda su información contractual y personal. |
| **Criterio de aceptación** | Al ingresar datos válidos de un nuevo empleado y guardar, el registro aparece en la lista de empleados. Al ingresar datos inválidos (email duplicado, campos obligatorios vacíos), el sistema muestra mensaje de error apropiado y no guarda. |
| **Dependencias** | Ninguna |

**Detalle de datos requeridos:**

| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| Nombre completo | String | Sí | 2–150 caracteres |
| Email | String | Sí | Formato email válido, único en el sistema |
| Departamento | String | No | Hasta 100 caracteres |
| Horas semanales contratadas | Integer o Decimal | No | > 0 si se proporciona; máximo 72 h/semana según ley chilena |
| Habilidades | Lista de referencias | No | Sin validación especial |
| Estado (activo/inactivo) | Boolean | Sí (default: activo) | — |

**Flujo principal:**
1. Usuario abre formulario de registro de empleado.
2. Sistema muestra formulario vacío con campos obligatorios identificados.
3. Usuario ingresa datos.
4. Usuario envía formulario.
5. Sistema valida datos.
6. Si válido: sistema guarda empleado y confirma operación.
7. Si inválido: sistema indica errores específicos.

---

#### RF-002: Edición de Empleados

| Campo | Valor |
|-------|-------|
| **ID** | RF-002 |
| **Nombre** | Edición de Empleados |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe permitir modificar la información de empleados existentes. |
| **Criterio de aceptación** | Al editar un empleado existente y guardar, los cambios se reflejan inmediatamente en la lista de empleados. Cambios en horas semanales o habilidades no afectan horarios ya generados (los horarios anteriores permanecen intactos). |
| **Dependencias** | RF-001 |

---

#### RF-003: Eliminación de Empleados

| Campo | Valor |
|-------|-------|
| **ID** | RF-003 |
| **Nombre** | Eliminación de Empleados |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe permitir eliminar empleados inactivos del registro. |
| **Criterio de aceptación** | Al solicitar eliminación de un empleado activo sin horarios asociados, se confirma y elimina. Si el empleado tiene horarios generados asociados, el sistema impide la eliminación y solicita desactivar primero al empleado. |
| **Dependencias** | RF-001 |

---

#### RF-004: Configuración de Demanda de Personal

| Campo | Valor |
|-------|-------|
| **ID** | RF-004 |
| **Nombre** | Configuración de Demanda de Personal |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe permitir al gerente definir la cantidad mínima de trabajadores requeridos para cada franja horaria y día de la semana. |
| **Criterio de aceptación** | Al configurar demanda para una franja horaria específica (ej: 09:00–11:00 lunes, mínimo 2 trabajadores), esta configuración persiste y es utilizada por el motor de generación como criterio de optimización. |
| **Dependencias** | RF-001 |

**Reglas de negocio:**
- La demanda se configura por día de la semana (lunes a domingo) y por franjas horarias no superpuestas dentro de cada día.
- Las franjas horarias deben cubrir las 24 horas del día o subconjunto definido por el gerente.
- La cantidad mínima de trabajadores por franja es un entero ≥ 0.

---

#### RF-005: Gestión de Disponibilidad de Empleados

| Campo | Valor |
|-------|-------|
| **ID** | RF-005 |
| **Nombre** | Gestión de Disponibilidad de Empleados |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe registrar los días y horarios en que cada empleado puede trabajar. |
| **Criterio de aceptación** | Al registrar disponibilidad para un empleado en un día específico (ej: "Juan puede trabajar miércoles de 09:00 a 17:00"), el motor de generación respeta esta restricción al asignar turnos. Empleados no asignados en un día porque no están disponibles reciben una marca visual indicando "no disponible". |
| **Dependencias** | RF-001 |

**Detalle:**
- La disponibilidad se define por empleado, día de la semana, hora inicio y hora fin.
- `null` para hora inicio/fin = empleado disponible todo el día ese día.
- Soporte para rangos que cruzan medianoche (ej: 22:00–06:00 del día siguiente).

---

#### RF-006: Generación Automática de Horarios Semanal

| Campo | Valor |
|-------|-------|
| **ID** | RF-006 |
| **Nombre** | Motor de Generación Automática de Horarios |
| **Prioridad** | Crítica (Must Have — Núcleo del sistema) |
| **Descripción** | El sistema debe generar automáticamente un horario semanal óptimo cruzando demanda de personal, disponibilidades de empleados y restricciones contractuales. |
| **Criterio de acceptance** | Al ejecutar la generación para una semana específica, el sistema produce una asignación válida donde: (a) se satisface la demanda en la mayor proporción posible, (b) ningún empleado excede sus horas contractuales semanales, (c) se respetan las disponibilidades registradas, (d) se cumplen todas las restricciones configuradas. |
| **Dependencias** | RF-001, RF-004, RF-005 |

**Restricciones que el motor debe respetar:**

| # | Restricción | Tipo | Descripción |
|---|-------------|------|-------------|
| R-GEN-01 | Horas semanales | Contractual | Cada empleado no puede exceder sus horas contratadas por semana |
| R-GEN-02 | Disponibilidad | Individual | Solo se asignan turnos en días/horarios disponibles |
| R-GEN-03 | Demandademinima | Cobertura | Se busca cumplir mínimo de trabajadores por franja |
| R-GEN-04 | Descanso mínimo | Legal/Salud | Mínimo horas de descanso entre turnos consecutivos |
| R-GEN-05 | Cruce de medianoche | Técnico | Turnos pueden iniciar un día y terminar al día siguiente |
| R-GEN-06 | Solapamiento | Operativo | Evitar solapamientos de turnos del mismo empleado |
| R-GEN-07 | Distribución equitativa | Fairness | Distribuir turnos indeseables (finde, nocturnos) equitativamente entre semanas |
| R-GEN-08 | Habilidades requeridas | Cualificación | Turnos que exigen ciertas habilidades solo se asignan a empleados con esa skill |

**Algoritmo esperado (alta nivel):**
1. Ingresar: demanda configurada + disponibilidades + restricciones contractuales.
2. Iterar sobre cada día de la semana y cada franja horaria.
3. Para cada franja, seleccionar empleados disponibles que cumplan todas las restricciones y que aún no hayan excedido sus horas semanales.
4. Priorizar empleados cuya asignación contribuya a satisfacer la demanda mínima.
5. Penalizar reasignaciones repetitivas (anti-repetición semanal).
6. Manejar gracefully el caso donde no hay suficientes empleados disponibles (marcar brechas de cobertura).
7. Guardar resultado como propuesta de horario en estado "borrador".

---

#### RF-007: Visualización de Horario Semanal

| Campo | Valor |
|-------|-------|
| **ID** | RF-007 |
| **Nombre** | Visualización de Horario Semanal |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe mostrar el horario generado semanal, organizado por día de la semana y empleado. |
| **Criterio de aceptación** | Al seleccionar una semana, se presenta una tabla/timetable donde cada celda muestra el nombre del empleado, el horario asignado y cualquier indicador visual de brecha de cobertura. |
| **Dependencias** | RF-006 |

---

#### RF-008: Flujo de Aprobación Maker-Checker

| Campo | Valor |
|-------|-------|
| **ID** | RF-008 |
| **Nombre** | Flujo de Aprobación de Horarios |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe gestionar horarios mediante un flujo de estados: Borrador → En Revisión → Aprobado. |
| **Criterio de aceptación** | Al generar un horario, este inicia en estado "Borrador". El usuario puede cambiarlo a "En Revisión" y posteriormente a "Aprobado". Un horario aprobado queda protegido frente a modificaciones generales no autorizadas. |
| **Dependencias** | RF-006, RF-007 |

**Máquina de estados:**

```
          ┌──────────┐    revisar    ┌─────────────┐    aprobar    ┌───────────┐
  ─────► │ BORRADOR ├──────────────►│ EN REVISIÓN ├──────────────►│ APROBADO │
          └──────────┘               └─────────────┘              └───────────┘
             ▲                           │                            │
             └──────────── regresarlo ───┴────────────────────────────┘
```

**Reglas de negocio:**
- Solo usuarios con rol "aprobador" pueden mover de borrador a aprobado.
- Una vez aprobado, solo se permiten modificaciones quirúrgicas (ver RF-010).
- Se mantiene historial de cambios de estado con fecha y usuario responsable.

---

#### RF-009: Protección de Horarios Aprobados

| Campo | Valor |
|-------|-------|
| **ID** | RF-009 |
| **Nombre** | Protección de Horarios Aprobados |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe impedir modificaciones globales (regeneración completa) sobre horarios ya aprobados. |
| **Criterio de aceptación** | Al intentar regenerar un horario que está en estado "Aprobado", el sistema bloquea la acción y solicita revocar la aprobación primero, o bien ofrece realizar solo modificaciones quirúrgicas. |
| **Dependencias** | RF-008 |

---

#### RF-010: Modificaciones Quirúrgicas sobre Turnos Individuales

| Campo | Valor |
|-------|-------|
| **ID** | RF-010 |
| **Nombre** | Modificaciones Quirúrgicas |
| **Prioridad** | Media (Should Have) |
| **Descripción** | El sistema debe permitir cambiar únicamente un turno específico dentro de un horario aprobado, sin necesidad de reconstruir todo el horario semanal. |
| **Criterio de aceptación** | Al editar un turno individual (cambiar hora, día, o empleado asignado) en un horario aprobado, la modificación se registra en el auditor pero no afecta otros turnos de la semana. |
| **Dependencias** | RF-008, RF-009, RF-011 |

---

#### RF-011: Sugerencia de Reemplazos ante Ausencias

| Campo | Valor |
|-------|-------|
| **ID** | RF-011 |
| **Nombre** | Sugerencia de Reemplazos |
| **Prioridad** | Media (Should Have) |
| **Descripción** | Cuando un empleado no puede asistir a su turno, el sistema debe sugerir otros empleados disponibles que puedan cubrir ese turno cumpliendo todas las restricciones. |
| **Criterio de aceptación** | Al marcar un turno como "ausente" y solicitar reemplazo, el sistema muestra una lista ordenada de candidatos posibles, filtrados por: disponibilidad ese día, horas restantes disponibles, habilidades requeridas y carga laboral actual. |
| **Dependencias** | RF-010 |

---

#### RF-012: Registro de Auditoría de Modificaciones

| Campo | Valor |
|-------|-------|
| **ID** | RF-012 |
| **Nombre** | Registro de Auditoría |
| **Prioridad** | Media (Should Have) |
| **Descripción** | El sistema debe registrar todas las modificaciones realizadas sobre horarios, incluyendo usuario responsable, fecha/hora, tipo de cambio y motivo. |
| **Criterio de aceptación** | Cada cambio en un horario genera un registro en la tabla de auditoría con: ID de registro, usuario que realizó el cambio, fecha/hora exacta, entidad modificada (turno/horario), descripción del cambio y motivo proporcionado. |
| **Dependencias** | RF-010 |

---

#### RF-013: Envío de Notificaciones por Correo Electrónico

| Campo | Valor |
|-------|-------|
| **ID** | RF-013 |
| **Nombre** | Notificaciones por Correo Electrónico |
| **Prioridad** | Media (Should Have) |
| **Descripción** | El sistema debe enviar automáticamente un correo electrónico a cada empleado cuando se publica o modifica un turno a su nombre. |
| **Criterio de aceptación** | Al aprobar un horario o realizar una modificación quirúrgica, el sistema envía un correo al email registrado de cada empleado afectado conteniendo: nombre del empleado, jornada asignada (fecha, hora inicio, hora fin), sucursal, y los motivos de cambio si corresponde. |
| **Dependencias** | RF-001 (email registrado), RF-008 (aprobación dispara notificación) |

**Detalles técnicos del correo:**
- Asunto: "[Horarios] Tu horario de la semana del [fecha]" o "[Horarios] Cambio de turno — [nombre del empleado]"
- Cuerpo HTML estructurado con detalles de turno(s).
- Adjunto(s): archivo .ics (ver RF-014).
- Envío asíncrono (`@Async` en Spring Boot) para no bloquear la UI.

---

#### RF-014: Generación de Archivos .ics (Calendario)

| Campo | Valor |
|-------|-------|
| **ID** | RF-014 |
| **Nombre** | Generación de Archivos de Calendario (.ics) |
| **Prioridad** | Media (Should Have) |
| **Descripción** | El sistema debe generar archivos `.ics` compatibles con Google Calendar, Apple Calendar y otros clientes de calendario que soporten RFC 5545. |
| **Criterio de aceptación** | Al recibir el archivo .ics adjunto al correo o descargarlo manualmente, un cliente de calendario lo importa correctamente creando eventos con título, hora inicio/fin, ubicación y descripción adecuadas. |
| **Dependencias** | RF-013 |

---

#### RF-015: Exportación a Excel (.xlsx)

| Campo | Valor |
|-------|-------|
| **ID** | RF-015 |
| **Nombre** | Exportación a Excel |
| **Prioridad** | Baja (Nice to Have) |
| **Descripción** | El sistema debe permitir exportar el horario semanal y datos de empleados/configuración en formato `.xlsx`. |
| **Criterio de aceptación** | Al seleccionar "Exportar a Excel", se descarga un archivo con hojas separadas para: Horario Semanal, Empleados, Configuración de Demanda. El archivo se abre correctamente en Microsoft Excel o LibreOffice Calc. |
| **Dependencias** | RF-007 |

---

#### RF-016: Exportación a CSV

| Campo | Valor |
|-------|-------|
| **ID** | RF-016 |
| **Nombre** | Exportación a CSV |
| **Prioridad** | Baja (Nice to Have) |
| **Descripción** | El sistema debe permitir exportar el horario semanal en formato `.csv`. |
| **Criterio de aceptación** | Al seleccionar "Exportar a CSV", se descarga un archivo de texto delimitado por comas o punto y coma compatible con cualquier hoja de cálculo. |
| **Dependencias** | RF-007 |

---

#### RF-017: Empaquetado como Aplicación de Escritorio

| Campo | Valor |
|-------|-------|
| **ID** | RF-017 |
| **Nombre** | Empaquetado Desktop |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe distribuirse como una aplicación de escritorio instalable para Windows, que ejecute tanto el frontend como el backend localmente sin necesidad de instalación separada de Node.js o JDK por parte del usuario final. |
| **Criterio de aceptación** | Tras ejecutar el instalador, la aplicación se instala y lanza desde el escritorio. Ambas partes (frontend y backend) corren en procesos locales del sistema. El usuario accede a la interfaz a través de una ventana nativa (no un navegador). |
| **Dependencias** | RF-001 a RF-016 implementados y probados |

**Tecnología de empaquetado por decidir:**
- Opción A: **Electron** — Wrapper JavaScript que embebe Chromium. Amplia comunidad, más peso (~80MB+).
- Opción B: **Tauri** — Framework ligero que usa WebView del sistema. Binario pequeño (~10MB), requiere Rust toolchain.
- Opción C: **NW.js** — Alternativa a Electron.

**Decisión pendiente (DP-02).**

---

#### RF-018: Autenticación y Control de Acceso Básico

| Campo | Valor |
|-------|-------|
| **ID** | RF-018 |
| **Nombre** | Autenticación y Control de Acceso |
| **Prioridad** | Alta (Must Have) |
| **Descripción** | El sistema debe implementar autenticación de usuarios y diferenciación de roles para permitir el workflow Maker-Checker. |
| **Criterio de aceptación** | Al iniciar sesión, el sistema identifica al usuario y determina si tiene rol de "gerente/aprobador" o "empleado/lector". Solo los gerentes pueden aprobar horarios y realizar modificaciones quirúrgicas. Los empleados solo pueden visualizar sus propios turnos. |
| **Dependencias** | RF-001, RF-008 |

**Roles definidos:**

| Rol | Permisos |
|-----|----------|
| **Gerente** | Full access: CRUD empleados, configurar demanda, ver/generar/editar horarios, aprobar, exportar, auditar |
| **Aprobador** | Ver horarios, aprobar/rechazar, modificaciones quirúrgicas |
| **Empleado** | Ver únicamente sus propios turnos asignados |

---

#### RF-019: Administración de Habilidades / Cualificaciones

| Campo | Valor |
|-------|-------|
| **ID** | RF-019 |
| **Nombre** | Administración de Habilidades |
| **Prioridad** | Media (Should Have) |
| **Descripción** | El sistema debe permitir crear, listar y administrar habilidades/cualificaciones (ej: "Cocinero fritos", "Reparto", "Atención al público") que se asocian tanto a empleados como a turnos. |
| **Criterio de aceptación** | Al asignar la habilidad "Cocinero fritos" a un empleado y exigir esa misma habilidad en un turno, el motor solo asignará a ese empleado (u otros con esa habilidad) al turno correspondiente. |
| **Dependencias** | RF-001, RF-004 |

---

### 3.2 Requisitos No Funcionales

#### RNF-001: Seguridad

| Campo | Valor |
|-------|-------|
| **ID** | RNF-001 |
| **Tipo** | No Funcional |
| **Prioridad** | Alta |
| **Descripción** | La aplicación debe proteger los datos de acceso y las credenciales de usuarios contra acceso no autorizado. |
| **Criterio de aceptación** | Las contraseñas deben almacenarse encriptadas (hash con bcrypt o similar). Las comunicaciones entre frontend y backend local usan HTTP local sin exposición externa. |

---

#### RNF-002: Rendimiento

| Campo | Valor |
|-------|-------|
| **ID** | RNF-002 |
| **Tipo** | No Funcional |
| **Prioridad** | Media |
| **Descripción** | El motor de generación debe producir un horario semanal completo en un tiempo razonable (< 30 segundos) para escenarios típicos (hasta 100 empleados, 7 días × ~12 franjas horarias). |
| **Justificación** | 30 segundos es aceptable para una operación manual ocasional. No es un servicio de alta concurrencia. |
| **Criterio de aceptación** | Generación de horario para ≤ 50 empleados, ≤ 7 franjas/día, ≤ 10 habilidades: < 15 segundos. Generación para ≤ 100 empleados: < 30 segundos. |

---

#### RNF-003: Confiabilidad

| Campo | Valor |
|-------|-------|
| **ID** | RNF-003 |
| **Tipo** | No Funcional |
| **Prioridad** | Alta |
| **Descripción** | El sistema debe garantizar la integridad de los datos almacenados. No se debe perder información por fallos inesperados durante escritura. |
| **Criterio de aceptación** | La base de datos H2 debe estar configurada con journaling activado para recuperación tras fallos. Transacciones JPA deben usarse para operaciones críticas (aprobación, generación de horario). |

---

#### RNF-004: Usabilidad

| Campo | Valor |
|-------|-------|
| **ID** | RNF-004 |
| **Tipo** | No Funcional |
| **Prioridad** | Alta |
| **Descripción** | La interfaz debe ser intuitiva para usuarios con conocimientos informáticos básicos, similares a quienes hoy utilizan planillas de cálculo. |
| **Criterio de aceptación** | Las tareas principales (crear empleado, configurar demanda, generar horario, aprobar) deben realizarse en máximo 5 clics desde la pantalla principal. Mensajes de error claros y accionables. Diseño responsive adaptado a pantallas de laptop (1366×768 mínimo). |

---

#### RNF-005: Mantenibilidad

| Campo | Valor |
|-------|-------|
| **ID** | RNF-005 |
| **Tipo** | No Funcional |
| **Prioridad** | Media |
| **Descripción** | El código debe seguir buenas prácticas de programación: nombres descriptivos, separación clara de responsabilidades, comentarios en lógica compleja (especialmente el algoritmo de generación), y adherencia a convenciones del lenguaje. |
| **Criterio de aceptación** | Código compilable sin warnings de lint principales. Documentación inline en métodos del motor de generación explicando la lógica algorítmica. |

---

#### RNF-006: Integridad de Datos

| Campo | Valor |
|-------|-------|
| **ID** | RNF-006 |
| **Tipo** | No Funcional |
| **Prioridad** | Alta |
| **Descripción** | Las relaciones entre entidades deben mantenerse consistentes. No deben existir registros huérfanos (ej: availability apuntando a employee eliminado). |
| **Criterio de aceptación** | Constraints de base de datos (foreign keys, unique constraints) activos. Cascading deletes configured appropriately. Pruebas de integridad verifican consistencia tras operaciones CRUD. |

---

#### RNF-007: Portabilidad Local

| Campo | Valor |
|-------|-------|
| **ID** | RNF-007 |
| **Tipo** | No Funcional |
| **Prioridad** | Alta |
| **Descripción** | La aplicación debe ejecutarse en equipos Windows 10/11 sin requerir instalación de dependencias externas por parte del usuario final. |
| **Criterio de aceptación** | Tras instalar la aplicación desde el instalador, funciona inmediatamente sin solicitar instalación de JDK, Node.js, runtime adicional o configuración de variables de entorno. |

---

#### RNF-008: Disponibilidad Operativa

| Campo | Valor |
|-------|-------|
| **ID** | RNF-008 |
| **Tipo** | No Funcional |
| **Prioridad** | Media |
| **Descripción** | La aplicación debe estar disponible cuando el usuario la ejecute localmente. No existe concepto de "tiempo fuera de servicio" programado ni maintenance windows. |
| **Justificación** | Es una aplicación de escritorio monousuario. La disponibilidad es total mientras la aplicación esté abierta. |
| **Criterio de aceptación** | La aplicación debe iniciarse en menos de 10 segundos desde doble-click al icono. |

---

## 4. Especificación de Interfaz

### 4.1 Interfaces de Usuario (Resumen)

| Pantalla | Componente React | Función principal |
|----------|-----------------|-------------------|
| Dashboard principal | `App.jsx` | Tabs: Empleados · Turnos · Disponibilidad · Generador · Horario |
| Gestión de empleados | `EmployeeComponent.jsx` | Tabla de empleados + formulario creación/edición |
| Gestión de habilidades | `SkillsComponent.jsx` | CRUD de habilidades/cualificaciones |
| Gestión de turnos/jornadas | `ShiftComponent.jsx` | CRUD de jornadas preestablecidas |
| Gestión de disponibilidad | `AvailabilityComponent.jsx` | Formulario por empleado/día para establecer disponibilidad |
| Generador de horarios | `ScheduleComponent.jsx` | Selector de fecha semanal, botón generar, vista resultados |

### 4.2 Interfaces de Hardware

No aplica directamente (sin hardware externo como lectores biométricos o impresoras dedicadas).

### 4.3 Interfaces de Comunicaciones

| Interface | Protocolo | Puerto | Descripción |
|-----------|-----------|--------|-------------|
| Frontend ↔ Backend | HTTP REST | localhost:5173 → localhost:8080 | API JSON a través de proxy Vite (`/api/*`) |
| Backend ↔ Base de datos | JDBC | N/A | Conexión file-based a H2 (`./data/schedulerdb`) |
| Backend ↔ Servidor SMTP | SMTP/TLS | Variable (587/465) | Envío de correos de notificación |

### 4.4 Interfaces de Software

| Interface | Versión | Propósito |
|-----------|---------|-----------|
| JDK | 17.x | Runtime Java para Spring Boot |
| Maven | 3.9+ | Build manager backend |
| Node.js | 20+ | Runtime JavaScript para React |
| npm | 10+ | Package manager frontend |
| Vite | 8.x | Build tool y dev server |
| Tailwind CSS | 4.x | Framework CSS |

---

## 5. Anexos

### Anexo A: Relación entre RF del SRS y RF del Prompt

Esta tabla demuestra alineación completa entre los requisitos aquí especificados y los elementos listados en el prompt del Gestor de Proyectos Senior:

| Elemento del Prompt | RF correspondiente | Estado |
|---------------------|-------------------|--------|
| Administrar empleados | RF-001, RF-002, RF-003 | ✅ Cubierto |
| Configurar demanda por franjas | RF-004 | ✅ Cubierto |
| Considerar disponibilidad | RF-005 | ✅ Cubierto |
| Considerar límites y restricciones | RF-006 (restrições) | ✅ Cubierto |
| Generar automáticamente propuestas | RF-006 | ✅ Cubierto |
| Estados borrador, revisión, aprobado | RF-008, RF-009 | ✅ Cubierto |
| Modificaciones quirúrgicas | RF-010 | ✅ Cubierto |
| Sugerir reemplazos | RF-011 | ✅ Cubierto |
| Registrar auditoría | RF-012 | ✅ Cubierto |
| Notificaciones por correo | RF-013 | ✅ Cubierto |
| Archivos .ics | RF-014 | ✅ Cubierto |
| Exportación .xlsx | RF-015 | ✅ Cubierto |
| Exportación .csv | RF-016 | ✅ Cubierto |
| Aplicación de escritorio / Local-First | RF-017 | ✅ Cubierto |
| Persistencia local | RNF-007 | ✅ Cubierto |
| Instalador | RF-017 | ✅ Cubierto |
| Autenticación y roles | RF-018 | ✅ Cubierto |
| Habilidades / cualificaciones | RF-019 | ✅ Cubierto |

**Cobertura de requisitos:** 100% de los elementos del prompt están representados en el SRS.

### Anexo B: Matriz de Prioridades PMI

| Prioridad | RF correspondientes | Justificación |
|-----------|-------------------|---------------|
| **Crítica** | RF-006 | Núcleo del valor del producto. Sin esto, el sistema no existe. |
| **Alta** | RF-001, RF-002, RF-003, RF-004, RF-005, RF-007, RF-008, RF-009, RF-017, RF-018 | Sin estos, el sistema no es usable ni cumple su propósito base. |
| **Media** | RF-010, RF-011, RF-012, RF-013, RF-014, RF-019 | Mejoran significativamente la experiencia pero el sistema funciona sin ellos. |
| **Baja** | RF-015, RF-016 | Comodidades; fáciles de replicar manualmente si fuera necesario. |

### Anexo C: Notas sobre el Motor de Generación (RF-006)

El RF-006 es el requisito más complejo del sistema. Se clasifica como **Crítico** porque:
1. Representa el principal diferencial de valor del producto.
2. Concentra el mayor riesgo técnico del proyecto.
3. Requiere el mayor esfuerzo de desarrollo y pruebas.
4. Dependen de él funcionalidades secundarias (modificaciones quirúrgicas, sugerencias de reemplazo).

Se recomienda abordar su desarrollo en la **Fase 4 — Desarrollo**, con prototipado en la **Fase 3 — Diseño**.
