const mongoose = require('mongoose');
// const password = process.argv[2];

const url = `mongodb+srv://fullstack-notes:${process.argv[2]}@notes-database.julpkqu.mongodb.net/contacts?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  contact: String,
  number: String,
});

const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
  contact: process.argv[3],
  number: process.argv[4]
});

contact.save().then(result => {
  console.log(`Added ${result.contact} to number ${result.number} to phonebook`);
  mongoose.connection.close();
})