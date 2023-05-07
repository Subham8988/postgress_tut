const  client =require('../config/db_Config')



const addUser =  (async (req, res) =>{
    try {
        const query = {
          text: `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
          values: [req.body.name, req.body,email],
        };
       const rows  = await client.query(query); 
       res.status(201).send('done')
    } catch (error) {
        res.status(500).send(`${error}`)
    }
  
  });


  module.exports ={addUser}