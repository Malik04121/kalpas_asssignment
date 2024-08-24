const mongoose=require('mongoose')

const librarySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    books:[{
        type:mongoose.Schema.ObjectId,
        ref:'books'
    }]
})

const Library=mongoose.model('library',librarySchema)

module.exports={Library}