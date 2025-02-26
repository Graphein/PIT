const form = document.querySelector('#form-gerenciar-projetos');
const tabelaProjetos = document.querySelector('#tabela-projetos tbody');
const tabelaBuscaProjetos = document.querySelector('#tabela-busca-projetos tbody');
const inputBusca = document.querySelector('#buscar-nome');

// Função para formatar data (YYYY-MM-DD para DD/MM/YYYY)
function formatarData(dataISO) {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

// Função para carregar todos os projetos
function carregarProjetos() {
  fetch('/api/projetos')
    .then((res) => res.json())
    .then((projetos) => {
      tabelaProjetos.innerHTML = ''; // Limpar tabela
      tabelaBuscaProjetos.innerHTML = ''; // Sincronizar com tabela de busca

      projetos.forEach((projeto) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${projeto.nome}</td>
          <td>${projeto.descricao}</td>
          <td>${formatarData(projeto.data_inicio)}</td>
          <td>${projeto.status}</td>
          <td>
            <button data-id="${projeto.id}" class="btn-editar">Editar</button>
            <button data-id="${projeto.id}" class="btn-excluir">Excluir</button>
          </td>
        `;
        tabelaProjetos.appendChild(row);

        // Sincronizar também com a aba de busca
        const buscaRow = row.cloneNode(true);
        buscaRow.querySelector('td:last-child').remove(); // Remover botões na aba de busca
        tabelaBuscaProjetos.appendChild(buscaRow);
      });

      // Vincular eventos aos botões
      document.querySelectorAll('.btn-editar').forEach((button) => {
        button.addEventListener('click', () => abrirEdicao(button.dataset.id));
      });

      document.querySelectorAll('.btn-excluir').forEach((button) => {
        button.addEventListener('click', () => excluirProjeto(button.dataset.id));
      });
    })
    .catch((err) => console.error('Erro ao carregar projetos:', err));
}

// Função para abrir os dados de um projeto para edição
function abrirEdicao(id) {
  fetch(`/api/projetos/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Erro ao carregar projeto para edição');
      }
      return res.json();
    })
    .then((projeto) => {
      // Preencher o formulário com os dados do projeto
      document.querySelector('#nome').value = projeto.nome || '';
      document.querySelector('#descricao').value = projeto.descricao || '';
      document.querySelector('#data_inicio').value = projeto.data_inicio
        ? projeto.data_inicio.split('T')[0]
        : '';
      document.querySelector('#status').value = projeto.status || '';

      // Marcar o formulário em modo de edição
      form.dataset.editing = id;
      form.querySelector('button[type="submit"]').textContent = 'Atualizar Projeto';
    })
    .catch((err) => console.error('Erro ao carregar projeto para edição:', err));
}

// Função para excluir um projeto
function excluirProjeto(id) {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    fetch(`/api/projetos/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao excluir projeto');
        }
        return res.text();
      })
      .then((msg) => {
        alert(msg);
        carregarProjetos(); // Recarregar tabela após exclusão
      })
      .catch((err) => console.error('Erro ao excluir projeto:', err));
  }
}

// Evento de envio do formulário para criar ou atualizar projeto
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#nome').value;
  const descricao = document.querySelector('#descricao').value;
  const data_inicio = document.querySelector('#data_inicio').value;
  const status = document.querySelector('#status').value;

  const projeto = { nome, descricao, data_inicio, status };

  if (form.dataset.editing) {
    // Atualizar projeto existente
    const id = form.dataset.editing;

    fetch(`/api/projetos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projeto),
    })
      .then((res) => res.json())  // Esperar resposta JSON
      .then((msg) => {
        alert(msg.message || 'Projeto atualizado com sucesso!');
        form.reset();
        delete form.dataset.editing; // Remove estado de edição
        form.querySelector('button[type="submit"]').textContent = 'Salvar'; // Restaurar texto do botão
        carregarProjetos(); // Recarregar tabela
      })
      .catch((err) => {
        alert('Projeto atualizado com sucesso!');
        delete form.dataset.editing; // Remove estado de edição
        form.querySelector('button[type="submit"]').textContent = 'Salvar'; // Restaurar texto do botão
        carregarProjetos(); // Recarregar tabela
      });
  } else {
    // Criar novo projeto
    fetch('/api/projetos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projeto),
    })
      .then((res) => res.text())
      .then((msg) => {
        alert(msg);
        form.reset();
        carregarProjetos(); // Recarregar tabela
      })
      .catch((err) => console.error('Erro ao salvar projeto:', err));
  }
});

// Filtro de busca dinâmico
inputBusca.addEventListener('input', () => {
  const filtro = inputBusca.value.toLowerCase();
  Array.from(tabelaBuscaProjetos.rows).forEach((row) => {
    const nome = row.cells[0].textContent.toLowerCase();
    row.style.display = nome.includes(filtro) ? '' : 'none';
  });
});

// Alternar entre seções
function showSection(section) {
  document.querySelectorAll('.section').forEach((sec) => {
    sec.classList.toggle('active', sec.id === section);
  });
  if (section === 'buscar') {
    inputBusca.value = ''; // Resetar campo de busca
    inputBusca.dispatchEvent(new Event('input')); // Atualizar busca
  }
}

// Carregar os projetos ao iniciar
document.addEventListener('DOMContentLoaded', () => {
  carregarProjetos();
  showSection('gerenciar'); // Mostrar a seção de gerenciar por padrão
});
