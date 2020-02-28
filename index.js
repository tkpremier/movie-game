// Include the cluster module
const createError = require('http-errors');

const express = require('express');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const dotenv = require('dotenv');
const logger = require('morgan');
const layout = require('./src/layout');
const { authorize, listFiles, getFile } = require('./src/drive');
const ssr = require('./dist/app.bundle');

dotenv.config();
const app = express();
const initialState = {
    isFetching: true,
    name: 'Kyungtae',
    type: 'server'
  };
async function indexRouter(req, res) {
    const response = layout({
      initialState,
      title: 'Google T',
      type: 'react',
      data: []
    });
    res.setHeader('Cache-Control', 'assets, max-age=604800');
    res.send(response);
};

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use(logger('dev'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', indexRouter);
// app.get('/list', listRouter);
// app.get('/web-workers', webWorkers);
// app.get('/test', mochaTest);
// app.get('/get-more/:token', getMore);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (err.status !== 404) {
    console.log('err: ', err);
  }
  res.status(err.status || 500);
  res.send(err);
});


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});