//*  Libs
import { User } from "../../Schema/database-schema";
import { createDB, readDB } from "./databaseSystem";
import * as bcrypt from 'bcrypt';


//* ============ Database creation ============
//? Database Path / File
const DB_FILE = "./database.json";

//? Database creator with Debug
createDB(DB_FILE);
//* ===========================================


const salt_rounds = 10
const salt = bcrypt.genSaltSync(salt_rounds)

//?  ------------------ Account System ------------------

//! Register
export async function register(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {
        try {
            const existingUser = db.users.find((dbuser) => dbuser.name.toLowerCase() === user.toLowerCase());
            if(existingUser) {
                console.error("[!] El usuario ya existe en la base de datos!")
                return;
            }

            const hashedPasswd = await bcrypt.hash(passwd, salt)
            const newID = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
            
            const newUser: User = {
                id: newID,
                name: user,
                password: hashedPasswd,
                createdAt: Date.now()
            }

            db.users.push(newUser)
            console.log(`[+] El usuario: ${user} ha sido creado con exito!`)
        } catch (e) {
            console.log()
            console.error(`[!] Ha ocurrido un error:\n${e}`)
        }
    } else {
        createDB(DB_FILE)
        return;
    }
}


//! Login
export async function login(user: string, passwd: string) {
    const db = await readDB(DB_FILE)
    if (db) {
        const dbUser = db.users.find(u => u.name.toLowerCase() === user.toLowerCase())
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
        createDB(DB_FILE)
        return;
    }
}