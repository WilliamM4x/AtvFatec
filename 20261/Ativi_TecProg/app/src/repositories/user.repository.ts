import pool from "../database/db";

async function createUser(name:string, email:string){
    const sql = `
        INSERT INTO users (name, email)
        VALUES ($1,$2)
        RETURNING *
    `;
    const values = [name, email];

    try{
        const user = await pool.query(sql, values);
        return user.rows;
    }
    catch(err:any){
        console.error("Error creating user", err.message);
        throw err;
    }      
}

export  {
    createUser
};