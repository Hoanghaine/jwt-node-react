import mysql from "mysql2"

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});

const handleHelloworld = (req,res)=>{
  return res.render("home.ejs")
}

const handleUserPage = (req,res)=>{
  return res.render("user.ejs")
}

const handleCreateNewUser = (req,res)=>{
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  connection.query(
    `INSERT INTO users (email,password,username) VALUES ("${email}","${password}","${username}")`,
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
  console.log(">> check req: ",req.body)
  return res.send("create user")

} 

module.exports = {
  handleHelloworld,handleUserPage,handleCreateNewUser
}