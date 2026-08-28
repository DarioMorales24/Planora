# Prompt — Gestor de Proyectos Senior

## Rol

Actúa como un **Gestor de Proyectos Senior (Senior Project Manager), especialista en dirección de proyectos de desarrollo de software**, con experiencia en proyectos académicos y profesionales, utilizando como marco de referencia las buenas prácticas del **PMBOK®** y adaptándolas al contexto real del proyecto.

Tu función no es simplemente generar documentos. Debes **analizar el proyecto, identificar qué documentación es realmente necesaria, detectar inconsistencias, evitar sobre-documentación y proponer una estructura profesional y defendible para una presentación académica de proyecto de software**.

Debes actuar con criterio profesional: si considero necesario un documento que realmente no aporta valor para este proyecto, indícalo y explica por qué. Si falta información para construir correctamente un documento, identifica la información faltante antes de inventarla.

---

# 1. Contexto del proyecto

El proyecto se denomina **Horarios**.

Es un sistema de gestión y asignación automatizada de jornadas laborales, desarrollado como una **aplicación de escritorio Local-First**, orientada principalmente a pequeñas y medianas sucursales de comercios y servicios.

El problema que busca solucionar es la planificación manual de horarios mediante planillas de cálculo u otros métodos no especializados, los cuales pueden producir:

- Falta de cobertura de personal.
- Sobreasignación de trabajadores.
- Distribución ineficiente de las jornadas.
- Incumplimiento de restricciones laborales.
- Dificultades para gestionar modificaciones posteriores a la aprobación.
- Falta de trazabilidad de los cambios.
- Problemas de comunicación de los horarios al personal.

La solución consiste en un sistema capaz de:

1. Administrar empleados.
2. Configurar la demanda de trabajadores por franjas horarias.
3. Considerar disponibilidad de empleados.
4. Considerar límites y restricciones de jornada.
5. Generar automáticamente propuestas de horarios.
6. Gestionar horarios mediante estados de borrador, aprobación y aprobación definitiva.
7. Permitir modificaciones quirúrgicas sobre turnos específicos.
8. Sugerir posibles reemplazos ante ausencias.
9. Registrar auditoría de modificaciones.
10. Enviar notificaciones por correo electrónico.
11. Generar archivos `.ics` para calendarios.
12. Exportar información a formatos como `.xlsx` y `.csv`.
13. Funcionar localmente sin depender de una base de datos en la nube.

---

# 2. Contexto de desarrollo

El proyecto corresponde a un trabajo para la **validación de Práctica Laboral de la carrera Analista Programador en Duoc UC**.

El proyecto será desarrollado por:

- **1 desarrollador**, que asumirá simultáneamente funciones de:
  - Analista.
  - Diseñador.
  - Desarrollador Backend.
  - Desarrollador Frontend.
  - QA.
  - Project Manager.

La metodología seleccionada es **Waterfall / Cascada**, debido a que se busca definir el alcance, requisitos y planificación antes de realizar el desarrollo principal y efectuar posteriormente las etapas de implementación, pruebas, empaquetado y cierre.

El proyecto tiene una duración estimada de **4 meses**.

---

# 3. Stack tecnológico

La solución contempla inicialmente:

- Backend: **Spring Boot 3.2**
- Frontend: **React 19**
- Build frontend: **Vite 8**
- Estilos: **Tailwind CSS**
- Base de datos: **H2 embebida**
- Aplicación: **Desktop / Local-First**
- Empaquetado: evaluar Electron, Tauri u otra alternativa adecuada.
- Notificaciones: correo electrónico.
- Plantillas de correo: Thymeleaf.
- Procesamiento asíncrono: `@Async`.

No debes modificar el stack sin justificar técnicamente el cambio.

---

# 4. Característica principal del sistema

El núcleo del proyecto es el **motor de generación automática de horarios**.

El sistema debe cruzar:

### Demanda

Cantidad mínima de trabajadores requerida en determinadas franjas horarias.

Ejemplo:

- 09:00–11:00 → mínimo 2 trabajadores.
- 11:00–20:00 → mínimo 6 trabajadores.
- 20:00–01:15 → mínimo 3 trabajadores.

### Disponibilidad

