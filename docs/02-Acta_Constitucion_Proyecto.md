# Acta de Constitución del Proyecto — Sistema Horarios

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Código del proyecto:** HOR-2025-01  
**Estado:** Borrador para aprobación  

---

## 1. Identificación del Proyecto

| Campo | Detalle |
|-------|---------|
| **Nombre del proyecto** | Sistema Horarios — Gestor de Jornadas Laborales Automatizado |
| **Código** | HOR-2025-01 |
| **Institución** | Duoc UC — Carrera Analista Programador |
| **Tipo de proyecto** | Desarrollo de software — Práctica Profesional |
| **Duración estimada** | 4 meses |
| **Metodología** | Waterfall (Cascada) |
| **Alcance** | Aplicación de escritorio Local-First para PMEs |

---

## 2. Propósito del Proyecto

Automatizar el proceso de planificación y asignación de jornadas laborales en pequeñas y medianas sucursales de comercios y servicios, reemplazando la elaboración manual de horarios mediante planillas de cálculo u otros métodos no especializados por un sistema especializado que considere restricciones laborales, disponibilidad de empleados y demanda de cobertura de personal.

---

## 3. Justificación

### Problema actual

La planificación manual de horarios genera sistemáticamente problemas operativos:

- **Falta de cobertura:** franjas horarias sin suficiente personal.
- **Sobreasignación:** exceso de trabajadores en ciertos turnos con recursos ociosos en otros.
- **Ineficiencia:** horas laborales mal distribuidas entre los días de la semana.
- **Violación de restricciones laborales:** jornadas excesivas, descansos insuficientes.
- **Dificultad de modificación:** cambios posteriores a la publicación requieren reconstruir todo el horario.
- **Ausencia de trazabilidad:** no existe registro formal de quién modificó qué y cuándo.
- **Comunicación deficiente:** los empleados reciben horarios sin confirmación estructurada (correos, archivos de calendario).

### Solución propuesta

Un sistema especializado que automatice la generación de horarios a partir de un análisis de la demanda, las disponibilidades de cada trabajador y las restricciones contractuales, con mecanismos de aprobación, gestión de excepciones y notificaciones automáticas.

### Beneficios esperados

| Beneficio | Descripción |
|-----------|-------------|
| Reducción de tiempo | La generación automática sustituye horas de trabajo manual del encargado de sucursal. |
| Mejora de cobertura | El algoritmo cruza demanda con disponibilidad para minimizar brechas. |
| Cumplimiento normativo | Las reglas del motor respetan restricciones legales y contractuales configuradas. |
| Agilidad operativa | Modificaciones quirúrgicas sobre turnos específicos sin reconstruir el horario completo. |
| Trazabilidad completa | Registro detallado de todas las modificaciones realizadas. |
| Comunicación efectiva | Notificaciones automáticas por correo con archivos de calendario (.ics). |

---

## 4. Objetivos del Proyecto

### Objetivo general

Desarrollar e implementar un sistema de gestión y asignación automatizada de jornadas laborales que permita a pequeñas y medianas sucursales planificar, aprobar y gestionar turnos de trabajo de manera eficiente, cumpliendo con restricciones contractuales y legales, como parte de los requisitos de validación de la Práctica Profesional de la carrera Analista Programador en Duoc UC.

### Objetivos específicos

| # | Objetivo específico | Tipo |
|---|---------------------|------|
| OE-01 | Implementar CRUD completo de empleados con información contractual (horas semanales, departamentos, habilidades) | Funcional |
| OE-02 | Desarrollar módulo de configuración de demanda de personal por franjas horarias y días de la semana | Funcional |
| OE-03 | Gestionar disponibilidad de cada empleado por día de la semana | Funcional |
| OE-04 | Diseñar e implementar un motor algorítmico de generación automática de horarios semanal | Técnico/Crítico |
| OE-05 | Implementar flujo de aprobación Maker-Checker (borrador → revisión → aprobado) | Funcional |
| OE-06 | Permitir modificaciones quirúrgicas sobre turnos individuales con sugerencias de reemplazo | Funcional |
| OE-07 | Registrar auditoría de todas las modificaciones realizadas | Funcional |
| OE-08 | Enviar notificaciones por correo electrónico con detalles de turno y archivos .ics de calendario | Funcional |
| OE-09 | Habilitar exportación de datos a formatos .xlsx y .csv | Funcional |
| OE-10 | Empaquetar la solución como aplicación de escritorio instalable | Técnico |
| OE-11 | Documentar el sistema完整mente (técnica y funcionalmente) para entrega académica | Académico |

---

## 5. Descripción de Alto Nivel

