const router = require('express').Router()

router.get('/',(req,res) => {
    res.send('employee')
})

module.exports = router