#!/usr/bin/env node
import pool from "./db.js";

import showHelp from "./functionalities/help.js";
import search_db from "./functionalities/search_db.js";
import add from "./functionalities/addTo_db.js";

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
      add()
      break;
  case 'search':
      search_db(argv)    
    break;


    case 'list':
      const res = await pool.query('select * from entries order by created_at;')
      console.log(res.rows)
      break;
      
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
}
