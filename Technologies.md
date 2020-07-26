# Technologies

This document describes the languages, frameworks, libraries, tools, and configurations for this project.

## Frontend

#### UI

- React
- Sass (CSSModules)

- Theming - React.Context
- ReCaptcha protection
- Gatsby image lazy load
- Initial load < 5mb

#### State Management

- React Query or Apollo

#### Routing

- React Router
- `/settings` is a sub router or nested path, whichever is easier to manage and more scalable

#### Static Pages

- React SSR - This can be done using multiple ways:
  - Build Node.JS script that renders React `/pages` to static HTML
  - Some minimal SSG
  - Generate HTML & CSS components from React and use those in Pug

#### Component Library & Design Language

- Storybook

#### Testing

- Integration - Cypress
- Accessibility - AVA

#### Internationalisation

- Format.JS

#### PWA

- Offline availability
- Service worker Webpack plugin
- Cache for all posts

#### Formatting & Linting

- ESLint
- Prettier

#### Hosting & CI/CD

- Netlify
- TravisCI

#### Fetching & Data

- Fetch API

- Axios Interceptors to append auth token to every request

#### Monitoring

- Sentry (Free first, team at bigger scale)

#### Ads

- Google AdSense
- Twitter Ads?

#### Other

Dynamic importing and lazy loading (React suspense)

## Backend

#### API`^alpha`

- Node.JS
- Express
- GraphQL

#### API Deployment - Cloudflare Workers (If it's totally Free) All/Month`^alpha`

- Cloudflare Workers (Free, \$5, no socket)

- DigitalOcean (No Free, $5, $0.007/hr, 1TB traffic, 1GB RAM, 1vCPU, 25GB SSD)
- Heroku (Free, N/A, 2TB traffic, 500MB RAM, N/A, N/A)

#### Cache - Serverless Redis (Free)

- Cloudflare Cache API
  - 512 MB Max response size
  - 50 total API calls per request
  - 128 MB limit per worker instance (cleared periodically)
- Serverless Redis
  - 5000 Requests /day
  - 256 Persistent storage
  - Max 20 concurrent connections

#### Database - Mongo Cloud (Free)`^alpha`

​ Free Constraints:

- **8M operations/day**
- 500MB RAM
- 500 connections
- 2GB Storage
- Network in-out 20 GB total/week

#### Validation`^alpha`

- Hapi/Joi

#### Authentication - Firebase Auth (Free) `^alpha`

Other options were Okta, but Auth0 features are way more valuable. Firebase Auth is always free tho. Gotta experiment with code.

#### Media Storage - Firebase Storage (Free for first ~150k members) `^alpha`

1 Credits = 1 GB of storage || 1 GB of net bandwidth || 500 seconds video processing

- Firebase Storage

  - total of 6 credits, 5 credits all time, 1 credit a day, meaning 35 credits a month
  - each credit is 0.026 stored or .12 bandwidth (cheaper per 1000 members)
  - no limitations on file sizes
  - no transformations

- Cloudinary (alternative)
  - provides 25 monthly
  - 10 MB limitations on sizes
  - with transformations
- Firebase Storage seems enough for the first 100k members (each 10k per profile pic, without cache)

#### Notifications`^alpha`

- SendGrid for email notifications (Not in alpha)
- Firebase FCM for in-app notifications (Always free) `^alpha`
- In-house (JSON notifications file to load into UI on render) `^alpha`

#### Push Notifications `^alpha`

- SocketIO in-house

#### Payment (Not needed in alpha)

- Stripe combined with any cloud functions provider

- Paypal

      	#### Other

- Research distributed systems later
