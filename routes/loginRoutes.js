
// loginRoutes.js
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));

// No need to initialize passport or sessions here, they're in server.js

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.render('login.ejs', { error: 'Invalid credentials' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.render('home.ejs');
        });
    })(req, res, next); // tis (req,res,next) are use to call function like we dont need to call seperelty 
});

// router.post('/login',passport.authenticate('local',{
//     successRedirect : "/StartEvaluation",
//     failureRedirect : '/'
      
// }))

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});




export default router;