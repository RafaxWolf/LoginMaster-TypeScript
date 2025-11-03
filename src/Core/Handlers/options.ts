import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 * Creates the Input interface using a Promise.
 * @param question Where the user will input the questioned data.
 * @param debug `(Optional)` Use `true` if you want to see some extra data.
 * @returns The answer of the Input. The answer will be a `Object` everytime.
 * If you want to use it for a `Number` input you will need to convert it to a `Number()` 
 */
export async function askQuestion(question: string, debug?: boolean): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (r) => {
            resolve(r.trim())
            if (debug) console.log(`[+] Debug: Opcion seleccionada: ${r.trim()}`)
        });

    });
}