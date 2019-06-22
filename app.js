import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import router from './routes/index';

//Setting express app
const app = express();

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
