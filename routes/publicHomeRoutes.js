import express from "express"
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('publicHome.ejs')
})

router.get('/register',(req,res)=>{
    res.render('register.ejs')
})

export default router;