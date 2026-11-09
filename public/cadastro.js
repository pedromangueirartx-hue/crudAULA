function enviarDados() {
    // 1. Recolher os valores digitados no formulário
    const novoUsuario = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        rua: document.getElementById('rua').value,
        cep: document.getElementById('cep').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        isAdmin: false // Define que é um utilizador normal por defeito
    };

    // 2. Enviar os dados para o backend utilizando o método POST
    fetch('http://localhost:3000/usuarios', {
        method: 'POST', // Método HTTP para criar novos registos
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(novoUsuario) // Converte o objeto JavaScript para texto JSON
    })
    .then(resposta => {
        if (resposta.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html'; // Redireciona para o login
        } else {
            alert('Erro ao realizar o cadastro. Tente novamente.');
        }
    })
    .catch(erro => {
        console.error('Erro na requisição POST:', erro);
        alert('Erro ao conectar com o servidor. Verifique se o server.js está a rodar.');
    });
}