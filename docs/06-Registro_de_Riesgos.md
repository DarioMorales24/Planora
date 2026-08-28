# Registro de Riesgos — Sistema Horarios (HOR-2025-01)

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Responsable del registro:** Desarrollador / PM  
**Método:** Probabilidad × Impacto (escala Baja/Media/Alta) → Nivel  

---

## 1. Escala de Evaluación

| Valor | Probabilidad | Impacto |
|-------|-------------|---------|
| **Baja** | < 30% probable | Retraso < 3 días / defecto menor |
| **Media** | 30–60% probable | Retraso 3 días – 1 semana / funcionalidad degradada |
| **Alta** | > 60% probable | Retraso > 1 semana / entregable comprometido |

**Nivel = función(P × I):** Alto si alguno es Alto y el otro ≥ Media; Bajo si ambos Bajos; Medio en el resto de combinaciones.

---

## 2. Registro de Riesgos

| ID | Riesgo | Causa | Evento | Consecuencia | P | I | Nivel | Estrategia | Acción de mitigación | Responsable | Estado |
|----|--------|-------|--------|--------------|---|---|-------|-----------|---------------------|-------------|--------|
| R-01 | El algoritmo de generación resulta más complejo de lo estimado | Lógico-combinatorial: cruce simultáneo de demanda, disponibilidad, horas, trasnoche | A-13 excede 10 días planificados | Desplazamiento de todo el cronograma desde S8 | Media | Alta | **ALTO** | Mitigar | Diseño detallado previo (A-08); prototipar algoritmo en primeas 2 semanas de desarrollo; definir alcance mínimo del motor primero, optimizaciones después | Desarrollador | Abierto |
| R-02 | Demanda insatisfacible genera resultados confusos para el usuario | Configuración inconsistente (p. ej., pedir 6 trabajadores en franja donde solo hay 3 disponibles) | El motor devuelve horarios incompletos sin explicación | Pérdida de confianza del usuario; defectos reportados como errores | Media | Media | **Medio** | Mitigar | Estrategia de degradación explícita: reportar brechas por franja con lista de empleados faltantes (diseño A-08); test de escenarios en A-26 | Desarrollador | Abierto |
| R-03 | Jornadas que cruzan medianoche mal manejadas | Representación de fechas/horas sin day+1 consistente (bug histórico ya corregido una vez: ver PROJECT_MAP.md) | Turnos trasnoche asignados a día incorrecto o descansos mal calculados | Horarios inválidos | Media | Alta | **ALTO** | Eliminar | Suite de tests dedicada a trasnoche (1.7.4, escenario 3); validar modelo de fecha=shift-date con horario-envolvente | Desarrollador | Mitigado parcialmente (bug anterior corregido; tests pendientes) |
| R-04 | Retraso por enfermedad/impedimento del único desarrollador | Single point of failure humano | 1+ semana de inactividad | Desplazamiento directo 1:1 del cronograma | Media | Alta | **ALTO** | Aceptar + Contingencia | Mantener buffer de 1 semana interna (A-27 absorbe); priorizar siempre el camino crítico (motor) primero; documentar estado del trabajo continuamente (facilita retomar) | Desarrollador | Abierto (riesgo inherente, no eliminable) |
| R-05 | Cambio de alcance durante el desarrollo ("feature creep") | Ideas nuevas del desarrollador o sugerencias del evaluador a mitad de camino | Funcionalidades extra se implementan sin planificación | Retraso cronograma; deuda técnica | Alta | Media | **ALTO** | Eliminar | Control de cambios formal desde S1: toda idea nueva se registra y evalúa; modo default = "rechazar para V1, anotar para futuro"; el Acta y SRS ya listan alcance explícito | Desarrollador + Evaluador | Abierto |
| R-06 | Empaquetado Desktop (Electron/Tauri) presenta dificultades | Backend Java dentro de proceso desktop no es patron estándar | Instalador no funciona o requiere configuración manual | Entregable E-11 comprometido | Media | Media | **Medio** | Mitigar | Decisión y prototipo temprano (A-10, semana 5, no al final); plan B: distribución como 2 scripts (start-backend + start-front) documentados en manual (degrada UX pero entregable) | Desarrollador | Abierto |
| R-07 | Envío de correos bloqueado por políticas SMTP de Google (requiere App Passwords / OAuth2) | Dependencia de servicio externo cambiante | Los correos fallan al enviar | RF-013 sin demostrar | Media | Media | **Medio** | Mitigar | Probar SMTP en cuanto se implemente A-17; alternativa: Mailtrap/Mailhog en demo + configuración documentada para producción | Desarrollador | Abierto |
| R-08 | Pérdida/corrupción de datos H2 en archivo local | Archivo único de BD; sin backups automáticos | Usuario pierde empleados/horarios | Daño reputacional; datos de prueba perdidos durante pruebas | Baja | Alta | **Medio** | Mitigar | Función simple de exportación/respaldos manuales (ya existen exportaciones .xlsx/.csv como respaldo de lectura); documentar respaldo de carpeta ./data en manual técnico | Desarrollador | Abierto |
| R-09 | Dependencia de librerías con vulnerabilidades o APIs cambiantes (React 19, Vite 8 versiones recientes) | Stack nuevo/bleeding-edge | Build rompe tras actualización | Pérdida de 1-2 días en depuración | Media | Baja | **Bajo** | Mitigar | Fijar versiones exactas en package.json/pom.xml; no actualizar a mitad de proyecto | Desarrollador | Abierto |
| R-10 | Normativa laboral chilena aplicada de forma incompleta o errónea en restricciones | Reglas legales complejas (descansos, horas máximas por jornada) | El sistema genera horarios ilegales | Deficiencia evaluación académica + riesgo en uso real | Media | Media | **Medio** | Mitigar | Resolver DP-03 en Fase 2: fijar conjunto explícito y acotado de reglas (ej: máx 45h semanales, descanso mínimo 12h) parametrizables, no hardcodear "la ley completa" | Desarrollador | Abierto |
| R-11 | Instalador Windows firmado genera alertas SmartScreen | Binario sin firma de código | Usuario ve advertencia "Windows protegió su PC" | Fricción en entrega/demo | Alta | Baja | **Bajo** | Aceptar | Documentar el paso "Más información → Ejecutar de todos modos" en manual; firma de código tiene costo, fuera de presupuesto | Desarrollador | Aceptado |
| R-12 | Rúbrica de evaluación Duoc UC exige elementos no contemplados | Falta de rúbrica formal (IF-04) | Evaluador pide documento adicional inesperado | Trabajo extra no planificado en últimas semanas | Baja | Media | **Medio** | Eliminar | Acción inmediata: solicitar rúbrica oficial ANTES de cerrar Fase 2 (DP-04) | Desarrollador | Abierto |

