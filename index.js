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
    const tag = tagStr.split(',');
    const values = [
      title,
      body,
      tag
    ];

   client.query(text, values, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.log('Inserted:', res.rows[0]);
      }
    });
    client.end();
    rl.close();
    break;

  case 'search':
    console.log("thinking on how to implement search")
    break;

  case 'list':
    await client.connect()
    client.query('select * from entries', (err, res) => {
      if(!err){
        console.log(res.rows)
      }else{
        console.log(err.message)
      }
    })
    
    break;

  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
