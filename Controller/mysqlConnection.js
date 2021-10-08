const mysql=require('mysql');
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital'
})

connection.connect((err)=>{
(err)?console.log(err):console.log('connection established');
});

module.exports=connection;