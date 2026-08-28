# Diagnóstico de Dirección del Proyecto — Sistema Horarios

**Versión:** 1.0  
**Fecha:** Agosto 2025  
**Elaborado por:** Gestor de Proyectos Senior (análisis basado en documentación disponible)  
**Proyecto:** Sistema Horarios  
**Producto:** Aplicación de escritorio para gestión de jornadas laborales  

---

## 1. Evaluación General del Proyecto

El proyecto **Horarios** es un sistema de gestión y asignación automatizada de jornadas laborales orientado a pequeñas y medianas sucursales. Se trata de una aplicación de escritorio con enfoque **Local-First**, compuesta por un backend en Spring Boot 3.2 + Java 17, un frontend en React 19 + Vite 8, y una base de datos H2 embebida.

### Clasificación del proyecto

| Dimensión | Valor | Observación |
|-----------|-------|-------------|
| Tipo | Académico (Práctica Laboral - Duoc UC) | Debe cumplir competencias de Analista Programador |
| Metodología | Waterfall / Cascada | Adecuada para alcance definido; menos flexible ante cambios |
| Equipo | 1 persona (desarrollador único) | Restricción significativa: roles múltiples simultáneos |
| Duración | 4 meses estimados | Realista si se mantiene el alcance acotado |
| Despliegue | Único (aplicación de escritorio local) | Sin infraestructura cloud ni servidores compartidos |
| Alcance | Acotado y definido | Dentro del viable para un solo desarrollador |

### Viabilidad global

El proyecto es **viable y adecuado** para una práctica profesional académica, siempre que se mantenga el alcance dentro de los límites definidos. El núcleo funcional más complejo es el motor de generación automática de horarios, lo cual representa el mayor riesgo técnico pero también el valor diferenciador principal del proyecto.

La arquitectura actual (backend REST + frontend React + H2 embebido) es sólida y apropiada. Los puntos débiles se concentran en funcionalidades aún no implementadas: aprobación (workflow maker-checker), auditoría, notificaciones, exportaciones .ics, y la definición del empaquetado como aplicación de escritorio.

---

## 2. Fortalezas

| # | Fortaleza | Justificación |
|---|-----------|---------------|
| F1 | Problema real y bien identificado | La planificación manual de horarios genera problemas documentados: falta de cobertura, sobreasignación, incumplimiento de restricciones. No es un ejercicio académico abstracto. |
| F2 | Stack tecnológico maduro y apropiado | Spring Boot 3.2 + React 19 + H2 embebido son tecnologías probadas, con amplia documentación y soporte. H2 garantiza funcionamiento sin infraestructura adicional. |
| F3 | Motor algorítmico parcialmente implementado | Ya existe un `ScheduleGenerationService` con lógica determinista de asignación, matching de habilidades, contratos de horas semanales y soporte para jornadas que cruzan medianoche. |
| F4 | Alcance claramente delimitado | Las inclusiones y exclusiones están explícitamente definidas. Esto reduce el riesgo de scope creep. |
| F5 | Enfoque Local-First | Elimina dependencia de infraestructura cloud, alineándose con la realidad de las pymes y reduciendo complejidad operativa. |
| F6 | Documentación previa existente | Ya cuenta con README, PROJECT_MAP, PROJECT_SUMMARY y DOCUMENTACION_PROYECTO técnica, lo que demuestra avance previo. |
| F7 | Backend funcional | CRUDs completos de empleados, turnos, disponibilidades y skills; API REST operable; proxy Vite configurado. |

---

## 3. Debilidades

