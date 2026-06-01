# 🛡️ Proyecto SESE Corredores de Seguros — Respaldo de Documentación

Este archivo sirve como respaldo oficial y resumen ejecutivo del proyecto **SESE Corredores de Seguros** directamente en el repositorio de GitHub. 

Para un entendimiento y gestión en profundidad del sistema, consulte los documentos detallados creados en el proyecto:
*   [**Manual Técnico de Desarrollo (para programadores)**](file:///Users/kevin/Desktop/seguro-seguros/docs/MANUAL_TECNICO.md): Explicación exhaustiva de arquitectura, dependencias, endpoints, despliegue y base de datos.
*   [**Manual de Usuario de Contenidos (para el cliente/editor)**](file:///Users/kevin/Desktop/seguro-seguros/docs/MANUAL_USUARIO.md): Flujos detallados para la actualización de textos, banners, blogs y carga de productos en WordPress.

---

## 📋 Ficha Técnica del Proyecto

*   **Cliente:** SESE Corredores de Seguros
*   **Fecha de Inicio:** 12 de enero de 2026
*   **UI/UX & Diseñador:** Agencia **Aumenta**
*   **Modelo Arquitectónico:** Jamstack (Desacoplado - Headless CMS)
    *   **Frontend:** Next.js (App Router) en la versión `16.1.1` con React `19.2.3`.
    *   **Backend / Contenidos:** WordPress Gutenberg en `https://segurosegurosbe.aumenta.do`.
    *   **Caché:** Incremental Static Regeneration (ISR) con refresco automático de caché cada 60 segundos.

---

## 🛠️ Stack y Comandos Clave

El frontend está desarrollado con **TypeScript**, **Tailwind CSS v4** y empaquetado usando **pnpm**.

### 💻 Comandos del Proyecto

1.  **Instalación de Dependencias:**
    ```bash
    pnpm install
    ```
2.  **Iniciar Entorno de Desarrollo Local:**
    ```bash
    pnpm run dev
    ```
3.  **Ejecutar Linter:**
    ```bash
    pnpm run lint
    ```
4.  **Generar Compilación para Producción:**
    ```bash
    pnpm run build
    ```
5.  **Iniciar Servidor de Producción Local:**
    ```bash
    pnpm run start
    ```

---

## 📡 Integración de APIs & Endpoints

### ⚙️ Backend del Frontend (Next.js Routes)
*   `POST /api/contact`: Procesa, valida e integra la información del formulario de contacto directamente con el plugin **Contact Form 7** del servidor WordPress backend.

### 🌐 Consumo desde WordPress
*   `GET /gutenberg-api/v1/pages/{slug}`: Estructura de bloques Gutenberg.
*   `GET /gutenberg-api/v1/header`: Datos de navegación y logotipo dinámico.
*   `GET /gutenberg-api/v1/footer`: Datos de información legal, enlaces y redes sociales.

---

## 🔑 Gestión de Credenciales y Seguridad

> [!WARNING]
> **POLÍTICA DE SEGURIDAD:** Nunca suba archivos de configuración de entorno (.env o archivos .config conteniendo contraseñas reales) a GitHub. El proyecto cuenta con exclusiones automáticas en el archivo `.gitignore` para evitar filtraciones accidentales.

*   **Servidor Backend / Base de Datos:** Hospedados e integrados en la infraestructura dedicada provista por la agencia **Aumenta**.
*   **Gestión de Variables:** Configurada a través de `.env.local` en desarrollo y mediante variables de entorno del proveedor de alojamiento (ej: Vercel) en producción.
    ```env
    NEXT_PUBLIC_WORDPRESS_API_URL=https://segurosegurosbe.aumenta.do/graphql
    ```

---

*Desarrollado y respaldado con orgullo por la agencia **Aumenta** para **SESE Corredores de Seguros**.*
