
const mongo = require('./mongodb/mongoConnection.js')


const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');

const static = require('koa-static');
const views = require('koa-views');
const render = require('koa-ejs');
const path = require('path')
const json = require('koa-json');

const app = new Koa();
const router = new Router();

const users = [
  {
    name: 'Jhonatan',
    email: 'jhonatan4alves@gmail.com',
    age: 18
  },
  {
    name: 'Maria',
    email: 'maria@gmail.com',
    age: 28
  },
  {
    name: 'José',
    email: 'jose@gmail.com',
    age: 39
  }
]

render(app, {
  root: path.join(__dirname, 'views'),
  cache: false,
  debug: false
})

//home
router.get('/', async (ctx) => {
  console.log('connected to root route');
  User.find({}, async (error, results) => {
    console.log('From mongo db collection: ' + results);
  })
  await ctx.render('index', {
    hello: 'Bem vindo!'
  })
})

router.get('/user', usersList);
async function usersList(ctx) {
  await ctx.render('users', {
    title: 'Lista de users',
    users: users
  });
}

router.get('/user/:id', ctx => {
  ctx.body = users[ctx.params.id];
})

router.post('user/:id', ctx => {
  ctx.body = Object.assign(users[ctx.params.id], ctx.request.body)
})


const User = require('./model/user.js');

app
  .use(require('koa-body')())
  .use(views('views', {map: {html: 'ejs'}}))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(json());


const server = app.listen(PORT);

module.exports = server;