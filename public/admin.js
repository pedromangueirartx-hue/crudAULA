const userLogado = JSON.parse(localStorage.getItem('userLogado'));
if (!userLogado || !userLogado.isAdmin) {
    alert('Acesso restrito!');
    window.location.href = 'index.html';
}

const API = 'http://localhost:3000/usuarios';

function carregarUsuarios() {
    fetch(API).then(res => res.json()).then(renderizarTabela);
}

function buscarUsuario() {
    const cpf = document.getElementById('buscaCpf').value;
    if (!cpf) return carregarUsuarios();
    fetch(`${API}?cpf=${cpf}`).then(res => res.json()).then(renderizarTabela);
}

function renderizarTabela(usuarios) {
    const tbody = document.getElementById('tabelaUsuarios');
    tbody.innerHTML = '';
    
    usuarios.forEach(u => {
        // Verifica se o usuário da linha atual é o mesmo que está logado
        let botaoApagar = '';
        if (u.id === userLogado.id) {
            // Se for o admin logado, mostra um botão desabilitado e cinza
            botaoApagar = `<button class="btn" style="padding: 8px; width: auto; background-color: #ccc; cursor: not-allowed;" disabled>Apagar</button>`;
        } else {
            // Se for outro usuário, mostra o botão normal
            botaoApagar = `<button class="btn" style="padding: 8px; width: auto;" onclick="deletarUsuario('${u.id}')">Apagar</button>`;
        }

        tbody.innerHTML += `
            <tr>
                <td>${u.nome} ${u.sobrenome}</td>
                <td>${u.cpf}</td>
                <td>${u.email}</td>
                <td>
                    <button class="btn btn-edit" style="padding: 8px; width: auto;" onclick="prepararEdicao('${u.id}')">Editar</button>
                    ${botaoApagar}
                </td>
            </tr>
        `;
    });
}

function deletarUsuario(id) {
    // Trava de segurança extra
    if (id === userLogado.id) {
        alert("Ação negada: Você não pode apagar o seu próprio usuário admin.");
        return;
    }

    if(confirm("Deseja realmente apagar este assinante?")) {
        fetch(`${API}/${id}`, { method: 'DELETE' })
        .then(carregarUsuarios)
        .catch(() => alert("Erro ao apagar o usuário."));
    }
}

function prepararEdicao(id) {
    fetch(`${API}/${id}`).then(res => res.json()).then(u => {
        document.getElementById('editId').value = u.id;
        document.getElementById('editNome').value = u.nome;
        document.getElementById('editCpf').value = u.cpf;
        document.getElementById('editEmail').value = u.email;
        document.getElementById('editSecao').style.display = 'block';
    });
}

function salvarEdicao() {
    const id = document.getElementById('editId').value;
    const dados = {
        nome: document.getElementById('editNome').value,
        cpf: document.getElementById('editCpf').value,
        email: document.getElementById('editEmail').value
    };

    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    }).then(() => {
        cancelarEdicao();
        carregarUsuarios();
    });
}

function cancelarEdicao() { document.getElementById('editSecao').style.display = 'none'; }
function sair() { localStorage.removeItem('userLogado'); window.location.href = '/public/login.html'; }

carregarUsuarios();