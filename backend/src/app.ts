import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import { globalErrors } from './middlewares/globalErrors';
import { routes } from './routes';


const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(globalErrors);


app.listen(3000, () => {
  console.log('✅ listening on port 3000');
});
