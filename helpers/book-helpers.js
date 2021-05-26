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
                try {
                let books = await db.get().collection(collection.BOOK_COLLECTION).find().toArray()
                resolve(books)
            } catch (err) {
              next(err);
            }
            })
    
        },
    getAllComments:()=>{
        return new Promise(async(resolve,reject)=>{
                try {
                let comments = await db.get().collection(collection.COMMENT_COLLECTION).find().toArray()
                resolve(comments)
            } catch (err) {
              next(err);
            }
            })
    
    },
    getEachBook:(bId)=>{
        return new Promise(async(resolve,reject)=>{
                try {
                let eachBookId = await db.get().collection(collection.BOOK_COLLECTION).aggregate([
                    {
                        $match:{
                            _id : ObjectId(bId)
                        }
                    }
                ]).toArray()
                resolve(eachBookId)
            } catch (err) {
              next(err);
            }
            })
    
    },
    getEachBookComments:(bId)=>{
        return new Promise(async(resolve,reject)=>{
                try {
                let comments = await db.get().collection(collection.COMMENT_COLLECTION).aggregate([
                    {
                        $match:{
                            bookId : bId
                        }
                    }
                ]).toArray()
                resolve(comments)
            } catch (err) {
              next(err);
            }
            })
    
    },
    getEachUserBooks:(EBId)=>{
        return new Promise(async(resolve,reject)=>{
                try {
                let eachUsersBook = await db.get().collection(collection.BOOK_COLLECTION).aggregate([
                    {
                        $match:{
                            UserId : EBId
                        }
                    }
                ]).toArray()
                resolve(eachUsersBook)
            } catch (err) {
              next(err);
            }
            })
    
    },
    deleteEachUserBooks:(bId)=>{
        return new Promise((resolve,reject)=>{
                try {
                db.get().collection(collection.BOOK_COLLECTION).removeOne({_id:objectId(bId)}).then((response)=>{
                    resolve(response)
                })
            } catch (err) {
              next(err);
            }
            })
    
    },
    getEachUserComments:(UId)=>{
        return new Promise(async(resolve,reject)=>{
                try {
                let eachUsersComment = await db.get().collection(collection.COMMENT_COLLECTION).aggregate([
                    {
                        $match:{
                            userid : UId
                        }
                    }
                ]).toArray()
                resolve(eachUsersComment)
            } catch (err) {
              next(err);
            }
            })
    
    },
    deleteEachUserComments:(cId)=>{
        return new Promise((resolve,reject)=>{
                try {
                db.get().collection(collection.COMMENT_COLLECTION).removeOne({_id:objectId(cId)}).then((response)=>{
                    resolve(response)
                })
            } catch (err) {
              next(err);
            }
            })
    
    }
}