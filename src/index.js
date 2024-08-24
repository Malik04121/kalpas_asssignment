const express=require('express')
const { bookRoute } = require('./route/bookRoute')
const { userRoute } = require('./route/userRoute')
const { libraryRoute } = require('./route/libraryRoute')
const { bookBorrowRoute } = require('./route/borrowRoute')
const { connection } = require('./config/connection')


const app=express()

const port=8080
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Welcome to my app")
})
app.use('/api/books',bookRoute)
app.use('/api/users',userRoute)
app.use('/api/libraries',libraryRoute)
app.use('/api',bookBorrowRoute)

app.listen(port,async()=>{
   try{
    await connection
    console.log("connected to db")
   }
   catch(err){
    console.log(err)
   }
    console.log(`server is running on port ${port}`)
})

