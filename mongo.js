
const url = `mongodb+srv://fullstack-notes:${process.argv[2]}@notes-database.julpkqu.mongodb.net/contacts?retryWrites=true&w=majority`;




// Creates a new contact
const contact = new Contact({
  contact: process.argv[3],
  number: process.argv[4]
});

// console.log(process.argv)
if(process.argv.length === 3){
  
  Contact.find({}).then(contacts => {
    console.log('Phonebook:')
    for(i = 0; i<contacts.length; i++){
      console.log(`Name: ${contacts[i].contact} Number: ${contacts[i].number}`)
    }
    mongoose.connection.close()
  })
}else{
  // Saves the contact to MongoDB
  contact.save().then(result => {
    console.log(`Added ${result.contact} to number ${result.number} to phonebook`);
    mongoose.connection.close()
  });
}