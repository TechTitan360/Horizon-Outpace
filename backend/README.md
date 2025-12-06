# Horizon Outpace Backend

Modern TypeScript backend built with Bun, Drizzle ORM, and PostgreSQL.

## Tech Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Drizzle
- **Queue**: Redis (optional)

## Setup

```bash
# 1. Install dependencies
bun install

# 2. Setup PostgreSQL database
# Create database: CREATE DATABASE outpace;

# 3. Update .env file with your PostgreSQL credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/outpace

# 4. Generate migrations (already done)
bun db:generate

# 5. Run migrations
bun src/db/migrate.ts

# 6. Start development server
bun dev
```

## Test the API

```bash
# Health check
curl http://localhost:8000/health

# Register user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test1234"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test1234"}'
```

## API Structure

- `/api/auth` - Authentication (register, login)
- `/api/users` - User management
- `/api/teams` - Team operations
- `/api/projects` - Project management
- `/api/tasks` - Task CRUD
- `/api/comments` - Task comments
- `/api/notifications` - User notifications
- `/api/analytics` - Analytics & stats

## Database Schema

- **users**: User accounts with role-based access
- **teams**: Organization teams
- **team_members**: Team membership mapping
- **projects**: Projects under teams
- **tasks**: Task management with status tracking
- **task_assignments**: Task-user assignments
- **task_comments**: Comments on tasks
- **notifications**: User notifications
- **activity_logs**: Audit trail
- **task_performance**: Performance metrics
