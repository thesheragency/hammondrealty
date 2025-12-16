# Headless WordPress Boilerplate

## Overview
This project provides a modern headless WordPress implementation using Next.js App Router and PostgreSQL for content caching. It aims to deliver a complete solution for building decoupled WordPress sites, focusing on WordPress's default "Posts" content type with full taxonomy support (categories and tags). The boilerplate emphasizes high performance, SEO, and a robust developer experience.

## User Preferences
I want to interact with the agent in an iterative development approach. I prefer detailed explanations of changes and potential impacts. The agent should ask for confirmation before making major architectural changes or introducing new dependencies.

## System Architecture
The system is built on a Next.js 16 App Router frontend with TypeScript, utilizing Next.js API Routes for backend functionality. Content is sourced from WordPress via WPGraphQL and cached in a PostgreSQL database managed by Drizzle ORM.

**Key Architectural Decisions:**
- **Server-Side Rendering (SSR):** All pages are SSR for improved SEO and performance.
- **Content Caching:** WordPress content is synced to PostgreSQL to enable fast data retrieval, decoupling the frontend from direct, real-time WordPress queries. Taxonomies (categories and tags) are embedded as JSON within post records in the database for simplified schema and efficient access.
- **SEO Integration:** Leverages Next.js Metadata API with Yoast SEO integration, supporting page titles, meta descriptions, Open Graph, Twitter Cards, and canonical URLs. It also proxies SEO files (sitemaps, robots.txt, llms.txt) directly from WordPress, replacing WordPress URLs with the frontend domain.
- **Preview Mode:** Allows previewing draft content directly from WordPress using query parameters.
- **301 Redirects:** Integrates with the WordPress Redirection plugin to sync and apply 301 redirects, ensuring proper URL management.
- **ACF Global Scripts:** Supports injecting custom `<head>` and `<body>` scripts configured via Advanced Custom Fields (ACF) in WordPress.
- **Gravity Forms Integration:** Includes a reusable headless module for Gravity Forms, supporting multi-page forms, conditional logic, validation, spam protection, multicolumn layouts (12-column grid), and file uploads. Uses a hybrid approach: WPGraphQL for fetching form schemas and Gravity Forms REST API v2 for form submissions (enabling native file upload support without additional plugins).
- **Design System:** Features a comprehensive design system with CSS variables for brand colors, typography, spacing, and radius, located in `app/globals.css`. A `/style-guide` page provides a live visual reference for all design tokens and components.
- **Modular Component Architecture:** Emphasizes modular React components for easy restyling and maintenance.

**Core Features:**
- Full taxonomy support (categories and tags) for posts.
- SEO-friendly URL structure and meta-data handling.
- Development tooling for database schema pushing.

## External Dependencies
- **WordPress:** Content Management System.
- **WPGraphQL Plugin:** Provides a GraphQL API for WordPress.
- **WPGraphQL Yoast SEO Plugin:** Integrates Yoast SEO data into WPGraphQL.
- **WPGraphQL for ACF Plugin:** Enables ACF fields within WPGraphQL (optional, for global scripts).
- **Redirection Plugin:** Manages 301 redirects in WordPress.
- **Gravity Forms Plugin:** For building and managing forms.
- **WPGraphQL for Gravity Forms Plugin (AxeWP):** Integrates Gravity Forms with WPGraphQL.
- **PostgreSQL:** Primary database for cached content.
- **Drizzle ORM:** TypeScript ORM for interacting with PostgreSQL.
- **Next.js:** React framework for frontend and API routes.
- **graphql-request:** GraphQL client for interacting with WPGraphQL.
- **Shadcn UI:** UI component library.