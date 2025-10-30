import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * 
 * @param question 
 * @param debug `(Optional)`
 * @returns 
 */
export async function askQuestion(question: string, debug?: boolean): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (r) => {
            resolve(r.trim())
            if (debug) console.log(`[+] Debug: Opcion seleccionada: ${r.trim()}`)
        });

    });
}