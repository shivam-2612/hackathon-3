const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));

// Use body parser to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// let quotes = [];
let currentId = 8;

const quotes =[

    {
        id:1,
        author:'Santosh Kalwar',
        text:'Coding like poetry should be short and concise.'
    },
    {
        id:2,
        author:'Emily Dickinson',
        text:'It’s not a bug; it’s an undocumented feature.'
    },
    {
        id:3,
        author:'John Johnson',
        text:'First, solve the problem. Then, write the code. '
    },
    {
        id:4,
        author:'Cory House',
        text:'Code is like humor. When you have to explain it, it’s bad. '
    },
    {
        id:5,
        author:'Robert C. Martin',
        text:'Clean code always looks like it was written by someone who cares.'
    },
    {
        id:6,
        author:'Martin Fowler',
        text:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.'
    },
    {
        id:7,
        author:'Ram Ray',
        text:'No matter which field of work you want to go in, it is of great importance to learn at least one programming language.'
    },
]

app.get('/', (req, res) => {
  res.render('allQuotes', { quotes: quotes });
});

app.get('/quotes/new', (req, res) => {
  res.render('addQuote');
});

app.post('/quotes', (req, res) => {
  const quote = {
    id: currentId++,
    author: req.body.author,
    text: req.body.quote
  };
  quotes.push(quote);
  res.redirect('/quotes');
});

app.get('/quotes/:id', (req, res) => {
  const quoteId = Number(req.params.id);
  const quote = quotes.find(quote => quote.id === quoteId);
  if (!quote) {
    res.status(404).send({ error: 'Quote not found' });
  } else {
    res.render('quote', { quote: quote });
  }
});

app.get('/quotes', (req, res) => {
  res.render('allQuotes', { quotes: quotes });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
