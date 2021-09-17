// conexão com o mongo db
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect("mongodb+srv://jhonatan:mongodb@cluster0.zabwq.mongodb.net/ozMapdb", {useNewUrlParser: true},{useUnifiedTopology: true});

db.on('error', (err) => console.log('Error, DB not connected'));
db.on('connected', () => console.log('Connected to mongo'));
db.on('disconnected', () => console.log('Mongo is disconnected'));
db.on('open', () => console.log('Connection made!'));