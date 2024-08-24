const express=require('express')

const { borrowBook, returnBook } = require('../controller/bookBorrowController');
const { verifyToken } = require('../middleware/authMiddleware')

const bookBorrowRoute=express()

bookBorrowRoute.post('/borrow',verifyToken,borrowBook)
bookBorrowRoute.put('/return/:id',verifyToken,returnBook)


module.exports={bookBorrowRoute}