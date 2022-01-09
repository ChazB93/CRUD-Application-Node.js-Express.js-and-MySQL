const req = require("express/lib/request");
const res = require("express/lib/response");


//include mysql
const mysql = require('mysql');

//connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
   });


//view patients
exports.view = (req, res) => { 


   pool.getConnection((err, Connection) => {
   
       if(err) throw err; //something is wrong we did not connect
       console.log('connected as ID' + Connection.threadId);

       //user the connection

       Connection.query('SELECT * FROM patient', (err, rows) =>{

        //when done with the connection, release it

        Connection.release();

        if(!err){
            let removedPatient = req.query.removed;
            res.render('home', { rows, removedPatient });
        }else{
            console.log(err);
        }
        console.log('The data from patient table: \m', rows);
       });
   });
}

// find patient by search
exports.find = (req, res) => { 
    pool.getConnection((err, Connection) => {
   
        if(err) throw err; //something is wrong we did not connect
        console.log('connected as ID' + Connection.threadId);

        let searchTerm = req.body.search;

        //user the connection
 
        Connection.query('SELECT * FROM patient WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) =>{
 
         //when done with the connection, release it
 
         Connection.release();
 
         if(!err){
             res.render('home', { rows });
         }else{
             console.log(err);
         }
         console.log('The data from patient table: \m', rows);
        });
    });
}

exports.form = (req, res) => { 
    res.render('add-patient');
}

// add new patient
exports.create = (req, res) => {  
const {name, createdDate} = req.body;



    pool.getConnection((err, Connection) => {
   
        if(err) throw err; //something is wrong we did not connect
        console.log('connected as ID' + Connection.threadId);

        let searchTerm = req.body.search;

        //patient the connection
 
        Connection.query('INSERT INTO patient SET name = ?, createdDate = ?',[name, createdDate], (err, rows) =>{
 
         //when done with the connection, release it
 
         Connection.release();
 
         if(!err){
             res.render('add-patient', {alert: 'patient added successfully.'});
         }else{
             console.log(err);
         }
         console.log('The data from patient table: \m', rows);
        });
    });
}

//edit patient
exports.edit = (req, res) => { 


    pool.getConnection((err, Connection) => {
   
        if(err) throw err; //something is wrong we did not connect
        console.log('connected as ID' + Connection.threadId);
 
        //user the connection
 
        Connection.query('SELECT * FROM patient WHERE id = ?', [req.params.id], (err, rows) =>{
 
         //when done with the connection, release it
 
         Connection.release();
 
         if(!err){
             res.render('edit-patient', { rows });
         }else{
             console.log(err);
         }
         console.log('The data from patient table: \m', rows);
        });
    });

 }  



 //update patient
exports.update = (req, res) => { 

    const {name, createdDate} = req.body;
    pool.getConnection((err, Connection) => {
   
        if(err) throw err; //something is wrong we did not connect
        console.log('connected as ID' + Connection.threadId);
 
        //user the connection
 
        Connection.query('UPDATE patient SET name =?, createdDate =? WHERE id =?',[name, createdDate, req.params.id], (err, rows) =>{
 
         //when done with the connection, release it
 
         Connection.release();
 
         if(!err){
             
            pool.getConnection((err, Connection) => {
   
                if(err) throw err; //something is wrong we did not connect
                console.log('connected as ID' + Connection.threadId);
         
                //patient the connection
         
                Connection.query('SELECT * FROM patient WHERE id = ?', [req.params.id], (err, rows) =>{
         
                 //when done with the connection, release it
         
                 Connection.release();
         
                 if(!err){
                     res.render('edit-patient', { rows, alert: `${name} has been updated` });
                 }else{
                     console.log(err);
                 }
                 console.log('The data from patient table: \m', rows);
                });
            });
        




         }else{
             console.log(err);
         }
         console.log('The data from patient table: \m', rows);
        });
    });

 }  



// delete patient
exports.delete = (req, res) => { 


    pool.getConnection((err, Connection) => {
   
        if(err) throw err; //something is wrong we did not connect
        console.log('connected as ID' + Connection.threadId);
 
        //patient the connection
 
        Connection.query('DELETE FROM patient WHERE id = ?', [req.params.id], (err, rows) =>{
 
         //when done with the connection, release it
 
         Connection.release();
 
         if(!err){
             let removedPatient = encodeURIComponent('Patient Successfully removed.')
             res.redirect('/?removed=' +removedPatient);
         }else{
             console.log(err);
         }
         console.log('The data from patient table: \m', rows);
        });
    });

 }  



