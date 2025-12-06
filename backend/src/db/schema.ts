import {
    pgTable,
    bigserial,
    varchar,
    text,
    smallint,
    boolean,
    timestamp,
    integer,
    date,
    jsonb,
    numeric,
    primaryKey,
    unique,
    index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = pgTable('users', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 150 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: smallint('role').notNull().default(0), // 0=member, 1=manager, 2=admin
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Teams Table
export const teams = pgTable('teams', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    createdBy: bigserial('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Team Members Table
export const teamMembers = pgTable('team_members', {
    teamId: bigserial('team_id', { mode: 'number' }).notNull().references(() => teams.id, { onDelete: 'cascade' }),
    userId: bigserial('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    role: smallint('role').notNull().default(0), // 0=member, 1=manager, 2=admin
    joinedAt: timestamp('joined_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    pk: primaryKey({ columns: [table.teamId, table.userId] }),
}));

// Projects Table
export const projects = pgTable('projects', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    teamId: bigserial('team_id', { mode: 'number' }).references(() => teams.id, { onDelete: 'cascade' }),
    createdBy: bigserial('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 250 }).notNull(),
    description: text('description'),
    isArchived: boolean('is_archived').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Tasks Table
export const tasks = pgTable('tasks', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    projectId: bigserial('project_id', { mode: 'number' }).references(() => projects.id, { onDelete: 'set null' }),
    teamId: bigserial('team_id', { mode: 'number' }).references(() => teams.id, { onDelete: 'set null' }),
    title: varchar('title', { length: 300 }).notNull(),
    description: text('description'),
    status: smallint('status').notNull().default(0), // 0=todo, 1=in_progress, 2=review, 3=done, 4=blocked
    priority: smallint('priority').notNull().default(1), // 0=low, 1=normal, 2=high, 3=critical
    estimateMinutes: integer('estimate_minutes'),
    createdBy: bigserial('created_by', { mode: 'number' }).references(() => users.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    startedAt: timestamp('started_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    dueDate: timestamp('due_date', { withTimezone: true }),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    metadata: jsonb('metadata'),
}, (table) => ({
    statusIdx: index('idx_tasks_status').on(table.status),
    teamIdx: index('idx_tasks_team').on(table.teamId),
    createdByIdx: index('idx_tasks_created_by').on(table.createdBy),
}));

// Task Assignments Table
export const taskAssignments = pgTable('task_assignments', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    taskId: bigserial('task_id', { mode: 'number' }).notNull().references(() => tasks.id, { onDelete: 'cascade' }),
    userId: bigserial('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    assignedBy: bigserial('assigned_by', { mode: 'number' }).references(() => users.id, { onDelete: 'set null' }),
    assignedAt: timestamp('assigned_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    unique: unique().on(table.taskId, table.userId),
    taskIdx: index('idx_task_assignments_task').on(table.taskId),
    userIdx: index('idx_task_assignments_user').on(table.userId),
}));

// Task Comments Table
export const taskComments = pgTable('task_comments', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    taskId: bigserial('task_id', { mode: 'number' }).notNull().references(() => tasks.id, { onDelete: 'cascade' }),
    userId: bigserial('user_id', { mode: 'number' }).references(() => users.id, { onDelete: 'set null' }),
    body: text('body').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Notifications Table
export const notifications = pgTable('notifications', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    userId: bigserial('user_id', { mode: 'number' }).notNull().references(() => users.id, { onDelete: 'cascade' }),
    teamId: bigserial('team_id', { mode: 'number' }),
    type: smallint('type'),
    payload: jsonb('payload'),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Task Performance Table
export const taskPerformance = pgTable('task_performance', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    taskId: bigserial('task_id', { mode: 'number' }).references(() => tasks.id, { onDelete: 'cascade' }),
    userId: bigserial('user_id', { mode: 'number' }).references(() => users.id),
    dateDay: date('date_day').notNull(),
    tasksCompleted: integer('tasks_completed').default(0),
    avgCompletionSeconds: integer('avg_completion_seconds').default(0),
    overdueCount: integer('overdue_count').default(0),
    efficiency: numeric('efficiency', { precision: 5, scale: 3 }).default('0.000'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    unique: unique().on(table.taskId, table.userId, table.dateDay),
}));

// Activity Logs Table
export const activityLogs = pgTable('activity_logs', {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    teamId: bigserial('team_id', { mode: 'number' }),
    projectId: bigserial('project_id', { mode: 'number' }),
    taskId: bigserial('task_id', { mode: 'number' }),
    userId: bigserial('user_id', { mode: 'number' }),
    type: smallint('type').notNull(),
    payload: jsonb('payload'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
    userIdx: index('idx_activity_logs_user').on(table.userId),
    taskIdx: index('idx_activity_logs_task').on(table.taskId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    teams: many(teamMembers),
    createdTeams: many(teams),
    createdProjects: many(projects),
    createdTasks: many(tasks),
    taskAssignments: many(taskAssignments),
    comments: many(taskComments),
    notifications: many(notifications),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
    creator: one(users, { fields: [teams.createdBy], references: [users.id] }),
    members: many(teamMembers),
    projects: many(projects),
    tasks: many(tasks),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
    team: one(teams, { fields: [projects.teamId], references: [teams.id] }),
    creator: one(users, { fields: [projects.createdBy], references: [users.id] }),
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
    project: one(projects, { fields: [tasks.projectId], references: [projects.id] }),
    team: one(teams, { fields: [tasks.teamId], references: [teams.id] }),
    creator: one(users, { fields: [tasks.createdBy], references: [users.id] }),
    assignments: many(taskAssignments),
    comments: many(taskComments),
}));
