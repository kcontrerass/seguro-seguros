# Estructura del Manual de Usuario — Portal SESE Corredores de Seguros

Este documento es una plantilla y guía estructurada orientada al usuario final (no técnico) y administradores de contenido del portal **SESE Corredores de Seguros**. Los flujos principales de gestión de contenido mediante el backend de WordPress han sido documentados a continuación para facilitar el control y actualización futura del sitio web.

---

## 🌟 1. Introducción al Sistema

### ¿Qué es el portal de SESE Corredores de Seguros?
El sistema es una plataforma web corporativa moderna de alto rendimiento, diseñada para presentar los servicios y productos de **SESE Corredores de Seguros** de manera clara y atractiva. 

### ¿Cuál es su propósito?
*   **Informar al Cliente:** Servir como portafolio digital premium para mostrar las líneas de seguros disponibles (Vida y Salud, Patrimoniales, Especializados y Diversos).
*   **Captar Leads / Clientes:** Facilitar la comunicación directa mediante formularios de contacto inteligentes que guían al usuario para solicitar cotizaciones en categorías específicas.
*   **Educación Financiera (Blog):** Ofrecer un canal interactivo de aprendizaje donde los administradores pueden publicar guías y artículos relacionados con el sector de seguros.
*   **Gestión Ágil de Contenido:** Permitir que el equipo de SESE actualice textos, banners, imágenes, testimonios e información de contacto en tiempo real sin depender de un programador.

---

## 🔑 2. Requisitos y Roles de Acceso

El sistema está dividido en dos partes:
1.  **El Portal Público (Frontend):** Visible para todos los usuarios y clientes en la dirección oficial del sitio.
2.  **El Panel de Control (Backend):** El centro de administración de contenidos alojado en WordPress.

### 🌐 Direcciones de Acceso
*   **Sitio Web Oficial:** `https://www.sesecorredores.com` (o dominio de producción asignado)
*   **Panel de Administración (CMS):** `https://segurosegurosbe.aumenta.do/wp-admin`

### 👥 Roles de Usuario Disponibles
| Rol | Nivel de Permisos | Acciones Permitidas |
| :--- | :--- | :--- |
| **Administrador** | Total | Gestión completa del sitio web: crear usuarios, configurar plugins, cambiar contraseñas, editar la estructura Gutenberg y cambiar menús. |
| **Editor** | Alto | Crear, editar y eliminar páginas, productos y entradas de blog de cualquier autor. No puede realizar configuraciones técnicas del servidor o añadir plugins. |
| **Autor** | Medio | Publicar y editar exclusivamente sus propias entradas en el Blog. No tiene acceso a editar páginas de productos o secciones institucionales. |

---

## 📝 3. Guía de Uso de Módulos Principales (Paso a Paso)

### Módulo 3.1: Inicio de Sesión en el Administrador
1.  Abra su navegador web e ingrese a la dirección: `https://segurosegurosbe.aumenta.do/wp-admin`
2.  Introduzca su **Nombre de usuario** o **Dirección de correo electrónico**.
3.  Escriba su **Contraseña** de acceso seguro.
4.  Haga clic en el botón **Acceder**. Esto le llevará al *Escritorio* o *Dashboard* principal de WordPress.

---

### Módulo 3.2: Gestión de Páginas (Inicio, Quiénes Somos y Contacto)
El contenido visual del portal está construido dinámicamente utilizando bloques en el editor nativo de WordPress (**Gutenberg**).

1.  En la barra lateral izquierda, navegue a **Páginas > Todas las páginas**.
2.  Busque la página que desea editar:
    *   `Inicio` (Home)
    *   `Quienes Somos`
    *   `Contacto`
    *   `Blog` (Estructura de la landing del blog)
3.  Pase el cursor sobre el nombre de la página y haga clic en **Editar**.
4.  **Para editar un Texto:** Haga clic directamente sobre el párrafo o título en la pantalla de edición y reemplace el texto por el nuevo.
5.  **Para cambiar una Imagen:**
    *   Haga clic sobre el bloque de imagen o el fondo que desea actualizar.
    *   Haga clic en el botón **Reemplazar** (o *Añadir medio*).
    *   Seleccione una imagen existente de la *Biblioteca de medios* o suba una nueva desde su computadora haciendo clic en *Subir archivos*.
