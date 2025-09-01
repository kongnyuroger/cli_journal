#!/usr/bin/env node
import showHelp from "./functionalities/help.js";
import search_db from "./functionalities/search_db.js";
import add from "./functionalities/addTo_db.js";
import list from "./functionalities/list.js";
import deleteRecode from "./functionalities/delete.js";
import update from "./functionalities/update.js";
import { archive , unArchive} from "./functionalities/archive.js";


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
      list(argv)
      break;

    case 'delete':
      deleteRecode(argv)
      break;
    case 'update':
      update(argv)
      break;
    case "archive":
      archive(argv)
      break;
    case "unarchive":
      unArchive(argv)
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
}
