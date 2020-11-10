/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling. 
 * They're for information purposes only.
 * 
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course. 
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/user');

const mongoConnect = require('./util/database')
const PORT = process.env.PORT || 5000 // So we can run on heroku || (OR) localhost:5000

const app = express();

const corsOptions = {
    origin: "https://secret-sierra-66724.heroku.com/",
    optionsSuccessStatus: 200
};

// Route setup. You can implement more in the future!
const ta01Routes = require('./routes/teamActivities/ta01');
const ta02Routes = require('./routes/teamActivities/ta02');
const ta03Routes = require('./routes/teamActivities/ta03');
const ta04Routes = require('./routes/teamActivities/ta04');
const prove01Routes = require('./routes/prove01');
const prove02Routes = require('./routes/prove02');
const prove08Routes = require('./routes/prove08');
const shopRoutes = require('./routes/shop');
const shopAdminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

mongoConnect.mongoConnect(client => {
   app.use(express.static(path.join(__dirname, 'public')))
      .set('views', path.join(__dirname, 'views'))
      .set('view engine', 'ejs')
      .use(cookieParser())
      .use(session({secret: "It's a secret I guess?"}))
   // For view engine as Pug
   //.set('view engine', 'pug') // For view engine as PUG.
   // For view engine as hbs (Handlebars)
   //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
   //.set('view engine', 'hbs')
      .use(bodyParser({extended: false})) // For parsing the body of a POST
      .use(cors(corsOptions))
      //.use((req, res, next) => {
         //User.findById('5f82261093c7c002d1f1fcf1')
             //.then(user => {
                //req.user = new User(user.name, user.email, user.cart, user._id)
                //console.log(req.user);
                //next();
             //})
             //.catch(err => console.log(err));
      //})
      .use((req, res, next) => {
         if(req.session.user) {
            res.locals.isLoggedIn = true;
         } else {
            res.locals.isLoggedIn = false;
         }
         next();
      })
      .use('/ta01', ta01Routes)
      .use('/ta02', ta02Routes)
      .use('/ta03', ta03Routes)
      .use('/ta04', ta04Routes)
      .use('/prove01', prove01Routes)
      .use('/prove02', prove02Routes)
      .use('/prove08', prove08Routes)
      .use('/shop', shopRoutes)
      .use('/admin', shopAdminRoutes)
      .use('/auth', authRoutes)
      .get('/', (req, res, next) => {
         // This is the primary index, always handled last.
         res.render('pages/index', {title: 'Welcome to my CSE341 repo', path: '/'});
      })
      .use((req, res, next) => {
         // 404 page
         res.render('pages/404', {title: '404 - Page Not Found', path: req.url})
      })
      .listen(PORT, () => console.log(`Listening on ${ PORT }`));
})
