//* Libs
import { register, login } from './Core/auth';
import { closePrompt, prompt } from './Core/Handlers/prompt';

//*  Main Menu
async function mainMenu() {
    console.log(
        "\n--- LoginMaster TypeScript Edition ---" +
        "\n1) Iniciar Sesion" +
        "\n2) Registrarse" +
        "\n3) Salir" +
        "\n\n(Para elegir una opcion escriba el numero de esta)"
    )
    const optStr = await prompt(">> ")
    const opt = Number(optStr)

    if(isNaN(opt)) {
        console.error("[-] Error: Opcion seleccionada no numerica!")
        return true
    }

    switch (opt){
        case 1: {
            console.log()
            let user = await prompt("[+] Ingrese Usuario: ");
            let passwd = await prompt("[+] Ingrese Contraseña: ");   
            await login(String(user),String(passwd));
            break
        }
                    
        case 2: {
            console.log()
            let newUser = await prompt("[+] Ingrese nuevo Usuario: ");
            let newPasswd = await prompt("[+] Ingrese nueva Contraseña: ");
            await register(String(newUser),String(newPasswd));
            break
        }
                    
        case 3:
            console.log("[+] Saliendo...")
            return false;

        default:
            console.log("[!] Opcion seleccionada no valida.")
            break
    }
    return true;
}

//  ==============================================================

async function main() {
    let loop = true;
    while (loop) {
        loop = await mainMenu();
    }
    closePrompt()
}

main();


//  -----------------------------------------------------
//              Created by TheHiddenWolf
//                 CEO of Harley Inc
//               Copyright @HarleyInc
//  -----------------------------------------------------