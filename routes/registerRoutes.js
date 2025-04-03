import express from "express";
import bodyParser from "body-parser";
import pool from "../config/db.js";
import bcrypt, { hash } from "bcrypt"
import e from "express";

const saltRound = 10;
const routes = express.Router();
routes.use(bodyParser.urlencoded({ extended: true }));




  
 

routes.post('/register', async (req, res) => {
    try {


        const { Name, Password,RollNumber } = req.body;

       
        if(RollNumber.includes('0206') && RollNumber.includes('221')) {

        
 
            const result = await pool.query('select * from main_table where roll = $1',[RollNumber])

            if(result.rows.length>0){
                console.log(result)
                res.send("  <h1> RollNumber is already exits </h1> ")
            }else{
                bcrypt.hash(Password,saltRound,async (err,hash)=>{
    
    
                  if(err){
                    console.log("Error is " + err)
                  } else{
                     
                        
                    const result2 = await pool.query('INSERT INTO main_table(name,roll,password) VALUES ($1,$2,$3)', [Name,RollNumber,hash]);
                    console.log(result2)
                  res.render('login.ejs'); 
                  }
                })
         
            }
        }

        else{
            res.send('<h1> Wrong Roll Number </h1> ')
        }

        } 

        

     
               
 catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send("Error for register"); 
        }
    }
});



export default routes;
