This document specifies actions to be taken according to MAU and scale. It describes how we'll scale this project to accommodate for bigger user base.

### Alpha (Free, 1k MAU)

###### API Deployment - Cloudflare Workers 

###### API Cache - Cloudflare Cache API or Serverless Redis 

###### Notifications Socket - Heroku

###### DDoS Protection - Available with Cloudflare Workers

###### Database - Mongo Cloud 

###### Authentication - Firebase Auth

###### Media Storage - Firebase Storage (Free for first ~150k members)

###### Notifications - Firebase FCM & In-house

###### Monitoring - Sentry

### Beta (Paid, 10k members)

###### API Deployment - Cloudflare Workers ($5/month)

###### API Cache - Cloudflare Cache API or Serverless Redis ($0.4 per 100K request + disk storage cost)

###### Notifications Socket - Heroku

###### DDoS Protection - Available with Cloudflare Workers

###### Database - Mongo Cloud 

###### Authentication - Firebase Auth

###### Media Storage - Firebase Storage (Free for first ~150k members)

###### Notifications - Firebase FCM & In-house

### Gamma (Paid, 50k members)

###### API Deployment - DigitalOcean ($5-20)

###### API Cache - Redis

###### Notifications Socket - Heroku

###### DDoS Protection - Available with Cloudflare Workers

###### Database - Mongo Cloud 

###### Authentication - Firebase Auth

###### Media Storage - Firebase Storage (Free for first ~150k members)

###### Notifications - Firebase FCM & In-house

### Delta (Paid, 100k members)

### Epsilon (Paid, 200k members)