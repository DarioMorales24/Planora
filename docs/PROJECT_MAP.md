# Mapa del Proyecto — Generador de Horarios

> Referencia rápida para no buscar en todos los directorios.
> Frontend y backend son proyectos hermanos (no hay monorepo).

- **Frontend (React + Vite):** `/mnt/c/Users/soulm/Desktop/horarios`
- **Backend (Java + Spring Boot + Maven):** `/mnt/c/Users/soulm/Desktop/horarios-backend`

---

## 1. Frontend — `horarios/`

Stack: React 19, Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), oxlint.

```
horarios/
├── index.html                  # Entry HTML → carga /src/main.jsx
├── package.json                # Scripts: dev | build | preview | lint (oxlint)
├── vite.config.js              # Plugins react+tailwind; proxy /api → localhost:8080
├── dist/                       # Build de producción (generado)
└── src/
    ├── main.jsx                # Bootstrap de React (createRoot)
    ├── App.jsx                 # Tabs: Employees | Shifts | Availability | Schedule Generator
    ├── index.css               # @import "tailwindcss"
    └── components/
        ├── EmployeeComponent.jsx       # CRUD empleados (tabla + formulario)
        ├── ShiftComponent.jsx          # CRUD turnos preestablecidos (nombre, hora inicio/fin)
        ├── AvailabilityComponent.jsx   # CRUD disponibilidad por empleado/día/rango horario
        └── ScheduleComponent.jsx       # Genera/carga horario semanal y lo muestra agrupado por día→empleado
```

Notas frontend:
- Los componentes llaman a la API con URL absoluta `http://localhost:8080/api/...` (hay CORS habilitado). El proxy de Vite (`/api` → 8080) existe pero aún no se usa en los fetch.
- Helper local `groupBy(arr, keyFn)` en ScheduleComponent (evitar `Object.groupBy().entries()`).
- Fechas: formato `yyyy-MM-dd`; horas `HH:mm`.

## 2. Backend — `horarios-backend/`

Stack: Spring Boot 3.2, Java 17, Spring Data JPA, H2 (archivo `./data/schedulerdb`), Lombok.

Paquete base: `com.example.schedulergenerator`

```
src/main/java/com/example/schedulergenerator/
├── ScheduleGeneratorApplication.java   # @SpringBootApplication main()
├── DataLoader.java                     # CommandLineRunner con datos demo (guard: count()==0)
├── model/                              # Entidades JPA
│   ├── Employee.java                   # id, nombre, email(único), depto, weeklyHours, skills(M2M), active
│   ├── Skill.java                      # id, name(único) — categorías: "Cocinero fritos", etc.
│   ├── Shift.java                      # jornada: startTime, endTime, contractHours, requiredStaff, requiredSkills(M2M)
│   ├── Availability.java               # employee(FK), dayOfWeek, available, startTime?, endTime? (null = todo el día; wrap = cruza medianoche)
│   └── ScheduledShift.java             # employee(FK), shift(FK), date(yyyy-MM-dd), active
├── repository/                         # Interfaces JpaRepository
│   ├── EmployeeRepository.java         # findByEmail
│   ├── ShiftRepository.java            # —
│   ├── AvailabilityRepository.java     # findByEmployeeId, findByEmployeeIdAndDayOfWeek
│   └── ScheduledShiftRepository.java   # findByDateBetween, deleteByDateBetween
├── service/
│   ├── EmployeeService.java            # CRUD
│   ├── ShiftService.java               # CRUD
│   ├── AvailabilityService.java        # CRUD + getAvailabilitiesByEmployeeId
│   └── ScheduleGenerationService.java  # ⭐ Algoritmo de generación semanal (sin IA)
└── controller/                         # REST (@CrossOrigin → http://localhost:5173)
    ├── EmployeeController.java         # /api/employees (resuelve skills por id al crear/actualizar)
    ├── ShiftController.java            # /api/shifts (idem requiredSkills)
    ├── AvailabilityController.java     # /api/availabilities (+ /employee/{id}) — JSON usa `available`, NO isAvailable
    ├── ScheduleController.java         # /api/schedule
    └── SkillController.java            # /api/skills (POST es idempotente por nombre)
src/main/resources/application.properties   # H2 file + consola /h2-console + puerto 8080
```

### API REST

