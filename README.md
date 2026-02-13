# 🏦 Horizon – Full-Stack Banking Application

A modern banking application built with Next.js 16 that allows users to connect multiple bank accounts, view transactions, and securely transfer funds in real time.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Key Features

### 🔐 Authentication & Security
- Secure authentication with Appwrite
- HTTP-only cookies for session management
- Protected routes using middleware
- Backend validation with Zod
- Secure credential handling via environment variables
  
### 🏦 Bank Account Management
- Connect multiple bank accounts using Plaid
- Real-time balance display
- Support for checking, savings, and credit accounts
- Detailed account information
- Shareable account identifiers

### 💳 Transaction History
- Complete transaction list
- Advanced filtering and search
- Automatic categorization (Food, Travel, Transfers, etc.)
- Real-time status updates
- Pagination for large datasets

### 💸 Fund Transfers
- Transfers between connected accounts
- ACH payment integration with Dwolla
- Custom notes and descriptions
- Transfer status tracking

### 📊 Financial Dashboard
- Consolidated total balance
- Interactive donut chart
- Recent transactions widget
- Spending category analysis
- Account performance metrics

### 📱 Responsive Design

- Optimized for mobile, tablet, and desktop
- Touch-friendly navigation
- Mobile sidebar drawer
- PWA-ready


## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript 5
- **UI Library:** React 19
- **Estilos:** Tailwind CSS 4
- **Componentes:** shadcn/ui + Radix UI
- **Formularios:** React Hook Form + Zod
- **Gráficos:** Chart.js con react-chartjs-2
- **Iconos:** Lucide React

### Backend & Services
- **Backend-as-a-Service:** Appwrite
- **API Bancaria:** Plaid
- **Procesamiento de Pagos:** Dwolla
- **Monitoreo de Errores:** Sentry

### Development Tools
- **Gestor de Paquetes:** npm
- **Linting:** ESLint 9
- **Compilador:** React Compiler (Babel plugin)
- **Type Checking:** TypeScript modo estricto


## 🚀 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tuusuario/horizon-banking.git
cd horizon-banking
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env.local` file in the project root:

```env
# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=tu_project_id
APPWRITE_DATABASE_ID=tu_database_id
APPWRITE_USER_COLLECTION_ID=users
APPWRITE_BANK_COLLECTION_ID=bank
APPWRITE_TRANSACTION_COLLECTION_ID=transaction
APPWRITE_SECRET=tu_appwrite_secret

# Plaid
PLAID_CLIENT_ID=tu_plaid_client_id
PLAID_SECRET=tu_plaid_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

# Dwolla
DWOLLA_KEY=tu_dwolla_key
DWOLLA_SECRET=tu_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### 4️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Open in your browser: 👉 [http://localhost:3000](http://localhost:3000)


## 🧠 Flow Architecture

```
Usuario → Server Action (Next.js) → API Externa (Plaid/Dwolla/Appwrite) → Base de Datos → Actualización UI
```

## 🔒 Security Features

- HTTP-only cookies for session management
- Server-side validation with Zod schemas
- Secure storage of sensitive data in Appwrite
- Environment variables for API keys
- CSRF protection via Next.js
- Input sanitization and validation

## 🧪 Test Credentials

### Plaid Sandbox
For sandbox testing, use:
- **Username:** `user_good`
- **Password:** `pass_good`

Available test banks:
- Chase Bank
- Bank of America
- Wells Fargo
- Citibank

## 📷 Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/28176285-51ff-4667-8f8d-558667b57052" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20cb43b9-3bb8-42b5-8055-fe4c27d08db3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8401eb8a-df51-4f40-ac36-e8fe9fade2df" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ceb4f180-524c-46f1-a459-138df69bc499" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4c8e71b2-482c-421a-ad17-0d11f409cffd" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0400f395-4a8a-4978-b96a-26091ca22373" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4b2ef30e-497f-469a-b116-e57ca4fddfdf" />

