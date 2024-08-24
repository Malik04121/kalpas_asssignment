const express=require('express')
const { createUser, loginUser } = require('../controller/user')

const userRoute=express()

userRoute.post('/register',createUser)
userRoute.post('/login',loginUser)


module.exports={userRoute}