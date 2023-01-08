
// Accessing mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Connecting to database
mongoose.connect("mongodb://localhost:27017/peopleDB",{
        useNewUrlParser: true
    },(err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Connection Working fine");
        }
    }

);

// Initialising schema
const personSchema = mongoose.Schema({
    name: String,
    age: Number
});

// Defining Model/Collection
const personModel = mongoose.model("People",personSchema); // Model name is converted to lowercase with plural automatically :)

// Inserting documents
const person = new personModel ({
    name: 'dave',
    age: 22
});
// Single document insert
// person.save().then(() => {console.log("Saved")});

// Example for Schema and Collection with miltiple insert
const petSchema = mongoose.Schema({
    name: String,
    color: String
});
const Pet = mongoose.model("Pet",petSchema);
const dog = new Pet({
    name: "Dog",
    color: "White"
});
const cat = new Pet({
    name: "Cat",
    color: "Black"
});

// Multiple insert using mongoose API
Pet.insertMany([dog, cat],(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully Inserted");
    }
});