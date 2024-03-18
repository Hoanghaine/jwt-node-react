import express from "express"
import homeController from "../controllers/homeController"
const router = express.Router();

/**
 * @param {*} app: express app
*/

const initWebRouters = (app)=>{
  router.get("/",homeController.handleHelloworld)
  router.get("/user",homeController.handleUserPage)
  router.post("/users/create-user",homeController.handleCreateNewUser)
  return app.use("/",router)
}

export default initWebRouters