var db = require('../config/connection')
var collection = require('../config/collection');
const { ObjectId } = require('mongodb');
var objectId = require('mongodb').ObjectID
module.exports = {
    addBook:(book,callback)=>{
        db.get().collection('book').insertOne(book).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllBooks:()=>{
        return new Promise(async(resolve,reject)=>{
            let books = await db.get().collection(collection.BOOK_COLLECTION).find().toArray()
            resolve(books)
        })
    },
    getAllComments:()=>{
        return new Promise(async(resolve,reject)=>{
            let comments = await db.get().collection(collection.COMMENT_COLLECTION).find().toArray()
            resolve(comments)
        })
    },
    getEachBook:(bId)=>{
        return new Promise(async(resolve,reject)=>{
            let eachBookId = await db.get().collection(collection.BOOK_COLLECTION).aggregate([
                {
                    $match:{
                        _id : ObjectId(bId)
                    }
                }
            ]).toArray()
            resolve(eachBookId)
        })
    },
    getEachBookComments:(bId)=>{
        return new Promise(async(resolve,reject)=>{
            let comments = await db.get().collection(collection.COMMENT_COLLECTION).aggregate([
                {
                    $match:{
                        bookId : bId
                    }
                }
            ]).toArray()
            resolve(comments)
        })
    },
    getEachUserBooks:(EBId)=>{
        return new Promise(async(resolve,reject)=>{
            let eachUsersBook = await db.get().collection(collection.BOOK_COLLECTION).aggregate([
                {
                    $match:{
                        UserId : EBId
                    }
                }
            ]).toArray()
            resolve(eachUsersBook)
        })
    },
    deleteEachUserBooks:(bId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.BOOK_COLLECTION).removeOne({_id:objectId(bId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getEachUserComments:(UId)=>{
        return new Promise(async(resolve,reject)=>{
            let eachUsersComment = await db.get().collection(collection.COMMENT_COLLECTION).aggregate([
                {
                    $match:{
                        userid : UId
                    }
                }
            ]).toArray()
            resolve(eachUsersComment)
        })
    },
    deleteEachUserComments:(cId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COMMENT_COLLECTION).removeOne({_id:objectId(cId)}).then((response)=>{
                resolve(response)
            })
        })
    }
    

    // commentBooks:()=>{
    //     return new Promise(async(resolve,reject)=>{

    //     })
    // }
}