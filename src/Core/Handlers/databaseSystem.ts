//*  Libs
import { promises as fs } from 'fs';
import { Database } from '../../Schema/database-schema';


//*  CreateDB
/**
 * Creates the Database (JSON) with No Data in it.
 * @param file JSON Database path, Path to the Database file.
 * @param debug `Optional` Outputs some important Information to the console.
 */ 
export async function createDB(file: string, debug?: boolean) {
    try {
        //* Verify if the Database exists.
        await fs.access(file) 
        
        //? Debug message
        if (debug) console.log("\n[+] Debug: La base de datos ya existe.")

    } catch {
        try{
            //* New database and it's data
            const newDB = JSON.stringify({}, null, 4)

            //* Creates the database
            fs.writeFile(file, newDB, "utf-8")
            
            //? Debug message
            if (debug) console.log("\n[+] La base de datos ha sido creada con exito.")

        } catch (err) {
            console.error(`[-] Ha ocurrido un error al crear la base de datos.\n${err}`)
            process.exit(1)
        }
    }
}


//*  ReadDB
/**
 * 
 * @param dbfile Databse File, the Database file (JSON) path 
 * @param debug `Optional`
 * @returns 
 */
export async function readDB(dbfile: string, debug?: boolean) {
    try {
        const jsonFile = await fs.readFile(dbfile, 'utf-8') // <-- Reads the DB File
        const data: Database = JSON.parse(jsonFile);
        if (debug) console.log(data)
        
        return data;
    } catch (err) {
        console.error("[-] Error al leer el archivo JSON: " + err)
        return null;
    } 
}