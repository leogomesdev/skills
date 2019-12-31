import express from 'express';
import bodyParser from 'body-parser';
import skills from './routes/skillsRoutes';
import connectToDb from './database/connect';

let app = express();

connectToDb();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.send({ status: 'running' });
});

app.use('/api', skills);

app.listen(3000, () => {
  console.log('\n Server started - http://localhost:3000/ \n');
});