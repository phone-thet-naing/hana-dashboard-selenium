function generateCallCenterSql(interviewId) {

    const call_center = `INSERT INTO \`dp_call_center\`(\`id\`,\`interview_id\`,\`call_status\`,\`call_date\`,\`remark\`,\`uploaded_by\`,\`created_at\`,\`updated_at\`)VALUES(NULL,'${interviewId}','2','2023-03-27 00:00:00','remark','Phone Thet Naing','2023-01-28 00:00:00','2023-01-02 00:00:00');  `

    const call_center_history = `INSERT INTO \`dp_call_center_history\` (\`id\`, \`interview_id\`, \`area_no\`, \`region\`, \`office\`, \`client_id\`, \`loan_id\`, \`group_name\`, \`phone_no1\`, \`phone_no2\`, \`success_call_phone_no\`, \`officer_name\`, \`client_name\`, \`father_name\`, \`nrc\`, \`ca_assessment_date\`, \`call_date\`, \`call_status\`, \`remark\`, \`uploaded_by\`, \`created_at\`, \`updated_at\`) VALUES (NULL, '${interviewId}', 'QA Testing', 'Region 1', 'Thein Phyu', '407396', '875217', '254340', '9687879625', '-', '-', 'Aung Aung', 'U Min Thu', 'U Thu Win', '၁/မကန(နိုင်)၀၀၀၀၀၅', '2023-01-02 15:30:00', '2022-12-02 00:00:00', '2', 'remark', 'yezsl', '2022-12-16 16:13:22', '2023-08-30 12:10:00');`

    return '\n' + call_center + '\n\n' + call_center_history + '\n';
}

const main = () => {
    const interviewIdList = [
        "684a7b35-84b2-40a3-8e8c-c695a8da9a94", 
        "bbe208ca-18f7-4fa7-99cb-b9db712ba748",
        "b0a087be-1021-4ad3-b53d-5f6d812b77c0"
    ]

    for (const interviewId of interviewIdList) {
        console.log(generateCallCenterSql(interviewId))

    }
}

main();
