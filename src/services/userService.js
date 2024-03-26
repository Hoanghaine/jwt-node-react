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
  // const connection = await mysql.createConnection({
  //   host: 'localhost',
  //   user: 'root',
  //   database: 'jwt',
  //   Promise: bluebird,
  // });
  
  // let user=[];
  // try{
  //   const [rows,fields] = await connection.execute('SELECT * from user')
  //   return rows
  // }catch(e){
  //   console.log("check error: ",e)
  // }
  let users = [];
  users = await db.User.findAll();
  return users
}

const deleteUser = async(userId)=>{
  await db.User.destroy({
    where: {id: userId}
  })
}
const getUserById = async(idUser) => {
  let user = {}
  user= await db.User.findOne({
    where: {id: idUser}
  })
  return user;
}
const updateUser = async(id,email,username) => {
  await db.User.update({
    email: email,
    username: username
  },{
    where: {id: id}
  })
}
module.exports={
  createNewUser,getUsers,deleteUser,getUserById,updateUser
}