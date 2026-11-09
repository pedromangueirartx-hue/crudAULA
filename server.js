const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 3000;

// Configura os middlewares padrão (logger, estáticos, cors)
server.use(middlewares);

// Adiciona o roteador do db.json
server.use(router);

// Inicia o servidor
server.listen(port, () => {
    console.log(`▶ Servidor rodando com sucesso!`);
    console.log(`▶ Acesse a API em: http://localhost:${port}/usuarios`);
});