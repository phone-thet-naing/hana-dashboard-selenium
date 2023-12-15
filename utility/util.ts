import { NewData } from "../features/step-definitions/then";
import * as fs from "fs"

const path = './data/requests.json'

export function getCurrentDateTime(format: string = "dd-mm-yyyy") {
    const currentDateTime = new Date();

    // Get the day, month, and year components
    const day = currentDateTime.getDate();
    const month = currentDateTime.getMonth() + 1; // Months are zero-indexed
    const year = currentDateTime.getFullYear();

    // Get the hour and minute components
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    // Ensure that single-digit day, month, hour, and minute are formatted with leading zeros
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    let formattedDateTime: string = "";
    if (format === "dd-mm-yyyy") {
        // Construct the date and time string in "dd-mm-yyyy hh:mm" format
        formattedDateTime = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else if (format === "yyyy-mm-dd") {
        // yyyy-mm-dd
        formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    } else {
        // mm-dd-yyyy
        formattedDateTime = `${formattedMonth}-${formattedDay}-${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    
    return formattedDateTime;
}

export function writeJSON(newData: NewData) {
    console.log('Interview ID => ', newData.interviewId);
    
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

export function addInterviewStatus(status: string) {
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
        let jsonData: NewData[] | [] = [];
        try {
            jsonData = JSON.parse(data)
        } catch (error) {
            console.log("Error in JSON parsing: ", error)
        }

        const intreviewStatus = {
            request: status
        }

        // Add intreview status to the last json element
        const updatedJsonData = jsonData.map((data: NewData, index: number) => {
            if (index === jsonData.length - 1) {
                return {...data, request: status }
            }
            else return data;
        })              

        // Convert back to json format
        const updatedJson = JSON.stringify(updatedJsonData, null, 2)

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

export function getCallCenterQuery({interview_id, call_date, created_at, updated_at, ca_assessment_date}) {
    return `INSERT INTO
    dp_call_center(
        id,
        interview_id,
        call_status,
        call_date,
        remark,
        uploaded_by,
        created_at,
        updated_at
    )
VALUES
    (
        NULL,
        '${interview_id}',
        '2',
        '${call_date}',
        'remark',
        'ptn',
        '${created_at}',
        '${updated_at}'
    );

INSERT INTO
    dp_call_center_history (
        id,
        interview_id,
        area_no,
        region,
        office,
        client_id,
        loan_id,
        group_name,
        phone_no1,
        phone_no2,
        success_call_phone_no,
        officer_name,
        client_name,
        father_name,
        nrc,
        ca_assessment_date,
        call_date,
        call_status,
        remark,
        uploaded_by,
        created_at,
        updated_at
    )
VALUES
    (
        NULL,
        '${interview_id}',
        'QA Testing',
        'Region 1',
        'Thein Phyu',
        '407396',
        '000000',
        '_',
        '9687879625',
        '-',
        '-',
        'Aung Aung',
        'U Min Thu',
        'U Thu Win',
        '၁/မကန()၀၀၀၀၀၅',
        '${ca_assessment_date}',
        '${call_date}',
        '2',
        'remark',
        'ptn',
        '${created_at}',
        '${updated_at}'
    );`
}