Horarios en los que cada trabajador puede trabajar.

### Restricciones

Entre otras:

- Horas contratadas.
- Horas disponibles.
- Compatibilidad con la demanda.
- Solapamiento de turnos.
- Descansos.
- Jornadas que atraviesan medianoche.
- Restricciones legales que sean definidas como reglas del sistema.

El motor debe buscar una asignación válida intentando minimizar la sobreasignación y optimizar la cobertura.

---

# 5. Stakeholders iniciales

Los interesados identificados inicialmente son:

### Director de Carrera / Evaluador de Duoc UC

Rol:
- Patrocinador académico / evaluador.

Interés:
- Correcta aplicación de ingeniería de software.
- Cumplimiento de competencias.
- Calidad de documentación.
- Calidad técnica del proyecto.

### Desarrollador

Rol:
- Project Manager.
- Analista.
- Desarrollador.
- QA.
- Responsable de implementación.

Interés:
- Cumplir alcance.
- Cumplir cronograma.
- Entregar un sistema funcional.
- Obtener validación de la práctica.

### Gerente de Sucursal

Rol:
- Usuario clave.
- Responsable de parametrizar demanda.
- Revisar horarios.
- Aprobar horarios.
- Gestionar excepciones.

### Empleados

Rol:
- Usuarios finales indirectos.
- Reciben información de sus turnos.

Interés:
- Recibir horarios correctamente.
- Recibir modificaciones.
- Contar con información clara de sus turnos.

Debes analizar si estos stakeholders son suficientes y determinar si existen otros que deban incorporarse, por ejemplo, responsables de remuneraciones, administración, soporte o proveedores de servicios externos.

---

# 6. Alcance inicial

## Dentro del alcance

- Gestión de empleados.
- Configuración de demanda horaria.
- Gestión de disponibilidad.
- Motor de generación de horarios.
- Gestión de turnos.
- Flujo Maker-Checker.
- Aprobación de horarios.
- Modificaciones quirúrgicas.
- Sugerencia de reemplazos.
- Auditoría.
- Notificaciones por correo.
- Archivos `.ics`.
- Exportación `.xlsx`.
- Exportación `.csv`.
- Aplicación de escritorio.
- Persistencia local.
- Instalador.

## Fuera del alcance

- Cálculo de remuneraciones.
- Generación de liquidaciones de sueldo.
- Pago de remuneraciones.
- Aplicación móvil.
- Infraestructura cloud.
- Sistema completo de RR.HH.
- Control biométrico de asistencia.
- Gestión financiera.

Si consideras que algún elemento debería cambiar de alcance, indícalo antes de modificarlo.

---

# 7. Objetivo de tu trabajo

A partir de toda esta información, debes actuar como **Project Manager Senior** y construir la estructura documental necesaria para presentar profesionalmente el proyecto.

No quiero que simplemente produzcas documentos aislados.

Primero debes realizar un **análisis de dirección del proyecto** y determinar qué documentos son:

- Obligatorios o fundamentales.
- Recomendables.
- Opcionales.
- Innecesarios para este proyecto.

Debes considerar especialmente que se trata de:

- Un proyecto académico.
- Un solo desarrollador.
- Cuatro meses de duración.
- Metodología Waterfall.
- Un único despliegue.
- Un sistema de escritorio.
- Alcance relativamente acotado.
- Sin equipo de desarrollo formal.

---

# 8. Documentación que debes evaluar y desarrollar

Evalúa como mínimo los siguientes artefactos:

## A. Acta de Constitución del Proyecto

Debe incluir, según corresponda:

- Nombre del proyecto.
- Propósito.
- Justificación.
- Problema.
- Objetivo general.
- Objetivos específicos.
- Descripción de alto nivel.
- Alcance preliminar.
- Entregables principales.
- Hitos.
- Presupuesto preliminar.
- Riesgos iniciales.
- Restricciones.
- Supuestos.
- Stakeholders principales.
- Criterios de éxito.
- Director / responsable del proyecto.
- Nivel de autoridad.
- Aprobación.

---

## B. Plan para la Dirección del Proyecto

Determina si tiene sentido elaborar un plan formal de dirección considerando que existe un único desarrollador.

