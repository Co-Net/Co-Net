const mongoose = require('mongoose'),
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  passport = require('passport');
require('dotenv').config();
require('./api/auth/auth');

const app = express();
app.use(cors(
  {
    credentials: true,
    origin: `http://localhost:3000`
  }
));

app.use(cookieParser(process.env.JWT_SECRET));

// Routers
const userRouter = require('./api/routes/userRouter');
const userTagRouter = require('./api/routes/userTagRouter');
const gameRouter = require('./api/routes/gameRouter');
const forumRouter = require('./api/routes/forumPostRouter');
const secureRouter = require('./api/routes/secureRouter');
// this is our MongoDB database
const dbRoute =
  `mongodb+srv://${process.env.DB_CREDENTIALS}@cluster0-8hzh3.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Routes
app.use('/users', userRouter);
app.use('/userTags', userTagRouter);
app.use('/games', gameRouter);
app.use('/forum', forumRouter)
app.use('/user', passport.authenticate('jwt', { session: false, failureRedirect: '/users/guest' }), secureRouter)

// // this is our get method
// // this method fetches all available data in our database
// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// // this is our update method
// // this method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// // this is our create methid
// // this method adds new data in our database
// router.post('/putData', (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: 'INVALID INPUTS',
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // append /api for our http requests
// app.use('/api', router);

// launch our backend into a port
app.listen(process.env.PORT, () => console.log(`CO-NET LISTENING ON PORT ${process.env.PORT}`));
