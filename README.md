---- Project Title :  Automated Lead Management System (LMS) for Multi-Source Integration

> Project Overview

The Automated Lead Management System (LMS) is a full-stack MERN application designed to collect, centralize, and manage leads in real time from multiple marketing platforms including:

> Company Website

> Meta Ads (Facebook & Instagram Lead Forms)

> Google Ads Lead Form Extensions

The system eliminates manual lead handling by providing a single unified dashboard where all leads are automatically stored, deduplicated, analyzed, and notified to admins instantly.

> Problem Statement

In many organizations:

Leads arrive from multiple platforms

Teams manually export CSVs or check dashboards

Leads are delayed, duplicated, or missed

No unified analytics or real-time alerting

This project solves that by introducing a centralized, automated, and scalable lead pipeline.

> Solution Architecture
User / Ad Platform
        ↓
Lead Source (Website / Meta / Google)
        ↓
Webhook / API Endpoint (Node.js + Express)
        ↓
Validation & Deduplication
        ↓
MongoDB Database
        ↓
Real-Time Dashboard + Email Alerts

> Tech Stack
Frontend

React.js

Material UI (MUI)

Axios

Recharts (Analytics)

Custom CSS

Backend

Node.js

Express.js

MongoDB + Mongoose

REST APIs

Webhooks (Meta & Google)

Integrations

Meta Graph API (Leadgen Webhooks)

Google Ads Lead Forms (Webhook based)

Nodemailer (Email notifications)

🔗 Lead Sources Explained
> Website Leads

Captured through a frontend form

Validated on backend

Automatically tagged as source = "website"

Stored instantly in MongoDB

Admin notified via email

> Represents real landing page behavior

> Meta Ads (Facebook & Instagram) Leads

Meta Lead Forms do not send full lead data directly.

Real Flow:

User submits Meta Lead Form

Meta sends a webhook with leadgen_id

Backend uses Meta Graph API

Fetches actual lead details

Saves lead with source = "meta"

Proof of Integration:

Webhook verification success

Leadgen subscription enabled

Terminal logs receiving webhook events

Screenshots included in UI (About section)

==== Due to ad cost & account restrictions, live ads are not run, but the production-grade webhook flow is fully implemented.

> Google Ads Leads

Google Ads Lead Form Extensions send data via webhook

Backend captures:

Name

Email

Phone

Campaign name

Keyword

Leads tagged as source = "google"

Used for:

Campaign performance

ROI analysis

Lead attribution

** Data Validation & Deduplication

The system prevents duplicate leads by checking:

> Phone number

> Email address (if provided)

$or: [{ phone }, { email }]


This ensures:

No repeated leads

Clean CRM-style data

Reliable analytics

> Email Notification System

Whenever a new lead is created:

An instant email is sent to the admin

Includes:

Lead name

Phone

Email

Source

Campaign name

Timestamp

** Screenshot proof of real emails is included in the project UI.

> Email service uses Gmail App Passwords for security.

> Central Dashboard Features

Unified list of all leads

Source-based filtering (Website / Meta / Google)

Status tracking (new, contacted, converted)

Campaign visibility

Real-time lead count

Analytics with pie charts

> Demo Mode Explanation (For Evaluators)

Due to:

Advertising costs

Platform restrictions

Account approval requirements

Meta & Google leads are demonstrated using simulation + webhook-ready architecture.

However:

The webhook endpoints

API logic

Data fetching

Deduplication

Email alerts

> All follow real-world production standards.

This approach is commonly used in enterprise POCs and system design evaluations.

> Project Structure (Simplified)
frontend/
 ├── components/
 ├── pages/
 ├── api/
 ├── assets/
 └── styles/

backend/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── services/
 └── webhooks/

***** How to Run Locally
Backend
npm install
npm run dev

Frontend
npm install
npm run dev

=================Author=============

Ashish Yadav
Full-Stack MERN Developer
Experience: Web apps, APIs, dashboards, integrations
Focus: Scalable backend systems & real-world workflows

******>> What This Project Demonstrates

✔ System design thinking
✔ Real-world webhook architecture
✔ API integrations
✔ Data validation & security
✔ Admin notifications
✔ Production-level backend logic

** Final Note

This project is not just CRUD.
It demonstrates how real businesses handle leads at scale using automation, APIs, and event-driven systems.
