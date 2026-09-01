# Project Context

## Cronograma (Resumen)

This file serves as a living log of the progress made on the Planora project. It will be updated each time a milestone or task is completed, ensuring that future sessions have a clear view of where we stand.

## Current State
- CRUD for employees implemented and exposed via REST API (fixed field mappings).
- Endpoints: POST/GET/PUT/DELETE /api/employees
- Models: Employee, Skill, Availability, ScheduledShift, Demand (all newly added and organized by entity).
- Repositories organized by entity: EmployeeRepository, SkillRepository, AvailabilityRepository, ScheduledShiftRepository, DemandRepository (each in its own subpackage).
- Services organized by entity: EmployeeService, SkillService, AvailabilityService, ScheduledShiftService, DemandService (each in its own subpackage).
- Controllers organized by entity: EmployeeController (fixed), ShiftController, AvailabilityController, ScheduleController, DemandController (each in its own subpackage).
- Shift CRUD implemented (backend + frontend).
- Frontend: React + Vite + Tailwind CSS integrated. All main components created: EmployeeComponent, ShiftComponent, AvailabilityComponent, SkillsComponent, ScheduleComponent, SkillCheckboxes. i18n ES/EN configured. Proxy /api configured.
- Backend restructured with entities grouped by domain (employee, skill, availability, scheduledShift, demand) for better organization and maintainability.
- Tests: unit tests pending.

## Sub-actividades por actividad

### A-06: Modelo de datos completo (DER con nuevas entidades)
- ✅ Diseñar entidad `Employee` con campos id, firstName, lastName, email, department, weeklyHours, skills
- ✅ Diseñar entidad `Skill` con relación many‑to‑many con `Employee` (creada Skill.java + repo + service, organizada en paquete `com.example.scheduler.skill`)
- ✅ Diseñar entidad `Availability` para disponibilidades por empleado/día (creada Availability.java + repo + service, organizada en paquete `com.example.scheduler.availability`)
- ✅ Diseñar entidad `ScheduledShift` para turnos generados (creado ScheduledShift.java + repo + service, organizada en paquete `com.example.scheduler.scheduledShift`)
- ✅ Diseñar entidad `Demand` para configuración de demanda por franja horaria (creado Demand.java + repo + service + controller, organizada en paquete `com.example.scheduler.demand`)
- ✅ Crear tablas en H2 y generar JPA entities (ddl-auto=update)
- ✅ Generar repositorios JPA con métodos personalizados (organizados por entidad)
- ✅ Unit tests de persistencia: por definir (pending)

### A-11: Backend módulo Demanda + refactor módulos existentes con validaciones
- ✅ Implementar entidad Demand + repositorio + servicio + controlador REST (/api/demands) (organizado en paquete `com.example.scheduler.demand`)
- ✅ Refactorizar EmployeeController: mapear dto.name → employee.firstName/lastName/department
- ✅ Módulo Skills completo: Skill entity + CRUD endpoints (organizado en paquete `com.example.scheduler.skill`)
- ✅ Estructura de proyecto reorganizada por entidades para mejor mantenimiento
- ⚠️ Unit tests pendientes por definir
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
| A-06 | Modelo de datos completo (DER con nuevas entidades) | ✔️ |
| A-07 | Diseño de arquitectura y workflow de estados | ✔️ (documentado en EDT y PROJECT_MAP.md) |
| A-08 | Diseño del motor de generación (pseudocódigo, estrategia de degradación) | ✔️ (v3 empleado-céntrico en PROJECT_MAP.md) |
| A-09 | Wireframes de 9 pantallas | ☐ (pendiente Figma) |
| A-10 | Prototipo empaquetado Desktop (decisión Electron/Tauri) | ☐ |
| A-11 | Backend: módulo Demanda + refactor módulos existentes con validaciones | ✔️ |
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
| A-20 | Frontend: horario semanal + panel de aprobación | ✔️ (ScheduleComponent creado) |
| A-21 | Frontend: modificaciones/reemplazos + auditoría | ☐ |


