#!/usr/bin/env node
import { Client } from "pg";
import * as readline from "readline/promises"
import {stdin as input, stdout as output} from 'node:process'


const rl = readline.createInterface({input, output})


const client = new Client({
  user: "roger",
  host: "localhost",
  database: "journal_dev",
  password:  "1234",
  port:  5432,
});




function showHelp() {
  console.log(`
Developer Journal CLI – Usage
=============================
journal add               Create a new entry interactively
journal search [options]  Search entries
journal list [options]    List entries
journal --help            Show this help
journal
Search options:
  --keyword <text>        Free-text search in title/body
  --tag <tag>             Filter by tag
  --date <YYYY-MM-DD>     Exact date
  --from <YYYY-MM-DD> --to <YYYY-MM-DD>  Date range

List options:
  --limit <n>             Max rows to display (default: none)
`);
}



const argv = process.argv.slice(2);
const command = argv[0];


console.log(command)


switch (command) {
  case undefined:
  case '--help':
  case 'help':
    showHelp();
    
    break;

  case 'add':
    await client.connect();

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
    await client.end();
    rl.close();
    break;

  case 'search':
    await client.connect();
      if (argv[1] === "--keyword"){
        const res =  await client.query('SELECT * FROM entries  WHERE body LIKE $1 OR title LIKE $2', [`%${argv[2]}%`, `%${argv[2]}%`]);
        console.log(res.rows)
      }

      if(argv[1] === "--tag"){
        const res =  await client.query('SELECT * FROM entries  WHERE $1 = ANY(tags)', [argv[2]] );
        console.log(res.rows)
      }
    
      if(argv[1] === "--date"){
        const res =  await client.query('SELECT * FROM entries  WHERE   Date(created_at) = $1', [argv[2]] );
        console.log(res.rows)
      }
      if (argv[1] === "--from" ) {
        const fromDate = argv[2]; 
        const toDate = argv[4];   

        const res = await client.query(
          "SELECT * FROM entries WHERE date(created_at) BETWEEN $1 AND $2",
          [fromDate, toDate]
        );

        console.log(res.rows);
      }


    client.end()
    process.exit()
    break;
  case 'list':
    await client.connect()
    const res = await client.query('select * from entries order by created_at;')
    console.log(res.rows)
  
    
    break;

  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
