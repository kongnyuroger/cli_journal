import pool from "../db.js";

export default async function list (argv){
    try{ 
    if(argv[1] === 'archive'){
        const res = await pool.query('select * from archive_entries order by archive_at;')
        console.log(res.rows)
        return 0
    }
    const res = await pool.query('select * from entries order by created_at;')
      console.log(res.rows)
    } catch(err){
        console.log(err.message)
    }
}