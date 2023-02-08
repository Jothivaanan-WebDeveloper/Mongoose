
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
const petSchema = mongoose.Schema({
    name: String,
    color: String
});

const personSchema = mongoose.Schema({
    name: String,
    age: Number,
    favouritePet: petSchema
});

// Defining Model/Collection
const personModel = mongoose.model("People",personSchema); // Model name is converted to lowercase with plural automatically :)
const Pet = mongoose.model("Pet",petSchema);

// Inserting documents
const person = new personModel ({
    name: 'dave',
    age: 22
});
// Single document insert***************************************************************
person.save().then(() => {console.log("Saved")});

// Multiple insert using mongoose API **************************************************
const dog = new Pet({
    name: "Dog",
    color: "White"
});
const cat = new Pet({
    name: "Cat",
    color: "Black"
});
Pet.insertMany([dog, cat],(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully Inserted");
    }
});

// Get all documents******************************************************************
Pet.find((err,pets) => {
    if (err) {
        console.log(err);
    }
    else {
       pets.forEach(el => {
        console.log(el.name);
       });
    }
});

// Update documents ***********************************************************************
Pet.updateOne({name: "Cat"},{color: "White"},(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Updated Successfully");
    }
});

// Delete document **************************************************************************
Pet.deleteOne({_id:"63bafe5f0a165734b330bbb9"},(err)=> {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Deleted Successfully");
    }
});

// Documents Relationship *******************************************************************
const favPet = new Pet ({
    name: "Dog",
    color: "Black"
});

// favPet.save();

personModel.updateOne({name:"John"},{favouritePet: favPet},(err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Done");
    }
});
