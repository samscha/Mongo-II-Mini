const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');

const Author = require('./Authors/AuthorModel.js');
const Book = require('./Books/BookModel.js');

const server = express();

server.use(helmet());
server.use(bodyParser.json());

// Your API will be built out here.
server.get('/', function(req, res) {
  res.status(200).json({ api: 'running' });
});

// server.get('/api/books', (req, res) => {
//   Book.find()
//     .populate('authors', 'firstName lastName')
//     .select('title') // book title
//     .then(books => res.status(200).json(books))
//     .catch(err => res.status(500).json(err));
// });

server.get('/api/books', (req, res) => {
  Author.find()
    // .select('firstName lastName fullName')
    // .or([{ firstName: 'Pramod' }, { firstName: 'Martin' }])
    // .limit(5)
    // .sort('-firstName')
    // .populate('authors', 'firstName lastName')
    .then(authors => res.status(200).send(authors))
    // .select('_id')
    // .populate('books', 'title')
    // .select('title') // book title
    // .then(ids =>
    //   Book.find()
    //     .where('authors')
    //     .in(ids)
    //     .populate('authors', 'firstName lastName')
    //     .then(books => res.status(200).send(books)),
    // )
    .catch(err => res.status(500).json(err));
});

mongoose.connect('mongodb://localhost/cs6').then(
  () => {
    const port = process.env.PORT || 3000;
    server.listen(port);
    console.log(`Server Listening on ${port}`);
  },
  err => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
  },
);

// lowercase: true,
// Schema( {

// },
// {
//    runSettersOnQuery: true
// }
// )

// virtuals in Model
// AuthorSchema.virtual('fullName')
//   .get(_ => {
//     return `${this.firstName} ${this.lastName}`
//    }) //retrieve
//   .set() // save
