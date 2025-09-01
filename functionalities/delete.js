import pool from "../db.js";

export default async function deleteRecode (arg) {
        try{
            await pool.query('delete from entries where id = $1',[parseInt(arg[1])])
            console.log("deleted successfuly")
        }catch(err){
            console.log(err.message)
        }
    
}