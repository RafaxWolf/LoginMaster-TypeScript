//*  Libs
import { User } from "../Schema/database-schema";
import { createDB, readDB, saveDB } from "./Handlers/database-handler";
import * as bcrypt from 'bcrypt';


//* ============ Database creation ============
    //? Database Path / File
    const DB_FILE = "./database.json";

    //? Database creator
    createDB(DB_FILE);
//* ===========================================


const salt_rounds = 10
const salt = bcrypt.genSaltSync(salt_rounds)

//?  ------------------ Account System ------------------

//! Register
/**
 * Creates a new valid user from a template and registers it in the database.
 * 
 * @param user Username of the new user.
 * @param passwd Password of the new user (it will be hashed later on).
 * @returns If fails to create the user it will return to the main menu.
 * 
 * @example
 * import { register } from './Core/Handlers/auth.ts';
 * 
 * let user = "User"
 * let password = "Password"
 * 
 * (async () => {
 *     register(user,passwd) //<= Creates the new user to the Database
 * });
 * 
 */
export async function register(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {
        const existingUser = db.users.some(dbuser => dbuser.name.toLowerCase() === user.toLowerCase());
        if(existingUser) {
            console.error("[!] El usuario ya existe en la base de datos!")
            return;
        }

        const newID = db.users.length + 1
        const hashedPasswd = await bcrypt.hash(passwd, salt)
            
        const newUser: User = {
            id: newID,
            name: user,
            password: hashedPasswd,
            createdAt: Date.now()
        }

        db.users.push(newUser)
        await saveDB(DB_FILE, db)
        console.log(`[+] El usuario: ${user} ha sido creado con exito!`)
    } else {
        createDB(DB_FILE)
        return;
    }
}


//! Login
/**
 * 
 * @param user 
 * @param passwd 
 * @returns 
 */
export async function login(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {
        const dbUser = db.users.find(
            u => u.name.toLowerCase() === user.toLowerCase()
        )
        if(!dbUser) {
            console.error(`[!] Usuario y/o contraseña incorrectos!`)
            return;
        }

        const passwdMatch = await bcrypt.compare(passwd, dbUser.password)
        if(!passwdMatch) {
            console.error("[!] Usuario y/o contraseña incorrectos!")
            return;
        }

        console.log(`[+] Sesion iniciada como: ${user}`)

    } else {
        createDB(DB_FILE, true)
        return;
    }
}