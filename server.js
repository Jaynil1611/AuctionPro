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

  socket.on("register_product",product=>
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
          io.emit("message",{ type:"register_product",content:Product});
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
    let sql = "Insert into Bid Set ? ";
    pool.query(sql,[Bid],(err,rows,fields)=>{
      if(err)
        console.log(error);
      else
        io.emit("message",{ type:"bid",content:{"Product_Id":Bid.Product_Id,"Base_price":Bid.Bid_amount}});
    })
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

});
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