| Método | Ruta | Descripción |
|---|---|---|
| GET/POST | `/api/employees` | Listar / crear empleado |
| GET/PUT/DELETE | `/api/employees/{id}` | Leer / actualizar / borrar |
| GET/POST | `/api/shifts` | Listar / crear turno |
| GET/PUT/DELETE | `/api/shifts/{id}` | Leer / actualizar / borrar |
| GET/POST | `/api/availabilities` | Listar / crear disponibilidad |
| GET | `/api/availabilities/employee/{employeeId}` | Disponibilidad de un empleado |
| PUT/DELETE | `/api/availabilities/{id}` | Actualizar / borrar |
| GET/POST | `/api/skills` | Listar / crear skill (idempotente por nombre) |
| DELETE | `/api/skills/{id}` | Borrar skill |
| POST | `/api/schedule/generate?startDate=yyyy-MM-dd` | Genera horario semanal (regenera = limpia semana) |
| GET | `/api/schedule/week?startDate=yyyy-MM-dd` | Horario guardado de esa semana |

### Algoritmo de generación (ScheduleGenerationService) — v3 empleado-céntrico

Reglas (determinista, sin IA, **sin jornadas parciales**):
1. Limpia la semana y carga asignaciones de la semana anterior (rotación).
2. **Empleados con contrato (`weeklyHours`)**: busca jornadas donde
   `daysPerWeek × paidPerDay == weeklyHours×60`, con `paidPerDay = presencia − breakMinutes`
   (colación no paga incluida en el horario), matching de `contractHours` y skills.
   Ej: 29h → 5 días × (09:00–15:33 − 45min = 5h48) = 29h00 exactas.
   - Elige jornada rotando vs semana anterior; elige días por disponibilidad → anti-repetición → orden calendario.
   - Si no puede cubrir TODOS los días con disponibilidad, **no lo agenda** (mejor incompleto que mal cerrado).
3. **Legado sin contrato**: se llena hasta `requiredStaff` por día/jornada (comportamiento antiguo).
4. Una sola plantilla de jornada por empleado/semana (sin mezclas).
5. **Operación L-D**: el orden de días rota determinísticamente por `(employeeId + weekIndex) % 7`, repartiendo cobertura de fin de semana entre el personal y variando cada semana (nada de "todos lunes-viernes").

Verificado end-to-end (datos demo actuales): John/Bob/Joaquín PT-29 → 29h00 exactas (L–V 09:00–15:33, colación 45); Jane FT-45 → 45h00 exactas (6 días 09:00–17:15, colación 45). Joaquín nunca después de las 19h L-V.

### i18n / UI

- `src/i18n.js`: diccionario ES/EN propio, `t()`, `useLang()`, `setLang()` persiste en localStorage (default `es`)
- Botón ES/EN en el header de App
- Skills se seleccionan con checkboxes (`SkillCheckboxes.jsx`) — el multi-select bugueaba
- Fechas/días localizados vía `locale()` → `es-CL` | `en-US`

## 3. Cómo correr

```bash
# Backend  (JDK 17 + Maven instalados sin root en ~/.local/opt; ya en ~/.bashrc)
cd /mnt/c/Users/soulm/Desktop/horarios-backend && mvn spring-boot:run

# Frontend
cd /mnt/c/Users/soulm/Desktop/horarios && npm run dev   # http://localhost:5173
```

## 4. Estado / Pendientes

- [x] CRUD empleados, turnos y disponibilidad (front+back)
- [x] Generador semanal básico determinista (sin IA, sin repetir asignaciones)
- [x] package.json + vite.config.js + Tailwind funcionando (build OK)
- [x] JDK 17 + Maven instalados en `~/.local/opt` (Temurin 17.0.20 + Maven 3.9.9)
- [x] Backend compilado y verificado end-to-end (`ddl-auto=update` en application.properties)
- [ ] Migrar fetch del frontend al proxy `/api` (quitar CORS/URL absoluta)
- [x] Turnos que cruzan medianoche — corregido y verificado (regla de dos tramos en `ScheduleGenerationService`)
- [x] Campo `requiredStaff` por turno + distribución equitativa por carga semanal
- [x] Contratos: `weeklyHours` por empleado y `contractHours` por jornada (matching estricto)
- [x] Skills/categorías (M2M empleado-skill, jornada exige skills; CRUD en tab Skills)
- [x] Anti-repetición semanal (rotación: penaliza el mismo turno del mismo día la semana pasada)
- [x] Export a Excel (.xlsx con hojas Horario + Detalle, lib `xlsx`) — botón "Export to Excel"
- [x] Resumen visual de horas asignadas vs contrato por empleado (badges)
- [ ] Migrar fetch del frontend al proxy `/api` (quitar CORS/URL absoluta)
- [ ] Al borrar un Skill que está en uso: hoy deja FK huérfana lógica (no se limpia de employees/shifts)
- [ ] UI para ver cuántas jornadas quedan cubiertas/faltantes por skill (cobertura)
