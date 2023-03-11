const express = require('express')
const router = express.Router()
const User = require('../modles/user')
const session = require('express-session')
const bcrypt = require('bcrypt')
const Car = require('../modles/car')
const car = require('../modles/car')

//INDEX ROUTE STARTS

router.get('/',async(req,res) => {
        let user = req.session.user  
        console.log(typeof(user))
        cars = await Car.find()
        res.render('index',{user,cars})

})

//INDEX ROUTE ENDS



//LOGIN ROUTES STARTS

router.get('/login',(req,res) => {
  let user = req.session.user
    res.render('User/login',{user})
})

router.post('/login',async(req,res) => {
  console.log(req.body)
    const {email,password} = {...req.body}
    User.findOne({ email: email }, (error, user) => {
        if (error) {
          console.log(error);
        } else {
          if (!user) {
            console.log('User not found');
          } else {
            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, user.password, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                if (result) {
                    req.session.loggedin=true
                    req.session.user=user
                    res.redirect('/')
                  console.log('Password match');
                } else {
                    res.redirect('/login')
                  console.log('Incorrect password');
                }
              }
            });
          }
        }
      });
 

})

//LOGIN ROUTES ENDS



//SIGNUP ROUTES STARTS

router.get('/signup',(req,res) => {
  let user = req.session.user
    res.render('User/signup',{user})
})

router.post('/signup',async(req,res) => {

    const {name,phone,email,gender,dob,password,confirmpassword} = {...req.body}

    console.log(req.body)
    

    if(password===confirmpassword){

        let password1= await bcrypt.hash(req.body.password,10)

        const newUser = new User({
            name:name,
            phone:phone,
            email:email,
            gender:gender,
            dob:dob,
            password:password1
        })

        newUser.save((error) => {
            if(error){
                console.log(error)
                res.redirect('/login')
            }else{
                console.log('User data inserted')
                res.redirect('/login')
            }
        })
    }else{
        console.log('login failed')
    }
})

//SIGNUP ROUTES ENDS



//LOGOUT ROUTE STARTS

router.get('/logout',(req,res) => {
  req.session.destroy()
  res.redirect('/')
})

//LOGOUT ROUTE STARTS

router.get('/specification/:id',async(req,res) => {
  id=req.params.id
  let user = req.session.user
  var car = await Car.findById(id)
  res.render('User/partials/spec',{user,car})
})


module.exports = router