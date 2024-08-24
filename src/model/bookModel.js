
const mongoose=require('mongoose')

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    library:{
        type:mongoose.Schema.ObjectId,
        ref:'library',
        required:false
    },
    borrower:{
        type:mongoose.Schema.ObjectId,
        ref:"user"
    },
    image:{
        type:String,
        required:true
    }

})
const Book=mongoose.model('books',bookSchema)
module.exports={Book}