import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  workload: integer('workload').notNull(),
});
