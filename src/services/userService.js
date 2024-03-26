import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from "../models/index"
const hashPassword = (userPassword)=>{
  let hashPassword = bcrypt.hashSync(userPassword, salt); 
  return hashPassword;
}

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password:hashPass
    })
  } catch (e) {
    console.log(">> check e: ", e);
  }
};

const getUsers =async()=>{
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  
  let user=[];
  try{
    const [rows,fields] = await connection.execute('SELECT * from user')
    return rows
  }catch(e){
    console.log("check error: ",e)
  }
}

const deleteUser = async(id)=>{
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  await connection.execute(
    `DELETE FROM user WHERE id = (?)`,
      [id]
  )

}
const getUserById = async(id) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  try{
    const [rows,fields] = await connection.query(
      `SELECT * FROM user WHERE id = ?`,
      [id]
    )
  return rows;
  }catch(e){
    console.log("check e: ",e)
  }
}
const updateUser = async(id,email,username) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  await connection.execute(
    `UPDATE user SET email = ?, username = ? WHERE id = ?`,
      [email,username,id]
  )
}
module.exports={
  createNewUser,getUsers,deleteUser,getUserById,updateUser
}