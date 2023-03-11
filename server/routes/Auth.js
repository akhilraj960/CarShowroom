const router = require('express').Router()
const Admin = require('../modles/admin')
const bcrypt = require('bcrypt')


//ADMIN LOGIN STARTS

router.get('/login',(req,res) => {
    res.render('Auth/login')
})


router.post('/login',async(req,res) => {
    const {email,password} = {...req.body}
    console.log(req.body)
    Admin.findOne({ email: email }, (error, admin) => {
        if (error) {
          console.log(error);
        } else {
          if (!admin) {
            console.log('User not found');
            res.redirect('/auth/login')
          } else {
            // Compare the provided password with the hashed password in the database
            bcrypt.compare(password, admin.password, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                if (result) {
                    req.session.loggedin=true
                    req.session.admin=admin
                    res.redirect('/admin')
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
//ADMIN LOGIN ENDS



router.get('/logout',(req,res) => {
  req.session.destroy()
  res.redirect('/')
})
  

module.exports = router
  
