require('dotenv').config();
const bodyParser = require('body-parser');
const connectMongo = require('connect-mongo');
const express = require('express');
require('express-async-errors');
const helmet = require('helmet');
const next = require('next');
const session = require('express-session');
const barsRouter = require('./routes/bars');
const indexRouter = require('./routes');
const passport = require('./passport');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const Mongostore = connectMongo(session);

app
  .prepare()
  .then(() => {
    express()
      .use(helmet({ contentSecurityPolicy: false }))
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(
        session({
          store: new Mongostore({ url: process.env.DATABASE_URI }),
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
        }),
      )
      .use(passport.initialize())
      .use(passport.session())
      .use('/', indexRouter)
      .use('/api/bars', barsRouter)
      .get('*', handle)
      .listen(process.env.PORT || 3000);
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
