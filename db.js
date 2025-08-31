import Pool from "pg-pool";



const pool = new Pool({
  user: "roger",
  host: "localhost",
  database: "journal_dev",
  password:  "1234",
  port:  5432,
});

export default pool