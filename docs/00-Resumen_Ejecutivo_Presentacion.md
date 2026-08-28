# Resumen Ejecutivo para Presentación al Jefe de Carrera
## Sistema Horarios — Validación de Práctica Profesional

**Fecha:** Agosto 2025  
**Desarrollador:** [Estudiante — Analista Programador Duoc UC]  
**Evaluador:** [Jefe de Carrera — Duoc UC]  

---

## 1. Visión General en una Visión

El proyecto **Sistema Horarios** es una aplicación de escritorio diseñada para automatizar la gestión y asignación de jornadas laborales en pequeñas y medianas sucursales de comercios y servicios. Reemplaza la planificación manual mediante planillas de cálculo por un sistema especializado que optimiza la distribución del personal atendiendo restricciones contractuales, disponibilidades y demanda de cobertura.

El proyecto está valorado para la validación de la **Práctica Laboral** de la carrera **Analista Programador** en **Duoc UC**, ejecutándose bajo metodología **Waterfall** en un plazo de **4 meses** por un único desarrollador.

**Status técnico:** El núcleo del sistema ya está parcialmente implementado (CRUDs empleados/disponibilidad/turnos/skills + motor básico determinista de generación semanal). El restante 40-50% del trabajo corresponde a funcionalidades críticas para la evaluación final: flujo Maker-Checker, auditoría, notificaciones por correo con archivos .ics y empaquetado Desktop.

---

## 2. El Problema que Resolvemos

### Contexto actual

Las pequeñas y medianas sucursales aún elaboran horarios manualmente mediante planillas de cálculo (Excel, Google Sheets) u otros métodos no especializados. Esto genera sistemáticamente:

- ❌ **Falta de cobertura:** franjas horarias con personal insuficiente.
- ❌ **Sobreasignación:** más trabajadores de los necesarios en ciertos turnos.
- ❌ **Ineficiencia:** distribución desigual de jornadas entre la semana.
- ❌ **Incumplimiento de restricciones:** jornadas excesivas, descansos insuficientes.
- ❌ **Rigidez para cambios:** modificar un horario publicado requiere reconstruirlo por completo.
- ❌ **Sin trazabilidad:** no hay registro de quién modificó qué y cuándo.
- ❌ **Comunicación deficiente:** los empleados reciben sus turnos sin estructura formal.

### Nuestra solución

Un sistema especializado que automatiza la generación semanal cruzando:
1. **Demanda** (cuántos trabajadores mínimos por franja horaria y día).
2. **Disponibilidad** (cuándo cada empleado puede trabajar).
3. **Restricciones** (horas contractuales, habilidades, descansos, jornadas nocturnas).

---

## 3. El Valor del Proyecto

### Beneficios para la empresa usuaria

| Beneficio | Impacto estimado |
|-----------|------------------|
| **Ahorro de tiempo** | El encargado de sucursal deja de dedicar 8–12 horas semanales a planificar horarios manualmente. |
| **Mejora de cobertura** | El algoritmo minimiza brechas de personal, optimizando la operación diaria. |
| **Cumplimiento de normas** | Las reglas del sistema respetan horas máximas semanales y descansos mínimos configurables. |
| **Agilidad operativa** | Modificaciones puntuales (un empleado enfermo, cambio de turno) se gestionan sin rehacer todo el horario. |
| **Trazabilidad formal** | Todo cambio queda registrado con usuario, fecha y motivo; esencial para auditoría interna. |
| **Comunicación efectiva** | Notificaciones automáticas por correo con archivos .ics que los empleados importan a sus calendarios personales. |

### Valor académico

- Demuestra **competencia en ingeniería de software completa**: análisis → diseño → implementación → pruebas → entrega.
- Cumple con **todos los requisitos técnicos y gestionales** exigidos por Duoc UC para la práctica profesional.
- Aplica buenas prácticas del **PMBOK®** adaptadas al contexto académico: EDT, cronograma, riesgos, trazabilidad, control de cambios.
- Genera una **documentación profesional** proporcional al tamaño del proyecto (no burocrática, sí útil).

---

## 4. Alcance: Qué Incluye y Qué No

### ✅ Dentro del alcance (incluido en la entrega)

1. **Gestión completa de empleados** (registro, edición, eliminación con validaciones).
2. **Configuración de demanda** por franjas horarias × días de la semana.
3. **Gestión de disponibilidad** por empleado/día/horario (incluye cruce de medianoche).
4. **Motor de generación automática** de horarios semanal (el núcleo del sistema).
5. **Flujo de aprobación** Maker-Checker (borrador → revisión → aprobado).
6. **Modificaciones quirúrgicas** sobre turnos individuales post-aprobación.
7. **Sugerencia de reemplazos** ante ausencias (lista de candidatos ordenados).
8. **Auditoría** de todas las modificaciones (quién, cuándo, qué, por qué).
9. **Notificaciones por correo** con detalles de turno y archivo .ics adjunto.
10. **Exportaciones** a .xlsx, .csv y .ics (formato calendario).
11. **Aplicación empaquetada** como instalación Windows (.exe).
12. **Persistencia local** con base de datos H2 embebida.
13. **Autenticación y roles** (gerente/aprobador / empleado).

