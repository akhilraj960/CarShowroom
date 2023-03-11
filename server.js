const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const session = require('express-session')
const path = require('path')
const expressEjsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

const mongodb = require('./server/connection')

const IndexRouter = require('./server/routes/user')
const AdminRouter = require('./server/routes/admin')
const EmployeeRouter = require('./server/routes/employee')
const AuthRouter = require('./server/routes/Auth')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}));

app.use(cookieParser());
app.use(fileUpload())
  
app.use(session({
  secret: 'mysecretkey', // use a random string as a secret
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false,  maxAge:60000 }
}));
     

dotenv.config({path:'config.env'})
PORT=process.env.PORT||8080
 
app.use(morgan('tiny'))
app.use(expressEjsLayouts)
app.set('layout','layouts/layout')
app.set('view engine', 'ejs')

function Auth(req,res,next) {
  if(req.session.admin) {
    next()
  }else{
    res.redirect('/auth/login')
  }
}

 
app.use('/',IndexRouter)
app.use('/admin',AdminRouter)
app.use('/employee',EmployeeRouter)
app.use('/auth',AuthRouter)
   
  
app.use('/css',express.static(path.resolve(__dirname,"public/css")))
app.use('/public',express.static(path.resolve(__dirname,"public")))
app.use('/js',express.static(path.resolve(__dirname,"public/js")))
app.use('/img',express.static(path.resolve(__dirname,"public/img")))
// app.use(express.static(__dirname + '/public'));
  
 
app.listen(PORT,()=>{console.log(`Server Running on PORT:${PORT}`)})   