const router = require('express').Router()
const Car = require('../modles/car')
const employee = require('../modles/employee')
const Employee = require('../modles/employee')
const User = require('../modles/user')




//ADMIN INDEX ROUTE STARTS

router.get('/',(req,res) => {
    Car.find().then((CarData)=> {
        res.render('Admin/admin',{CarData})
    })
    
    
})

//ADMIN INDEX ROUTE ENDS



//ADD CAR STARTS

router.get('/add',(req,res) => {
    res.render('Admin/addcar')
})

router.post('/add',async(req,res) => {

    console.log(req.body)

    
    
    const {name,model,engine,type,color,price,description,milage,fueltype,cylinders,power,torque,airbag,transmission,seatcapacity,servicecost} = {...req.body}

    const newCar = new Car({
        name:name,
        model:model,
        type:type,
        color:color,
        price:price,
        description:description,
        milage,
        fueltype,
        cylinders,
        power,
        torque,transmission,seatcapacity,servicecost,engine,airbag
    })

    let image = req.files.Image

    newCar.save().then((data) => {
        image.mv('./public/car-images/'+data._id+'.jpg',(err) => {
            if(!err) res.redirect('/admin/add')
            else {
                console.log(err)
            }
        })
        
    })
    
})

//ADD CAR ENDS



//UPDATE CAR STARTS

router.get('/edit-car/:id',(req,res) => {
    Car.find({_id:req.params.id}).then((data)=> {
            res.render('admin/edit-car',{CarData:data})
        
    })
})

router.post('/edit-car/:id',(req,res) => {

    const {name,model,type,color,price,description} = {...req.body}
   
    Car.updateOne({ _id: req.params.id }, { $set: { 
        name:name,
        model:model,
        type:type,
        color:color,
        price:price,
        description:description
    } }, function(err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/admin')
            if(!req?.files?.Image) {
                console.log('no image')
            }else{
                req.files.Image.mv('./public/car-images/'+req.params.id+'.jpg',(err) => {
                    if(err)  console.log(err)
                })
                
            }
        }
    })
})

//UPDATE CAR ENDS



//DELETE CAR STARTS

router.get('/delete/:id',(req,res) => {
    Car.findByIdAndDelete(req.params.id, function(err, deletedDoc) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/admin')
        }
    });
})

//DELETE CAR ENDS
 


//EMPLOYEE INDEX ROUTE STARTS

router.get('/employee', async(req,res) => {
    employees = await Employee.find()
    res.render('Admin/employee',{employees})
})

//EMPLOYEE INDEX ROUTE ENDS



//EMPLOYEE CREATE ROUTE STARTS

router.get('/add-employee',(req,res) => {
    res.render('Admin/addemployee')
})

router.post('/add-employee',(req,res) => {

    const {name,phone,email,password,gender} = {...req.body}
    
    const newEmployee = new Employee({
        name:name,
        phone:phone,
        email:email,
        password:password,
        gender:gender
    })

    newEmployee.save().then((data) => {
        console.log(data)
        res.redirect('/admin/employee')
    })
})
 

//EMPLOYEE CREATE ROUTE ENDS


//EMPLOYEE DELETE ROUTE STARTS

router.get('/employee/:id',(req,res) => {
    id=req.params.id
    Employee.findByIdAndDelete(id).then(() => {
        res.redirect('/admin/employee')
    })
})


//EMPLOYEE DELETE ROUTE ENDS


  


//USER ROUTE STARTS

router.get('/user',async(req,res) => {
    users = await User.find()

    
    res.render('Admin/user',{users})
})

//USER ROUTE ENDS



//DELETE USER STARTS

router.get('/user/:id',async(req,res) => {
    id=req.params.id
    console.log(id)
    await User.findByIdAndDelete(id).then(()=> {
        res.redirect('/admin/user')
    })

})
//DELETE USER ENDS



//EMPLOYEE EDIT STARTS

router.get('/edit-employee/:id',(req,res) => {
    Employee.find({_id:req.params.id}).then((data)=> {
            console.log(data)
            let gender = data[0].gender
            console.log(gender)
            res.render('admin/edit-employee',{employee:data,gender})
        
    })
}) 

router.post('/edit-employee/:id',(req,res) => {

    console.log(req.body)

    const {name,email,password,phone,gender} = {...req.body}
   
    Employee.updateOne({ _id: req.params.id }, { $set: { 
        name,
        email,
        password,
        phone,
        gender
    } }, function(err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.redirect('/admin/employee')
            if(!req?.files?.Image) {
                console.log('no image')
            }else{
                req.files.Image.mv('./public/car-images/'+req.params.id+'.jpg',(err) => {
                    if(err)  console.log(err)
                })
                
            }
        }
    })
})


//EMPLOYEE EDIT ENDS

module.exports = router
