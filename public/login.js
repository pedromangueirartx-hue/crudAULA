function fazerLogin() {
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/usuarios')
    .then(res => res.json())
    .then(dados => {
        let usuario = dados.find(user => user.email === email && user.senha === senha);
        if(usuario) {
            localStorage.setItem('userLogado', JSON.stringify(usuario));
            window.location.href = '/public/index.html';
        } else {
            alert("Email ou Senha incorretos. Tente novamente.");
        }
    })
    .catch(() => alert("Erro ao conectar com o servidor. Verifique o JSON-Server."));
}