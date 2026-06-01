# Manual Técnico de Desarrollo — SESE Corredores de Seguros

Este manual proporciona una documentación técnica detallada para el desarrollo, compilación y despliegue del portal web **SESE Corredores de Seguros**. Su objetivo es permitir que cualquier desarrollador pueda comprender la arquitectura, replicar el entorno de desarrollo y realizar cambios y despliegues en producción de manera segura.

---

## 📌 Información General

*   **Cliente:** SESE Corredores de Seguros
*   **Fecha de Inicio:** 12 de enero de 2026
*   **UI/UX & Diseño:** Proporcionado y diseñado en su totalidad por la agencia **Aumenta**.
*   **Modelo de Arquitectura:** Frontend desacoplado (Headless CMS) con consumo dinámico de contenidos vía APIs HTTP.

---

## 🛠️ Stack Tecnológico & Información Técnica

El proyecto se estructuró con tecnologías modernas de desarrollo web, asegurando el máximo rendimiento, optimización SEO y una experiencia premium fluida.

### 💻 Tecnologías Core
*   **Lenguaje de Programación:** TypeScript (v5.x), proporcionando tipado estricto y código robusto.
*   **Framework de Frontend:** [Next.js (v16.1.1)](https://nextjs.org/) con la arquitectura **App Router** y soporte de **React (v19.2.3)**.
*   **Procesamiento de Estilos:** [Tailwind CSS (v4.x)](https://tailwindcss.com/) configurado en conjunto con **PostCSS**.
*   **Lector y Optimizador de Imágenes:** [Sharp (v0.34.5)](https://github.com/lovell/sharp) para la compresión ultrarrápida y renderizado eficiente de imágenes de alta calidad desde el CMS.
*   **Iconografía:** [Lucide React (v0.562.0)](https://lucide.dev/).
*   **Animaciones y Carruseles:** [Embla Carousel (v8.6.0)](https://www.embla-carousel.com/) con los plugins `embla-carousel-autoplay` y `embla-carousel-auto-scroll` para las transiciones e interacciones del sitio.

### 🌐 Arquitectura de Software
El sistema sigue un patrón **Jamstack (Headless CMS)**:
1.  **Frontend Desacoplado:** Una aplicación Next.js estructurada con componentes modulares de React. Esta aplicación es 100% responsiva y optimizada para SEO.
2.  **Backend (WordPress como Headless CMS):** Servidor WordPress ubicado en `https://segurosegurosbe.aumenta.do` que expone los bloques de contenido creados en Gutenberg mediante APIs REST y GraphQL.
3.  **Caché e Incremental Static Regeneration (ISR):** Next.js realiza consultas dinámicas al backend y almacena en caché las respuestas HTTP con un tiempo de revalidación de **60 segundos** (`revalidate: 60`). Esto garantiza un tiempo de carga instantáneo para los usuarios mientras mantiene el contenido fresco y dinámico de fondo.

### ⚠️ Convención de Tipados y ESLint
El linter de TypeScript en el proyecto (`eslint`) posee configurada de forma estricta la regla `@typescript-eslint/no-explicit-any`. Dado que el sitio web consume una estructura de bloques altamente dinámica y mutable desde Gutenberg en WordPress (`gutenberg_structure` mapeado como arreglos de objetos dinámicos), se utiliza con frecuencia el tipo genérico `any` para las estructuras que contienen los bloques, atributos y propiedades de respuesta de las APIs.
*   **Comportamiento Esperado:** Al ejecutar `pnpm run lint`, el sistema arrojará advertencias e incidencias del tipo `Unexpected any. Specify a different type`. 
*   **Recomendación:** Esto es el comportamiento estándar diseñado para permitir la máxima flexibilidad en el procesamiento dinámico de bloques Gutenberg de WordPress sin sobrecargar de tipos complejos que cambian con cada actualización en el CMS backend. Si se requiere omitir estas advertencias durante la compilación en servidores de Integración Continua (CI), se recomienda configurar Next.js para omitir errores de linting en `next.config.ts` o refinar progresivamente los tipos de Gutenberg en `lib/wordpress.ts` conforme las estructuras de bloques backend se estabilicen.

---

## 📂 Estructura de Carpetas

A continuación se muestra el árbol de directorios principal del proyecto con la explicación de cada carpeta clave:

```text
seguro-seguros/
├── app/                        # Directorio principal de Next.js (App Router)
│   ├── api/                    # Endpoints internos del backend del frontend
│   │   └── contact/            # Endpoint POST /api/contact (procesamiento de contactos)
│   ├── blog/                   # Módulo y página de Blog educativo
│   ├── components/             # Componentes React modulares y reutilizables
│   │   ├── contacto/           # Componente del formulario de contacto
│   │   ├── home/               # Secciones específicas de la Landing Page
│   │   └── layout/             # Componentes comunes (Header, Footer, Navegación)
│   ├── contacto/               # Módulo y vista de la página de contacto
│   ├── context/                # Contextos globales de React (ej: MenuContext)
│   ├── productos/              # Páginas y subcategorías de productos
│   │   ├── diversos/           # Seguros Diversos
│   │   ├── especializados/     # Seguros Especializados
│   │   ├── patrimoniales/      # Seguros Patrimoniales
│   │   └── vida-y-salud/       # Seguros de Vida y Salud
│   ├── quienes-somos/          # Vista e información corporativa "Quiénes Somos"
│   ├── globals.css             # Estilos CSS globales, directivas de Tailwind y degradados
│   ├── layout.tsx              # Layout raíz (estructura HTML base, Header y Footer)
│   ├── not-found.tsx           # Página personalizada para errores 404 (Ruta no encontrada)
│   └── page.tsx                # Página principal (Home)
├── docs/                       # Documentación del proyecto (manuales y guías)
│   ├── MANUAL_TECNICO.md       # Este archivo
│   └── MANUAL_USUARIO.md       # Plantilla del manual de usuario final
├── lib/                        # Clientes de API, helpers y utilidades comunes
│   └── wordpress.ts            # Cliente WordPress (tipos, mapeadores y fetches HTTP)
├── public/                     # Archivos estáticos públicos (imágenes, favicons, etc.)
├── .env.local                  # Variables de entorno locales (NO se sube a GitHub)
├── .gitignore                  # Reglas de exclusión de Git
├── eslint.config.mjs           # Configuración del linter ESLint
├── next.config.ts              # Configuración oficial de Next.js (dominios permitidos, etc.)
├── package.json                # Scripts, dependencias y metadatos del proyecto
├── README.md                   # README estándar de Next.js
├── README_AUMENTA.md           # Resumen técnico de respaldo para GitHub
└── tsconfig.json               # Configuración de compilación de TypeScript
```

---

## 🚀 Pasos para el Deploy (Despliegue)

### 💻 1. Configuración del Entorno Local
Para iniciar y trabajar en el entorno de desarrollo local, siga estos pasos:

1.  **Instalar pnpm:** El proyecto utiliza `pnpm` como administrador de paquetes. Si no lo tiene instalado, ejecute:
    ```bash
    npm install -g pnpm
    ```
2.  **Instalar dependencias:**
    ```bash
    pnpm install
    ```
    *Nota: Si recibe una advertencia sobre scripts de compilación ignorados (`[ERR_PNPM_IGNORED_BUILDS]`), puede aprobarlos con:*
    ```bash
    pnpm approve-builds
    ```
3.  **Configurar Variables de Entorno:**
    Cree un archivo `.env.local` en la raíz del proyecto y configure el endpoint de GraphQL:
    ```env
    NEXT_PUBLIC_WORDPRESS_API_URL=https://segurosegurosbe.aumenta.do/graphql
    ```
4.  **Iniciar Servidor de Desarrollo:**
    ```bash
    pnpm run dev
    ```
    El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

---

### 🌐 2. Compilación y Despliegue en Producción
Para compilar y empaquetar el portal para su puesta en producción:

1.  **Ejecutar Linter (Validación de Código):**
    ```bash
    pnpm run lint
    ```
2.  **Compilar el Proyecto (Generación de Build de producción):**
    ```bash
    pnpm run build
    ```
    Next.js generará una build optimizada dentro de la carpeta `.next`.
3.  **Iniciar en Producción Localmente (Para pruebas):**
    ```bash
    pnpm run start
    ```
4.  **Estrategias de Despliegue Comunes:**
    *   **Vercel:** Simplemente conecte el repositorio de GitHub a Vercel. Detectará automáticamente que es un proyecto Next.js. Configure la variable de entorno `NEXT_PUBLIC_WORDPRESS_API_URL` en el panel de Vercel y el despliegue se realizará de forma automática con cada commit a la rama principal.
    *   **Servidor VPS propio (Node.js):**
        *   Subir el código fuente del proyecto (excluyendo `node_modules`, `.next`, `.env.local`).
        *   Instalar dependencias con `pnpm install --prod`.
        *   Configurar variables de entorno reales en el servidor.
        *   Compilar con `pnpm run build`.
        *   Gestionar el proceso con un administrador como `pm2`:
            ```bash
            pm2 start npm --name "seguro-seguros" -- run start
            ```

---

## 📡 Endpoints (Documentación de API)

El frontend actúa como puente y consumidor de APIs. A continuación se detallan las interfaces de comunicación:

### ⚙️ 1. Endpoints Internos (Next.js API Routes)

#### ✉️ **POST** `/api/contact`
*   **Descripción:** Recibe la información del formulario de contacto enviado por el usuario, la valida, la transforma al formato requerido por **Contact Form 7** en WordPress y la reenvía al backend para procesamiento y envío de correo electrónico.
*   **Parámetros Requeridos (JSON en el Body):**
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "telefono": "+502 5555 4444",
      "mensaje": "Solicito cotización para seguro de gastos médicos.",
      "categoria": "vida-y-salud",
      "subcategoria": "Seguro de Gastos Médicos Mayores"
    }
    ```
*   **Ejemplo de Respuesta Exitosa (200 OK):**
    ```json
    {
      "success": true,
      "data": {
        "contact_form_id": 337,
        "status": "mail_sent",
        "message": "Muchas gracias por tu mensaje. Ha sido enviado."
      }
    }
    ```
*   **Ejemplo de Respuesta Error (500 Internal Server Error):**
    ```json
    {
      "success": false,
      "data": {
        "message": "Internal Server Error"
      }
    }
    ```

---

### 🌐 2. Endpoints del WordPress Backend Consumidos

Todas las llamadas al servidor de contenidos utilizan la URL base: `https://segurosegurosbe.aumenta.do/wp-json`

1.  **Obtener Páginas Gutenberg:**
    *   **Ruta:** `/gutenberg-api/v1/pages/{slug}`
    *   **Método:** `GET`
    *   **Uso:** Recupera el maquetado dinámico y la estructura de bloques de una página en específico (`inicio`, `quienes-somos`, `contacto`, `blog`, `vida-y-salud`, etc.).
2.  **Obtener Datos de Cabecera:**
    *   **Ruta:** `/gutenberg-api/v1/header`
    *   **Método:** `GET`
    *   **Uso:** Obtiene el menú de navegación dinámico, logo y redes sociales.
3.  **Obtener Datos del Pie de Página:**
    *   **Ruta:** `/gutenberg-api/v1/footer`
    *   **Método:** `GET`
    *   **Uso:** Obtiene los menús de enlaces, información de copyright y datos de contacto de la parte inferior.
4.  **Formulario de Contact Form 7 (Integración Directa):**
    *   **Ruta:** `/contact-form-7/v1/contact-forms/337/feedback`
    *   **Método:** `POST`
    *   **Uso:** Utilizado por la API interna del frontend para registrar las solicitudes y disparar notificaciones de correo.

---

## 🔑 Credenciales y Accesos

Para mantener los estándares más estrictos de seguridad corporativa, **nunca** coloque credenciales en texto plano dentro del código fuente o archivos en GitHub. El archivo `.env.local` se encuentra configurado en `.gitignore` por defecto.

### 🗄️ Base de Datos de Producción (MySQL / MariaDB)
*   **Proveedor de Infraestructura:** Servidor / Hosting administrado por la agencia **Aumenta**.
*   **URL de Acceso / Host:** `localhost` (o IP del servidor de producción proporcionada por administración de hosting).
*   **Puerto predeterminado:** `3306`
*   **Variables de configuración en el Servidor Backend (WordPress):**
    ```php
    // Ubicado en wp-config.php en el servidor del backend
    define('DB_NAME', 'seguroseguros_prod');
    define('DB_USER', 'db_user_placeholder');     // Reemplazar por credencial oficial
    define('DB_PASSWORD', 'db_pass_placeholder'); // Reemplazar por credencial oficial
    define('DB_HOST', 'localhost');
    ```

---

## 🛠️ Mantenimiento y Soporte

El mantenimiento del portal se estructura bajo un acuerdo de nivel de servicio (SLA) definido con la agencia.

### 📋 Cobertura del Soporte Correctivo
*   **Periodo de Garantía:** [Insertar periodo de garantía acordado, ej: 6 meses].
*   **Alcance:**
    *   Resolución de fallos en el código (frontend Next.js) que impidan la correcta visualización o funcionamiento del sitio.
    *   Monitoreo de estabilidad del API Gateway entre Next.js y el backend.
    *   Actualización de librerías y dependencias críticas de seguridad que no presenten conflictos mayores con la versión instalada.
*   **Exclusiones:**
    *   Creación de nuevas vistas, landing pages o componentes no previstos en el alcance del diseño original.
    *   Rediseño estético de secciones existentes.
    *   Resolución de fallos causados por malas configuraciones realizadas directamente en el panel de WordPress por usuarios con permisos de administración (ej: eliminación de páginas esenciales o cambio manual de slugs de productos).
