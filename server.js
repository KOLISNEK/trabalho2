const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const getTarefas = () => JSON.parse(fs.readFileSync('./backend/tarefas.json'));

app.get('/tarefas', (req, res) => {
  res.json(getTarefas());
});

app.get('/tarefas/:id', (req, res) => {
  const tarefas = getTarefas();
  const tarefa = tarefas.find(t => t.id === parseInt(req.params.id));
  tarefa ? res.json(tarefa) : res.status(404).send('Tarefa não encontrada');
});

app.post('/tarefas', (req, res) => {
  const tarefas = getTarefas();
  const nova = { id: Date.now(), ...req.body };
  tarefas.push(nova);
  fs.writeFileSync('./backend/tarefas.json', JSON.stringify(tarefas, null, 2));
  res.status(201).json(nova);
});

app.put('/tarefas/:id', (req, res) => {
  let tarefas = getTarefas();
  const index = tarefas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Tarefa não encontrada');
  tarefas[index] = { id: parseInt(req.params.id), ...req.body };
  fs.writeFileSync('./backend/tarefas.json', JSON.stringify(tarefas, null, 2));
  res.json(tarefas[index]);
});

app.delete('/tarefas/:id', (req, res) => {
  let tarefas = getTarefas();
  tarefas = tarefas.filter(t => t.id !== parseInt(req.params.id));
  fs.writeFileSync('./backend/tarefas.json', JSON.stringify(tarefas, null, 2));
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
