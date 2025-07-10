window.onload = async () => {
  if (document.getElementById('tarefas')) {
    const res = await fetch('http://localhost:3000/tarefas');
    const tarefas = await res.json();
    const container = document.getElementById('tarefas');
    tarefas.forEach(tarefa => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${tarefa.titulo}</strong> - ${tarefa.concluida ? '✅ Concluída' : '⏳ Pendente'}<br>
        ${tarefa.descricao}<br>
        <a href="editar.html?id=${tarefa.id}">Editar</a> |
        <button onclick="deletar(${tarefa.id})">Excluir</button>
        <hr>`;
      container.appendChild(div);
    });
  }
};

async function deletar(id) {
  if (confirm('Deseja mesmo excluir esta tarefa?')) {
    await fetch(`http://localhost:3000/tarefas/${id}`, { method: 'DELETE' });
    location.reload();
  }
}
