// import express from 'express'

// import session from 'express-session'; // step => 1 
// import passport from 'passport';  // step => 2
// import { Strategy } from 'passport-local'; // step => 3
// const router = express.Router();



// // allow create a session  step => 1
// router.use(session({
//      secret : "lappy",
//      resave : false, // for this we can save the session in database now i dont do  this but in future i do 
//      saveUninitialized : true,
// }))

//  // step => 2 
// router.use(passport.initialize())
// router.use(passport.session())

// router.get('/StartEvaluation',(req,res)=>{
//     if(req.isAuthenticated()){
//         res.render('startEvaluation.ejs')
//     }else{
//         res.render('login.ejs')
//     }
// })


//  passport.use( new Strategy ( async function verify(Name,Password,callBack){

//     try{
//         const {RollNumber,Password} = req.body;
    
        
//         const result = await pool.query('select roll_number,password from students where roll_number = $1',[RollNumber])
//         if(result.rows.length > 0 ) {
//         const roll = result.rows[0].roll_number;
//         const DataBasePass = result.rows[0].password;
//         const user = result.rows[0];
    
              
//          bcrypt.compare(Password,DataBasePass,(err,result)=>{
    
//             if(err){
//              return callBack(err)
//             }else{
    
//                 if(result){
//              return  callBack(null,user)
//                 }else{
//                    return callBack(null,false)
//                 }
//             }
//          });

//         } else{

//   return callBack("Uert Not Found ")

//         }
    
    
           
        
         
    
//     } catch(error){
      
//        return callBack(error);
//     }


//  }))

//  passport.serializeUser((user,callBack)=>{
//     callBack(null,user);

//  })

//  passport.deserializeUser((user,callBack)=>{
//     callBack(null,user);
    
//  });



// export default router;




// EvaluationRoutes.js
import express from 'express';


const router = express.Router();

// No need to initialize passport or sessions here, they're in server.js

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}






router.get('/profile', isAuthenticated, (req, res) => {
    res.render('createProfile.ejs', { user: req.user });
});

export default router;