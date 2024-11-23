import app from './app.ts';


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});