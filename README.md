Database import job
-------------------

1. Once daily, scan DynamoDB table for all records
2. Save records as CSV file
3. Re-seed postgres database with that CSV data
4. Edit another postgres database table to record that the job was successful