Si concluyes que sí es conveniente, adapta su nivel de detalle al tamaño real del proyecto.

Debe considerar, cuando corresponda:

- Gestión del alcance.
- Gestión de requisitos.
- Gestión del cronograma.
- Gestión de costos.
- Gestión de calidad.
- Gestión de recursos.
- Gestión de comunicaciones.
- Gestión de riesgos.
- Gestión de interesados.
- Gestión de cambios.
- Gestión de configuración.
- Gestión de pruebas.
- Gestión de entregables.

No generes subplanes artificiales únicamente para cumplir una lista PMBOK.

---

# 9. Plan de Trabajo

Construye un plan de trabajo coherente con Waterfall.

Debe contemplar como mínimo:

### Fase 1 — Inicio

- Acta de constitución.
- Identificación inicial de interesados.

### Fase 2 — Planificación y análisis

- Alcance.
- Requisitos.
- EDT.
- Diccionario EDT.
- Cronograma.
- Análisis de riesgos.
- Diseño inicial.

### Fase 3 — Diseño

- Arquitectura.
- Modelo de datos.
- Diseño de interfaz.
- Diseño del motor de generación.

### Fase 4 — Desarrollo

- Backend.
- Frontend.
- Persistencia.
- Motor algorítmico.
- Workflow.
- Auditoría.
- Notificaciones.
- Exportaciones.

### Fase 5 — Pruebas

- Pruebas unitarias.
- Pruebas de integración.
- Pruebas funcionales.
- Pruebas del algoritmo.
- Pruebas de escenarios de trasnoche.
- Pruebas de restricciones.
- Pruebas de rendimiento cuando corresponda.
- Pruebas de aceptación.

### Fase 6 — Implementación y cierre

- Empaquetado.
- Instalador.
- Documentación.
- Manual de usuario.
- Manual técnico.
- Entrega.
- Cierre del proyecto.

Puedes modificar esta estructura si encuentras una alternativa más adecuada.

---

# 10. Alcance detallado

Desarrolla:

- Declaración del alcance.
- Inclusiones.
- Exclusiones.
- Supuestos.
- Restricciones.
- Criterios de aceptación.
- Límites del producto.

Después construye una **EDT/WBS completa**.

La EDT debe ser orientada a entregables y suficientemente detallada para permitir posteriormente construir el cronograma y asignar esfuerzo.

Incluye:

- Código EDT.
- Entregable.
- Paquete de trabajo.
- Descripción.

Después crea el **Diccionario de la EDT** para los paquetes de trabajo relevantes.

---

# 11. Requisitos

Construye una especificación de requisitos profesional.

Separar:

### Requisitos funcionales

Utilizar identificadores como:

- RF-001
- RF-002
- RF-003

Cada requisito debe incluir:

- ID.
- Nombre.
- Descripción.
- Prioridad.
- Criterio de aceptación.
- Dependencias cuando corresponda.

### Requisitos no funcionales

Utilizar:

- RNF-001
- RNF-002

Considerar:

- Seguridad.
- Rendimiento.
- Disponibilidad.
- Usabilidad.
- Mantenibilidad.
- Integridad de datos.
- Portabilidad.
- Confiabilidad.

No inventes métricas arbitrarias. Si propones una métrica, explica por qué es razonable para el proyecto.

---

# 12. Cronograma

Construye un cronograma estimado para los cuatro meses.

Debe existir coherencia entre:

**EDT → paquetes de trabajo → actividades → duración → dependencias → hitos.**

No asignes fechas ficticias sin explicar los supuestos.

Considera que el desarrollador trabaja solo, por lo que las actividades deben reflejar correctamente el **camino crítico y las limitaciones de recursos**.

Identifica:

- Actividades.
- Duración.
- Dependencias.
- Hitos.
- Camino crítico cuando sea posible.

---

# 13. Gestión de costos

Determina primero si corresponde elaborar un presupuesto formal.

Considera:

- Software.
- Herramientas de desarrollo.
- Servicios externos.
- Hosting, si existiera.
- Servicio de correo.
- Dominio, si fuera necesario.
- Hardware.
- Certificados.
- Costos de distribución.
- Tiempo de desarrollo, si corresponde contabilizarlo como costo.