El sistema **Horarios** es una aplicación de escritorio basada en arquitectura cliente-servidor local, donde un backend REST API (Spring Boot + H2 embebido) proporciona los servicios de negocio y persistencia, y un frontend React renderiza la interfaz de usuario consumiendo dicha API. La aplicación funciona completamente en el equipo local del usuario, sin requerir conexión a Internet ni base de datos externa.

El componente central es el motor de generación de horarios, que procesa la demanda de cobertura, las disponibilidades de cada empleado y un conjunto de restricciones para producir una asignación semanal óptima de turnos. Los horarios generados pasan por un flujo de aprobación antes de ser publicados, momento en el cual los empleados son notificados automáticamente.

### Arquitectura técnica resumida

```
┌─────────────────────────────────┐
│     Frontend (React 19)         │
│     Vite 8 · Tailwind CSS       │
│     Puerto: localhost:5173      │
└──────────────┬──────────────────┘
               │ HTTP /api/*
               ▼
┌─────────────────────────────────┐
│     Backend (Spring Boot 3.2)   │
│     Java 17 · Spring Data JPA   │
│     Puerto: localhost:8080      │
└──────────────┬──────────────────┘
               │ JDBC
               ▼
┌─────────────────────────────────┐
│   Base de datos H2 embebida     │
│   Archivo local: schedulerdb    │
└─────────────────────────────────┘
```

---

## 6. Alcance Preliminar

### Dentro del alcance

| # | Elemento | Descripción |
|---|----------|-------------|
| 1 | Gestión de empleados | Registro, edición y eliminación de empleados con información contractual |
| 2 | Configuración de demanda | Definición de cantidad mínima de trabajadores por franja horaria y día |
| 3 | Gestión de disponibilidad | Definir días y horarios en que cada empleado puede trabajar |
| 4 | Motor de generación | Algoritmo automático que produce horario semanal óptimo |
| 5 | Gestión de turnos | Visualización y edición de turnos asignados |
| 6 | Flujo Maker-Checker | Estados: borrador → revisión → aprobado |
| 7 | Modificaciones quirúrgicas | Cambiar turno individual sin reconstruir el horario |
| 8 | Sugerencia de reemplazos | Recomendaciones de empleados disponibles para cubrir ausencias |
| 9 | Auditoría | Registro de modificaciones con usuario, fecha y motivo |
| 10 | Notificaciones por correo | Envío automático al publicar o modificar turnos |
| 11 | Exportación .ics | Archivos de calendario compatibles con Google/Apple Calendar |
| 12 | Exportación .xlsx | Datos en formato Excel |
| 13 | Exportación .csv | Datos en formato CSV |
| 14 | Empaquetado Desktop | Generación de instalador como aplicación de escritorio |
| 15 | Persistencia local | Datos almacenados en H2 embebido |
| 16 | Instalador | Programa de instalación para Windows |

### Fuera del alcance

| # | Elemento | Motivo de exclusión |
|---|----------|---------------------|
| 1 | Cálculo de remuneraciones | No es un sistema de nómina |
| 2 | Liquidaciones de sueldo | Fuera del scope acotado a gestión de horarios |
| 3 | Pago de remuneraciones | Funcionalidad financiera excluida explícitamente |
| 4 | Aplicación móvil | Se prioriza versión desktop; móvil puede ser futura mejora |
| 5 | Infraestructura cloud | Enfoque Local-First intencional |
| 6 | Sistema completo de RR.HH. | Alcance insuficiente para abarcar suite completa |
| 7 | Control biométrico de asistencia | Hardware externo no incluido |
| 8 | Gestión financiera contable | No corresponde al dominio del producto |

---

## 7. Entregables Principales

| ID | Entregable | Fase | Descripción |
|----|-----------|------|-------------|
| E-01 | Documento de solicitud y justificación del proyecto | Inicio | Este acta |
| E-02 | Especificación de Requisitos (SRS) | Planificación | Documento completo de requisitos funcionales y no funcionales |
| E-03 | EDT y Diccionario EDT | Planificación | Estructura de desglose de trabajo detallada |
| E-04 | Cronograma con hitos | Planificación | Diagrama/timeline estimado del proyecto |
| E-05 | Diseño de arquitectura y modelo de datos | Diseño | Diagramas arquitectónicos, DER |
| E-06 | Wireframes / Mockups de interfaz | Diseño | Representaciones visuales de pantallas clave |
| E-07 | Código fuente completo del sistema | Desarrollo | Backend + Frontend con documentación inline |
| E-08 | Plan de pruebas y casos de prueba | Pruebas | Estrategia, casos diseñados, evidencias |
| E-09 | Informe de pruebas | Pruebas | Resultados de ejecución de pruebas |
| E-10 | Matriz de trazabilidad | Pruebas | Relación requisito → prueba |
| E-11 | Aplicación empaquetada (.exe para Windows) | Implementación | Instalador listo para distribución |
| E-12 | Manual de usuario | Cierre | Instrucciones de uso del sistema |
| E-13 | Manual técnico | Cierre | Documentación para mantenimiento |
| E-14 | Informe final del proyecto | Cierre | Resumen ejecutivo, lecciones aprendidas, evidencias |

