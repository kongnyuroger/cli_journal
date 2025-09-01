import pool from "../db.js";
import * as readline from "readline/promises"
import {stdin as input, stdout as output} from 'node:process';


export default async function update (arg) {
        const rl = readline.createInterface(input, output)
        try{
            const record  = await pool.query('select * from entries where id = $1',[parseInt(arg[1])])
            console.log(record.rows[0])
            const newTitle = await rl.question(`update title (current): `)
            if(newTitle.length !== 0){
                 await pool.query(`update entries set title = $1 where id = ${record.rows[0].id}`,[newTitle])
            }
            const newbody = await rl.question(`update body (current): `)
            if(newbody.length !== 0){
                 await pool.query(`update entries set body = $1 where id = ${record.rows[0].id}`,[newbody])
            }
            console.log("update succesfull")

            rl.close()
        }catch(err){
            console.log(err.message)
        }
    
}

