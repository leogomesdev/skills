import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import skills from './routes/skills-route';
import { connect } from './database/connect';

let app = express();

dotenv.config();
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.send({ status: 'running' });
});

app.use('/api', skills);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log('\n Server started - http://localhost:' + port + '/ \n');
});

export default app;