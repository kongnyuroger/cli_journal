import pool from "../db.js";

export async function archive (arg) {
        try{
            await pool.query('insert into archive_entries (id, entry_date, title, body, tags, archive_at) select  id, entry_date, title, body, tags, NOW() from  entries where id = $1',[parseInt(arg[1])])
            await pool.query('delete from entries where id = $1',[parseInt(arg[1])])
            console.log("archive successfuly")
        }catch(err){
            console.log(err.message)
        }
    
}

export async function unArchive(arg){
            await pool.query('insert into entries (id, entry_date, title, body, tags, created_at) select  id, entry_date, title, body, tags, NOW() from  archive_entries where id = $1',[parseInt(arg[1])])
            await pool.query('delete from archive_entries where id = $1',[parseInt(arg[1])])
            console.log("unarchive successfuly")
}


