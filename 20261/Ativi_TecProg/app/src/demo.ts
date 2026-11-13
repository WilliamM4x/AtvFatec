import { createUser } from "./repositories/user.repository";

async function demo() {
    const res = await createUser("jeca", "aljdhkg@gmail.com");
    console.log("Resposta", res);
}

demo();

export default demo;