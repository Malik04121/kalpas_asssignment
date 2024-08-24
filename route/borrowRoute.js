const express=require('express')
const { borrowBook, returnBook } = require('../controller/bookBorrowcontroller')
const { verifyToken } = require('../middleware/authMiddleware')

const bookBorrowRoute=express()

bookBorrowRoute.post('/borrow',verifyToken,borrowBook)
bookBorrowRoute.put('/return/:id',verifyToken,returnBook)


module.exports={bookBorrowRoute}