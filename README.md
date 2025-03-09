# Currency Exchange API (Fiat ⇄ Crypto) Challenge

## 🔍 Overview

This project implements a robust API for seamless currency conversion between fiat currencies and cryptocurrencies. The API provides user registration and authentication functionality, allowing authenticated users to generate quotes in real-time.

## Demo

You can access the live demo of the API at [https://high-filide-maticapuano-d243a4d9.koyeb.app/docs](https://high-filide-maticapuano-d243a4d9.koyeb.app/docs)

## 🌟 Features

- Real-time currency conversion between fiat and crypto
- JWT-based authentication
- Comprehensive API documentation
- Modular and scalable architecture
- Environment variable validation and parsing with strong typing and schema enforcement

## 🛠 Tech Stack

- **Backend Framework:** NestJS
- **Database:** PostgreSQL with Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **API Documentation:** Swagger
- **Testing Framework:** Jest

## 🚀 Getting Started

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL
- npm
- Docker (optional)

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

6. Seed the database (optional)

```bash
npm run prisma:seed
```

## 🧪 Testing

This project uses Jest as the testing framework and includes comprehensive test coverage for all major components.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:cov

# Debug tests
npm run test:debug
```

### Test Structure

- Unit tests are organized in a `__tests__` directory within each module, with files following the `.spec.ts` naming convention for clear test identification
- Test coverage reports are generated in the `coverage` directory

### Test Configuration

The project uses the following Jest configuration:

- Test files pattern: `*.spec.ts`
- Coverage collection from all TypeScript files
- Path aliases for easy imports (@/modules, @/shared)
- Node.js test environment

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
POST /v1/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "12345678"
}
```

#### Get Current User Profile

```http
GET /v1/auth/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2025-03-08T12:49:31.856Z",
  "updatedAt": "2025-03-08T12:49:31.856Z"
}
```

### Currency Exchange

#### Create Quote

```http
POST /v1/quotes
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
GET /v1/quotes/:id
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
