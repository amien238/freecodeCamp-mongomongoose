require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// let Person;

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John Doe",
    age: 30,
    favoriteFoods: ["pizza", "pasta"]
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};


const arrayOfPeople = [
  { name: "Alice", age: 25, favoriteFoods: ["Salad", "Apple"] },
  { name: "Bob", age: 30, favoriteFoods: ["Burger", "Fries"] },
  { name: "Charlie", age: 35, favoriteFoods: ["Pizza", "Ice cream"] }
  ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); 
    done(null, data);
  });
};



const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
  done(null, data);
  });
};
findPeopleByName("A", console.log);


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);  
    done(null, data);
  });
};
findOneByFood("Banh Mi", console.log);


const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);    
    done(null, data);
  });
};
findPersonById("689309d4099f2a526c246d30", console.log); // Replace with a valid ID from your database

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

findEditThenSave("689309d4099f2a526c246d30", console.log); // Replace with a valid ID from your database

const findAndUpdate = (personName, done) => {
  const ageToSet = 50;
  Person.findOneAndUpdate(
    { name: personName }, 
    { age: ageToSet },
    { new: true }, // Return the updated document
    (err, updatedPerson) => {
      if (err) return done(err);
      if (!updatedPerson) return done(new Error("Person not found"));
      done(null, updatedPerson);
    }
  );
};

findAndUpdate("A", console.log); // Replace with a valid name from your database

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
