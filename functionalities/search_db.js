
const  search_db  = async() => {
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
}

export default search_db