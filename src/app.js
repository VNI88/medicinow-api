const express = require ('express');
const db = require ('./db/queries');
const bodyParser = require ('body-parser');
const router = require ('./routes/index');
const auth = require('../src/middleware/auth.js')
//Setting express app
const app = express();

//Api HomePage
app.get('/', (req, res) => {
  res.send('Welcome to MediciNOW API!')
})

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = process.env.PORT || 3001;

app.listen(port , () => {
  console.log(`Server running on port ${port}`)
});
