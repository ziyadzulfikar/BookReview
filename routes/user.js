var express = require('express');
const bookHelpers = require('../helpers/book-helpers');
const userHelpers = require('../helpers/user-helpers');
const router = require('express-promise-router')();
// var router = express.Router();

const verifyLogin = (req,res,next)=>{
  if(req.session.user){
    global.user = req.session.user
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.session.user
    bookHelpers.getAllBooks().then((books)=>{
      bookHelpers.getAllComments().then((comments)=>{
        res.render('user/view-books', {title:'User', books, user, comments, home:false, signin:true, admin:false});
      })
    })  
});

router.get('/add-book', verifyLogin, (req, res, next) => {
  let userId = user._id;
  res.render('user/add-book', {title:'User', user, userId, home:true});
})

router.post('/user/add-book', verifyLogin, (req, res, next) => {
  console.log(req.files.Image);
  bookHelpers.addBook(req.body,(id)=>{
    let image = req.files.Image
    console.log(id);
    image.mv("./public/book-images/"+id+".jpg",(err,done)=>{
      if (!err) {
        res.redirect('/')
      }
      else{
        console.log(err);
      }
    })
  })
})
router.get('/login',(req,res)=>{
  if(req.session.user){
    res.redirect('/')
  }else{
    res.render('user/login', { "loginErr":req.session.userLoginErr , title: 'Company', home:true, signin:false})
    req.session.userLoginErr = false
  }
})
router.get('/signup',(req,res)=>{
  if(req.session.userLoggedIn){
    res.redirect('/')
  }else{
    res.render('user/signup', { title: 'Company', home:true})
  }
})
router.post('/signup',(req,res)=>{
  
    userHelpers.doSignup(req.body).then((response)=>{
      req.session.user = response
      req.session.user.loggedIn = true
      res.redirect('/')
    })

  
})
router.post('/login',(req,res)=>{
   userHelpers.doLogin(req.body).then((response)=>{
     if (response.status) {
       req.session.user = response.user
       req.session.user.loggedIn = true
       res.redirect('/')
     }else{
       req.session.userLoginErr = "Invalid Username or Password"
       res.redirect('/login')
     }
   })
})
router.get('/logout',(req,res)=>{
  req.session.user = null
  req.session.userLoggedIn = false
  res.redirect('/')
})
// router.get('/book-reviews', verifyLogin, (req,res)=>{
//   console.log(req.body.bId);
//   res.render('user/book-reviews')
// })

router.get('/book-reviews/:bId',verifyLogin,(req,res)=>{
  bookHelpers.getEachBook(req.params.bId).then((eachBookId)=>{
        bookHelpers.getEachBookComments(req.params.bId).then((bookComment)=>{
          res.render('user/book-reviews', {eachBookId, bookComment, user, home:true});
        })
      }
  )
})

router.post('/comments', verifyLogin, (req, res, next) => {
  var userid = user._id;
  var username = user.Name;
  var usernameObj = {username};
  var userIdObj = {userid};
  var userCommentObj = {
    ...userIdObj,
    ...usernameObj,
    ...req.body
  }
  console.log(userCommentObj);
  userHelpers.doComment(userCommentObj).then((data)=>{
    res.redirect('/');
  })
  
})

router.get('/myBooks', verifyLogin, (req, res, next) => {
  bookHelpers.getEachUserBooks(req.session.user._id).then((UserBooks)=>{
    res.render('user/my-books', {UserBooks, user, addBooks:true, home:true})
    
  })
})

router.get('/deleteUserBooks/:id', verifyLogin, (req, res, next) =>{
  bookHelpers.deleteEachUserBooks(req.params.id).then(()=>{
    res.redirect('/myBooks')
  })
})

router.get('/myComments', verifyLogin, (req, res, next) => {
  bookHelpers.getEachUserComments(req.session.user._id).then((UserComments)=>{
    res.render('user/my-Comments', {UserComments, user, home:true})
    
  })
})

router.get('/deleteUserComments/:id', verifyLogin, (req, res, next) =>{
  bookHelpers.deleteEachUserComments(req.params.id).then(()=>{
    res.redirect('/myComments')
  })
})


module.exports = router;
