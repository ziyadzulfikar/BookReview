var express = require('express');
const collection = require('../config/collection');
const bookHelpers = require('../helpers/book-helpers');
const userHelpers = require('../helpers/user-helpers');
const router = require('express-promise-router')();
// var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('admin/admin-view', {admin:true});
  })

router.get('/all-books', (req, res, next) => {
    bookHelpers.getAllBooks().then((books)=>{
        res.render('admin/all-books', {admin:true, books});
    })
  })

router.get('/all-comments', (req, res, next) => {
    bookHelpers.getAllComments().then((comments)=>{
        res.render('admin/all-comments', {admin:true, comments});
    })
  })

  router.get('/deleteBooks/:id', (req, res, next) =>{
    bookHelpers.deleteEachUserBooks(req.params.id).then(()=>{
      res.redirect('/admin/all-books')
    })
  })

  router.get('/deleteComments/:id', (req, res, next) =>{
    bookHelpers.deleteEachUserComments(req.params.id).then(()=>{
      res.redirect('/admin/all-comments')
    })
  })


module.exports = router;