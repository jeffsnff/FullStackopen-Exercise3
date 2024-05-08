const express = require('express');
const app = express()
const PORT = 3001;
app.use(express.json());

let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/contacts', (request, response) => {
  response.json(contacts);
})

app.get('/info', (request, response) => {
  let numContacts = 0;
  const requestTime = new Date
  for(let i = 0; i < contacts.length; i++){
    numContacts++;
  }

  response.status(200).send(`<p>Phonebook has ${numContacts} people</p><p>${requestTime}</p>`);
})

app.get('/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  contact = contacts.find(contact => contact.id === id);
  response.status(200).send(contact);
})

app.delete('/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter(contact => contact.id !== id);
  response.status(202).send(contacts);
})

app.listen(PORT);
console.log(`Server is running on ${PORT}`);