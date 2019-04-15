const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./database');
const jwt = require('jsonwebtoken');
const app = express();
const path=require('path')
app.use(express.static(path.join(__dirname,"../dist/SecureOnlineAuction/")));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/api/tables',(req,res)=>{
    pool.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='SecureOnlineAuction'",
        (err,rows,feilds)=>{
            if(err)
                console.log(err);
            else{
                res.send(rows);
            }
        })
});

// app.get('/api/:tableName',(req,res)=>{
//     console.log(req.params.tableName);
//     var query="SELECT * FROM "+req.params.tableName;
//     var join=req.query.join;
//     var join_by=req.query.join_by;
//     if (join && join_by){
//         query=query+" LEFT JOIN "+join+" ON "+req.params.tableName+"."+join_by+"="+join+"."+join_by;
//     }
//     pool.query(query,
//         (err,rows,feilds)=>{
//             if(err){
//                 console.log(err);
//                 res.send(400);
//             }
//             else{
//                 res.send(rows);
//             }
//         })
// })

// app.get("/api/Users",(req,res)=>{
//     let sql = "SELECT User_Id , Username FROM Users";
//     let first = true;
//     for(const key in req.query){
//         if(first){
//             sql=sql+" WHERE "+key+" = '"+req.query[key]+"'";
//             first=false
//         }else{
//             sql=sql+" AND "+key+" = '"+req.query[key]+"'";
//         }
//     }
//     pool.query(sql,
//         (err,rows,feilds)=>{
//             if(err){
//                 console.log(err);
//                 res.send(400);
//             }
//             else{
//                 res.send(rows);
//             }
//         }
//     )
// })

app.get("/api/Users/:id",(req,res)=>{
    console.log(req.params.id);
    let sql = "select Users.Username,Users.Created_at,User_details.*,Address.* from Users left join Address on Address.User_Id=Users.User_Id left join User_details on User_details.User_Id=Users.User_Id where Users.User_Id=?"
    pool.query(sql,[req.params.id],(err,rows,fields)=>{
        if(err)
            console.log(err);
        else
            res.send(201,rows);

    })
})

app.post("/api/Users",(req,res)=>{
    let sql = "Insert into Users (Username , Password , Updated_at) VALUES ( ? , ? , ? ); ";
    let date=new Date().toISOString().slice(0,19).replace('T',' ');
    console.log(date);
    pool.query(sql,
        [req.body["Username"],req.body["Password"],date,date],
        (err,rows,fields)=>{
            if(err){
                if(err.code="ER_DUP_ENTRY")
                    res.send(409,"User Already Exists")
            }
            else{
                res.send(201,rows['insertId']);
            }
        })
})

app.post("/api/Address",(req,res)=>{
    let sql = "INSERT INTO Address SET ? ";
    console.log(req.body);
    pool.query(sql,
        [req.body],
        (err,rows,fields)=>{
            if(err){
                console.log(err);
                res.send(400,err.code);
            }
            else{
                res.send(201,rows);
            }
        })
})

app.post("/api/User_details",(req,res)=>{
    let sql = "INSERT INTO User_details SET ? ";
    console.log(req.body);
    pool.query(sql,
        [req.body],
        (err,rows,fields)=>{
            if(err){
                console.log(err);
                res.send(400,err.code);
            }
            else{
                res.send(201,rows);
            }
        })
})

app.post("/api/Login",(req,res)=>{
    let sql= "SELECT User_Id,Username FROM Users WHERE Username = ? AND Password = ? ";
    console.log(req.body);
    pool.query(
        sql,
        [req.body["Username"],req.body["Password"]],
        (err,rows,fields)=>{
            if(err){
                console.log(err);
                res.send(400,err.code);
            }
            else if(rows[0]==undefined) res.send(400,"Invalid User Name");
            else{
                    console.log("rows:" +rows[0]);
                    let payload={
                        "Username":rows[0]["Username"],
                        "User_Id":rows[0]["User_Id"]
                    }
                    console.log(payload)
                    let token =jwt.sign(payload,'Secret');
                    payload["Token"]=token;
                    console.log(payload);
                    res.send(201,payload);
                
            }
        })
})

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../dist/SecureOnlineAuction/index.html"));
})

module.exports=app;