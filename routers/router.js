const router = require('express').Router()

router.get('/', (req, res)=>{
    res.send('router working')
})

module.exports = router