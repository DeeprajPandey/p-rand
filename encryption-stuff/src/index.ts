import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import apiRoutes from './routes/api';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(6400);