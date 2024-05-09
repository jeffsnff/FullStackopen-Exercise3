const express = require('express');
const app = express()
const PORT = 3001;
app.use(express.json());

function generateID(){
  const newID = contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) : 0;
  return newID + 1;
}

function duplicateContact(body){
  for(let i = 0; i < contacts.length; i++){
    if(contacts[i].name === body.name){
      return contacts[i].name;
    }
  }
}

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

app.post('/contacts', (request, response) => {

  const body = request.body;

  if(Object.keys(body).length === 0){
    response.status(400).json({
      error: 'Content Missing'
    });
  }else if(!body.name){
    response.status(400).json({
      error: 'Name Missing'
    });
  }else if(!body.number){
    response.status(400).json({
      error: 'Number Missing'
    });
  }else if(duplicateContact(body) === body.name){
    response.status(400).json({
      error: 'Name must be unique'
    });
  }else{
    const contact = {
      name: body.name,
      number: body.number,
      id: generateID()
    } 
    contacts = contacts.concat(contact);
    response.send(contacts);
  }
})

app.listen(PORT);
console.log(`Server is running on ${PORT}`);