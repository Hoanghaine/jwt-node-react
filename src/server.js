import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRouters from "./routes/web"
require("dotenv").config()
import bodyParser  from "body-parser"
const PORT = process.env.PORT;
const app = express();
//config view engine
configViewEngine(app)

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//init web router
initWebRouters(app)

app.listen(PORT,()=>{
  console.log(">>> JWT backend is running on the port = "+PORT);
})