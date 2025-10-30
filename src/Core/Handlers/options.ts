import * as readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export async function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (r) => resolve(r.trim()));
    });
}