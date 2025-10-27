//* Libs
import { User } from "../Schema/database-schema";
import { createDB, readDB } from "./databaseSystem";
//import bcrypt from 'bcrypt';


//* Database creation
const DB_FILE = "./database.json" //? <==  Database Path / File
createDB(DB_FILE); //? Database creator with Debug


//?  ------------------ Account System ------------------
//! Register
export async function register(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {
        try {
            const userSearch = db.users.find((dbuser) => dbuser.name.toLowerCase() === user.toLowerCase());
            if(userSearch) {
                console.error("[!] El usuario ya existe en la base de datos!")
            } else {
                const allID = db.users.map(user => user.id);
                console.log(allID)
    
                const newID = allID.length + 1 || 1
                console.log(newID)
    
                /* const hashedPasswd = "asd"
    
                const userData: User = {
                    id: newID,
                    name: user,
                    password: hashedPasswd,
                    createdAt: Date.now()
                } */
            }
        } catch (e) {
            console.error(e)
        }
        
    }
}


//! Login
export async function login(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {

    }
}