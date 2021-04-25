import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from './models/index.js';
import { gradeRouter } from './routes/gradeRouter.js';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      // await db.mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('its aliiiiive!');
  } catch (error) {
    console.log('its death x(' + error);
    process.exit();
  }
})();

const app = express();
// app.use((req, res, next) => {
//   //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
//   res.header('Access-Control-Allow-Origin', '*');
//   //Quais são os métodos que a conexão pode realizar na API
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   app.use(cors());
//   next();
// });
app.use(express.json());
app.use(gradeRouter);

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors();
  //   {
  //   origin: '*',
  // })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
// app.listen(3000, () => {});
