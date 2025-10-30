//*  Libs
import { promises as fs } from 'fs';
import { Database } from '../../Schema/database-schema';
import chalk from 'chalk';


/**
 * Creates the Database (JSON) without any data in.
 * @param file JSON Database path, Path to the Database file.
 * @param debug `(Optional)` Outputs some information in the console.
 */ 
export async function createDB(path: string, debug?: boolean) {
    try {

        //* Verify if the Database exists.
        await fs.access(path) 
        
        //? Debug message
        if (debug) console.log(chalk.cyanBright("\n[+] Debug: La base de datos ya existe."))

    } catch {
        try{
            //* New database and it's data
            const newDB = JSON.stringify({}, null, 4)

            if (debug) console.log(newDB)

            //* Creates the database
            fs.writeFile(path, newDB, "utf-8")
            
            //? Debug message
            if (debug) console.log(chalk.greenBright("\n[+] La base de datos ha sido creada con exito."))

        } catch (err) {
            console.error(chalk.redBright(`[-] Ha ocurrido un error al crear la base de datos.\n`) + err)
            process.exit(1)
        }
    }
}


/**
 * Reads the Database (JSON) to find Users and other data.
 * @param dbfile Databse File, the Database file (JSON) path.
 * @param debug `(Optional)` Outputs some information in the console.
 * @returns 
 */
export async function readDB(dbfile: string, debug?: boolean) {
    try {
        const jsonFile = await fs.readFile(dbfile, 'utf-8') // <-- Reads the DB File
        const data: Database = JSON.parse(jsonFile);
        if (debug) console.log(chalk.cyan(`[+] Debug:\n${data}`))
        
        return data;
    } catch (err) {
        if (debug) console.error(chalk.redBright("[-] Error al leer el la base de datos:\n" + err))
        return null;
    } 
}