### ❌ Fuera del alcance (excluido explícitamente)

1. Cálculo de remuneraciones o liquidaciones de sueldo.
2. Pago efectivo de sueldos al personal.
3. Aplicación móvil (solo desktop).
4. Infraestructura cloud o servidores externos.
5. Control biométrico de asistencia.
6. Gestión financiera contable.
7. Sistema completo de RR.HH. (solo horarios).

---

## 5. Marco Técnico y Metodológico

| Aspecto | Detalle |
|---------|---------|
| **Metodología** | Waterfall / Cascada (4 fases secuenciales con revisiones entre ellas). Adecuado para alcance definido y 1 desarrollador. |
| **Duración** | 16 semanas efectivas de trabajo (4 meses calendario). |
| **Stack tecnológico** | **Backend:** Spring Boot 3.2 + Java 17 + Spring Data JPA + H2 embebido.<br>**Frontend:** React 19 + Vite 8 + Tailwind CSS.<br>**Empaquetado:** Por decidir (Electron vs Tauri) — decisión técnica en Semana 5. |
| **Arquitectura** | Cliente-servidor local. Backend REST API (localhost:8080) + Frontend (localhost:5173) con proxy Vite. Ambos empaquetados juntos como aplicación nativa. |
| **Base de datos** | H2 archivo local (`schedulerdb`). Sin dependencia de servidores externos. |
| **Despliegue** | Único: instalación sobre el equipo del gerente de sucursal o del propio desarrollador para efectos de evaluación. |

---

## 6. Principales Riesgos (con mitigación)

| Riesgo | Probabilidad | Impacto | Mitigación principal |
|--------|-------------|---------|---------------------|
| Complejidad del algoritmo > estimado | Media | Alta | Diseño detallado en Fase 3 (A-08); prototipar motor en primeras 2 semanas de desarrollo. |
| No poder satisfacer demanda con restricciones | Media | Media | Estrategia de degradación: reportar brechas por franja en lugar de fallar total. |
| Retraso por depender de un único desarrollador | Alta | Alta | Buffer cronograma interno (≈15%); priorizar siempre el motor primero; documentación continua. |
| Cambios de alcance no controlados | Alta | Media | Control de cambios formal desde S1: toda idea nueva → registro → evaluación → aprobar/rechazar. |
| Empaquetado Desktop causa bloqueos | Media | Media | Decisión y prototipo en Semana 5; alternativa de distribución con scripts si falla. |
| SMTP bloqueado por políticas externas | Media | Media | Probar servicio al implementar notificaciones; alternativa demo con Mailhog. |

---

## 7. Criterios de Éxito para la Evaluación

El proyecto se considerará exitoso si se cumplen **8 de los 9** siguientes criterios:

1. ✅ El motor genera horarios válidos (cumple restricciones configuradas al ≥ 90% en pruebas).
2. ✅ La aplicación funciona como escritorio independiente sin servidor remoto.
3. ✅ El flujo Maker-Checker opera correctamente (estados: borrador → aprobado/rechazado).
4. ✅ Las notificaciones por correo llegan correctamente (o al menos están operativas en entorno demo con servidor de prueba).
5. ✅ Los archivos .ics generados importan correctamente en Google Calendar o Apple Calendar.
6. ✅ La aplicación compila y ejecuta sin crash críticos al abrirla.
7. ✅ La trazabilidad requisito → implementación → prueba está documentada en matriz completa.
8. ✅ No existen defectos P0/P1 (críticos) sin resolver al cierre.
9. ✅ El evaluador/jefe de carrera aprueba la documentación y la demostración en vivo.

---

## 8. ¿Qué Pedimos al Evaluador?

1. **Validar el alcance** tal como está definido: ¿coincide con sus expectativas para la práctica profesional? ¿Falta algún elemento crítico que justifique ampliación del alcance?
2. **Confirmar la rubrica de evaluación** oficial de Duoc UC para la práctica laboral, para asegurar que cubrimos todos los competencias esperadas.
3. **Disponer de 1 hora** para la sesión de aceptación final (Sesión A-32, Semana 16): demostración en vivo + entrega de documentos.
4. **Disponibilidad para revisiones quincenales** (15 minutos cada una, S1, S3, S5, S8, S11, S14) para validar avances y tomar decisiones.

---

## 9. Conclusión

El proyecto **Sistema Horarios** es **viable y oportuno**. Ofrece una solución real a un problema operativo documentado en PMEs, aprovecha un stack tecnológico maduro y apropiado, y está estructurado bajo una metodología y documentación acorde a los requerimientos académicos de Duoc UC para la validación de la Práctica Profesional.

La inversión de tiempo (≈25–30 h/semana durante 16 semanas) está justificada por:
- El valor real que entrega al usuario final (horas de planificación recuperadas).
- La cobertura completa de competencias para el título de Analista Programador.
- La generación de documentación profesional que demuestra dominio del ciclo completo de desarrollo de software.

**Solicitud:** Aprobar la documentación presentada y autorizar el inicio formal del proyecto (Fase 1: Inicio), comprometiendo el seguimiento quincenal y la sesión de aceptación final en Semana 16.

---

*Fin del Resumen Ejecutivo — documento confidencial para evaluación académica*