---

## 8. Hitos Estimados

| ID | Hito | Entregable asociado | Duración estimada |
|----|------|--------------------|-------------------|
| H-01 | Acta de constitución aprobada | E-01 | Semana 0 |
| H-02 | Especificación de requisitos completada | E-02 | Semana 4 |
| H-03 | Planificación completa (EDT + Cronograma) | E-03, E-04 | Semana 6 |
| H-04 | Diseño arquitectónico completado | E-05, E-06 | Semana 8 |
| H-05 | DesarrolloBackend completado | E-07 (parcial) | Semana 12 |
| H-06 | Desarrollo Frontend completado | E-07 (parcial) | Semana 14 |
| H-07 | Motor de generación implementado | E-07 (núcleo) | Semana 14 |
| H-08 | Integración Backend-Frontend completa | E-07 | Semana 15 |
| H-09 | Desarrollo completo finalizado | E-07 | Semana 16 |
| H-10 | Pruebas completadas | E-08, E-09, E-10 | Semana 18 |
| H-11 | Empaquetado Desktop realizado | E-11 | Semana 19 |
| H-12 | Documentación final completada | E-12, E-13, E-14 | Semana 20 |
| H-13 | Entrega final al evaluador | Todo | Semana 16-17 |

**Nota:** Los hitos están numerados por semanas relativas. Las fechas absolutas dependen de la fecha de inicio acordada con el jefe de carrera.

---

## 9. Presupuesto Preliminar

| Concepto | Costo estimado | Observación |
|----------|---------------|-------------|
| Herramientas de desarrollo | $0 | Todas open-source (VS Code, Git, JDK, Maven, Node.js, etc.) |
| Licencias de software | $0 | Stack 100% open-source/gratuito |
| Hosting / servidores | $0 | Aplicación local sin infraestructura en nube |
| Base de datos | $0 | H2 embebida sin licencia |
| Servicio de correo | $0-$5/mes | SMTP gratuito (Gmail/Mailgun) o costo mínimo |
| Dominio web | $0 | No aplica (aplicación de escritorio local) |
| Certificados digitales | $0 | No aplica para app de escritorio local |
| Hardware | $0 | Se usa equipo existente del desarrollador |
| Tiempo de desarrollo | No monetizable | Recurso único sin costo directo cuantificable |

### Conclusión presupuestaria

El proyecto no requiere inversión económica significativa. Todos los componentes del stack tecnológico son gratuitos y open-source. El principal "costo" es el tiempo dedicado por el desarrollador, que no se considera desembolso financiero. Para fines académicos, se clasifica este proyecto como **"Costo insignificante"** o **"Prácticamente cero costo"**.

---

## 10. Riesgos Iniciales

| ID | Riesgo | Probabilidad | Impacto | Nivel | Estrategia inicial |
|----|--------|-------------|---------|-------|-------------------|
| R-01 | Complejidad del algoritmo mayor a lo estimado | Media | Alto | Alto | Prototipar algoritmo temprano; mantener alcance mínimo viable |
| R-02 | Imposibilidad de satisfacer demanda completa | Baja | Medio | Medio | Diseñar estrategia de fallo graceful degradation |
| R-03 | Retrasos por depender de un único recurso | Alta | Alto | Alto | Buffer de tiempo en cronograma; priorizar funcionalidades críticas primero |
| R-04 | Cambios de alcance no controlados | Media | Medio | Medio | Formalizar proceso de control de cambios desde el inicio |
| R-05 | Dificultad técnica en empaquetado Desktop | Media | Bajo-Medio | Medio | Evaluar opciones pronto; tener plan B |
| R-06 | Pérdida de datos locales | Baja | Alto | Medio | Implementar backup manual; usar H2 en modo seguro |

---

## 11. Restricciones

| # | Restricción | Fuente |
|---|-------------|--------|
| CR-01 | Tecnología definida: Spring Boot 3.2 + React 19 + H2 | Especificación del proyecto |
| CR-02 | Metodología fija: Waterfall | Requerimiento académico |
| CR-03 | Duración máxima: 4 meses | Período académico de práctica |
| CR-04 | Solo 1 desarrollador | Composición del equipo |
| CR-05 | Aplicación de escritorio (no web/cloud) | Enfoque Local-First definido |
| CR-06 | Sin cálculos de remuneraciones | Exclusión explícita del alcance |
| CR-07 | Plataforma objetivo: Windows (primario) | Entorno de despliegue identificado |

