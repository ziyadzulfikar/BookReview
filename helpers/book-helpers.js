var db = require('../config/connection')
var collection = require('../config/collection');
const { ObjectId } = require('mongodb');
var objectId = require('mongodb').ObjectID
module.exports = {
    addBook:(book,callback)=>{
        console.log(book);
        
        db.get().collection('book').insertOne(book).then((data)=>{
            console.log(data);
            callback(data.ops[0]._id)
        })
    },
    getAllBooks:()=>{
        return new Promise(async(resolve,reject)=>{
            let books = await db.get().collection(collection.BOOK_COLLECTION).find().toArray()
            resolve(books)
        })
    }
}