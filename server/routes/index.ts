import express = require('express');
var sendgrid = require('sendgrid')('ACCOUNT_NAME', 'PASSWORD');
import passport = require('passport');
var router = express.Router();

// db references
import userModel = require('../models/user');
import User = userModel.User;

/* Utility Function to check if user is authenticated */
function requireAuth(req:express.Request, res:express.Response, next: any) {
    // check if the user is logged in
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { 
        title: 'Home', 
        displayName: req.user ? req.user.displayName : '' });
});

/* GET product page. 
router.get('/products', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { 
        title: 'Products',
        displayName: req.user ? req.user.displayName : ''});
});

/* GET services page. 
router.get('/services', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { 
        title: 'Services',
        displayName: req.user ? req.user.displayName : '' });
});

/* GET about page. 
router.get('/about', (req: express.Request, res: express.Response, next: any) => {
    res.render('index', { 
        title: 'About',
        displayName: req.user ? req.user.displayName : '' });
});
*/
/* GET contact page. */
router.get('/contact', (req: express.Request, res: express.Response, next: any) => {
    req.flash('successmessage', 'Thank You. Your message has been sent.');
    req.flash('errormessage','An Error has occurred.');
    res.render('contact', { 
        title: 'Contact', 
        messages: null,
        displayName: req.user ? req.user.displayName : '' });
});

/* Email processing */
router.post('/contact', (req: express.Request, res: express.Response, next: any) => {
    sendgrid.send({
        to: 'mpatel.y@gmail.com.com',
        from: req.body.email,
        subject: 'Contact Form Submission',
        text: "This message has been sent from the contact form at [MongoDB Demo]\r\n\r\n" +
        "Name: " + req.body.name + "\r\n\r\n" +
        "Phone: " + req.body.phone + "\r\n\r\n" +
        req.body.message,
        html: "This message has been sent from the contact form at [MongoDB Demo]<br><br>" +
        "<strong>Name:</strong> " + req.body.name + "<br><br>" +
        "<strong>Phone:</strong> " + req.body.phone + "<br><br>" +
        req.body.message
    },
        (err, json) => {
            if (err) { res.status(500).json('error'); 
            }
            res.render('contact', { 
                title: 'Contact',
                messages: req.flash('successmessage')
         });

        });
});

/* Render Login Page */
router.get('/login', (req:express.Request, res: express.Response, next:any) => {
    if(!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/users');
    }
});

/* Process Login Request */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Render Password Reset page */
router.get('/reset', (req:express.Request, res: express.Response, next:any) => {
    if(req.user) {
        res.render('reset', {
            title: 'Reset',
            displayName: req.user ? req.user.displayName : '' 
        });  
    }
    else {
        return res.redirect('/login');
    }
});

/* Process Password Reset Request */
router.post('/reset',(req:express.Request, res: express.Response, next:any) => {
    console.log(req.user.username);
    User.findOne({'username':req.user.username}, (err, user) => {
       user.setPassword(req.body.password, (err) =>{
          if(err) {
              console.log(err);
              next(err);
          } else {
              user.save((err) =>{
                  if(err) {
                      console.log(err);
                  }
                  
                  console.log('Password Changed');
                  res.redirect('/users');
              });
          }
       }); 
    });
});

/* Render Registration page */
router.get('/register', (req:express.Request, res: express.Response, next:any) => {
    if(!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
        return;
    } else {
        return res.redirect('/');
    }
});

/* Process Registration Request */
router.post('/register', (req:express.Request, res: express.Response, next:any) => {
    // attempt to register user
    User.register(new User(
       { username: req.body.username,
         password: req.body.password,
         email: req.body.email,
         displayName: req.body.displayName
       }), req.body.password, (err) => {
           if(err) {
               console.log('Error Inserting New Data');
               if(err.name == 'UserExistsError') {
               req.flash('registerMessage', 'Registration Error: User Already Exists!');
               }
               return res.render('register', {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
           }
           // if registration is successful
           return passport.authenticate('local')(req, res, ()=>{
              res.redirect('/users'); 
           });
       });
});

/* Process Logout Request */
router.get('/logout', (req:express.Request, res: express.Response) => { 
    req.logOut();
    res.redirect('/login');
});

/* GET home page. */
router.get('/todoList', requireAuth, (req:express.Request, res: express.Response, next:any) => {
  res.render('todos/index', { 
      title: 'Todos',
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : '' 
  });
});

module.exports = router;
