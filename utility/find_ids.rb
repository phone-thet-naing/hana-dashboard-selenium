SELECT 
	db_appointment_clients.id AS appointment_id, 
    db_interview_clients.id AS interview_client_id, 
    db_interviews.id AS interview_id 
FROM `db_appointment_clients`
LEFT JOIN db_ngasayas ON db_ngasayas.group_id = db_appointment_clients.group_id
LEFT JOIN db_interview_clients ON db_interview_clients.appointment_client_id = db_appointment_clients.id
LEFT JOIN db_interviews ON db_interviews.appointment_client_id = db_appointment_clients.id
WHERE db_ngasayas.name="G0171525020THPU_0000000001"