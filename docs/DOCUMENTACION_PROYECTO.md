# Proyecto de Generador de Horarios - Documentación Completa

## Tabla de Contenidos

1. [Overview del Proyecto](#overview-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura](#arquitectura)
4. [Módulo Backend](#módulo-backend)
   - [Configuración](#configuración)
   - [Entities (Modelos)](#entities-modelos)
   - [Repositories](#repositories)
   - [Services](#services)
   - [Controllers](#controllers)
   - [Data Loader](#data-loader)
5. [Módulo Frontend](#módulo-frontend)
   - [Configuración](#configuración-1)
   - [Componentes](#componentes)
6. [API REST - Endpoints](#api-rest---endpoints)
7. [Algoritmo de Generación de Horarios](#algoritmo-de-generación-de-horarios)

---

## Overview del Proyecto

El **Schedule Generator** (Generador de Horarios) es una aplicación full-stack diseñada para automatizar la generación semanal de horarios laborales. El sistema considera:

- Empleados con habilidades, departamentos, y jornadas contractuales (horas semanales)
- Jornadas (turnos) con horarios de inicio/fin, días por semana, y habilidades requeridas
- Disponibilidades por empleado y día de la semana
- Un algoritmo inteligente que asigna empleados a turnos respetando contratos, habilidades y anti-repetición rotativa

El proyecto está compuesto por dos repositorios hermanos:

| Repositorio | Ubicación | Tecnología | Puerto |
|---|---|---|---|
| **Frontend** | `horarios/` | React 19 + Vite 8 + Tailwind CSS 4 | `5173` |
| **Backend** | `horarios-backend/` | Spring Boot 3.2 + Java 17 + H2 | `8080` |

---

## Stack Tecnológico

### Backend

| Tecnología | Versión | Propósito |
|---|---|---|
| Java | 17 | Lenguaje de programación |
| Spring Boot | 3.2.0 | Framework principal |
| Spring Data JPA | Incluido | Acceso a datos ORM |
| H2 Database | File-based | Base de datos embebida |
| Lombok | Optional | Reducción de boilerplate |

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| React | ^19.2.8 | Framework UI |
| Vite | ^8.2.2 | Build tool / servidor dev |
| Tailwind CSS | ^4.3.3 | CSS utilitario |
| xlsx | ^0.18.5 | Exportación a Excel |

---

## Arquitectura

```
                    ┌─────────────┐
                    │  Frontend    │
                    │  React 19    │
                    │  :5173       │
                    └──────┬───────┘
                           │ HTTP /api/*
                           │ (proxy Vite → :8080)
                           ▼
                    ┌─────────────┐
                    │  Backend     │
                    │  Spring Boot │
                    │  :8080       │
                    └──────┬───────┘
                           │ JDBC
                           ▼
                    ┌─────────────┐
                    │   H2 File    │
                    │ schedulerdb  │
                    └─────────────┘
```

**Estructura de directorios backend:**

```
horarios-backend/src/main/java/com/example/schedulergenerator/
├── ScheduleGeneratorApplication.java   # Entry point
├── DataLoader.java                     # Seeds demo data
├── config/
│   └── CorsConfig.java                 # CORS filter
├── model/
│   ├── Employee.java                   # Entidad: Empleado
│   ├── Skill.java                      # Entidad: Habilidad
│   ├── Shift.java                      # Entidad: Jornada/Turno
│   ├── Availability.java               # Entidad: Disponibilidad
│   └── ScheduledShift.java             # Entidad: Turno Asignado
├── repository/
│   ├── EmployeeRepository.java
│   ├── SkillRepository.java
│   ├── ShiftRepository.java
│   ├── AvailabilityRepository.java
│   └── ScheduledShiftRepository.java
├── service/
│   ├── EmployeeService.java
│   ├── SkillService.java
│   ├── ShiftService.java
│   ├── AvailabilityService.java
│   └── ScheduleGenerationService.java  # Algoritmo core
└── controller/
    ├── EmployeeController.java
    ├── SkillController.java
    ├── ShiftController.java
    ├── AvailabilityController.java
    └── ScheduleController.java
```

**Estructura de directorios frontend:**

```
horarios/src/
├── main.jsx          # Bootstrap React
├── index.css         # Tailwind import
├── App.jsx           # App root con tabs + i18n
├── i18n.js           # Internacionalización ES/EN
└── components/
    ├── EmployeeComponent.jsx
    ├── ShiftComponent.jsx
    ├── AvailabilityComponent.jsx
    ├── ScheduleComponent.jsx
    ├── SkillsComponent.jsx
    └── SkillCheckboxes.jsx
```

---

## Módulo Backend

### Configuración

#### `application.properties`

**Ubicación:** `src/main/resources/application.properties`

Define la configuración de Spring Boot:

| Propiedad | Valor | Descripción |
|---|---|---|
| `spring.datasource.url` | `jdbc:h2:file:./data/schedulerdb` | BD H2 en archivo persistente |
| `spring.datasource.driverClassName` | `org.h2.Driver` | Driver H2 |
| `spring.datasource.username` | `sa` | Usuario |
| `spring.datasource.password` | `password` | Contraseña |
| `spring.jpa.hibernate.ddl-auto` | `update` | Actualiza schema automáticamente |
| `spring.h2.console.enabled` | `true` | Consola H2 habilitada |
| `spring.h2.console.path` | `/h2-console` | URL consola H2 |
| `server.port` | `8080` | Puerto del servidor |
| `cors.allowed-origins` | `http://localhost:5173` | Origen permitido CORS |

#### `CorsConfig.java`

**Ubicación:** `src/main/java/com/example/schedulergenerator/config/CorsConfig.java`

Clase de configuración que define un `@Bean` de tipo `CorsFilter`.

- **Qué hace:** Registra un filtro CORS global en todas las rutas (`/**`) que permite peticiones desde el frontend.
- **CORS configurado:**
  - `allowedOrigins`: `http://localhost:5173`
  - `allowedMethods`: GET, POST, PUT, DELETE, OPTIONS
  - `allowedHeaders`: Todos los headers
  - `allowCredentials`: true
  - `maxAge`: 3600 segundos (cache de preflight)

#### `ScheduleGeneratorApplication.java`

**Ubicación:** `src/main/java/com/example/schedulergenerator/ScheduleGeneratorApplication.java`

Clase principal anotada con `@SpringBootApplication`. Contiene el método `main()` que inicia la aplicación Spring Boot usando `SpringApplication.run()`.

- **Input:** N/A
- **Output:** Inicia servidor Tomcat en puerto 8080
- **Lo que retorna:** N/A (inicia el contexto de Spring completo)

---

### Entities (Modelos)

Todos los entities usan Lombok (`@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@ToString`) y JPA (`@Entity`, `@Table`).

#### `Employee.java` — Entidad Empleado

**Tabla:** `employees`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | Long | PK, auto-generado | Identificador único |
| `firstName` | String | NOT NULL | Nombre |
| `lastName` | String | NOT NULL | Apellido |
| `email` | String | UNIQUE, NOT NULL | Email (identificador lógico) |
| `phoneNumber` | String | nullable | Teléfono |
| `department` | String | nullable | Departamento |
| `weeklyHours` | Integer | nullable | Horas semanales contractuales. Null = sin tope |
| `skills` | Set\<Skill\> | ManyToMany, EAGER | Habilidades certificadas |
| `active` | boolean | default=true | Activo/inactivo |

**Relaciones:**
- **ManyToMany con Skill** (tabla join: `employee_skills`). Se carga eager para evitar lazy-loading issues.
- **Uno a muchos con Availability** (relación inversa vía `employee` en Availability)
- **Uno a muchos con ScheduledShift** (relación inversa vía `employee` en ScheduledShift)

#### `Skill.java` — Entidad Habilidad

**Tabla:** `skills`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | Long | PK, auto-generado | Identificador único |
| `name` | String | UNIQUE, NOT NULL | Nombre de la habilidad |

#### `Shift.java` — Entidad Jornada/Turno

**Tabla:** `shifts`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | Long | PK, auto-generado | Identificador único |
| `name` | String | NOT NULL | Nombre del turno |
| `startTime` | String | NOT NULL | Hora inicio formato HH:mm |
| `endTime` | String | NOT NULL | Hora fin formato HH:mm |
| `description` | String | nullable | Descripción del turno |
| `breakMinutes` | Integer | nullable | Minutos de colación (no pagados). Null = 0 |
| `daysPerWeek` | Integer | nullable | Días trabajados por semana. Null = modo legacy |
| `contractHours` | Integer | nullable | Horas objetivo pagadas. Null = acepta cualquiera |
| `requiredSkills` | Set\<Skill\> | ManyToMany, EAGER | Habilidades requeridas obligatorias |
| `requiredStaff` | Integer | default=1 | Cantidad mínima de personal |
| `active` | boolean | default=true | Activo/inactivo |

**Relaciones:**
- **ManyToMany con Skill** (tabla join: `shift_required_skills`)
- **Uno a muchos con ScheduledShift** (relación inversa vía `shift` en ScheduledShift)

#### `Availability.java` — Entidad Disponibilidad

**Tabla:** `availabilities`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | Long | PK, auto-generado | Identificador único |
| `employee` | Employee | ManyToOne, NOT NULL | Empleado |
| `dayOfWeek` | String | NOT NULL | Día de la semana (MONDAY, TUESDAY, etc.) |
| `isAvailable` | boolean | NOT NULL | Disponible/no disponible |
| `startTime` | String | nullable | Hora inicio (null = todo el día) |
| `endTime` | String | nullable | Hora fin (null = todo el día) |
| `notes` | String | nullable | Notas adicionales |

#### `ScheduledShift.java` — Entidad Turno Asignado

**Tabla:** `scheduled_shifts`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | Long | PK, auto-generado | Identificador único |
| `employee` | Employee | ManyToOne, NOT NULL | Empleado asignado |
| `shift` | Shift | ManyToOne, NOT NULL | Jornada asignada |
| `date` | String | NOT NULL | Fecha formato yyyy-MM-dd |
| `actualStartTime` | String | nullable | Override parcial de inicio (null = usa default) |
| `actualEndTime` | String | nullable | Override parcial de fin (null = usa default) |
| `active` | boolean | NOT NULL, default=true | Activo/inactivo |

---

### Repositories

Todos extienden `JpaRepository<Entity, Long>` proporcionando CRUD automático (`save`, `findById`, `findAll`, `deleteById`, etc.).

#### `EmployeeRepository.java`

**Ubicación:** `repository/EmployeeRepository.java`

| Método | Tipo Retorno | Descripción |
|---|---|---|
| `findByEmail(String email)` | `Optional<Employee>` | Buscar por email |
| `findBySkillsId(Long skillId)` | `List<Employee>` | Encontrar todos los empleados con cierta habilidad |

#### `SkillRepository.java`

**Ubicación:** `repository/SkillRepository.java`

| Método | Tipo Retorno | Descripción |
|---|---|---|
| `findByName(String name)` | `Optional<Skill>` | Buscar habilidad por nombre |

#### `ShiftRepository.java`

**Ubicación:** `repository/ShiftRepository.java`

| Método | Tipo Retorno | Descripción |
|---|---|---|
| `findByRequiredSkillsId(Long skillId)` | `List<Shift>` | Encontrar todos los turnos que requieren cierta habilidad |

#### `AvailabilityRepository.java`

**Ubicación:** `repository/AvailabilityRepository.java`

| Método | Tipo Retorno | Descripción |
|---|---|---|
| `findByEmployeeId(Long employeeId)` | `List<Availability>` | Todas las disponibilidades de un empleado |
| `findByEmployeeIdAndDayOfWeek(Long, String)` | `List<Availability>` | Disponibilidades de un empleado en un día específico |
| `deleteByEmployeeId(Long)` | `void` | Eliminar todas las disponibilidades de un empleado |

#### `ScheduledShiftRepository.java`

**Ubicación:** `repository/ScheduledShiftRepository.java`

| Método | Tipo Retorno | Descripción |
|---|---|---|
| `findByDateBetween(String, String)` | `List<ScheduledShift>` | Asignaciones en rango de fechas |
| `deleteByDateBetween(String, String)` | `void` | Eliminar asignaciones en rango de fechas |
| `deleteByEmployeeId(Long)` | `void` | Eliminar todas las asignaciones de un empleado |
| `deleteByShiftId(Long)` | `void` | Eliminar todas las asignaciones de un turno |

---

### Services

Todos los servicios están anotados con `@Service` y dependen exclusivamente de repositories inyectados. No son `@Transactional` en clase (solo métodos individuales lo son).

#### `EmployeeService.java`

**Ubicación:** `service/EmployeeService.java`

| Método | Tipo Retorno | Input | Descripción |
|---|---|---|---|
| `getAllEmployees()` | `List\<Employee\>` | N/A | Retorna todos los empleados |
| `getEmployeeById(Long id)` | `Optional\<Employee\>` | ID | Busca empleado por ID |
| `saveEmployee(Employee)` | `Employee` | Entity | Guarda o actualiza empleado |
| `deleteEmployee(Long id)` | `void` | ID | **@Transactional**. Elimina cascadamente: primero limpia disponibilidades y asignaciones programadas, luego elimina el empleado |
| `findByEmail(String email)` | `Optional\<Employee\>` | Email | Busca por email |

#### `SkillService.java`

**Ubicación:** `service/SkillService.java`

| Método | Tipo Retorno | Input | Descripción |
|---|---|---|---|
| `getAllSkills()` | `List\<Skill\>` | N/A | Retorna todas las habilidades |
| `getSkillById(Long id)` | `Optional\<Skill\>` | ID | Busca por ID |
| `getSkillByName(String name)` | `Optional\<Skill\>` | Nombre | Busca por nombre |
| `saveSkill(Skill)` | `Skill` | Entity | Guarda o actualiza habilidad |
| `deleteSkill(Long id)` | `void` | ID | **@Transactional**. Antes de eliminar, remueve la habilidad de los sets de skills de todos los empleados y turnos afectados |

#### `ShiftService.java`

**Ubicación:** `service/ShiftService.java`

| Método | Tipo Retorno | Input | Descripción |
|---|---|---|---|
| `getAllShifts()` | `List\<Shift\>` | N/A | Retorna todas las jornadas |
| `getShiftById(Long id)` | `Optional\<Shift\>` | ID | Busca por ID |
| `saveShift(Shift)` | `Shift` | Entity | Guarda o actualiza jornada |
| `deleteShift(Long id)` | `void` | ID | **@Transactional**. Primero elimina ScheduledShifts vinculados, luego la jornada |

#### `AvailabilityService.java`

**Ubicación:** `service/AvailabilityService.java`

| Método | Tipo Retorno | Input | Descripción |
|---|---|---|---|
| `getAllAvailabilities()` | `List\<Availability\>` | N/A | Retorna todas las disponibilidades |
| `getAvailabilitiesByEmployeeId(Long)` | `List\<Availability\>` | Employee ID | Retorna disponibilidades filtradas por empleado |
| `getAvailabilityById(Long)` | `Optional\<Availability\>` | ID | Busca por ID |
| `saveAvailability(Availability)` | `Availability` | Entity | Guarda o actualiza disponibilidad |
| `deleteAvailability(Long)` | `void` | ID | Elimina una disponibilidad |

#### `ScheduleGenerationService.java` — ALGORITMO CORE

**Ubicación:** `service/ScheduleGenerationService.java`

Este es el servicio más complejo del proyecto. Contiene el algoritmo de generación automática de horarios.

##### Método Público Principal

###### `generateWeeklySchedule(String startDate)` → `List\<ScheduledShift\>`

- **Input:** Fecha de inicio de la semana en formato `yyyy-MM-dd` (debe ser lunes)
- **Output:** Lista de `ScheduledShift` generados para esa semana
- **Comportamiento:**
  1. Limpia cualquier horario existente para la semana dada (`clearWeeklySchedule`)
  2. Carga las asignaciones de la semana anterior (`loadPreviousWeekAssignments`) para aplicar anti-repetición
  3. Ejecuta **Fase A**: asigna empleados contractuales (donde `daysPerWeek * paidMinutes == weeklyHours * 60`)
  4. Ejecuta **Fase B**: rellena con empleados legacy/hasta completar `requiredStaff`
  5. Guarda todas las asignaciones y las retorna

##### Métodos Privados del Algoritmo

###### `pickJornada(List<Shift>, Employee, Set<String>)` → `Shift`

- **Input:** Lista de turnos candidatos, empleado, set de IDs ya asignados esa semana
- **Output:** Turno seleccionado
- **Lógica:** Alterna entre rotación pura (basada en `employeeId % semanasTotal % shifts.length`) y preferencia por turnos no repetidos de la semana anterior. Si el turno ya se usó esta semana, pasa al siguiente candidato.

###### `rankOffsets(Employee, LocalDate, Shift, Map)` → `List<Integer>`

- **Input:** Empleado, fecha, turno, mapa de conteo de repeticiones
- **Output:** Lista de offsets (0-6) ordenados por prioridad para asignar
- **Lógica:** 
  1. Filtra solo días donde el empleado está disponible (`allDaysAvailable`)
  2. Ordena: primeros los días que NO se han repetido, luego los que sí
  3. Aplic offset rotacional: `(start + i * daysPerWeek) % 7`
  4. Usa mapa de conteo para anti-repetición determinística

###### `allDaysAvailable(Employee, LocalDate, List<Integer>, String, String)` → `boolean`

- **Input:** Empleado, fecha, offsets, inicio, fin
- **Output:** true si todos los días seleccionados cubren el segmento horario del turno
- **Lógica:** Verifica `isAvailableOn` para cada offset del rank. Maneja wrap-around de medianoche.

###### `isAvailableOn(Employee, LocalDate, String, String)` → `boolean`

- **Input:** Empleado, fecha específica, hora inicio, hora fin
- **Output:** true si el empleado puede trabajar ese día en ese horario
- **Lógica:**
  1. Convierte fecha a day-of-week
  2. Busca disponibilidad en DB
  3. Si no hay registro o `isAvailable=false` → false
  4. Si start/end son null → disponible todo el día → true
  5. Verifica cobertura de segmentos horarios, incluyendo midnight wrapping (turnos que cruzan de un día a otro)

###### `fmtClock(int minutesOfDay)` → `String`

- **Input:** Minutos desde medianoche (puede ser negativo)
- **Output:** Hora en formato HH:mm
- **Lógica:** Convierte minutos a HH:mm. Si el resultado es negativo (por wrap de medianoche), suma 1440 (minutos en un día) para obtener la hora correcta del día siguiente.

###### `build(Employee, Shift, LocalDate)` → `ScheduledShift`

- **Input:** Empleado, turno, fecha
- **Output:** Nuevo `ScheduledShift` instanciado
- **Lógica:** Factory simple. Establece employee, shift, date, active=true. Si el turno tiene breakMinutes > 0, ajusta actualStartTime en consecuencia.

###### `paidMinutes(Shift)` → `int`

- **Input:** Turno
- **Output:** Minutos pagados = presenciaTotal - breakMinutes

###### `assignLegacy(List\<ScheduledShift\>, LocalDate, Shift, List\<Employee\>)`

- **Input:** Lista acumuladora, fecha, turno, lista de empleados disponibles
- **Output:** void (muta la lista)
- **Lógica:** Para cada empleado disponible, asigna el turno directamente creando un `ScheduledShift`. Se usa en Fase B.

###### `clearWeeklySchedule(String startDate)` → `void`

- **Input:** Fecha de lunes en formato ISO
- **Output:** void
- **Lógica:** Calcula la fecha de domingo, ejecuta `scheduledShiftRepository.deleteByDateBetween(lunes, domingo)`

###### `loadPreviousWeekAssignments(LocalDate)` → `Map<String, Set<String>>`

- **Input:** Fecha de lunes de la semana actual
- **Output:** Mapa mapeando `"employeeId|shiftId"` → lista de fechas donde fue asignado
- **Lógica:** Busca todas las asignaciones de la semana previa. Útil para anti-repetición.

###### `getAvailableEmployeesForShift(List<Employee>, LocalDate, String, String)` → `List<Employee>`

- **Input:** Lista de empleados, fecha, hora inicio, hora fin
- **Output:** Empleados que pueden trabajar en ese día y horario
- **Lógica:** Filtra empleados activos y que pasan `isAvailableOn`

###### `contractMatches(Shift, Employee)` → `boolean`

- **Input:** Turno, empleado
- **Output:** true si `shift.contractHours == employee.weeklyHours`
- **Lógica:** Verifica coincidencia contractual. También verifica modos legacy (ambos con valores null).

###### `hasRequiredSkills(Shift, Employee)` → `boolean`

- **Input:** Turno, empleado
- **Output:** true si el empleado TIENE TODAS las habilidades requeridas por el turno
- **Lógica:** Itera sobre requiredSkills del turno y verifica que cada una esté en el set de skills del empleado.

###### `toMinutes(String hhmm)` → `int`

- **Input:** Cadena "HH:mm"
- **Output:** Minutos desde medianoche (ej: "09:00" → 540)

###### `shiftDurationMinutes(Shift)` → `int`

- **Input:** Turno
- **Output:** Minutos totales = end - start

---

### Controllers

Todos usan `@RestController` y `@RequestMapping("/api/...")`.

#### `EmployeeController.java`

**Endpoint base:** `/api/employees`

| Endpoint | Method | Input | Output | Códigos |
|---|---|---|---|---|
| `/api/employees` | GET | N/A | `List\<Employee\>` | 200 |
| `/api/employees/{id}` | GET | Path param id | `Employee` | 200 / 404 |
| `/api/employees` | POST | Body `Employee` (con `skills: [{id}]`) | `Employee` creado | 200 / 400 / 500 |
| `/api/employees/{id}` | PUT | Path param id + Body `Employee` | `Employee` actualizado | 200 / 400 / 500 |
| `/api/employees/{id}` | DELETE | Path param id | void | 204 / 404 |

**Privado `resolveSkills(Set<Skill>)`:** Resuelve objetos Skill venidos del frontend (que envían `{id}` como referencia) a entidades gestionadas por JPA. Si el Skill no existe en DB, crea uno nuevo.

#### `SkillController.java`

**Endpoint base:** `/api/skills`

| Endpoint | Method | Input | Output | Códigos |
|---|---|---|---|---|
| `/api/skills` | GET | N/A | `List\<Skill\>` | 200 |
| `/api/skills` | POST | Body `Skill` (con `name`) | `Skill` (idempotente) | 200 / 400 / 500 |
| `/api/skills/{id}` | DELETE | Path param id | void | 204 / 404 |

**Comportamiento especial (POST):** Idempotente por nombre. Si ya existe un skill con ese nombre, devuelve el existente en lugar de crear duplicado.

#### `ShiftController.java`

**Endpoint base:** `/api/shifts`

| Endpoint | Method | Input | Output | Códigos |
|---|---|---|---|---|
| `/api/shifts` | GET | N/A | `List\<Shift\>` | 200 |
| `/api/shifts/{id}` | GET | Path param id | `Shift` | 200 / 404 |
| `/api/shifts` | POST | Body `Shift` (con `requiredSkills: [{id}]`) | `Shift` creado | 200 / 400 / 500 |
| `/api/shifts/{id}` | PUT | Path param id + Body `Shift` | `Shift` actualizado | 200 / 400 / 500 |
| `/api/shifts/{id}` | DELETE | Path param id | void | 204 / 404 |

**Privado `resolveSkills(Set<Skill>)`:** Mismo patrón que EmployeeController.

#### `AvailabilityController.java`

**Endpoint base:** `/api/availabilities`

| Endpoint | Method | Input | Output | Códigos |
|---|---|---|---|---|
| `/api/availabilities` | GET | N/A | `List\<Availability\>` | 200 |
| `/api/availabilities/{id}` | GET | Path param id | `Availability` | 200 / 404 |
| `/api/availabilities/employee/{employeeId}` | GET | Path param employeeId | `List\<Availability\>` | 200 |
| `/api/availabilities` | POST | Body `Availability` (con `employee: {id}`) | `Availability` creado | 200 / 400 / 404 / 500 |
| `/api/availabilities/{id}` | PUT | Path param id + Body | `Availability` actualizado | 200 / 404 |
| `/api/availabilities/{id}` | DELETE | Path param id | void | 204 / 404 |

**Validación (POST/PUT):** Valida que el empleado referenced por `employee.id` exista antes de guardar.

#### `ScheduleController.java`

**Endpoint base:** `/api/schedule`

| Endpoint | Method | Query Params | Output | Códigos |
|---|---|---|---|---|
| `/api/schedule/generate` | POST | `startDate=yyyy-MM-dd` | `List\<ScheduledShift\>` | 200 / 400 |
| `/api/schedule/week` | GET | `startDate=yyyy-MM-dd` | `List\<ScheduledShift\>` | 200 / 400 |
| `/api/schedule/{id}` | GET | Path param id | `ScheduledShift` | 200 / 404 |

**Validaciones comunes:**
- `startDate` debe parsearse como `ISO_LOCAL_DATE`
- La fecha debe ser `MONDAY` (lunes). Si no, retorna error 400.

---

### DataLoader

**Ubicación:** `DataLoader.java`

Anotado con `@Configuration` e implementa `CommandLineRunner`.

**Cuándo se ejecuta:** Al iniciar la aplicación, UNA SOLA VEZ, solo si `employeeRepository.count() == 0` (DB vacía).

**Datos que seedea:**

| Tipo | Datos |
|---|---|
| **Skills (3)** | "Cocinero fritos", "Cocinero sopas", "Ayudante cocina" |
| **Employees (3)** | María Flores (30h/semana, PT), Carlos Muñoz (45h/semana, FT), Ana Torres (sin especificar) |
| **Shifts (3)** | Turno Mañana (08:00-14:00, 5d/semana, 6h), Turno Tarde (14:00-20:00, 5d/semana, 6h), Turno Genérico (09:00-18:00, sin límite) |
| **Availabilities (15)** | Lunes a Viernes para los 3 empleados (María y Carlos disponibles; Ana NO disponible Mon-Fri) |

---

## Módulo Frontend

### Configuración

#### `package.json`

```json
{
  "scripts": {
    "dev": "vite",            // Servidor desarrollo :5173
    "build": "vite build",   // Build producción → dist/
    "preview": "vite preview",
    "lint": "oxlint ."
  }
}
```

#### `vite.config.js`

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```

- **Proxy:** Redirige todas las peticiones `/api/*` al backend en `:8080`
- Esto evita problemas de CORS durante desarrollo y permite que el frontend acceda a la API como si estuviera en el mismo origen.

---

### Componentes

#### `App.jsx` — Componente Raíz

**Props:** N/A

**Estado:**
- `activeTab: 'employees' | 'shifts' | 'availability' | 'skills' | 'schedule'` — Tab activa
- `lang: 'es' | 'en'` — Idioma actual

**Renderizado:**
- Header con título, navegación por tabs (5 botones), toggle de idioma ES/EN
- Renderiza condicionalmente UNO de los 5 componentes según `activeTab`

**Lo que retorna:** JSX con estructura completa de la app (header + contenido dinámico)

#### `i18n.js` — Internacionalización

**Exports:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `t(key)` | string key | string | Traduce una clave al idioma actual |
| `setLang(lang)` | 'es' \| 'en' | void | Cambia idioma y guarda en localStorage |
| `useLang()` | N/A | 'es' \| 'en' | Retorna idioma actual |
| `getLang()` | N/A | 'es' \| 'en' | Alias de useLang |
| `locale()` | N/A | Intl.DateTimeFormat | Formatter de fechas local |

**Internals:**
- Diccionario de traducciones ES/EN (~100+ keys)
- Estado manejado con `useState` y `useEffect`
- Persistencia en `localStorage` con key `'locale'`
- Default: `'es'`

---

#### `EmployeeComponent.jsx`

**Props:** N/A

**Estados internos:**
- `employees: Employee[]` — Lista de empleados
- `skills: Skill[]` — Lista de habilidades disponibles
- `formData` — Objeto para formulario de crear/editar
- `editingId: number \| null` — ID del empleado en edición

**Funciones:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `fetchEmployees()` | N/A | void | GET `/api/employees` → populate estado |
| `fetchSkills()` | N/A | void | GET `/api/skills` → populate opciones de multiselect |
| `handleSubmit(e)` | Event | Promise<void> | Crea/actualiza empleado. POST/PUT `/api/employees`. Envía skills formateados como `[{id}]` |
| `handleEdit(employee)` | Employee | void | Carga datos del empleado en formData y activa edición |
| `handleDelete(id)` | number | Promise<void> | DELETE `/api/employees/:id` |
| `handleInputChange(field, value)` | field, value | void | Actualiza campo del formulario |
| `resetForm()` | N/A | void | Limpia formulario y sale de edición |

**Sub-componentes usados:**
- `SkillCheckboxes` — Multiselect de habilidades para el formulario

**Renderizado:** Tabla con columnas (Nombre, Email, Teléfono, Depto, Horas Sem., Habilidades, Acciones) + formulario modal inline.

---

#### `ShiftComponent.jsx`

**Props:** N/A

**Estados internos:**
- `shifts: Shift[]`
- `skills: Skill[]`
- `formData` — Formulario (name, startTime, endTime, description, breakMinutes, daysPerWeek, contractHours)
- `selectedSkills: string[]` — IDs de habilidades requeridas seleccionadas
- `editingId: number \| null`

**Funciones:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `fetchShifts()` | N/A | void | GET `/api/shifts` |
| `fetchSkills()` | N/A | void | GET `/api/skills` |
| `handleSubmit(e)` | Event | Promise<void> | POST/PUT `/api/shifts`. Envía `requiredSkills: [{id}]` |
| `handleEdit(shift)` | Shift | void | Carga datos en formulario |
| `handleDelete(id)` | number | Promise<void> | DELETE `/api/shifts/:id` |
| `handleSkillChange(selectedIds)` | string[] | void | Actualiza selectedSkills del multiselect |

**Renderizado:** Tabla con columnas (Nombre, Horario, Duración, Break, Días/Sem, Horas Contrato, Habilidades Req., Personal Req., Acciones) + formulario.

---

#### `AvailabilityComponent.jsx`

**Props:** N/A

**Estados internos:**
- `availabilities: Availability[]`
- `employees: Employee[]`
- `formData` — (employeeId, dayOfWeek, isAvailable, startTime, endTime, notes)
- `editingId: number \| null`

**Funciones:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `fetchAvailabilities()` | N/A | void | GET `/api/availabilities` |
| `fetchEmployees()` | N/A | void | GET `/api/employees` |
| `handleSubmit(e)` | Event | Promise<void> | POST/PUT `/api/availabilities`. Envía `employee: {id}` |
| `handleEdit(avail)` | Availability | void | Carga en formulario |
| `handleDelete(id)` | number | Promise<void> | DELETE `/api/availabilities/:id` |

**Días de la semana (dropdown):** MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY

**Renderizado:** Tabla (Empleado, Día, Disponible, Horario, Notas, Acciones) + formulario.

---

#### `ScheduleComponent.jsx` — Generador de Horarios

**Props:** N/A

**Funciones auxiliares internas:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `groupBy(items, fn)` | array, fn | object | Agrupa array por clave |
| `toMinutes(timeStr)` | string HH:mm | int | Convierte HH:mm a minutos de día |
| `shiftMinutes(start, end)` | HH:mm, HH:mm | int | Minutos duracion del turno |
| `assignmentTimes(scheduledShifts)` | array | object | Extrae times únicos por fecha |
| `assignMinutes(assignObj, day, sTime)` | obj, day, time | void | Asigna tiempos a agrupación |
| `fmtHM(totalMinutes)` | int | string | Minutos → "HH:MM" |
| `weekDates(mondayStr)` | yyyy-MM-dd | string[] | Retorna 7 fechas de la semana |
| `formatTimeDisplay(date, tStart, tEnd)` | date, start, end | string | Muestra "HH:MM - HH:MM" o vacío |

**Funciones principales:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `fetchScheduleData()` | N/A | void | Carga employees, shifts, y schedule actual simultáneamente |
| `handleGenerate(startDate?)` | string? | Promise<void> | POST `/api/schedule/generate?startDate=`. Ejecuta el algoritmo y recarga |
| `handleLoadWeek(startDate?)` | string? | Promise<void> | GET `/api/schedule/week?startDate=`. Carga schedule existente |
| `exportToExcel(schedule, employees, shifts)` | arrays | void | Genera archivo .xlsx con dos hojas: "Horario" (grid tabla) + "Detalle" (lista filas) |

**Renderizado:**
1. Selector de semana (input type=date, default lunes actual)
2. Botón "Generar Horario" (POST generate) + "Cargar Horario" (GET week)
3. **Tabla principal:** Filas = empleados, Columnas = días de la semana. Cada celda muestra nombre del turno + horario asignado. Empleados no asignados aparecen como "Sin asignar".
4. **Botón "Exportar a Excel"** — descarga `.xlsx` con XLSX library
5. Grid detallado debajo: lista plana de todas las asignaciones con empleado, turno, fecha, horario

**Flujo de usuario:**
1. Seleccionar fecha de lunes → Clic "Generar" → Esperar respuesta del backend
2. Verificar resultados en tabla → Opcionalmente exportar a Excel
3. Si necesita ajustar, modificar disponibilidades/empleados y regenerar

---

#### `SkillsComponent.jsx`

**Props:** N/A

**Estados:**
- `skills: Skill[]`
- `newName: string`

**Funciones:**

| Función | Input | Output | Descripción |
|---|---|---|---|
| `fetchSkills()` | N/A | void | GET `/api/skills` |
| `handleAdd(e)` | Event | Promise<void> | POST `/api/skills` con `{name: newName}` |
| `handleDelete(id)` | number | Promise<void> | DELETE `/api/skills/:id` |

**Renderizado:** Input + botón agregar. Lista simple de habilidades con botón eliminar. Sin edición inline (crear/eliminar).

---

#### `SkillCheckboxes.jsx` — Sub-componente Reutilizable

**Props:**

| Prop | Tipo | Descripción |
|---|---|---|
| `options` | `Array<{id: number, name: string}>` | Lista de habilidades disponibles |
| `selected` | `string[]` | IDs seleccionados (como strings) |
| `onChange` | `(newSelected: string[]) => void` | Callback cuando cambian selecciones |

**Lo que retorna:** Grid de checkboxes renderizados con Tailwind CSS. Cada checkbox muestra el nombre de la habilidad.

**Internals:**
- `toggle(id)` — Alterna selección de un checkbox. Mapea callbacks con `String(id)`.
- `handleChange(e, id)` — Wrapper para manejar eventos nativos de input.

---

## API REST - Endpoints Completos

### Empleados

| Método | Ruta | Request Body | Response Body | Code |
|---|---|---|---|---|
| GET | `/api/employees` | — | `[Employee, ...]` | 200 |
| GET | `/api/employees/:id` | — | `Employee` | 200 / 404 |
| POST | `/api/employees` | `{ firstName, lastName, email, phoneNumber?, department?, weeklyHours?, skills: [{id}] }` | `Employee` (con skills resueltos) | 200 / 400 / 500 |
| PUT | `/api/employees/:id` | `{ firstName, lastName, email, phoneNumber?, department?, weeklyHours?, skills: [{id}] }` | `Employee` (actualizado) | 200 / 400 / 500 |
| DELETE | `/api/employees/:id` | — | — | 204 / 404 |

### Habilidades

| Método | Ruta | Request Body | Response Body | Code |
|---|---|---|---|---|
| GET | `/api/skills` | — | `[Skill, ...]` | 200 |
| POST | `/api/skills` | `{ name }` | `Skill` (existente o creado) | 200 / 400 / 500 |
| DELETE | `/api/skills/:id` | — | — | 204 / 404 |

### Jornadas/Turnos

| Método | Ruta | Request Body | Response Body | Code |
|---|---|---|---|---|
| GET | `/api/shifts` | — | `[Shift, ...]` | 200 |
| GET | `/api/shifts/:id` | — | `Shift` | 200 / 404 |
| POST | `/api/shifts` | `{ name, startTime, endTime, description?, breakMinutes?, daysPerWeek?, contractHours?, requiredSkills: [{id}], requiredStaff? }` | `Shift` (con skills resueltos) | 200 / 400 / 500 |
| PUT | `/api/shifts/:id` | `{ name, startTime, endTime, description?, breakMinutes?, daysPerWeek?, contractHours?, requiredSkills: [{id}], requiredStaff? }` | `Shift` (actualizado) | 200 / 400 / 500 |
| DELETE | `/api/shifts/:id` | — | — | 204 / 404 |

### Disponibilidades

| Método | Ruta | Request Body | Response Body | Code |
|---|---|---|---|---|
| GET | `/api/availabilities` | — | `[Availability, ...]` | 200 |
| GET | `/api/availabilities/:id` | — | `Availability` | 200 / 404 |
| GET | `/api/availabilities/employee/:employeeId` | — | `[Availability, ...]` | 200 |
| POST | `/api/availabilities` | `{ employee: {id}, dayOfWeek, isAvailable, startTime?, endTime?, notes? }` | `Availability` (con employee resuelto) | 200 / 400 / 404 / 500 |
| PUT | `/api/availabilities/:id` | `{ employee: {id}, dayOfWeek, isAvailable, startTime?, endTime?, notes? }` | `Availability` (actualizado) | 200 / 404 |
| DELETE | `/api/availabilities/:id` | — | — | 204 / 404 |

### Horarios

| Método | Ruta | Query Params | Response Body | Code |
|---|---|---|---|---|
| POST | `/api/schedule/generate` | `startDate=yyyy-MM-dd` | `[ScheduledShift, ...]` | 200 / 400 |
| GET | `/api/schedule/week` | `startDate=yyyy-MM-dd` | `[ScheduledShift, ...]` | 200 / 400 |
| GET | `/api/schedule/:id` | — | `ScheduledShift` | 200 / 404 |

---

## Algoritmo de Generación de Horarios

### Resumen General

El algoritmo opera en **dos fases** y procesa cada día de la semana (lunes a domingo) para cada jornada disponible.

```
generateWeeklySchedule("2024-01-15")
│
├── clearWeeklySchedule("2024-01-15")          // Limpia semana anterior
├── loadPreviousWeekAssignments(Monday)        // Carga mapa de la semana pasada
│
├── PHASE A — Contract-Based Employees
│   │
│   ├── For each Day (Mon-Sun):
│   │   ├── For each Shift (jornada):
│   │   │   ├── Find contract-matched employees
│   │   │   │   └── contractHours == weeklyHours ✓
│   │   │   ├── Rank available days with anti-repetition
│   │   │   ├── Rotate using (employeeId % totalWeeks) % shiftCount
│   │   │   ├── Assign or skip (if not all days available)
│   │   │   └── Apply fallback: adjust last day if hours don't match exactly
│   │   │
│   │   └── Fill remaining requiredStaff slots
│   │       └── From ANY available employee (with required skills)
│   │
├── PHASE B — Legacy Employees
│   │
│   ├── For each Day (Mon-Sun):
│   │   ├── For each Shift with daysPerWeek == null:
│   │   │   └── Assign remaining available employees until requiredStaff met
│   │
└── Save all ScheduledShifts → return list
```

### Fase A — Basada en Contratos

**Objetivo:** Asignar empleados cuyo contrato coincide exactamente con la jornada.

**Condición de contrato:** `shift.daysPerWeek * paidMinutes(shift) == employee.weeklyHours * 60`

Donde `paidMinutes(shift) = (shift.endTime - shift.startTime) - shift.breakMinutes`

**Proceso por jornada:**

1. **Filtrar empleados:** Solo aquellos con `contractHours == weeklyHours`
2. **Para cada empleado apto:**
   - Calcular `totalWeeks = ceil(employee.weeklyHours / shift.contractHours)` (cuántas semanas para completar el ciclo)
   - Determinar `rotationIndex = (employeeId % totalWeeks) % shiftCount` (índice rotativo)
   - Ejecutar `pickJornada()`: Alternar entre rotación pura y preferencia por no-repetición (usando el mapa de la semana anterior)
   - Ejecutar `rankOffsets()`: Obtener lista priorizada de días de la semana
     - Día disponible > día no-repetido
     - Anti-repetición basada en conteo semanal
   - Verificar `allDaysAvailable()`: ¿El empleado puede cubrir TODOS los días del turno?
   - Si sí → `build()` + guardar
   - Si horas no coinciden exactamente → **fallback**: ajustar el último día con actualStartTime/actualEndTime override

### Fase B — Empleados Legacy

**Objetivo:** Rellenar jornadas sin definición contractual precisa (`daysPerWeek == null`).

**Proceso:**

1. Filtrar jornadas con `daysPerWeek == null`
2. Para cada día y jornada:
   - Obtener empleados disponibles (`getAvailableEmployeesForShift`)
   - Filtrar por habilidades requeridas (`hasRequiredSkills`)
   - Excluir empleados ya asignados ese día
   - Asignar hasta alcanzar `requiredStaff`

### Mecanismos Clave

#### Anti-Repetición Rotativa

```
rotationIndex = (employeeId % totalWeeks) % totalShiftTypes
offsetRotation = (rotationIndex + i) % daysPerWeek
```

Esto asegura que cada empleado rote por diferentes días a lo largo de las semanas, evitando que siempre trabaje los mismos turnos.

#### Soporte para Midnight Wrapping

Los turnos que cruzan medianoche (ej: 22:00 - 06:00) se manejan correctamente gracias a la lógica de `coversSegment()` y `wrapsPastMidnight()`:

- Si `end < start`, se asume que el turno cruza a otro día
- Se generan 2 segmentos: `[start, 1440)` y `[0, end]`
- Se verifica disponibilidad en ambos segmentos separadamente

#### Cálculo de Minutos de Día

- `"09:00"` → `9 * 60 + 0 = 540` minutos desde medianoche
- `"14:00"` → `14 * 60 + 0 = 840` minutos
- Duración: `840 - 540 = 300` min (5 horas)

#### Conversión Inversa

- `540 minutos → "09:00"` → `(540 / 60):((540 % 60).toString().padStart(2, '0'))`
- Resultados negativos (wrap midnight): `-120 + 1440 = 1320 → "22:00"`

---

## Diagrama de Relaciones entre Entidades

```
┌──────────┐       ┌──────────┐
│ Employee │       │  Skill   │
├──────────┤       ├──────────┤
│ id       │◄─────►│ id       │
│ firstName│  N:M  │ name     │
│ lastName │table:  ├──────────┤
│ email    │employee│ Shift    │────┐
│ phone    │_skills │──────────┤    │
│ dept     │        │ id       │    │ N:M
│ weeklyHrs│        │ name     │    │ table:
│ skills[] │        │ start    │    │shift_
│ active   │        │ end      │    │required
└──────────┘        │ break    │    │_skills
       │            │ days/wk  │    │    ┌────────┐
       │ N:1        │ contract │    └───►│  Skill │
       │            │ staffNbr │         └────────┘
       │            │ active   │
       │            │ required │
       ▼            │ skills[] │
┌──────────┐        └──────────┘
│Availability│
├──────────┤
│ id       │
│ employee │──► Employee
│ dayOfWeek│
│ available│
│ start    │
│ end      │
│ notes    │
└──────────┘

         ┌─────────────────┐
         │  ScheduledShift  │
         ├─────────────────┤
         │ id              │
         │ employee ───────┼──► Employee
         │ shift   ────────┼──► Shift
         │ date            │
         │ actualStartTime │
         │ actualEndTime   │
         │ active          │
         └─────────────────┘
```

---

## Flujo de Datos Completo — Ejemplo de Generación

```
Usuario (Frontend)                    Backend
     │                                    │
     │  POST /api/schedule/generate       │
     │  ?startDate=2024-01-15             │
     │                                    │
     ├───────────────────────────────────►│
     │                                    ├─ validate startDate = Monday
     │                                    ├─ clearWeeklySchedule("2024-01-15")
     │                                    ├─ loadPreviousWeekAssignments()
     │                                    │
     │                                    ├─ PHASE A:
     │                                    │  For each shift:
     │                                    │    findContractedEmps()
     │                                    │    pickJornada() ← rotation logic
     │                                    │    rankOffsets() ← anti-repeat
     │                                    │    allDaysAvailable()
     │                                    │    build() → ScheduledShift[]
     │                                    │
     │                                    ├─ PHASE B:
     │                                    │  fillRemainingSlots()
     │                                    │
     │                                    ├─ scheduledShiftRepo.saveAll(results)
     │                                    │
     │  ◄────────────────────────────────┤
     │  [ScheduledShift, ...]             │
     │                                    │
     ├─ Render grid/table                 │
     ├─ User reviews assignment           │
     │                                    │
     └─ Click "Exportar a Excel"         │
        XLSX library generates .xlsx     │
        Download triggered                │
```

---

## Configuración del Servidor y Puertos

| Servicio | Puerto | URL | Descripción |
|---|---|---|---|
| Frontend Dev Server | 5173 | http://localhost:5173 | Vite con hot reload |
| Backend API | 8080 | http://localhost:8080 | Spring Boot embedded Tomcat |
| H2 Console | 8080 | http://localhost:8080/h2-console | Consola de administración BD |

**Proxy Vite:** Las peticiones a `/api/*` se reenvían automáticamente a `http://localhost:8080`, eliminando la necesidad de configurar CORS manualmente durante desarrollo.

---

## Comandos de Ejecución

### Backend

```bash
# Desde horarios-backend/
cd horarios-backend
mvn spring-boot:run
```

```bash
# Compilar y empaquetar
mvn clean package
java -jar target/schedule-generator-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
# Desde horarios/
cd horarios
npm install
npm run dev
```

```bash
# Build producción
npm run build
# Output en dist/
```

```bash
# Lint
npm run lint
```

---

## Datos Demo (seedeados automáticamente)

Al arrancar con DB vacía, se crean:

### Skills
| ID | Nombre |
|---|---|
| 1 | Cocinero fritos |
| 2 | Cocinero sopas |
| 3 | Ayudante cocina |

### Employees
| ID | Nombre | Email | Horas/Semana | Habilidades |
|---|---|---|---|---|
| 1 | María Flores | maria@email.com | 30 (PT) | Cocinero fritos, Cocinero sopas |
| 2 | Carlos Muñoz | carlos@email.com | 45 (FT) | Cocinero fritos, Cocinero sopas, Ayudante cocina |
| 3 | Ana Torres | ana@email.com | null (sin límite) | Ayudante cocina |

### Shifts
| ID | Nombre | Horario | Días/Sem | Horas Contrato | Staff Req. |
|---|---|---|---|---|---|
| 1 | Turno Mañana | 08:00 - 14:00 | 5 | 6h (break 30min) | 1 |
| 2 | Turno Tarde | 14:00 - 20:00 | 5 | 6h (break 30min) | 1 |
| 3 | Turno Genérico | 09:00 - 18:00 | null (legacy) | null | 1 |

### Availabilities
| Empleado | Día | Disponible |
|---|---|---|
| María | Mon-Fri | Sí |
| Carlos | Mon-Fri | Sí |
| Ana | Mon-Fri | **No** |
