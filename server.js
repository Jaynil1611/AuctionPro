const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const pool = require('./backend/database');
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
const io = require('socket.io')(server);
io.on("connection", socket => {
  // Log whenever a user connects
  console.log("user connected");

  // Log whenever a client disconnects from our websocket server
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  // When we receive a 'message' event from our client, print out
  // the contents of that message and then echo it back to our client
  // using `io.emit()`
  socket.on("message", message => {
    console.log("Message Received: " + message);
    io.emit("message", { type: "new-message", text: message });
  });

  socket.on("auction_create",auction=>
  {
    let Auction=JSON.parse(auction);
    delete Auction.type;
    console.log(JSON.stringify(Auction));
    let sql="INSERT INTO Auction set ?";
    pool.query(
      sql,[Auction],(err,rows,fields)=>
      {
        if(err)
        console.log(err);
        else
        {
          io.emit({type:"auction_create","content":Auction});
        }
      }
    )
  })
  socket.on("auction_by_userid",aucget=>
  {
    let sql="Select * from Auction where Created_by=?";
    console.log(aucget);
    pool.query(sql,[JSON.parse(aucget).content],(error,rows,fields)=>
    {
      if(error)
        console.log(error);
      else
        {
          console.log(rows);
          socket.send({type:"auction_by_userid","content":rows});
        }

  })
})
  socket.on("product_create",product=>
  {
    let Product=JSON.parse(product);
    delete Product.type;
    console.log(JSON.stringify(Product));
    let sql="INSERT INTO Product SET ?";
    pool.query(sql,[Product],(err,rows,fields)=>
    {
      if(err)
        console.log(error);
      else
        {
          Product["Product_Id"]=rows['insertId'];
          console.log(Product);
          socket.send({ type:"product_create",content:Product});
        }
    })
  })

  socket.on("user_products",req=>{
    let sql="Select * from Product where User_Id=?";
    console.log(req);
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error)
        console.log(error);
      else
        {console.log(rows)
          socket.send({type:"user_products","content":rows});}
    })
  })
  
  socket.on("bid",bid => {
    let Bid=JSON.parse(bid);
    delete Bid.type;
    console.log(JSON.stringify(Bid));
    let sql = "Insert into Bid Set ? ; Select Username from Users Where User_Id="+Bid.User_Id;
    pool.query(sql,[Bid],(err,rows,fields)=>{
      if(err)
        console.log(err);
      else{
        io.emit("message",{ type:"bid",content:{"Product_Id":Bid.Product_Id,"Username":rows[1][0].Username,"Base_price":Bid.Bid_amount}});
      }
    })
  })

  socket.on("auction_by_id",req=>{
    let sql="Select Auction_Id,Title,Auction_description,Username,Auction.Created_at,Start_time,End_time,hasStarted,hasEnded from Auction,Users WHERE Auction_Id=? and Created_by=User_Id;";
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error)
        console.log(error);
      else
        socket.send({type:"auction_by_id","content":rows});
    })
  })
  socket.on("auction",req=>{
    req=JSON.parse(req);
    let sql="Select Auction_Id,Title,Auction_description,Username,Auction.Created_at,Start_time,End_time,hasStarted,hasEnded from Auction,Users WHERE Created_by=User_Id and Auction_Id NOT IN (SELECT Auction_Id FROM Auction_users where Auction_users.User_Id="+req["content"]+")";
    pool.query(sql,(error,rows,fields)=>{
      if(error)
        console.log(error);
      else
        socket.send({type:"auction","content":rows});
    })
  })
  socket.on("auction_user",req=>{
    req=JSON.parse(req);
    let sql="Select Auction_Id,Title,Auction_description,Username,Auction.Created_at,Start_time,End_time from Auction,Users WHERE Created_by=User_Id and Auction_Id IN (SELECT Auction_Id FROM Auction_users where Auction_users.User_Id="+req["content"]+")";
    pool.query(sql,(error,rows,fields)=>{
      if(error)
        console.log(error);
      else
        socket.send({type:"auction_user","content":rows});
    })
  })
  socket.on("auction_join",auction=>
  {
    let Auction=JSON.parse(auction);
    delete Auction.type;
    console.log(JSON.stringify(Auction));
    let sql="INSERT INTO Auction_users Values("+Auction["User_Id"]+","+ Auction["Auction_Id"]+")";
    console.log(sql);
    pool.query(
      sql,(err,rows,fields)=>
      {
        if(err){
          console.log(err);
        }
        else{
          socket.send({type:"auction_join","content":Auction});
        }
      }
    )
  });
  socket.on("auction_leave",auction=>
  {
    let Auction=JSON.parse(auction);
    delete Auction.type;
    console.log(JSON.stringify(Auction));
    let sql="DELETE FROM Auction_users Where User_Id="+Auction["User_Id"]+" and Auction_Id = "+ Auction["Auction_Id"];
    console.log(sql);
    pool.query(
      sql,(err,rows,fields)=>
      {
        if(err){
          console.log(err);
        }
        else{
          socket.send({type:"auction_leave","content":Auction});
        }
      }
    )
  })
  socket.on("auction_products",req=>{
    let sql="Select * from Product where Product_Id IN (Select Product_Id from Auction_product Where Auction_Id =?)";
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error)
        console.log(error);
      else
        socket.send({type:"auction_products","content":rows});
    })
  })
  socket.on("delete_user_products",req=>{
    let sql="delete from Product where Product_Id=?";
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error){
        console.log(error);
      }
      else{
        socket.send({type:"delete_user_products",content:JSON.parse(req)});
      }
    })
  })
  socket.on("start_auction",req=>{
    let sql="Update Auction set hasStarted=1 where Auction_Id=?";
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error)
      {
        console.log(error);
      }
      else{
        io.emit("message",JSON.parse(req));
      }
    })
  })
  socket.on("end_auction",req=>{
    let sql="Update Auction set hasEnded=1 where Auction_Id=?;"
    +"REPLACE INTO Product_sold SELECT DISTINCT  `Product_Id`,`User_Id`, `Bid_amount` FROM `Bid` WHERE `Bid_amount` in (	SELECT MAX(`Bid_amount`) FROM `Bid` GROUP BY `Product_Id`);"
    +"UPDATE `Product` INNER JOIN (SELECT DISTINCT `User_Id`, `Product_Id`, `Bid_amount` FROM `Bid` WHERE `Bid_amount` in ( SELECT MAX(`Bid_amount`) FROM `Bid` GROUP BY `Product_Id`)) AS `Bd` ON `Bd`.`Product_Id`=`Product`.`Product_Id` SET Product.User_Id=Bd.User_Id,Product.Base_price=Bd.Bid_amount";
    pool.query(sql,[JSON.parse(req).content],(error,rows,fields)=>{
      if(error)
      {
        console.log(error);
      }
      else{
        io.emit("message",JSON.parse(req));
      }
    })
  })
  socket.on("selected_products",auction=>{
    let Auction=JSON.parse(auction);
    delete Auction.type;
    console.log(JSON.stringify(Auction));
    let sql="Replace into Auction_product (Auction_Id,Product_Id) values ?";
    pool.query(sql,[Auction],(error,rows,fields)=>{
      if(error)
      console.log(error);
      else{
        console.log(rows);
        socket.send({type:"selected_products","content":rows});
      }
    })
  })
});
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
