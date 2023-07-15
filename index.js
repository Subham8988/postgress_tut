const app = require('./src/app');
app.listen(5500,(err)=>{
    if(err) throw err;
    else console.log('connected sucess');
});