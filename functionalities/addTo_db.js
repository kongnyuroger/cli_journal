
import * as readline from "readline/promises"
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({input, output})

const add = async() => {

    const text = 'INSERT INTO entries (title, body, tags) VALUES ($1, $2, $3) RETURNING *';
    const title = await rl.question(`title: `);
    const body = await rl.question(`body: `);
    const tagStr = await rl.question(`tags seperated at ",": `);
    const tags = tagStr.split(',');
    const gottenValues = [
      title,
      body,
      tags
    ];
   const inserted = await client.query(text, [title,body,tags])
   console.log("Inserted row:", inserted.rows[0]);

    rl.close();
}

export default add;