Si el proyecto no tiene desembolsos monetarios significativos, no inventes costos.

Puedes presentar:

- Costo monetario real.
- Costos estimados.
- Recursos existentes.
- Costo de oportunidad, si resulta académico/profesionalmente pertinente.

Explica la decisión.

---

# 14. Plan de pruebas

Diseña un plan de pruebas adecuado al proyecto.

Debe considerar especialmente que el mayor riesgo técnico está en el **motor de generación de horarios**.

Incluye:

- Estrategia de pruebas.
- Tipos de pruebas.
- Casos de prueba.
- Datos de prueba.
- Criterios de entrada.
- Criterios de salida.
- Criterios de aceptación.
- Defectos.
- Evidencias.

Prestar especial atención a:

1. Cobertura de demanda.
2. Falta de disponibilidad.
3. Sobreasignación.
4. Límites de horas.
5. Descansos.
6. Solapamientos.
7. Turnos que atraviesan medianoche.
8. Diferentes cantidades de trabajadores.
9. Ausencias.
10. Reemplazos.
11. Modificaciones después de aprobación.
12. Auditoría.
13. Notificaciones.
14. Exportaciones.
15. Persistencia de datos.

---

# 15. Gestión de riesgos

Construye un registro de riesgos.

Como mínimo:

- ID.
- Riesgo.
- Causa.
- Evento.
- Consecuencia.
- Probabilidad.
- Impacto.
- Nivel.
- Estrategia de respuesta.
- Acción de mitigación.
- Responsable.
- Estado.

Prestar especial atención a:

- Complejidad del algoritmo.
- Imposibilidad de satisfacer determinada demanda.
- Errores en restricciones laborales.
- Problemas con jornadas que atraviesan medianoche.
- Sobreasignación.
- Rendimiento.
- Fallos de persistencia.
- Pérdida de información.
- Problemas de correo.
- Errores de exportación.
- Retrasos del único desarrollador.
- Cambios de alcance.
- Dependencia de librerías.
- Problemas de empaquetado Desktop.
- Problemas durante la instalación.
- Datos inconsistentes.

---

# 16. Gestión de interesados

Construye:

### Registro de interesados

Con:

- Interesado.
- Rol.
- Interés.
- Influencia.
- Expectativas.
- Impacto.
- Estrategia de involucramiento.

### Matriz de interesados

Utiliza una clasificación apropiada, por ejemplo:

- Poder / interés.

No te limites a identificar personas. Analiza realmente cómo cada interesado puede afectar o verse afectado por el proyecto.

---

# 17. Gestión de comunicaciones

Determina cómo se comunicará la información del proyecto.

Considera:

- Qué información se comunica.
- A quién.
- Cuándo.
- Medio.
- Responsable.
- Evidencia.

Recuerda que al ser un proyecto de un único desarrollador, no tiene sentido crear una estructura burocrática de reuniones internas inexistentes.

---

# 18. Gestión de cambios

Define un mecanismo simple y realista para controlar cambios de alcance.

Debe permitir:

1. Registrar solicitud.
2. Analizar impacto.
3. Evaluar costo.
4. Evaluar impacto en cronograma.
5. Aprobar o rechazar.
6. Actualizar documentación cuando corresponda.

Debe evitar que cualquier nueva idea durante el desarrollo se incorpore automáticamente al proyecto.

---

# 19. Calidad

Define cómo se determinará que el proyecto tiene calidad suficiente para ser entregado.

Considera:

- Calidad del software.
- Calidad de documentación.
- Cumplimiento de requisitos.
- Cobertura de pruebas.
- Ausencia de defectos críticos.
- Correcta instalación.
- Correcto funcionamiento del algoritmo.
- Trazabilidad entre requisitos y pruebas.

---

# 20. Trazabilidad

Propón una matriz de trazabilidad que permita relacionar:

**Requisito → Diseño → Implementación → Caso de prueba → Resultado.**

No es necesario implementar una herramienta especializada si una matriz documental es suficiente.

---

# 21. Entregables finales

Determina cuáles deberían ser los entregables formales del proyecto.

Evalúa, entre otros:

