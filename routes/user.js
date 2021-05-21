var express = require('express');
const bookHelpers = require('../helpers/book-helpers');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();

const verifyLogin = (req,res,next)=>{
  if(req.session.user){
    next()
  }else{
    res.redirect('/login')
  }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.session.user
  bookHelpers.getAllBooks().then((books)=>{
    console.log(books);
    res.render('user/view-books', {title:'User', admin:false, books, user});
  })
});

router.get('/add-book', (req, res, next) => {
  res.render('user/add-book');
})

router.post('/user/add-book', (req, res, next) => {
  console.log(req.body);
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
    res.render('user/login', { "loginErr":req.session.userLoginErr , title: 'Company', admin: false})
    req.session.userLoginErr = false
  }
})
router.get('/signup',(req,res)=>{
  if(req.session.userLoggedIn){
    res.redirect('/')
  }else{
    res.render('user/signup', { title: 'Company', admin: false})
  }
})
router.post('/signup',(req,res)=>{
  
    userHelpers.doSignup(req.body).then((response)=>{
      console.log(response);
      
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
router.get('/review', verifyLogin, (req,res)=>{

})
module.exports = router;
