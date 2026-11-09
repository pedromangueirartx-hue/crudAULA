const userLogado = JSON.parse(localStorage.getItem('userLogado'));

if (!userLogado) {
    window.location.href = 'login.html';
} else {
    document.getElementById('welcomeMsg').innerText = `Bem-vindo à Netflix, ${userLogado.nome}!`;
    
    let links = `<a href="#" onclick="sair()">Sair</a>`;
    if (userLogado.isAdmin) {
        links = `<a href="admin.html">Administração</a> ` + links;
    }
    document.getElementById('navLinks').innerHTML = links;
}

function sair() {
    localStorage.removeItem('userLogado');
    window.location.href = '/public/login.html';
}