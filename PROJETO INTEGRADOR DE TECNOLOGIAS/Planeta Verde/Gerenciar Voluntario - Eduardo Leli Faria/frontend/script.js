// Exibir as seções de cadastro e busca
function mostrarCadastro() {
  document.getElementById("cadastrar").style.display = "block";
  document.getElementById("buscar").style.display = "none";
}

function mostrarBusca() {
  document.getElementById("cadastrar").style.display = "none";
  document.getElementById("buscar").style.display = "block";
}

// Função para cadastrar voluntário
document.getElementById('formCadastro').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nome = document.getElementById('nome').value;

  // Verificar se o nome contém números
  const nomeComNumero = /\d/;
  if (nomeComNumero.test(nome)) {
    alert("O nome não pode conter números.");
    return; // Impede o envio do formulário
  }

  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const endereco = document.getElementById('endereco').value;

  fetch('http://localhost:3000/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nome, cpf, email, endereco })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    document.getElementById('formCadastro').reset();
  })
  .catch(error => console.error('Erro:', error));
});

// Função para buscar voluntários
function buscarVoluntarios() {
  const searchTerm = document.getElementById('search').value;

  fetch(`http://localhost:3000/buscar?searchTerm=${searchTerm}`)
    .then(response => response.json())
    .then(voluntarios => {
      const table = document.querySelector("table");
      const rows = table.querySelectorAll("tr:not(:first-child)");
      rows.forEach(row => row.remove());

      voluntarios.forEach(voluntario => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${voluntario.nome}</td>
          <td>${voluntario.cpf}</td>
          <td>${voluntario.email}</td>
          <td>${voluntario.endereco}</td>
          <td>
            <button onclick="editarVoluntario(${voluntario.id})">Editar</button>
            <button onclick="excluirVoluntario(${voluntario.id})">Excluir</button>
          </td>
        `;
        table.appendChild(tr);
      });
    })
    .catch(error => console.error('Erro:', error));
}

// Função para editar voluntário
function editarVoluntario(id) {
  fetch(`http://localhost:3000/buscar/${id}`)
    .then(response => response.json())
    .then(voluntario => {
      // Redireciona para a página de cadastro
      mostrarCadastro(); // Isso vai esconder a busca e mostrar o formulário de cadastro

      // Preenche o formulário de cadastro com os dados do voluntário
      document.getElementById('nome').value = voluntario.nome;
      document.getElementById('cpf').value = voluntario.cpf;
      document.getElementById('email').value = voluntario.email;
      document.getElementById('endereco').value = voluntario.endereco;

      // Substitui o método do formulário para "Atualizar" em vez de "Cadastrar"
      const form = document.getElementById('formCadastro');
      form.onsubmit = function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const email = document.getElementById('email').value;
        const endereco = document.getElementById('endereco').value;

        fetch(`http://localhost:3000/editar/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, cpf, email, endereco })
        })
        .then(response => response.text())
        .then(data => {
          alert(data);
          buscarVoluntarios(); // Recarrega a lista de voluntários
        })
        .catch(error => console.error('Erro:', error));
      };
    })
    .catch(error => console.error('Erro ao buscar voluntário:', error));
}

// Função para excluir voluntário
function excluirVoluntario(id) {
  if (confirm("Tem certeza que deseja excluir este voluntário?")) {
    fetch(`http://localhost:3000/excluir/${id}`, {
      method: 'DELETE'
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      buscarVoluntarios();
    })
    .catch(error => console.error('Erro:', error));
  }
}
