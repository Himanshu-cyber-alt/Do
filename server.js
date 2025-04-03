// import express from 'express';
// import homeRoutes from './routes/homeRoutes.js'; 
// import registerRoutes from "./routes/registerRoutes.js"
// import aboutRoutes from './routes/aboutRoutes.js'
// import loginRoutes from './routes/loginRoutes.js'
// import EvaluationRoutes from './routes/EvaluationRoutes.js'

// import session from 'express-session'; // step => 1 
// import passport, { use } from 'passport';  // step => 2
// import { Strategy } from 'passport-local'; // step => 3

// const app = express();
// const port = 7000;

// app.set("view engine", "ejs"); 

// app.use(express.static("public"));



// app.use(bodyParser.urlencoded({extended : true}))


// // allow create a session  step => 1
// app.use(session({
//      secret : "lappy",
//      resave : false, // for this we can save the session in database now i dont do  this but in future i do 
//      saveUninitialized : true,
// }))

//  // step => 2 
// app.use(passport.initialize())
// app.use(passport.session())



// app.use('/', homeRoutes);
// app.use('/',registerRoutes);
// app.use('/',aboutRoutes)
// app.use('/',loginRoutes)
// app.use('/',EvaluationRoutes)

// app.listen(port, () => {
//     console.log(`${port} Server Is Started`);
// });

// server.js
import express from 'express';
import bodyParser from 'body-parser';
import homeRoutes from './routes/publicHomeRoutes.js'; 
import registerRoutes from "./routes/registerRoutes.js";
import aboutRoutes from './routes/aboutRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import EvaluationRoutes from './routes/EvaluationRoutes.js';
import profileRoutes from './routes/profileRoutes.js'
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import pool from './config/db.js';
import bcrypt from 'bcrypt';

const app = express();
const port = 7000;

app.set("view engine", "ejs"); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



   app.get('/home',(req,res)=>{
          res.render('home.ejs')
   })


//  first we setup sesssion this is step => 1
app.use(session({
    secret: "lappy",
    resave: false,
    saveUninitialized: true,
    
    // for session valid for only 1 hr  
    cookie : {
        maxAge : 1000 * 60 * 60 * 24,
    }
}));

// this is a step => 2 
app.use(passport.initialize());
app.use(passport.session());

// 
passport.use(new Strategy({
    usernameField: 'RollNumber',  // is like body parser we can get all the req.body for tis  
    passwordField: 'Password'     
}, async function(rollNumber, password, callBack) {
    try {
        const result = await pool.query('SELECT roll, password FROM main_table WHERE roll = $1', [rollNumber]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const databasePass = user.password;
            
       
            bcrypt.compare(password, databasePass, (err, isMatch) => {
                if (err) {
                    return callBack(err);
                }
                
                if (isMatch) {
                    return callBack(null, user);
                } else {
                    return callBack(null, false, { message: 'Incorrect password' });
                }
            });
        } else {
            return callBack(null, false, { message: 'User not found' });
        }
    } catch (error) {
        return callBack(error);
    }
}));




passport.serializeUser((user, callBack) => {
    callBack(null, user.roll); //  
});



passport.deserializeUser(async (rollNumber, callBack) => {
    try {
        const result = await pool.query('SELECT * FROM main_table WHERE roll = $1', [rollNumber]);
        if (result.rows.length > 0) {
            callBack(null, result.rows[0]);
        } else {
            callBack(new Error('User not found'));
        }
    } catch (error) {
        callBack(error);
    }
});

// Mount routes
app.use('/', homeRoutes);
app.use('/', registerRoutes);
app.use('/', aboutRoutes);
app.use('/', loginRoutes);
app.use('/', EvaluationRoutes);
app.use('/',profileRoutes)



app.listen(port, () => {
    console.log(`${port} Server Is Started`);
});



