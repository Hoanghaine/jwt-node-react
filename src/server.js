import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRouters from "./routes/web"
import bodyParser  from "body-parser"

require("dotenv").config()
const PORT = process.env.PORT;
const app = express();
//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// test connection
// connection();
//init web router
initWebRouters(app)

app.listen(PORT,()=>{
  console.log(">>> JWT backend is running on the port = "+PORT);
})