# CampusCare — Smart Complaint & Maintenance System

A responsive campus maintenance portal for students and campus administrators. Built with Next.js, TypeScript, Supabase and a lightweight NLP-style rules engine.

## Features
- Student complaint submission with ticket IDs and location details
- AI-assisted category and priority suggestions (keyword-based baseline NLP)
- Similarity-based duplicate warning before/after submission
- Complaint status workflow: Submitted → In Progress → Resolved
- Admin status management, student upvotes, search and filtering
- Dashboard KPIs, priority overview and category analytics
- Demo mode with browser localStorage; optional persistent Supabase database
- Student/admin demonstration view switch (not production authentication)
- Responsive desktop and mobile layouts

## Tech stack
- Next.js 15 + React 19 + TypeScript
- Supabase (PostgreSQL) for optional persistent storage
- Tailwind CSS 4 (with custom responsive CSS)
- Lucide icons

## Run locally
1. Install Node.js 20.9+.
2. In this folder run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:3000.

The app runs immediately in **Demo mode**. Demo data and changes are stored in the browser's localStorage.

## Enable persistent database
1. Create a project at https://supabase.com.
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in the project URL and anon/public key:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
   ```
4. Restart the dev server. The top bar should show **Database connected**.

> Security note: the included SQL policies are intentionally permissive for a student demo and evaluation. Do not use them for real campus data. Before production, add Supabase Auth, role claims for students/admins, ownership checks, protected admin updates, upload storage policies and rate limiting. Never expose the Supabase service-role key in a browser app.

## Deploy to Vercel
1. Push this repository to GitHub.
2. In https://vercel.com choose **Add New → Project** and import the repository.
3. Keep the framework preset as **Next.js**.
4. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Project → Settings → Environment Variables if using Supabase. Without them, the site deploys in demo mode.
5. Deploy. Vercel will run `npm run build` automatically.

## GitHub
Suggested repository name: `CampusCare`.
```bash
git init
git add .
git commit -m "Build CampusCare campus maintenance platform"
git branch -M main
git remote add origin https://github.com/Iksha-Goomber/CampusCare.git
git push -u origin main
```

## Current demo scope
The current starter is a functional prototype. Role switching is a UI demonstration only; it does not authenticate users or enforce administrator permissions. Complaint image attachments, email notifications, and real staff assignment workflows are not implemented yet. Configure Supabase and implement the production security upgrades below before handling real student information.

## AI logic
`lib/ai.ts` provides explainable keyword-based categorization and priority scoring plus Jaccard token similarity for duplicate hints. This is a transparent baseline rather than a trained ML model. It is easy to replace with a trained classifier or an LLM API later.

## Suggested next production upgrades
- Supabase Auth and verified campus email sign-in
- Admin role management and per-hostel/department routing
- Private image storage and attachment moderation
- Email/in-app notifications and SLA timers
- Audit log for status changes and assignment history
- Trained multilingual classifier for English/Hinglish complaint text
