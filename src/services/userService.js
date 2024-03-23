import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
// import mysql from 'mysql2' 
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

const hashPassword = (userPassword)=>{
  let hashPassword = bcrypt.hashSync(userPassword, salt); 
  return hashPassword;
}

const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'jwt',
      Promise: bluebird,
    });

    await connection.execute(
      `INSERT INTO users (email,password,username) VALUES (?, ?, ?)`,
      [email, hashPass, username]
    );

    await connection.end(); // Close the connection
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
  
  let users=[];
  try{
    const [rows,fields] = await connection.execute('SELECT * from users')
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
    `DELETE FROM users WHERE id = (?)`,
      [id]
  )

}
module.exports={
  createNewUser,getUsers,deleteUser
}