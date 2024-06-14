# Next.js Authentication Template

## Description
This project is a template for setting up authentication in a Next.js application using Next-Auth, Prisma, and PostgreSQL. It provides a solid foundation for quickly getting started with authentication best practices.

## Prerequisites
- Node.js
- PostgreSQL database

## Installation Steps

### 1. Clone the Repository

### 2. Install Dependencies
Install the necessary dependencies by running:
```bash
npm install
```

### 3. Configure Environment Variables
Rename the .env.example file to .env and update the environment variables accordingly.

### 4. Prisma Setup
Run the following command to push the Prisma schema to your database:
```bash
npx prisma db push
```
If you need to apply migrations (recommended for production setups), use:
```bash
npx prisma migrate dev --name init
```

### 5. Run the Development Server
Start the development server with:
```bash
npm run dev
```

## Usage
* Visit http://localhost:3000 in your browser.
* Signup and login with an account.