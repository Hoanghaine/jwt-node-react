import userService from "../services/userService"

const handleHelloworld = (req,res)=>{
  return res.render("home.ejs")
}

const handleUserPage = async(req,res)=>{
  let userList = await userService.getUsers();
  return res.render("user.ejs",{userList})
}

const handleCreateNewUser = (req,res)=>{
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  userService.createNewUser(email,password,username)
  return res.send("handle create new user")
} 

module.exports = {
  handleHelloworld,handleUserPage,handleCreateNewUser
}