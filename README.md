# 🏦 Horizon – Aplicación Bancaria Full-Stack

Aplicación bancaria moderna desarrollada con Next.js 16, que permite conectar múltiples cuentas bancarias, visualizar transacciones y realizar transferencias de fondos de forma segura y en tiempo real.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Funcionalidades Principales

### 🔐 Autenticación y Seguridad
- Autenticación segura con Appwrite
- Cookies HTTP-only para manejo de sesión
- Rutas protegidas con middleware
- Validación backend con Zod
- Manejo seguro de credenciales vía variables de entorno

### 🏦 Gestión de Cuentas Bancarias
- Conexión de múltiples cuentas mediante Plaid
- Visualización de saldos en tiempo real
- Soporte para cuentas corrientes, ahorros y crédito
- Información detallada por cuenta
- Identificadores compartibles

### 💳 Historial de Transacciones
- Lista completa de movimientos
- Filtros y búsqueda avanzada
- Categorización automática (Comida, Viajes, Transferencias, etc.)
- Estado en tiempo real
- Paginación para grandes volúmenes de datos

### 💸 Transferencias de Fondos
- Transferencias entre cuentas conectadas
- Integración con Dwolla para pagos ACH
- Notas y descripciones personalizadas
- Seguimiento del estado de cada transferencia

### 📊 Dashboard Financiero
- Balance total consolidado
- Gráfico interactivo tipo dona
- Widget de transacciones recientes
- Análisis de categorías de gasto
- Métricas de rendimiento por cuenta

### 📱 Diseño Responsive
- Adaptado a móvil, tablet y escritorio
- Navegación optimizada para dispositivos táctiles
- Drawer lateral para móvil
- Preparado para PWA


## 🛠 Stack Tecnológico

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript 5
- **UI Library:** React 19
- **Estilos:** Tailwind CSS 4
- **Componentes:** shadcn/ui + Radix UI
- **Formularios:** React Hook Form + Zod
- **Gráficos:** Chart.js con react-chartjs-2
- **Iconos:** Lucide React

### Backend & Servicios
- **Backend-as-a-Service:** Appwrite
- **API Bancaria:** Plaid
- **Procesamiento de Pagos:** Dwolla
- **Monitoreo de Errores:** Sentry

### Herramientas de Desarrollo
- **Gestor de Paquetes:** npm
- **Linting:** ESLint 9
- **Compilador:** React Compiler (Babel plugin)
- **Type Checking:** TypeScript modo estricto


## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- Node.js 20.x o superior
- npm o yarn
- Git

También necesitarás cuentas y claves API de:
- [Appwrite](https://appwrite.io/)
- [Plaid](https://plaid.com/)
- [Dwolla](https://www.dwolla.com/)
- [Sentry](https://sentry.io/) (opcional, para monitoreo de errores)


## 🚀 Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tuusuario/horizon-banking.git
cd horizon-banking
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear archivo `.env.local` en la raíz del proyecto:

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

### 4️⃣ Configurar Appwrite

1. Crear un nuevo proyecto en Appwrite
2. Crear una base de datos con las siguientes colecciones:
   - **users** (con atributos: userId, email, firstName, lastName, address1, city, state, postalCode, dateOfBirth, ssn, dwollaCustomerId, dwollaCustomerUrl)
   - **bank** (con atributos: userId, bankId, accountId, accessToken, fundingSourceUrl, shareableId)
   - **transaction** (con atributos: name, amount, senderId, senderBankId, receiverId, receiverBankId, email, channel, category)

3. Actualizar `.env.local` con los IDs de la base de datos y colecciones

### 5️⃣ Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en el navegador: 👉 [http://localhost:3000](http://localhost:3000)


## 🧠 Arquitectura de Flujo

```
Usuario → Server Action (Next.js) → API Externa (Plaid/Dwolla/Appwrite) → Base de Datos → Actualización UI
```


### Integración con Plaid
1. Usuario hace clic en "Conectar Banco"
2. Se abre el modal de Plaid Link
3. Usuario se autentica con su banco
4. Plaid retorna un token público
5. La app intercambia el token público por un token de acceso
6. Token de acceso se almacena de forma segura en Appwrite

### Integración con Dwolla
1. Usuario inicia transferencia con datos del destinatario
2. La app crea cliente Dwolla si es necesario
3. Las fuentes de fondos se vinculan vía token de procesador Plaid
4. Se inicia transferencia ACH entre fuentes de fondos
5. Transacción se registra en Appwrite

## 🔒 Características de Seguridad

- Cookies HTTP-only para gestión de sesiones
- Validación server-side con esquemas Zod
- Almacenamiento seguro de datos sensibles en Appwrite
- Variables de entorno para claves API
- Protección CSRF vía Next.js
- Sanitización y validación de inputs


## 🧪 Credenciales de Prueba

### Plaid Sandbox
Para pruebas en modo sandbox, usar:
- **Usuario:** `user_good`
- **Contraseña:** `pass_good`

Bancos de prueba disponibles:
- Chase Bank
- Bank of America
- Wells Fargo
- Citibank


## 📷 Capturas
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/28176285-51ff-4667-8f8d-558667b57052" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/20cb43b9-3bb8-42b5-8055-fe4c27d08db3" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/8401eb8a-df51-4f40-ac36-e8fe9fade2df" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ceb4f180-524c-46f1-a459-138df69bc499" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4c8e71b2-482c-421a-ad17-0d11f409cffd" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0400f395-4a8a-4978-b96a-26091ca22373" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4b2ef30e-497f-469a-b116-e57ca4fddfdf" />

