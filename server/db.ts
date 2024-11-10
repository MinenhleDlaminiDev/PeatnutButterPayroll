// Imports
import sql, { config as SQLConfig } from 'mssql';

// Database configuration
const dbConfig: SQLConfig = {
    server: "DESKTOP-RJ7BVO5",
    database: "PayrollDB",
    options: {
        encrypt: false,
        trustServerCertificate: false,
    }
};

// Checking for error when connecting to database
sql.connect(dbConfig).catch(err => console.error("Database Connection Failed: ", err));

export default sql;