# Currency Exchange API (Fiat ⇄ Crypto)

A modern NestJS API for converting between fiat currencies and cryptocurrencies with real-time price fetching and secure authentication.

## 🌟 Features

- Real-time currency conversion between fiat and crypto
- JWT-based authentication
- Rate limiting and request caching
- Comprehensive API documentation
- Modular and scalable architecture
- Environment variable validation and parsing with strong typing and schema enforcement

## 🛠 Tech Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL with Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **API Documentation:** Swagger

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- npm or yarn

### Environment Setup

1. Clone the repository

```bash
git clone https://github.com/maticapuano/koywe-challenge
cd koywe-challenge
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory or copy `.env.example` and fill in the required environment variables.

4. Run database migrations

```bash
npm run prisma:migrate
```

5. Start the development server

```bash
npm run start:dev
```

## 📚 API Documentation

### Authentication

#### Register a new user

```http
POST /v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "12345678"
}
```

#### Login

```http
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "12345678"
}
```

### Currency Exchange

#### Create Quote

```http
POST /v1/quote
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1000000,
  "from": "ARS",
  "to": "ETH"
}
```

#### Get Quote

```http
GET /v1/quote/:id
Authorization: Bearer <token>
```

## 🐳 Docker Support

### Build and run with Docker Compose

```bash
docker-compose up -d
```

This will start:

- NestJS application on port 3000
- PostgreSQL database on port 5432

## 📝 Development Guidelines

### Code Style

- Follow the NestJS best practices and conventions
- Use TypeScript features appropriately
- Maintain consistent code formatting with Prettier
- Follow ESLint rules

## 🔒 Security Considerations

- All endpoints (except signin,register and current profile) require JWT authentication
- Passwords are hashed using bcrypt
- Environment variables are properly handled

## 🤖 AI Tools Used

- Codeium: Used for code suggestions and documentation generation

## Author

- **Matias Capuano** - [LinkedIn](https://www.linkedin.com/in/matias-capuano) - [Github](https://github.com/maticapuano)
