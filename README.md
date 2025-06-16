# Job Hunters 🇪🇬

A modern job board web app built for Egypt using Laravel 12, React, Inertia.js, and Tailwind CSS.

## 🚀 Features
- Admin job review system before publishing
- Categorized job listings (e.g., Engineering, CS)
- Authentication via Laravel Breeze
- SPA behavior via Inertia.js
- Tailwind CSS for styling

## ⚙️ Setup Instructions

```bash
git clone https://github.com/YOUR_USERNAME/job_hunters.git
cd job_hunters
cp .env.example .env
composer install
npm install
php artisan key:generate
npm run dev
php artisan serve
