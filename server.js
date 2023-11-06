const express =  require('express');
const checkAuth = require('./middleware/checkAuth');
const expressSanitizer = require('express-sanitizer');
require('dotenv').config();
const { engine } =  require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser()); // Add this after you initialize express.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkAuth);
app.use(express.static('public'));
// Mount express-sanitizer middleware here
app.use(expressSanitizer());
require('./controllers/auth.js')(app);
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/replies.js')(app);
require('./data/reddit-db');
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//ROUTES 

//* Home
app.get('/', (req, res) => {
  res.render('home');
});


//* New post (get)
app.get('/posts/new', (req, res) => {
  res.render('posts-new', {});
});

app.listen(4400);

module.exports = app;
