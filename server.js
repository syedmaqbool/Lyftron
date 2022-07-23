const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Controller = require('./app/controllers/userController');
const minifyHTML = require('express-minify-html');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true
  }
}));

app.use(express.static('public'));

app.get('/users', Controller.getUsers);
// app.get ('/fetchData',Controller.readUserData);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

