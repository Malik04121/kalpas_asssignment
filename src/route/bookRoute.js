const express=require('express')
const { createBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require('../controller/bookController')
const { verifyToken, isAuthor } = require('../middleware/authMiddleware')
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); 

const bookRoute=express()

bookRoute.get('/',verifyToken,getAllBooks)

bookRoute.get('/:id',verifyToken,getSingleBook)

bookRoute.post('/',upload.single('image'),verifyToken,isAuthor,createBook)
bookRoute.put('/:id',verifyToken,isAuthor,updateBook)
bookRoute.delete('/:id',verifyToken,isAuthor,deleteBook)
module.exports={bookRoute}



