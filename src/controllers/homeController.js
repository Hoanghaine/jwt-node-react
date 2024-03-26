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
  return res.redirect("/user")
} 
const handleDeleteUser = async(req,res)=>{
  await userService.deleteUser(req.params.id)
  return res.redirect("/user")
}

const getUserUpdatePage =async (req,res)=>{
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = user

  return res.render("user-update.ejs",{userData})
}
const handleUpdateUser= async(req,res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  console.log(">>> chekc body: ",req.body)
  await userService.updateUser(id,email,username);
  return res.redirect("/user");
}
module.exports = {
  handleHelloworld,handleUserPage,handleCreateNewUser,handleDeleteUser,getUserUpdatePage,handleUpdateUser
}