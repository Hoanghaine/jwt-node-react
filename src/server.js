import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRouters from "./routes/web"
require("dotenv").config()

const PORT = process.env.PORT;
const app = express();
//config view engine
configViewEngine(app)

//init web router
initWebRouters(app)

app.listen(PORT,()=>{
  console.log(">>> JWT backend is running on the port = "+PORT);
})