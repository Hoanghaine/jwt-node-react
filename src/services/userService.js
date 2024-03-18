import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from "mysql2"

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
});
const hashPassword = (userPassword)=>{
  let hashPassword = bcrypt.hashSync(userPassword, salt); 
  return hashPassword;
}

const createNewUser = (email,password,username)=>{
  let hashPass = hashPassword(password);
  connection.query(
    `INSERT INTO users (email,password,username) VALUES ("${email}","${hashPass}","${username}")`,
    function (err, results, fields) {
      if(err){
        console.log(err)
      }
    }
  );
}
const getUsers =()=>{
  let users=[];
  connection.query(
    `SELECT * from users `,
    function (err, results, fields) {
      if(err){
        console.log(err)
      }
      console.log(">>> result: ",results)
    }
  );
}
module.exports={
  createNewUser,getUsers
}