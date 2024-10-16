const express = require("express");
const router = express.Router();

const expense=require('../Contorllers/expence.controller')
const users=require('../Contorllers/expense.user.controller') 

router.post('/post',expense.create)

router.get('/data/:userId',expense.data)

router.delete('/delete/:id',expense.delete)

router.put('/put/:id',expense.update)

router.post('/user/post',users.create)
router.get('/user/data',users.data)

router.post('/user/login',users.login)
module.exports = router;