import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './Routes/user.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(express.json());


const port = process.env.PORT || 9090;
const databaseName = 'exerice';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());

  app.use(morgan('dev')); // ta3mel debug lel app
  app.use(express.urlencoded({ extended: true })); // analyse du corps de la requête
  app.use('/user', userRoutes);
  app.use('/img', express.static("public")); 


  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });