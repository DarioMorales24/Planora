## Proyecto Horarios – Resumen Técnico

### Contexto
El proyecto **Horarios** es una solución **Full‑Stack** que permite a un restaurante/empresa de servicios gestionar empleados, jornadas, disponibilidad y generar automáticamente un calendario semanal de turnos. El backend está implementado con **Spring Boot 3.2**, **JPA/Hibernate** y una base de datos **H2** embebida. El frontend utiliza **React 19** con **Vite 8** y **Tailwind CSS**.

### Arquitectura

| Capas | Tecnologías | Propósito |
|-------|------------|-----------|
| **Backend** | Spring Boot, Spring Data JPA, H2 | Persistencia y lógica de negocio, REST API |
| **Servicio de Cálculo de Horarios** | `ScheduleGenerationService` | Genera la semana de turnos intentando cerrar exactamente las horas contractuales de cada empleado. | 
| **Controles REST** | `EmployeeController`, `ShiftController`, `AvailabilityController`, `SkillController`, `ScheduleController` | CRUD de entidades y orquestación del generador. | 
| **Frontend** | React 19 + Vite + Tailwind | Interfaz de usuario, consumo de la API, generación de Excel con xlsx. | 
| **Configuración** | `application.properties`, `CorsConfig` | CORS global, logging, H2 console, JWT placeholder. | 

### Flujo de Generación de Horario
1. El usuario selecciona la **fecha de inicio** (lunes). <br>2. El cliente envía `POST /api/schedule/generate?startDate=YYYY‑MM‑DD`. <br>3. `ScheduleController` valida la fecha y delega a `ScheduleGenerationService`. <br>4. El servicio divide los empleados en:
   - *Con contrato* (employee.getWeeklyHours() != null) → fase **A**: busca jornadas que cierran exactamente el contrato. <br>   - *Legacy* (sin horas contractuales) → fase **B**: asigna turnos por disponibilidad y requerimientos de habilidades. <br>5. Se guarda la lista de `ScheduledShift` y se devuelve al cliente. <br>
6. El cliente muestra la tabla semanal y permite exportar a **Excel**. <br>

### Mejoras Implementadas
| Área | Cambio | Impacto |
|------|--------|----------|
| **Back‑end** | Eliminado filtro de `breakMinutes != null` y añadido log cuando no existen jornadas válidas. | Asegura que los empleados contractuales se evalúan correctamente. |
| | DataLoader re‑escrito con 3 empleados y 3 turnos que concuerdan con los requisitos de horas. | Permite que la demo produzca datos de salida realistas. |
| | `ScheduleGenerationService` verifica la propiedad `startDate` sea lunes y devuelve mensajes de error detallados. | Mejora la experiencia a usuarios. |
| | CORS centralizado (`CorsConfig`) con `allowed-origins` configurables. | Evita duplicación y permite uso en producción. |
| | `AvailabilityController` devuelve códigos HTTP 400/404 y evita NPE. | API más robusta. |
| | Se añaden logs a los controladores y se valida entrada en `EmployeeController`, `ShiftController`, `SkillController`. | Seguridad y mantenibilidad. |
| | Eliminado método innecesario `generatedGuard` y se respetan habilidades en la fase B. | Código más limpio y funcional. |
| | Se redujo el nivel de logging de `DEBUG` a `INFO`. | Menor ruido en logs producción. |
| **Front‑end** | Todas las peticiones cambian de `http://localhost:8080/...` a `/api/...` y se aplica CORS global. | Entorno de despliegue real sin hardcoding. |
| | Los formularios de disponibilidad envían `employee:{id}` como objeto, coincidiendo con la clase `Availability`. | Evita errores de mapeo y 500. |
| | `ScheduleComponent` guarda la fecha cargada (`loadedStartDate`) y la usa para exportar a Excel y al renderizado. | Evita exportaciones inconsistente. |
| | Se corrige el cálculo del lunes por defecto usando la hora local y se agrega el día de semana en el encabezado. | Evita el bug de medianoche. |
| | Se truncan segundos `HH:mm:ss` a `HH:mm` en la ventana de edición. | Evita inconsistencias con el backend que devuelve los segundos. |
| | Se usa `locale()` en los formatos de fecha/hora, con soporte para `es-CL` y `en-US`. | Interfaz internacionalizadora completa. |
| | Se añaden mensajes de error claros y se limpian los errores anteriores al intentar nuevas operaciones. | Mejora la experiencia del usuario. |

### Cómo ejecutar la aplicación (en desarrollo)
```bash
# Backend
cd /mnt/c/Users/soulm/Desktop/horarios-backend
./mvnw spring-boot:run

# Frontend
cd /mnt/c/Users/soulm/Desktop/horarios
npm ci
npm run dev
```

El backend se expone en `http://localhost:8080` y el frontend en `http://localhost:5173`. El Vite proxy garantiza que todas las peticiones `/api/**` sean redirigidas correctamente a Spring Boot.

### Próximos pasos recomendados
1. Añadir **JWT** real y seguridad a los endpoints. <br>2. Implementar **tests unitarios** y **de integración** en el backend. <br>3. Mejorar la **validación** de los DTOs con `@Valid` y `spring‑boot‑starter‑validation`. <br>4. Desplegar la aplicación en un contenedor Docker o una plataforma Cloud. <br>5. Añadir **chart** de visualizaciones de horas y carga de empleados.

---

> Esta documentación resume los principales temas y mejoras que se han hecho en la base de código del proyecto de horarios. Si necesitas más detalles técnicos, consulta los archivos fuente correspondientes.
