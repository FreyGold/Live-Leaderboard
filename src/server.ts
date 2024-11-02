import e from 'express';
import app from './app.ts';

app.listen(process.env.port, () => {
  console.log(`listening on port ${process.env.port}`);
});