6.  **Guardar Cambios:** Al finalizar la edición, haga clic en el botón azul **Actualizar** en la esquina superior derecha.
    > [!IMPORTANT]
    > Los cambios tardarán un máximo de **60 segundos** en reflejarse de forma pública en el portal debido a la revalidación de caché de Next.js (ISR).

---

### Módulo 3.3: Gestión y Categorías de Productos
Las secciones de productos en el frontend corresponden a las páginas hijas estructuradas dentro de WordPress.

1.  Vaya a **Páginas > Todas las páginas** y localice las subpáginas de productos:
    *   `Vida y Salud` (slug: `vida-y-salud`)
    *   `Patrimoniales` (slug: `patrimoniales`)
    *   `Especializados` (slug: `especializados`)
    *   `Diversos` (slug: `diversos`)
2.  Haga clic en **Editar** en el producto correspondiente.
3.  Cada página cuenta con una cuadrícula de bloques (*Grid de Servicios*) donde se enumeran los seguros específicos y sus condiciones:
    *   Puede hacer clic sobre los títulos y los párrafos descriptivos para modificar las coberturas, deducibles o exclusiones.
4.  Al terminar de realizar los ajustes, presione **Actualizar**.

---

### Módulo 3.4: Recepción de Formulario de Contacto (Leads)
Cuando un cliente completa el formulario en `/contacto`:

1.  El sistema recopila: Nombre, Email, Teléfono, Categoría, Subcategoría y Mensaje.
2.  La API interna de Next.js procesa esta información de forma automatizada.
3.  Se dispara una notificación inmediata por correo electrónico a la bandeja oficial de SESE Corredores: `info@sesecorredores.com`.
4.  **Recomendación:** Los correos son enviados a través de una plantilla configurada en **Contact Form 7**. No modifique los campos del formulario identificados como `nombre`, `email`, `telefono`, `mensaje`, `categoria` o `subcategoria` dentro del editor de WordPress, ya que una alteración podría romper la recepción de datos en el frontend.

---

### Módulo 3.5: Publicación de Artículos en el Blog
1.  En la barra lateral izquierda, vaya a **Entradas > Añadir nueva entrada**.
2.  Escriba el **Título** de su artículo educativo en el campo superior.
3.  Escriba el cuerpo del artículo utilizando los bloques de texto habituales de Gutenberg. Puede insertar imágenes, listas con viñetas o subtítulos.
4.  En la barra lateral derecha de opciones (Pestaña "Entrada"):
    *   Defina una **Imagen destacada**: Esta imagen será la portada del artículo en la landing de Blog.
    *   Asigne o cree una **Categoría** si es necesario.
5.  Haga clic en **Publicar** en la esquina superior derecha y confirme la acción.

---

## ❓ 4. Preguntas Frecuentes (FAQ) & Resolución de Problemas

### 🔴 Problema 1: Realicé un cambio en WordPress pero no se ve en el sitio web de inmediato.
*   **Razón:** El sitio utiliza tecnología Jamstack de alta velocidad con caché revalidada cada 60 segundos.
*   **Solución:** Espere 1 minuto completo y refresque el navegador web presionando `Ctrl + F5` (Windows) o `Cmd + Shift + R` (Mac) para forzar la limpieza de la caché de su navegador.

### 🔴 Problema 2: El formulario de contacto marca un error al intentar enviar un mensaje.
*   **Razón:** Generalmente se debe a un corte de conexión temporal entre el servidor de Next.js y el servidor backend de WordPress, o a una alteración en la configuración del plugin Contact Form 7.
*   **Solución:** 
    1. Compruebe si el panel de administración en WordPress (`https://segurosegurosbe.aumenta.do/wp-admin`) está respondiendo correctamente.
    2. Si el backend está en línea, revise si se han editado las plantillas de correo en Contact Form 7 recientemente. Deberán coincidir con el formulario ID `337`.

### 🔴 Problema 3: Olvidé mi contraseña de acceso al panel de WordPress.
*   **Solución:**
    1. Ingrese a `https://segurosegurosbe.aumenta.do/wp-admin`.
    2. Haga clic en el enlace **¿Has perdido tu contraseña?** justo debajo del formulario.
    3. Escriba su correo electrónico corporativo registrado y haga clic en **Obtener una contraseña nueva**.
    4. Siga las instrucciones del enlace enviado a su correo para configurar una nueva clave segura.
