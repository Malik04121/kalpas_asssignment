

const express=require('express')
const { createLibrary, allLibraries, singleLibrary, addBooksInInventory, removeBookFromInventory } = require('../controller/libraryController')
const { verifyToken, isAuthor } = require('../middleware/authMiddleware')

const libraryRoute=express()

libraryRoute.post('/',verifyToken,isAuthor,createLibrary)
libraryRoute.get('/',verifyToken,allLibraries)
libraryRoute.get('/:id',verifyToken,singleLibrary)
libraryRoute.post('/:id/inventories',verifyToken,isAuthor,addBooksInInventory)
libraryRoute.delete('/:id/inventories/:bookId',verifyToken,isAuthor,removeBookFromInventory)


module.exports={libraryRoute}