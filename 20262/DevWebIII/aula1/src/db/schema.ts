// src/db/schema.ts
import { relations } from "drizzle-orm";
import { char, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    idUser: serial("id_user").primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
});

export const cars = pgTable("cars", {
    idCar: serial("id_car").primaryKey(),
    idUser: integer("id_user")
        .notNull()
        .references(() => users.idUser), // define a chave estrangeira no banco
    plate: char("plate", { length: 7 }).notNull(),
});

// relations(...) configura o relacionamento para as consultas do Drizzle
export const usersRelations = relations(users, ({ many }) => ({
    cars: many(cars),
}));

export const carsRelations = relations(cars, ({ one }) => ({
    user: one(users, {
        fields: [cars.idUser],
        references: [users.idUser],
    }),
}));
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Car = typeof cars.$inferSelect;
export type NewCar = typeof cars.$inferInsert;