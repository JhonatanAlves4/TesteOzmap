//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

require('dotenv').config();

// conexão com o mongo db
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect("mongodb+srv://jhonatan:mongodb@cluster0.zabwq.mongodb.net/ozMapdb", {useNewUrlParser: true},{useUnifiedTopology: true});

db.on('error', (err) => console.log('Error, DB not connected'));
db.on('connected', () => console.log('Connected to mongo'));
db.on('disconnected', () => console.log('Mongo is disconnected'));
db.on('open', () => console.log('Connection made!'));


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
    name: 'Jhonatan Alves'
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