**Postman for the project:** [Postman Overview](https://www.postman.com/c4rlos3g/tasks/overview)

# How to Run

## Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a copy of the environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the Docker containers:
   ```bash
   docker-compose up -d
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```
5. Run the database migrations:
   ```bash
   npm run db:migrate
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

> You can view the sent emails at: [http://localhost:8025](http://localhost:8025)

## Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Create a copy of the environment variables:
   ```bash
   cp .env.example .env
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the app on Android:
   ```bash
   npm run android
   ```
5. Start the frontend development server:
   ```bash
   npm run start
   ```

# Troubleshooting

If the app is unable to connect to the API, run the following command:

```bash
adb reverse tcp:3000 tcp:3000
```
