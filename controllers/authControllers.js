const bcrypt = require('bcrypt');
const postGreSQL = require("../config/pg");
const generateToken = require('../utils/generateToken');

//below is route for signup
const registerUser = async(req,res)=>{
    try{
      
    const { email, password } = req.body; //acquired these details from frontend
    if (!email || !password) {
  return res.status(400).json({ message: "All fields required" });
}
    
    const existingUser = await postGreSQL.query(
        "SELECT * FROM users WHERE email = $1",[email]);//checking if existing user exists or not in the postgre system
        if(existingUser.rows.length>0){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10); //if not exists then hash the password 

        const newUser = await postGreSQL.query( //insert it into postgreql
            "INSERT INTO users (email,password) values($1,$2) RETURNING id,email",[email,hashedPassword]
        );
        res.status(202).json({ //and then send msg such as user is successfully registered
            message:"User registered successfully",
            user: newUser.rows[0]
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};


//below is the route for login
const loginUser = async(req,res)=>{
    try{
    const { email,password } = req.body;
    const result = await postGreSQL.query(
        "SELECT * from users WHERE email = $1",[email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
         const user = result.rows[0];

   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // if password matches, then token will begenerated such that it could be carried away to other routes
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}







module.exports = {registerUser, loginUser};