const {Client} = require('pg');


const client  = new Client({
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'subham'
})

client.connect(async (err)=>{
    // let res= await err
    if(err) throw console.log(err);
    else console.log('db connected');
});


module.exports = client