# Project Context

## Cronograma (Resumen)

This file serves as a living log of the progress made on the Planora project. It will be updated each time a milestone or task is completed, ensuring that future sessions have a clear view of where we stand.

## Current State
- CRUD for employees implemented and exposed via REST API.
- Endpoints:
  - POST /employees
  - GET /employees
  - GET /employees/{id}
  - PUT /employees/{id}
  - DELETE /employees/{id}
- Models: Employee (id, name, email, role)
- Repository: EmployeeRepository extends JpaRepository
- Service: EmployeeService handles business logic.
- Controller: EmployeeController defines REST endpoints.
- Tests: unit tests pending.
- Shift CRUD implemented (backend + frontend).

## Sub-actividades por actividad

### A-06: Modelo de datos completo (DER con nuevas entidades)
- Diseñar entidad `Employee` con campos id, nombre, email, depto, weeklyHours, skills
- Diseñar entidad `Skill` con relación many‑to‑many con `Employee`
- Crear tablas en H2 y generar JPA entities
- Generar repositorios JPA
- Unit tests de persistencia

### A-07: Diseño de arquitectura y workflow de estados
- Especificar capas (controller, service, repository)
- Diagramar flujo de API a database
- Documentar secuencias de errores
- Validar con equipo

### A-08: Diseño del motor de generación (pseudocódigo, estrategia de degradación)
- Estecribir algoritmo determinista
- Especificar criterios de balance y anti‑repetición
- Diagramar fases de generación

### A-09: Wireframes de 9 pantallas
- Draft de Employee CRUD, Shift CRUD, Availability CRUD, Schedule view, etc.
- Revisar con UX
- Finalizar en Figma

### A-10: Prototipo empaquetado Desktop (decisión Electron/Tauri)
- Crear proyecto de prueba con Electron y Tauri
- Comparar tiempos de build, bundle size
- Evaluar compatibilidad con OS
- Seleccionar herramienta

### A-11: Backend: módulo Demanda + refactor módulos existentes con validaciones
- Implementar endpoint `/api/requests` (placeholder)
- Añadir validaciones de entrada
- Refactorizar servicios existentes

### A-12: Backend: autenticación y roles
- Implementar Spring Security con JWT
- Crear rol ADMIN / USER
- Protección de endpoints

### A-13: Backend: motor de generación completo (Shift CRUD completado)
- Implementar `ScheduleGenerationService`
- Añadir unit tests
- Integrar con API `/api/schedule/generate`

### A-14: Backend: workflow de aprobación
- Crear entidad `ApprovalRequest`
- Endpoints `/api/approvals`
- Notificar email

### A-15: Backend: modificaciones quirúrgicas + sugerencia de reemplazos
- Refactorizar código para mejorar pruebas
- Documentar cambios

### A-16: Backend: auditoría
- Registrar logs de auditoría en table `audit_log`
- Endpoint `/api/audit`

### A-17: Backend: notificaciones (email + .ics)
- Configurar Spring mail
- Generar .ics files
- Endpoint `/api/notify`

### A-18: Backend/Frontend: exportaciones .xlsx/.csv
- Generar exportador en Java
- UI button en frontend

### A-19: Frontend: login + demanda + refinamiento CRUDs (employees)
- Crear formulario login (sin auth)
- Integrar EmployeeComponent
- Añadir manejo de estado

### A-20: Frontend: horario semanal + panel de aprobación
- Componente `ScheduleComponent`
- CRUD para aprobación

### A-21: Frontend: modificaciones/reemplazos + auditoría
- Implementar mejoras de UI
- Añadir pantalla de auditoría

### A-22: Integración: migración a proxy `/api`, manejo uniforme de errores
- Configurar proxy en Vite
- Centralizar manejo de errores
- Update fetch calls


| ID | Actividad | Estado |
|----|-----------|--------|
| A-01 | Presentación de documentación preliminar al jefe de carrera | ✔️ |
| A-02 | Ajustes desde feedback del evaluador | ✔️ |
| A-03 | Cierre de decisiones pendientes (DP-04 rúbrica, DP-03 normativa) | ✔️ |
| A-04 | Declaración de Alcance detallado + proceso de cambios | ✔️ |
| A-05 | SRS final con revisión contra rúbrica | ✔️ |
| A-06 | Modelo de datos completo (DER con nuevas entidades) | ☐ |
| A-07 | Diseño de arquitectura y workflow de estados | ☐ |
| A-08 | Diseño del motor de generación (pseudocódigo, estrategia de degradación) | ☐ |
| A-09 | Wireframes de 9 pantallas | ☐ |
| A-10 | Prototipo empaquetado Desktop (decisión Electron/Tauri) | ☐ |
| A-11 | Backend: módulo Demanda + refactor módulos existentes con validaciones | ☐ |
| A-12 | Backend: autenticación y roles | ☐ |
| A-13 | Backend: motor de generación completo (Shift CRUD completado) | ✔️ |
| A-14 | Backend: workflow de aprobación | ☐ |
| A-15 | Backend: modificaciones quirúrgicas + sugerencia de reemplazos | ☐ |
| A-16 | Backend: auditoría | ☐ |
| A-17 | Backend: notificaciones (email + .ics) | ☐ |
| A-18 | Backend/Frontend: exportaciones .xlsx/.csv | ☐ |
| A-19 | Frontend: login + demanda + refinamiento CRUDs (employees) | ✔️ |
| |  - Backend CRUD: POST/GET/PUT/DELETE /employees | ✔️ |
| |  - Frontend component: EmployeeComponent.jsx CRUD UI | ✔️ |

| A-20 | Frontend: horario semanal + panel de aprobación | ☐ |
| A-21 | Frontend: modificaciones/reemplazos + auditoría | ☐ |


