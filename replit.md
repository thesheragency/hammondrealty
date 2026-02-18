# Headless WordPress Boilerplate

## Overview
This project delivers a high-performance, SEO-friendly headless WordPress solution using Next.js App Router and PostgreSQL for content caching. It supports WordPress's default "Posts" content type with full taxonomy support. The aim is to provide a robust and scalable foundation for decoupled WordPress sites, emphasizing developer experience and efficient content delivery.

## User Preferences
I want to interact with the agent in an iterative development approach. I prefer detailed explanations of changes and potential impacts. The agent should ask for confirmation before making major architectural changes or introducing new dependencies.

## System Architecture
The architecture is based on a Next.js 16 App Router frontend, utilizing Next.js API Routes for backend logic. Content is fetched from WordPress via WPGraphQL and cached in a PostgreSQL database using Drizzle ORM.

**Key Architectural Decisions:**
-   **Server-Side Rendering (SSR):** All pages are SSR for enhanced SEO and performance.
-   **Content Caching:** WordPress content is synced to PostgreSQL to decouple the frontend from direct WordPress queries, improving data retrieval speed. Taxonomies are embedded as JSON within post records.
-   **SEO Integration:** Integrates Next.js Metadata API with Yoast SEO for comprehensive meta-data, Open Graph, Twitter Cards, and canonical URLs. It proxies SEO files (sitemaps, robots.txt) from WordPress and fetches Schema.org JSON-LD via Yoast's REST API, replacing WordPress domains with the frontend domain.
-   **Preview Mode:** Enables previewing draft content from WordPress using Next.js Draft Mode, supporting authenticated GraphQL requests for draft content. It includes dual authentication support for staging sites protected by HTTP Basic Auth.
-   **301 Redirects:** Next.js middleware fetches and applies 301/302 redirects from WordPress Headless Tools plugin in real-time, with caching and Basic Auth support.
-   **On-Demand Revalidation:** A `/api/revalidate` endpoint allows for purging the cache when WordPress content is updated, supporting specific paths, content types, or the entire site.
-   **ACF Global Scripts:** Supports injecting custom `<head>` and `<body>` scripts configured through Advanced Custom Fields (ACF) in WordPress.
-   **Gravity Forms Integration:** Provides a headless module for Gravity Forms, supporting multi-page forms, conditional logic, client-side validation, spam protection, and file uploads. It uses WPGraphQL for schema fetching and Gravity Forms REST API v2 for submissions.
-   **Design System:** A comprehensive design system is implemented using CSS variables for brand consistency, with a `/style-guide` page for visual reference.
-   **Modular Component Architecture:** Emphasizes modular React components for flexibility and maintainability.
-   **Landing Page Builder (Feature Flag):** An optional module that enables self-service landing page creation using ACF Flexible Content blocks, rendered with modular components. It uses a centralized template registry for mapping WordPress templates to frontend renderers and isolates its code in `modules/landing-builder/`.

**Core Features:**
-   Full taxonomy support for posts (categories and tags).
-   SEO-friendly URL structure and meta-data handling.
-   Development tooling for database schema management.

## External Dependencies
-   **WordPress:** Content Management System.
-   **WPGraphQL Plugin:** Provides a GraphQL API for WordPress.
-   **WPGraphQL Yoast SEO Plugin:** Integrates Yoast SEO data into WPGraphQL.
-   **WPGraphQL for ACF Plugin:** Enables ACF fields within WPGraphQL.
-   **Redirection Plugin:** Manages 301 redirects in WordPress.
-   **Gravity Forms Plugin:** For building and managing forms.
-   **WPGraphQL for Gravity Forms Plugin (AxeWP):** Integrates Gravity Forms with WPGraphQL.
-   **PostgreSQL:** Primary database for cached content.
-   **Drizzle ORM:** TypeScript ORM for interacting with PostgreSQL.
-   **Next.js:** React framework for frontend and API routes.
-   **graphql-request:** GraphQL client for interacting with WPGraphQL.
-   **Shadcn UI:** UI component library.