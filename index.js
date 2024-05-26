require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT
app.use(cors());
app.use(express.json());
app.use(requestLogger);
url = process.env.MONGODB_URI
mongoose.connect(url);

// This creates the Contact Schema for MongoDB
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});
// Assings the Schema Model to Contact
const Contact = mongoose.model('Contact', contactSchema);

function duplicateContact(Contact, contact){
  //This is broken rightnow

  // Contact.findOne({name: contact.name}).then(serveContact => {
  //   return serveContact.name
  //   if(serveContact.name === contact.name){
  //     return true;
  //   }
  // })
}

function requestLogger(request, response, next){
  console.log('Method : ', request.method);
  console.log('Path : ', request.path,);
  console.log('Body : ', request.body);
  console.log('-----');
  next();
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
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/info', (request, response) => {
  Contact.find({}).then(contacts => {
    let numContacts = 0;
    const requestTime = new Date;
    for(let i = 0; i < contacts.length; i++){
     numContacts++;
    }
    response.status(200).send(`<p>Phonebook has ${numContacts} people</p><p>${requestTime}</p>`);
  })
})

app.get('/contacts/:id', (request, response) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  })
})

app.delete('/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter(contact => contact.id !== id);
  response.status(202).send(contacts);
})

app.post('/contacts', (request, response) => {
  const body = request.body;
  const contact = new Contact ({
    name: body.name,
    number: body.number
  })

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
  }else if(duplicateContact(Contact, contact) === body.name){
    
  }else{
    contact.save().then(sendContact => {
    response.json(sendContact);
    })
  }
})

app.put('/contacts/:id', (request, response) => {
  const id = Number(request.params.id);
  contactToUpdate = contacts.find(contact => contact.id === id);
  
  contacts.forEach((contact) => {
    if(contact.id === id){
      return contact.number = request.body.number;
    }
  })
  response.status(202).json(request.body);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: "Unknown endpoint"});
}

app.use(unknownEndpoint);
app.listen(PORT);
console.log(`Server is running on ${PORT}`);