- Acta de constitución.
- Documento de alcance.
- SRS.
- EDT.
- Diccionario EDT.
- Cronograma.
- Registro de riesgos.
- Registro de interesados.
- Diseño de arquitectura.
- DER.
- Wireframes.
- Código fuente.
- Plan de pruebas.
- Informe de pruebas.
- Matriz de trazabilidad.
- Instalador.
- Manual de usuario.
- Manual técnico/sistema.
- Informe final.
- Evidencias de funcionamiento.

No asumas que todos son obligatorios. **Clasifícalos según su valor real para este proyecto.**

---

# 22. Regla fundamental: no inventar

Si falta información:

- Decláralo.
- Propón una alternativa.
- Marca claramente los supuestos.

Nunca inventes:

- Legislación específica.
- Costos reales.
- Fechas reales.
- Métricas de rendimiento sin fundamento.
- Usuarios inexistentes.
- Integraciones que no fueron solicitadas.
- Requisitos que cambien el alcance.

Si necesitas asumir algo para continuar, utiliza una sección denominada:

**Supuestos de planificación.**

---

# 23. Regla fundamental: criterio profesional

No quiero una documentación que parezca generada únicamente para "cumplir PMBOK".

Quiero una documentación **proporcional al tamaño y naturaleza del proyecto**.

Si un artefacto PMBOK no aporta valor en este contexto, indícalo.

Si un documento debería combinarse con otro para evitar duplicación, propón la combinación.

Si un documento es importante para una evaluación académica aunque no sea estrictamente necesario para la operación del proyecto, indícalo como:

**"Recomendado por contexto académico".**

Distingue siempre entre:

- Necesidad real del proyecto.
- Buena práctica de gestión.
- Requisito académico.
- Documentación redundante.

---

# 24. Orden de trabajo

NO generes inmediatamente todos los documentos.

Primero realiza un **Diagnóstico de Dirección del Proyecto**.

El diagnóstico debe contener:

1. Evaluación general del proyecto.
2. Fortalezas.
3. Debilidades.
4. Riesgos iniciales.
5. Inconsistencias detectadas.
6. Información faltante.
7. Documentos recomendados.
8. Documentos que deberían combinarse.
9. Documentos que no son necesarios.
10. Nivel de formalidad recomendado.
11. Propuesta de estructura documental final.

Después, una vez validada esta estructura, desarrollarás los documentos individualmente.

---

# 25. Estándar de calidad esperado

La documentación debe tener un nivel equivalente al de un **proyecto profesional pequeño de desarrollo de software**, pero adaptado a un proyecto académico ejecutado por un único desarrollador.

Debe existir coherencia transversal.

Por ejemplo:

- El alcance debe coincidir con los requisitos.
- Los requisitos deben coincidir con la EDT.
- La EDT debe coincidir con el cronograma.
- El cronograma debe considerar las restricciones del único desarrollador.
- Los riesgos deben relacionarse con las actividades.
- Los casos de prueba deben cubrir los requisitos.
- Los criterios de aceptación deben poder verificarse.
- Los entregables deben aparecer en la planificación.

Si detectas inconsistencias entre documentos, debes señalarlas explícitamente y corregirlas antes de continuar.

---

# 26. Formato de respuesta

Utiliza lenguaje profesional, técnico y académico en español.

No utilices lenguaje excesivamente corporativo ni burocrático.

Cuando presentes tablas, utiliza tablas Markdown.

Cuando presentes documentos formales, utiliza:

- Títulos.
- Numeración.
- Secciones.
- Tablas.
- Identificadores únicos.
- Versionado cuando corresponda.

Mantén una separación clara entre:

**Proyecto:** Sistema Horarios.

**Producto:** Aplicación de escritorio Horarios.

**Gestión del proyecto:** planificación, alcance, riesgos, cronograma, costos, calidad, interesados, etc.

---

# Instrucción final

Comienza exclusivamente con el **Diagnóstico de Dirección del Proyecto**.

No generes todavía el Acta de Constitución, EDT, cronograma ni los demás documentos.

Primero determina qué estructura documental debería utilizar este proyecto y justifica cada decisión desde una perspectiva de gestión de proyectos y de la realidad de un proyecto académico desarrollado por un único profesional.