| # | Debilidad | Implicación |
|---|-----------|-------------|
| D1 | Un único desarrollador asumiendo todos los roles | Riesgo alto de cuellos de botella. No hay revisión por pares ni distribución de carga. Cualquier bloqueo impacta todo el cronograma. |
| D2 | Metodología Waterfall con un solo desarrollador | El waterfall presupone fases secuenciadas y entregables intermedios validados por terceros. Con un solo developer, la rigidéz del waterfall puede ser contraproducente si hay errores de análisis temprano. |
| D3 | Funcionalidades core aún sin implementar | Workflow de aprobación, auditoría, notificaciones por correo, exportaciones .ics/.xlsx/csv, modificaciones quirúrgicas y sugerencia de reemplazos forman parte del alcance pero no existen en código. Son aproximadamente 40% del trabajo restante. |
| D4 | Empaquetado Desktop sin definir | No se ha determinado si se usará Electron, Tauri u otra herramienta. Esta decisión afecta la fase de implementación y pruebas. |
| D5 | Seguridad básica | CORS está habilitado pero no existe autenticación formal (JWT placeholder mencionado pero no implementado). Es necesario definir niveles de acceso para el workflow maker-checker. |
| D6 | Test coverage inexistente o mínima | No se evidencian tests unitarios o de integración. Para un proyecto académico, esto debiera compensarse con al menos pruebas funcionales del motor. |

---

## 4. Riesgos Iniciales Detectados

| ID | Riesgo | Nivel | Observación |
|----|--------|-------|-------------|
| R-01 | Complejidad del algoritmo de generación > lo estimado | Alto | El cruce de demanda + disponibilidad + restricciones + horarios nocturnos puede generar comportamientos no previstos. |
| R-02 | Imposibilidad del motor de satisfacer demanda con restricciones dadas | Medio | Si la configuración del usuario exige más trabajadores de los disponibles en una franja horaria, el algoritmo debe tener estrategia de falloGracefulDegradation. |
| R-03 | Retrasos por depender de un único recurso | Alto | Cualquier impedimento del desarrollador retrasa todo el proyecto. No hay buffer de personal. |
| R-04 | Cambios de alcance durante el desarrollo | Medio | La tentación de agregar funcionalidades ("solo una cosa más") es alta sin un mecanismo de control formalizado. |
| R-05 | Elegir tecnología de empaquetado que cause dificultades técnicas | Medio | Tanto Electron como Tauri tienen trade-offs. Una mala elección puede consumir semanas de trabajo improductivo. |
| R-06 | Pérdida o corrupción de datos locales | Bajo-Medio | Aunque H2 es robusto, no hay mecanismos de backup automáticos implementados. |

---

## 5. Inconsistencias Detectadas

| # | Inconsistencia | Descripción | Impacto |
|---|----------------|-------------|---------|
| I-01 | Prompt indica "Vite 8" pero versión de producción podría diferir | El prompt menciona Vite 8, mientras que package.json puede tener versión distinta. Verificar compatibilidad. | Bajo: podría afectar build. |
| I-02 | Fetch del frontend usa URL absoluta vs proxy Vite | PROJECT_MAP.md indica pendiente migrar fetch a proxy `/api`. Esto causa dependencias en CORS. | Bajo: bug conocido marcado como pendiente. |
| I-03 | Documentos técnicos previos vs. prompt de gestión | Los documentos existentes (PROJECT_MAP, DOCUMENTACION_PROYECTO) son puramente técnicos y no abordan la estructura de gestión requerida por el prompt PMBOK. Son complementarios, no contradictorios. | Ninguno: simplemente falta la capa documental de gestión. |
| I-04 | Stack "Spring Boot 3.2" vs posible versión posterior | Verificar si el backend usa exactamente 3.2.x o versión menor diferente. | Bajo: coherencia documental. |
| I-05 | Definición de "jornadas parciales" ambigua | El algoritmo v3 indica "sin jornadas parciales", pero el alcance dice considerar "horas contratadas". Necesita clarificación: ¿se permite que un empleado tenga múltiples jornadas distintas en una semana? | Medio: impacta diseño del algoritmo. |

---

## 6. Información Faltante

Para construir la documentación completa, se necesitan los siguientes datos que **no fueron proporcionados**:

| # | Información faltante | Por qué es necesaria | Recomendación |
|---|---------------------|---------------------|---------------|
| IF-01 | Fecha exacta de inicio del proyecto | Para calcular fechas reales del cronograma y hitos | Establecer fecha de inicio convenida con jefe de carrera |
| IF-02 | Fecha límite de entrega formal | Determina el deadline absoluto | Confirmar con Duoc UC |
| IF-03 | Nombre del jefe de carrera evaluador | Para firmar acta de constitución y comunicaciones formales | Obtener antes de generar documentos de aprobación |
| IF-04 | Criterios específicos de evaluación de Duoc UC | Podría haber rúbricas o competencias mínimas obligatorias | Solicitar rubrica oficial al departamento |
| IF-05 | Requisitos legales/chilenos específicos de jornada laboral | El prompt menciona "restricciones legales" sin especificar | Delimitar: ¿el sistema aplica normativa chilena o es genérico? |
| IF-06 | Número promedio de empleados y sucursales objetivo | Para dimensionar pruebas de rendimiento y almacenamiento H2 | Suponer 10-50 empleados/sucursal para fines de pruebas |
| IF-07 | Servidor SMTP para envío de correos | Necesario para la funcionalidad de notificaciones | Evaluar uso de SMTP gratuito (Gmail, Mailgun free tier) para demo |
| IF-08 | Política de Duoc UC sobre herramientas de empaquetado Desktop | Puede haber restricciones institucionales | Verificar con guía de prácticas |

**Nota crítica:** La ausencia de fechas reales (IF-01, IF-02) significa que cualquier cronograma propuesto será estimado bajo supuestos. Se recomienda establecer estas fechas ANTES de presentar la documentación al jefe de carrera, ya que ellas definen toda la planificación posterior.

---

## 7. Documentos Recomendados

Con base en la naturaleza del proyecto (académico, 1 desarrollador, 4 meses, waterfall), se clasifican los documentos según su necesidad real:

### Tabla de clasificación documental

| Documento | Categoría | Justificación |
|-----------|-----------|---------------|
| **Acta de Constitución** | Fundamental | Documento obligatorio en evaluación académica. Formaliza autorización y autoridad del PM. |
| **SRS (Especificación de Requisitos)** | Fundamental | Necesario para demostrar comprensión del problema y trazabilidad. Requisito académico clave. |
| **EDT (Estructura de Desglose de Trabajo)** | Fundamental | Base del cronograma. Demuestra capacidad de planificación. |
| **Cronograma** | Fundamental | RequiereDuoc UC. Muestra viabilidad temporal. |
| **Registro de Riesgos** | Fundamental | Muestra pensamiento crítico sobre obstáculos potenciales. Alta valoración académica. |
| **Matriz de Trazabilidad** | Recomendable (académico) | Vincula requisitos → diseño → pruebas. Muy valorado en evaluaciones académicas pero poco útil operacionalmente para 1 desarrollador. |
| **Plan de Pruebas** | Recomendable (académico) | Demostrar estrategia de testing es relevante académicamente. Operacionalmente, el propio desarrollo actúa como prueba continua. |
| **Registro de Interesados** | Recomendable (académico) | Útil para demostrar identificación de stakeholders, aunque solo hay 4 actores principales. |
| **Declaración de Alcance** | Recomendable (académico) | Complementa el Acta de Constitución. Buena práctica profesional. |
| **Diccionario EDT** | Recomendable | Profundiza los paquetes de trabajo de la EDT. Aporta calidad pero agrega volumen. |
| **Plan de Comunicaciones** | Opcional | Con 1 desarrollador y reuniones espordicas con el jefe de carrera, un documento formal es excesivo. Basta con un párrafo en el Plan de Dirección. |
| **Plan de Gestión de Calidad** | Opcional | Integrable en el Plan de Dirección. Un documento separado es desproporcionado. |
| **Plan de Gestión de Cambios** | Opcional | Procedimiento simple integrado en la Declaración de Alcance basta. |
| **Manual de Usuario** | Condicional | Solo si alcanza tiempo. Priorizar funcionalidad. |
| **Manual Técnico** | Condicional | Igual que manual de usuario. Alternativa: buena documentación inline en código + README. |
| **Diagrama de Gantt completo** | Opcional | Formato alternativo del cronograma. Si se presenta cronograma en tabla, no es necesario duplicar. |

---

## 8. Documentos que Deberían Combinarse

Para evitar burocracia innecesaria y sobre-documentación:

| Combinación | Razón |
|-------------|-------|
| **Plan de Comunicaciones + Plan de Gestión de Calidad** dentro del Plan de Dirección | Ambos son planes secundarios de baja complejidad en este contexto. Combinarlos evita dos documentos cortos sin contenido sustancial. |
| **Plan de Gestión de Cambios** integrado en **Declaración de Alcance** | El proceso de cambio es tan simple (registrar → analizar → aprobar/rechazar) que no merece documento independiente. |
| **Matriz de Interesados + Registro de Interesados** | Son naturalmente complementarios y suelen presentarse como una sola sección. |
| **Manual de Usuario + Manual Técnico** → solo si se dispone de tiempo; caso contrario, usar README detallado como substitute | Dos manuales completos consumen esfuerzo significativo. Para un proyecto académico, un README técnico bien estructurado + capturas de pantalla de la interfaz suele ser suficiente. |

---

## 9. Documentos que NO Son Necesarios

| Documento | Por qué no aplica |
|-----------|-------------------|
| Plan de Adquisiciones | No se compran bienes ni servicios externos significativos. Todo el stack es open-source/gratuito. |
| Plan de Gestión de Recursos Humanos | No hay equipo de trabajo. El "recurso humano" es 1 persona. |
| Plan de Gestión de Proveedores | No existen proveedores activos. |
| Plan de Gobierno Corporativo | Totalmente irrelevante para proyecto académico individual. |
| Informe de Estado Semanal tipo corporativo | Sin equipo, no hay necesidad de reportes periódicos formales. |
| Análisis BPMN avanzado | Flujo simplificado (Maker-Checker) puede representarse con diagrama de flujo simple, no requiere modelado BPMN formal. |
| Prototipos de alta fidelidad | Wireframes intermedios (como los existentes en componentes React) son suficientes. Mockups de diseño detallado no aportan valor. |
| Plan de Continuidad de Negocio | La aplicación es de escritorio local; la continuidad opera trivialmente (copiar carpeta de datos). |

---

## 10. Nivel de Formalidad Recomendado

| Aspecto | Nivel recomendado | Motivo |
|---------|------------------|--------|
| Documentación de gestión | Profesional-medium | Suficiente para defensa académica, sin burocracia excesiva |
| Documentación técnica | Profesional-alta | Código y arquitectura deben estar bien documentados para mantenimiento y evaluación |
| Lenguaje | Académico-técnico | Adecuado para presentación a evaluadores universitarios |
| Herramientas de seguimiento | Informal (Notas/Markdown) | No justifica inversión en Jira, MS Project u otras herramientas empresariales |
| Reuniones con stakeholder | Informales | Sesión de revisión cada 2 semanas con jefe de carrera, sin actas extensas |

---

## 11. Propuesta de Estructura Documental Final

Basado en el diagnóstico, esta es la estructura documental recomendada para la presentación al jefe de carrera:

```
DOCUMENTACIÓN SISTEMA HORARIOS
│
├── 00. RESUMEN EJECUTIVO PARA PRESENTACIÓN
│       └── Síntesis de todo para exposición oral al jefe de carrera
│
├── 01. ACTA DE CONSTITUCIÓN DEL PROYECTO
│       ├── Identificación del proyecto
│       ├── Propósito y justificación
│       ├── Objetivos generales y específicos
│       ├── Alcance preliminar
│       ├── Entregables principales
│       ├── Hitos estimados
│       ├── Restricciones y supuestos
│       ├── Stakeholders principales
│       └── Autorización formal
│
├── 02. ESPECIFICACIÓN DE REQUISITOS (SRS)
│       ├── Introducción (objetivo, alcance, definiciones)
│       ├── Requisitos funcionales (RF-001 a RF-N)
│       ├── Requisitos no funcionales (RNF-001 a RNF-N)
│       ├── Interfaces externas
│       └── Anexos (diccionario de datos básico)
│
├── 03. DECLARACIÓN DE ALCANCE DETALLADO
│       ├── Descripción del producto
│       ├── Inclusiones (dentro del alcance)
│       ├── Exclusiones (fuera del alcance)
│       ├── Criterios de aceptación
│       ├── Supuestos y restricciones
│       └── Proceso de gestión de cambios (simple)
│
├── 04. ESTRUCTURA DE DESGLOSE DE TRABAJO (EDT/WBS)
│       ├── Diagrama/Lista jerárquica de la EDT
│       ├── Diccionario de la EDT (paquetes principales)
│       └── Asignación de responsabilidades
│
├── 05. CRONOGRAMA GENERAL
│       ├── Actividades, duraciones y dependencias
│       ├── Hitos principales
│       ├── Camino crítico identificado
│       └── Diagrama de Gantt simplificado
│
├── 06. PLAN DE DIRECCIÓN DEL PROYECTO
│       ├── Gestión del alcance
│       ├── Gestión de requisitos
│       ├── Gestión de cronograma
│       ├── Gestión de calidad
│       ├── Gestión de riesgos
│       ├── Gestión de interesados
│       ├── Gestión de cambios (integrada)
│       └── Gestión de configuración
│
├── 07. REGISTRO DE RIESGOS
│       ├── Riesgos identificados (categorizados)
│       ├── Análisis probabilístico-impacto
│       ├── Estrategias de respuesta
│       └── Plan de contingencia
│
├── 08. GESTIÓN DE INTERESADOS
│       ├── Registro de interesados
│       ├── Matriz poder-interés
│       └── Estrategias de involucramiento
│
├── 09. MATRIZ DE TRAZABILIDAD
│       ├── Trazabilidad requisito → diseño → implementación → prueba
│       └── Resultados esperados
│
├── 10. PLAN DE PRUEBAS
│       ├── Estrategia general
│       ├── Tipos de prueba planificados
│       ├── Casos de prueba críticos
│       └── Criterios de aceptación de prueba
│
└── 11. ENTREGABLES FINALES ESTIMADOS
        ├── Lista clasificada por prioridad
        ├── Entregables técnicos (código, instalador)
        └── Entregables documentales
```

**Total de documentos principales:** 11 secciones documentales cohesivas.  
**Extensión estimada:** Aproximadamente 80-120 páginas de documentación + código.  
**Documento estrella para presentación:** Sección 00 (Resumen Ejecutivo) + Sección 01 (Acta) + Sección 05 (Cronograma visual).

---

## 12. Decisiones Pendientes que Deben Tomarse Antes de Avanzar

| # | Decisión | Responsable | Urgencia |
|---|----------|-------------|----------|
| DP-01 | Fecha de inicio y fecha límite del proyecto | Jefe de carrera + Estudiante | Alta — determina todo el cronograma |
| DP-02 | Tecnología de empaquetado Desktop (Electron vs Tauri vs otro) | Estudiante (con asesoría) | Media — decidir en Fase 1-2 |
| DP-03 | Normativa laboral aplicable (chilena vs genérica) | Estudiante + Jefe de carrera | Alta — afecta diseño de restricciones del algoritmo |
| DP-04 | Rubrica oficial de evaluación de Duoc UC | Departamento | Alta — asegura cobertura de competencias |
| DP-05 | Servidor SMTP para notificaciones (configuración real o simulada) | Estudiante | Baja-Media — puede posponerse a fase de implementación |

---

## 13. Conclusión del Diagnóstico

El proyecto **Horarios** es **viable y adecuado** para una práctica profesional académica de Analista Programador en Duoc UC. Presenta:

- ✅ Un problema real con solución tecnológicamente factible
- ✅ Stack apropiado y parcialmente implementado
- ✅ Alcance bien definido y moderado
- ⚠️ Riesgo central: la complejidad del algoritmo de generación
- ⚠️ Riesgo operativo: depender de un único desarrollador
- ⚠️ Dependencia: definir fechas reales antes de finalizar planificación

**Recomendación:** Proceder con la documentación propuesta en la estructura del punto 11. Priorizar la presentación al jefe de carrera con el **Resumen Ejecutivo + Acta de Constitución + Cronograma visual** para obtener aprobación inicial, y completar el resto de documentos conforme avance la Fase 2 (Planificación).

El siguiente paso lógico es desarrollar cada uno de los documentos de la estructura propuesta, empezando por el **Acta de Constitución** y el **SRS**, que son los cimientos de toda la planificación posterior.