---

## 12. Supuestos

| # | Supuesto | Justificación |
|---|----------|--------------|
| SA-01 | El desarrollador dispone de equipo de cómputo adecuado con JDK 17, Node.js 20+, y editor de código instalado | Conocido del entorno actual |
| SA-02 | El стек tecnológico especificado (Spring Boot + React + H2) está disponible y es compatible con el sistema operativo | Tecnologías estándar y ampliamente utilizadas |
| SA-03 | La normativa laboral chilena aplicada será genérica (no específica de sector) | No hay especificación de industria particular |
| SA-04 | El jefe de carrera estará disponible para revisiones programadas | Asumido según política institucional |
| SA-05 | Un servidor SMTP gratuito será usable para demostración (Gmail, Mailgun, etc.) | Servicios con tier gratuito disponible |
| SA-06 | La complejidad del algoritmo de generación no excederá lo razonablemente manejable en el tiempo disponible | Basado en la experiencia previa parcial del motor |
| SA-07 | No habrá restricciones institucionales contra herramientas de empaquetado Desktop open-source | Asumido según política habitual de Duoc UC |
| SA-08 | Las funcionalidades actualmente implementadas (CRUD + generador básico) servirán como base para desarrollo continuo | Evidenciado en código existente |

---

## 13. Stakeholders Principales

| ID | Stakeholder | Rol | Interés principal | Poder / Influencia |
|----|-------------|-----|-------------------|-------------------|
| S-01 | Jefe de Carrera / Evaluador Duoc UC | Patrocinador académico | Calidad técnica, cumplimiento de competencias, calidad documental | Alto (aprueba/rechaza) |
| S-02 | Desarrollador (estudiante) | PM + Analista + Desarrollador + QA | Completar proyecto exitosamente, obtener validación | Medio (ejecuta todo) |
| S-03 | Gerente de Sucursal | Usuario clave | Que el sistema resuelva sus problemas reales | Bajo-Medio (usuario final) |
| S-04 | Empleados | Usuarios finales indirectos | Recibir horarios claros y oportunamente | Bajo (afectados pasivamente) |

---

## 14. Criterios de Éxito

| # | Criterio | Cómo se mide |
|---|----------|-------------|
| CS-01 | El motor genera horarios válidos (cumple todas las restricciones configuradas) | Pruebas unitarias y funcionales del algoritmo pasan correctamente |
| CS-02 | La aplicación funciona como escritorio independiente sin necesidad de servidor remoto | Instalación exitosa y operación offline verificada |
| CS-03 | El flujo de aprobación (Maker-Checker) opera correctamente | Prueba end-to-end de estados: borrador → aprobado |
| CS-04 | Las notificaciones por correo llegan correctamente a los destinatarios | Prueba funcional con cuenta SMTP real |
| CS-05 | Los archivos .ics generados son compatibles con clientes de calendario | Prueba de apertura en Google Calendar y Apple Calendar |
| CS-06 | La aplicación compila y ejecuta sin errores críticos | Build exitoso, aplicación abre sin crash |
| CS-07 | La documentación cumple con los estándares de evaluación académica | Aprobación del jefe de carrera sobre calidad documental |
| CS-08 | La trazabilidad requisito → prueba es completa | Matriz de trazabilidad 100% cubierta |
| CS-09 | No existen defectos críticos en producción | Cero defectos P0/P1 en fase de pruebas |

---

## 15. Director / Responsable del Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | [Por definir — nombre del estudiante] |
| **Rol en el proyecto** | Project Manager · Analista · Diseñador · Desarrollador Backend · Desarrollador Frontend · QA |
| **Nivel de autoridad** | Autoridad total sobre decisiones técnicas y de implementación dentro del alcance definido |
| **Contacto** | [Por definir — email institucional Duoc UC] |

---

## 16. Aprobación

Este documento constituye la autorización formal para iniciar el proyecto **Sistema Horarios**. Su aprobación indica que los interesados principales reconocen la necesidad del proyecto, aceptan su alcance preliminar y autorizan al responsable del proyecto a dedicar recursos y tiempo a su desarrollo.

| Rol | Nombre | Firma | Fecha |
|-----|--------|-------|-------|
| **Responsable del Proyecto** | [Nombre del estudiante] | _________________ | ___/___/2025 |
| **Jefe de Carrera / Evaluador** | [Nombre del evaluador] | _________________ | ___/___/2025 |
| **Coordinador de Prácticas (si aplica)** | [Nombre] | _________________ | ___/___/2025 |

---

*Documento confidencial — Uso exclusivo académico*  
*Sistema Horarios — Acta de Constitución v1.0 — Agosto 2025*
