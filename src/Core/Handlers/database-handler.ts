//*  Libs
import { promises as fs } from 'fs';
import { Database } from '../../Schema/database-schema';
import chalk from 'chalk';

// ================================== CreateDB ================================== \\
/**
 * Creates the Database (JSON) without any data in.
 * @param file JSON Database path, Path to the Database file.
 * @param debug `(Optional)` Outputs some information in the console.
 */ 
export async function createDB(dbpath: string, debug?: boolean) {
    try {

        //* Verify if the Database exists.
        await fs.access(dbpath)
        if (debug) console.log(chalk.cyanBright("\n[+] La base de datos ya existe."))

    } catch {
        try {
            
            //! Deprecated
            /* 
            //* New database without data in it.
            const newDB = JSON.stringify({}, null, 4)
            if (debug) console.log(newDB)

            //* Creates the database
            fs.writeFile(path, newDB, "utf-8")
            */
            
            const newDB: Database = { users: [] }

            const dbStr = JSON.stringify(newDB, null, 4)
            if (debug) console.log(dbStr)

            await fs.writeFile(dbpath, dbStr, "utf-8")
            if (debug) console.log(chalk.greenBright("\n[+] La base de datos ha sido creada con exito."))

        } catch (err) {
            console.error(chalk.redBright(`[-] Ha ocurrido un error al crear la base de datos.\n`) + err)
            process.exit(1)
        }
    }
}

// ================================== ReadDB ================================== \\
/**
 * Reads the Database (JSON) to find Users and other data.
 * @param dbfile Databse File, the Database file (JSON) path.
 * @param debug `(Optional)` Outputs some information in the console.
 * @returns The date of the Database or null if it can't read it.
 */
export async function readDB(dbfile: string, debug?: boolean) {
    try {
        //* Reads the Database
        const jsonFile = await fs.readFile(dbfile, 'utf-8')

        const data: Database = JSON.parse(jsonFile);
        if (debug) console.log(chalk.cyan(`[+] Debug:\n${data}`))
        
        return data;
    } catch (err) {
        if (debug) console.error(chalk.redBright("[-] Error al leer el la base de datos:\n" + err))
        return null;
    } 
}

// ================================== SaveDB ================================== \\
/**
 * Saves the new Data in the Database (JSON file).
 * @param dbfile Path / File of the Database (JSON)
 * @param data Data that will be saved in the Database (User)
 * @param debug `(Optional)`
 */
export async function saveDB(dbfile: string, data: Database, debug?: boolean) {
    try {
        const jsonData = JSON.stringify(data, null, 4)
        if (debug) console.log(jsonData)

        await fs.writeFile(dbfile, jsonData, "utf-8")

        if (debug) console.log("[+] Nuevos datos guardados en la base de datos.")

    } catch (err) {
        console.error("[-] Error al guardar en la base de datos: " + err)
    }
}