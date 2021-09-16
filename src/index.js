//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');

const static = require('koa-static');
const views = require('koa-views');
const render = require('koa-ejs');
const path = require('path')


const app = new Koa();
const router = new Router();


//rota simples pra testar se o servidor está online
/*router.get('/', async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});*/

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  cache: false,
  debug: false
})

router.get('/', async ctx => {
  await ctx.render('index', {
    name: process.env.NAME
  });
})

router.get('/name', async ctx => {
  await ctx.render('name', {
    name: 'Lorena'
  });
})

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo
/*router.get('/users', async (ctx) => {
    ctx.status = 200;
    ctx.body = {total:0, count: 0, rows:[]}
});*/

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(static('./public'))

const server = app.listen(PORT);

module.exports = server;