---

## 3. Matriz Probabilidad × Impacto

```
                    IMPACTO
                 Baja      Media      Alta
              ┌─────────┬─────────┬─────────┐
   P  Alta    │  R-11   │  R-05   │  (—)    │
   R          ├─────────┼─────────┼─────────┤
   O  Media   │  R-09   │ R-02,06,│ R-01,03 │
   B          │         │ 07,10   │  04     │
   A          ├─────────┼─────────┼─────────┤
      Baja    │  (—)    │  R-12   │  R-08   │
              └─────────┴─────────┴─────────┘

Prioridad de atención: R-01, R-03, R-04, R-05 (alto) → mitigación activa
                       R-02, R-06, R-07, R-08, R-10, R-12 (medio) → monitoreo
                       R-09, R-11 (bajo) → aceptado/monitoreo mínimo
```

---

## 4. Riesgos por Categoría

| Categoría | Riesgos | % del total |
|-----------|---------|-------------|
| Técnicos (algoritmo, trasnoche, empaquetado, SMTP) | R-01, R-02, R-03, R-06, R-07 | 42% |
| De gestión (alcance, recurso único, rúbrica) | R-04, R-05, R-12 | 25% |
| De datos (pérdida, normativa) | R-08, R-10 | 17% |
| Operativos/externos (librerías, firma binarios) | R-09, R-11 | 17% |

---

## 5. Seguimiento del Registro

- **Revisión:** quincenal, junto al control de cronograma.
- **Actualización:** nuevos riesgos se agregan con ID consecutivo; riesgos cerrados se marcan "Cerrado" con fecha y nota.
- **Escalamiento:** todo riesgo que se materialice como retraso > 1 semana se comunica al jefe de carrera en la siguiente revisión (o de inmediato si ocurre en S13+).

---

## 6. Relación Riesgo ↔ Cronograma

| Riesgo | Actividad(s) afectada(s) | Contingencia en plan |
|--------|--------------------------|---------------------|
| R-01 | A-13 | Diseño previo A-08; buffer A-27 |
| R-03 | A-13, A-26 | Tests dedicados 1.7.4 |
| R-04 | Todas | Buffer A-27; documentación continua |
| R-05 | A-11–A-22 | Control de cambios (documento aparte en Plan de Dirección) |
| R-06 | A-28 | Prototipo temprano A-10; plan B de scripts |
| R-12 | A-05 | Solicitud de rúbrica antes de fin S3 |
