//* Libs
import * as readline from 'node:readline'
import { register, login } from './Core/auth'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (r) => resolve(r.trim()));
    });
}

async function mainMenu() {
    //*  Main Menu
    console.log(
        "--- LoginMaster TypeScript Version ---" +
        "\n1) Iniciar Sesion" +
        "\n2) Registrarse" +
        "\n3) Salir\n" +
        "(Para elegir una opcion escriba el numero de esta)"
    )
    const opt = await askQuestion(">> ")

    const numOpt = Number(opt)

    if(!isNaN(numOpt)) {
        switch (numOpt){
            case 1:
                let user = await askQuestion("[+] Ingrese Usuario: ");
                let passwd = await askQuestion("[+] Ingrese Contraseña: ");
                    
                login(String(user),String(passwd));
            break
                    
            case 2:
                let newUser = await askQuestion("[+] Ingrese nuevo Usuario: ");
                let newPasswd = await askQuestion("[+] Ingrese nueva Contraseña: ");
                    
                register(String(newUser),String(newPasswd));
            break
                    
            case 3:
                console.log("[+] Saliendo...")
                return false
            default:
                console.log("[!] Opcion seleccionada no valida.")
            break
        }
    } else {
        console.error("[-] Error: Opcion seleccionada no numerica!")
    }
    return true;
}

async function main() {
    let loop = true;
    while (loop) {
        loop = await mainMenu();
    }
}

main();
//  -----------------------------------------------------
//              Created by TheHiddenWolf
//                 CEO of Harley Inc
//               Copyright @HarleyInc
//  -----------------------------------------------------