# Descripción del Proyecto

**Horarios** es un sistema de gestión y asignación automatizada de jornadas laborales, desarrollado como una aplicación de escritorio orientada a pequeñas y medianas sucursales de comercios y servicios que requieren planificar la distribución de su fuerza laboral de manera eficiente.

El proyecto surge como respuesta a las dificultades asociadas a la elaboración manual de horarios mediante planillas de cálculo u otros métodos no especializados. Este proceso puede generar problemas de cobertura de personal, distribución ineficiente de las jornadas, incumplimiento de restricciones laborales y dificultades para gestionar modificaciones posteriores a la publicación de un horario.

La solución propuesta permite al encargado de una sucursal registrar y administrar la información de sus empleados, configurar la demanda de personal requerida para las distintas franjas horarias y generar automáticamente una propuesta de horarios a partir del análisis conjunto de la demanda, la disponibilidad de los trabajadores y las restricciones asociadas a sus jornadas laborales.

El componente principal del sistema corresponde al **motor de generación de horarios**, encargado de procesar múltiples restricciones y determinar una asignación de turnos que permita satisfacer las necesidades de cobertura definidas por la sucursal, evitando en la medida de lo posible la sobreasignación de personal y el uso innecesario de horas disponibles. El motor también contempla jornadas que pueden extenderse hasta el día siguiente, permitiendo gestionar correctamente establecimientos con horarios de funcionamiento que abarcan más de una jornada calendario.

Los horarios generados son administrados mediante un flujo de aprobación, en el cual las propuestas permanecen inicialmente en estado de borrador y posteriormente pueden ser revisadas y aprobadas por un usuario autorizado. Una vez aprobadas, estas quedan protegidas frente a modificaciones generales no autorizadas.

El sistema también contempla mecanismos para gestionar situaciones excepcionales posteriores a la aprobación, como ausencias o cambios de disponibilidad. En estos casos, el usuario autorizado puede modificar únicamente el turno afectado y recibir sugerencias de posibles reemplazos que cumplan con las restricciones configuradas, evitando tener que generar nuevamente el horario completo.

Como complemento, el sistema incorpora un mecanismo de trazabilidad que registra las modificaciones realizadas sobre los horarios, incluyendo información relacionada con el usuario responsable, la fecha y el motivo del cambio. Asimismo, contempla el envío de notificaciones por correo electrónico a los trabajadores cuando sus turnos son publicados o modificados, incluyendo archivos de calendario compatibles con aplicaciones como Google Calendar y Apple Calendar.

El proyecto adopta un enfoque **Local-First**, por lo que la aplicación, su lógica de negocio y la información almacenada funcionan localmente en el equipo donde se instala el sistema. De esta manera, se busca reducir la dependencia de infraestructura en la nube y mantener los datos operativos de la sucursal dentro de su propio entorno. La conexión a Internet será necesaria únicamente para aquellas funcionalidades que dependan de servicios externos, como el envío de correos electrónicos.

En términos tecnológicos, la solución estará compuesta por un backend desarrollado con **Spring Boot**, una interfaz de usuario desarrollada con **React**, una base de datos embebida **H2** y los componentes necesarios para empaquetar la solución como una aplicación de escritorio.

El proyecto tiene como finalidad proporcionar una herramienta que permita **automatizar, centralizar y mejorar el proceso de planificación de horarios laborales**, reduciendo el trabajo manual del encargado de la sucursal, mejorando la cobertura de personal y proporcionando mecanismos de control, trazabilidad y gestión de excepciones durante el ciclo de vida de un horario.