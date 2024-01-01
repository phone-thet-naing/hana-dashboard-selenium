import * as readline from "readline"
import * as fs from "fs"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export default function getUserInput() {
    rl.question("Enter some text (Type 'No' to exist): ", function (input) {
        if (input.toLocaleLowerCase() === "no") {
            rl.close();
            return true;
        } else {
            fs.appendFile('userInput.txt', input + '\n', (err) => {
                if (err) throw err;
                console.log('Input saved!');
                // Recursive call to get the next user input
                getUserInput();
            });
        }
    })

    return true;
}

