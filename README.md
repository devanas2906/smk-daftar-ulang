# SMK Daftar Ulang

Web application untuk mengelola proses **daftar ulang siswa SMK** secara digital, mulai dari pengumpulan dokumen oleh siswa hingga proses verifikasi oleh admin.

## ✨ Features

* 🔐 Authentication & role-based authorization
* 👨‍🎓 Student registration & profile management
* 📄 Upload dan pengelolaan dokumen daftar ulang
* 📝 Draft, submit, revision, approval, dan rejection workflow
* 🔔 Notification system
* 🔑 Password change & password reset
* 🗑️ Secure account deletion workflow
* 🏫 School master data management
* ☁️ Cloudinary untuk penyimpanan dokumen
* ⚡ Redis untuk OTP dan rate limiting
* 🛡️ JWT authentication, Argon2 password hashing, dan server-side validation

## 📸 Screenshots

### Student Dashboard

![Student Dashboard](/docs/screenshots/student-dashboard.png)

### Student Re-registration

![Student Re-Registration](/docs/screenshots/student-reregistration.png)

### Admin Verification

![Admin Verification](/docs/screenshots/admin-verification.png)

## 🛠️ Tech Stack

### Frontend

* HTML
* JavaScript
* SCSS
* Webpack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Services

* Redis
* Cloudinary
* Resend

## 📁 Project Structure

```text
smk-daftar-ulang/
├── client/                 # Frontend
├── server/                 # Backend
│   ├── config/             # Database & application configuration
│   ├── jobs/               # Scheduled background jobs
│   ├── middlewares/        # Authentication, authorization & validation
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── utilities/          # Reusable backend utilities
├── webpack.config.js
└── package.json
```

## 🚀 Getting Started

### Requirements

* Node.js 18+
* MongoDB
* Redis
* Cloudinary account
* Resend account

### Installation

Clone repository:

```bash
git clone https://github.com/devanas2906/smk-daftar-ulang.git
cd smk-daftar-ulang
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Copy `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Kemudian sesuaikan nilai environment variables di file .env dengan konfigurasi lokal kamu.

### Development

Jalankan frontend dan backend secara bersamaan:

```bash
npm run dev
```

### Production

Build frontend dan jalankan server:

```bash
npm start
```

### Seed Database

Untuk membuat data awal:

```bash
npm run seed
```

## 🔄 Main Workflow

```text
Student
   ↓
Register / Login
   ↓
Complete Student Data
   ↓
Upload Documents
   ↓
Save Draft / Submit
   ↓
Admin Review
   ↓
Approve / Revision / Reject
   ↓
Student Receives Status & Notification
```

## 🎯 Purpose

Project ini dibuat sebagai **portfolio project** untuk menerapkan konsep full-stack web development, authentication, authorization, file handling, database management, validation, dan workflow berbasis role.

## 👤 Author

**Devanas**

GitHub: [@devanas2906](https://github.com/devanas2906)