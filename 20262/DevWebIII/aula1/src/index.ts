import { eq } from "drizzle-orm";
import { db, pool } from "./db/index.js";
import { cars, users } from "./db/schema.js";

async function main(): Promise<void> {
    const [user] = await db
        .insert(users)
        .values({ name: "Ana Maria" })
        .returning();
    if (!user) throw new Error("Falha ao criar usuário");

    const [car] = await db
        .insert(cars)
        .values({
            idUser: user.idUser,
            plate: "ABC1D23",
        })
        .returning();
    if (!car) throw new Error("Falha ao criar automóvel");

    console.log("Usuário criado:", user);
    console.log("Automóvel criado:", car);
    const result = await db
        .select({
            userId: users.idUser,
            userName: users.name,
            carId: cars.idCar,
            plate: cars.plate,
        })
        .from(users)
        .leftJoin(cars, eq(cars.idUser, users.idUser));
    console.log("Usuários e seus automóveis:", result);
    const [updatedCar] = await db
        .update(cars)
        .set({ plate: "XYZ9K87" })
        .where(eq(cars.idCar, car.idCar))
        .returning();
    console.log("Automóvel atualizado:", updatedCar);
    await db.delete(cars).where(eq(cars.idCar, car.idCar));
    await db.delete(users).where(eq(users.idUser, user.idUser));
    console.log("Registros de demonstração excluídos.");
}

main()
    .catch((error: unknown) => {
        if (error instanceof Error) {
            console.error("Erro ao executar a aplicação:", error.message);
        }
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });