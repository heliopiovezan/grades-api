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
app.use(express.json());
app.use(gradeRouter);

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
  })
);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 8081, () => {});
// app.listen(3000, () => {});
