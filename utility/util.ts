import { NewData } from "../features/step-definitions/then";
import * as fs from "fs"

const path = './data/requests.json'

export function getCurrentDateTime() {
    const currentDateTime = new Date();

    // Get the day, month, and year components
    const day = currentDateTime.getDate();
    const month = currentDateTime.getMonth() + 1; // Months are zero-indexed
    const year = currentDateTime.getFullYear();

    // Get the hour and minute components
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    // Ensure that single-digit day, month, hour, and minute are formatted with leading zeros
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the date and time string in "dd-mm-yyyy hh:mm" format
    const formattedDateTime = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;

    return formattedDateTime;
}

export function writeJSON(newData: NewData) {
    // Read the json file
    fs.readFile(path, 'utf-8', (error, data) => {
        if (error) {
            if (error.code === 'ENOENT') {
                console.error("File not found. Creating new one")
                return;
            }
            console.log("Error reading file: ", error)
            return
        }

        // Parse existing data
        let jsonData: NewData[] = [];
        try {
            jsonData = JSON.parse(data)
        } catch (error) {
            console.log("Error in JSON parsing: ", error)
        }

        // Add new data
        jsonData.push(newData)

        // Convert back to json format
        const updatedJson = JSON.stringify(jsonData, null, 2)

        // Write the updated json into the file back
        fs.writeFile(path, updatedJson, 'utf-8', (error) => {
            if (error) {
                console.error("Error writing file: ", error);
            } else {
                console.log("Data added successfully");
            }
        })
    })
}