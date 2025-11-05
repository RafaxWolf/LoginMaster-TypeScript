//* Libs
import { register, login } from './Core/Handlers/auth';
import { askQuestion } from './Core/Handlers/options';

//*  Main Menu
async function mainMenu() {
    console.log(
        "\n--- LoginMaster TypeScript Edition ---" +
        "\n1) Iniciar Sesion" +
        "\n2) Registrarse" +
        "\n3) Salir" +
        "\n\n(Para elegir una opcion escriba el numero de esta)"
    )
    const optStr = await askQuestion(">> ")
    const opt = Number(optStr)

    if(isNaN(opt)) {
        console.error("[-] Error: Opcion seleccionada no numerica!")
        return true
    }

    switch (opt){
        case 1:
            console.log()
            let user = await askQuestion("[+] Ingrese Usuario: ");
            let passwd = await askQuestion("[+] Ingrese Contraseña: ");   
            await login(String(user),String(passwd));
        break
                    
        case 2:
            console.log()
            let newUser = await askQuestion("[+] Ingrese nuevo Usuario: ");
            let newPasswd = await askQuestion("[+] Ingrese nueva Contraseña: ");
            await register(String(newUser),String(newPasswd));
        break
                    
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
    process.exit(0);
}

main();


//  -----------------------------------------------------
//              Created by TheHiddenWolf
//                 CEO of Harley Inc
//               Copyright @HarleyInc
//  -----------------------------------------------------