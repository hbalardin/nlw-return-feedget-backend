import express from 'express';

const app = express();
app.use(express.json());

app.post('/feedbacks', (request, response) => {
  const { type, message, screenshot } = request.body;

  response.status(201).send();
});

app.listen(3333, () => console.log('HTTP server is running! 🚀'));
